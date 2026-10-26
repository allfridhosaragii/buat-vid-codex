#!/usr/bin/env python3
"""Generate a short Kokoro ONNX narration sample and phoneme timing evidence."""

import argparse
import json
from pathlib import Path

import soundfile as sf
from kokoro_onnx import Kokoro


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", required=True)
    parser.add_argument("--voices", required=True)
    parser.add_argument("--voice", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--timings", required=True)
    parser.add_argument("--speed", type=float, default=1.0)
    parser.add_argument("--text", required=True)
    args = parser.parse_args()

    kokoro = Kokoro(args.model, args.voices)
    audio, sample_rate, timings = kokoro.create_timed(
        args.text,
        voice=args.voice,
        speed=args.speed,
        lang="en-us",
        sentence_pause=0.28,
        clause_pause=0.12,
    )
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    sf.write(output, audio, sample_rate, subtype="PCM_16")
    Path(args.timings).write_text(
        json.dumps(
            {
                "voice": args.voice,
                "speed": args.speed,
                "sampleRate": sample_rate,
                "durationSeconds": len(audio) / sample_rate,
                "text": args.text,
                "phonemes": [
                    {"phoneme": item.phoneme, "start": item.start, "end": item.end}
                    for item in timings
                ],
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(f"{args.voice}: {len(audio) / sample_rate:.3f}s, {len(timings)} timed phonemes")


if __name__ == "__main__":
    main()
