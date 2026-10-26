#!/usr/bin/env python3
"""Create Kokoro narration and forced word timing from model phoneme durations."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from dataclasses import asdict, dataclass
from pathlib import Path

import soundfile as sf
import phonemizer
from kokoro_onnx import Kokoro
from kokoro_onnx.tokenizer import Tokenizer
from phonemizer.separator import Separator


VOICE_PROFILES = {
    "S01": {"speed": 0.92, "sentence_pause": 0.36, "clause_pause": 0.16, "direction": "reflective, intimate"},
    "S02": {"speed": 0.97, "sentence_pause": 0.32, "clause_pause": 0.14, "direction": "empathetic, restrained"},
    "S03": {"speed": 0.96, "sentence_pause": 0.34, "clause_pause": 0.15, "direction": "analytical caution"},
    "S04": {"speed": 1.04, "sentence_pause": 0.26, "clause_pause": 0.10, "direction": "technical tension"},
    "S05": {"speed": 1.02, "sentence_pause": 0.29, "clause_pause": 0.12, "direction": "clear authority"},
    "S06": {"speed": 0.96, "sentence_pause": 0.34, "clause_pause": 0.14, "direction": "confident product reveal"},
    "S07": {"speed": 1.02, "sentence_pause": 0.26, "clause_pause": 0.10, "direction": "methodical momentum"},
    "S08": {"speed": 1.04, "sentence_pause": 0.24, "clause_pause": 0.09, "direction": "energized fail/pass demonstration"},
    "S09": {"speed": 1.00, "sentence_pause": 0.30, "clause_pause": 0.12, "direction": "restrained triumph"},
    "S10": {"speed": 1.03, "sentence_pause": 0.25, "clause_pause": 0.10, "direction": "crisp verification"},
    "S11": {"speed": 0.90, "sentence_pause": 0.38, "clause_pause": 0.16, "direction": "warm closing"},
    "PILOT": {"speed": 1.04, "sentence_pause": 0.24, "clause_pause": 0.09, "direction": "energized proof sample"},
}


@dataclass
class WordTiming:
    text: str
    startMs: int
    endMs: int


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def needleman_wunsch(expected: str, actual: str) -> list[int | None]:
    """Map expected phoneme characters to timed actual characters."""
    rows, cols = len(expected) + 1, len(actual) + 1
    score = [[0] * cols for _ in range(rows)]
    move = [[0] * cols for _ in range(rows)]
    for i in range(1, rows):
        score[i][0], move[i][0] = -i, 1
    for j in range(1, cols):
        score[0][j], move[0][j] = -j, 2
    for i in range(1, rows):
        for j in range(1, cols):
            diagonal = score[i - 1][j - 1] + (2 if expected[i - 1] == actual[j - 1] else -1)
            up = score[i - 1][j] - 1
            left = score[i][j - 1] - 1
            best = max(diagonal, up, left)
            score[i][j] = best
            move[i][j] = 0 if diagonal == best else (1 if up == best else 2)
    mapping: list[int | None] = [None] * len(expected)
    i, j = len(expected), len(actual)
    while i or j:
        direction = move[i][j]
        if i and j and direction == 0:
            if expected[i - 1] == actual[j - 1]:
                mapping[i - 1] = j - 1
            i -= 1
            j -= 1
        elif i and (not j or direction == 1):
            i -= 1
        else:
            j -= 1
    return mapping


def align_words(kokoro: Kokoro, text: str, timed_phonemes: list) -> tuple[list[WordTiming], float]:
    words = re.findall(r"\S+", text)
    # Preserve word boundaries while phonemizing the complete sentence, so
    # contextual pronunciations (for example "a" and "the") exactly match
    # the phonemes that Kokoro synthesized.
    separated = phonemizer.phonemize(
        Tokenizer.normalize_text(text),
        "en-us",
        separator=Separator(phone="", word="|"),
        preserve_punctuation=True,
        with_stress=True,
    )
    separated = "".join(
        char for char in separated if char == "|" or char in kokoro.tokenizer.vocab
    ).strip("|")
    word_phonemes = separated.split("|")
    contextual_boundaries = len(word_phonemes) == len(words)
    if not contextual_boundaries:
        # Espeak can intentionally join boundaries during liaison (for example
        # "not a"). Fall back to per-word targets, then recover any changed
        # contextual phonemes from the unused timed spans below.
        word_phonemes = [
            kokoro.tokenizer.known(kokoro.tokenizer.phonemize(word, "en-us")).replace(" ", "")
            for word in words
        ]
    expected = ""
    word_ranges: list[tuple[int, int]] = []
    for word_phoneme in word_phonemes:
        start = len(expected)
        expected += word_phoneme
        word_ranges.append((start, len(expected)))

    actual_items = [item for item in timed_phonemes if not item.phoneme.isspace()]
    actual = "".join(item.phoneme for item in actual_items)
    mapping = needleman_wunsch(expected, actual)
    matched = sum(index is not None for index in mapping)
    confidence = matched / max(1, len(expected))
    minimum_confidence = 0.99 if contextual_boundaries else 0.85
    if confidence < minimum_confidence:
        raise RuntimeError(
            f"phoneme alignment confidence {confidence:.3f} is below {minimum_confidence:.2f}"
        )

    aligned_indices = [
        [index for index in mapping[start:end] if index is not None]
        for start, end in word_ranges
    ]
    # Assign contextual phonemes that changed completely during liaison to an
    # otherwise-unmatched word. The time still comes from Kokoro's duration
    # output; only the word/phoneme association is recovered here.
    cursor = 0
    while cursor < len(aligned_indices):
        if aligned_indices[cursor]:
            cursor += 1
            continue
        group_start = cursor
        while cursor < len(aligned_indices) and not aligned_indices[cursor]:
            cursor += 1
        previous = max(aligned_indices[group_start - 1]) + 1 if group_start else 0
        following = min(aligned_indices[cursor]) if cursor < len(aligned_indices) else len(actual_items)
        available = [
            index for index in range(previous, following)
            if all(index not in existing for existing in aligned_indices)
        ]
        missing_count = cursor - group_start
        if len(available) < missing_count:
            raise RuntimeError(f"cannot recover contextual timing for {words[group_start:cursor]}")
        for offset in range(missing_count):
            left = round(offset * len(available) / missing_count)
            right = round((offset + 1) * len(available) / missing_count)
            aligned_indices[group_start + offset] = available[left:right]

    result: list[WordTiming] = []
    previous_end = 0
    for word, indices in zip(words, aligned_indices):
        start_ms = max(previous_end, round(actual_items[min(indices)].start * 1000))
        end_ms = max(start_ms + 1, round(actual_items[max(indices)].end * 1000))
        result.append(WordTiming(word, start_ms, end_ms))
        previous_end = end_ms
    return result, confidence


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", default=".tts-cache/kokoro-v1.0.onnx")
    parser.add_argument("--voices", default=".tts-cache/voices-v1.0.bin")
    parser.add_argument("--script", default="tools/tts/narration-script.json")
    parser.add_argument("--audio-dir", default="remotion-project/public/audio/generated")
    parser.add_argument("--timings", default="remotion-project/src/data/word-timings.json")
    parser.add_argument("--voice", default="af_heart")
    parser.add_argument("--speed", type=float, help="Override every scene profile speed")
    parser.add_argument("--only", action="append", help="Generate only this scene ID; repeat as needed")
    args = parser.parse_args()

    model, voices = Path(args.model), Path(args.voices)
    scripts = json.loads(Path(args.script).read_text(encoding="utf-8"))
    audio_dir = Path(args.audio_dir)
    audio_dir.mkdir(parents=True, exist_ok=True)
    kokoro = Kokoro(str(model), str(voices))
    timing_path = Path(args.timings)
    scenes: dict[str, dict] = {}
    if args.only and timing_path.exists():
        scenes.update(json.loads(timing_path.read_text(encoding="utf-8")).get("scenes", {}))
    selected = {scene_id.upper() for scene_id in args.only} if args.only else set(scripts)
    unknown = selected.difference(scripts)
    if unknown:
        raise RuntimeError(f"unknown scene IDs: {', '.join(sorted(unknown))}")
    for scene_id, text in scripts.items():
        if scene_id not in selected:
            continue
        profile = VOICE_PROFILES[scene_id]
        speed = args.speed if args.speed is not None else profile["speed"]
        audio, sample_rate, phonemes = kokoro.create_timed(
            text,
            voice=args.voice,
            speed=speed,
            lang="en-us",
            sentence_pause=profile["sentence_pause"],
            clause_pause=profile["clause_pause"],
        )
        words, confidence = align_words(kokoro, text, phonemes)
        output = audio_dir / f"{scene_id}.wav"
        sf.write(output, audio, sample_rate, subtype="PCM_16")
        scenes[scene_id] = {
            "text": text,
            "audio": f"audio/generated/{scene_id}.wav",
            "durationMs": round(len(audio) / sample_rate * 1000),
            "alignmentConfidence": round(confidence, 6),
            "voiceDirection": profile["direction"],
            "speed": speed,
            "sentencePause": profile["sentence_pause"],
            "clausePause": profile["clause_pause"],
            "words": [asdict(word) for word in words],
        }
        print(f"{scene_id}: {len(audio) / sample_rate:.3f}s, {len(words)} words, alignment {confidence:.3%}")

    payload = {
        "provenance": {
            "engine": "kokoro-onnx",
            "engineVersion": "0.6.1",
            "modelLicense": "Apache-2.0",
            "modelSha256": sha256(model),
            "voicesSha256": sha256(voices),
            "voice": args.voice,
            "speed": "scene-profiled; see each scene entry",
            "timingMethod": "Kokoro model phoneme durations aligned to contextual per-word phonemes with Needleman-Wunsch",
        },
        "scenes": scenes,
    }
    timing_path.parent.mkdir(parents=True, exist_ok=True)
    timing_path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
