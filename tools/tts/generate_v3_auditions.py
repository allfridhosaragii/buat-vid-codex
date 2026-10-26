#!/usr/bin/env python3
"""Generate thirty legal Kokoro phrase takes for V3 timing/energy comparison."""

import json
from pathlib import Path

import soundfile as sf
from kokoro_onnx import Kokoro

PHRASES = {
    "S01_01": "Behind every software failure, there can be a real person.",
    "S01_02": "A delayed purchase.",
    "S01_03": "Money temporarily unavailable.",
    "S01_04": "A retry that behaves differently than expected.",
    "S08_01": "Now watch our controlled Verification Lab.",
    "S08_02": "Two refund attempts run concurrently with the same logical key.",
    "S08_03": "The vulnerable fixture commits two side effects. Verified fail.",
    "S08_04": "Reserve the key before asynchronous work.",
    "S08_05": "Only one effect is committed. Verified pass.",
    "S11_01": "FlowGuard AI. Evidence before verdicts.",
}

TAKES = {
    "restrained": 0.92,
    "natural": 1.00,
    "energized": 1.08,
}


def main() -> None:
    output = Path('.tts-cache/v3-auditions')
    output.mkdir(parents=True, exist_ok=True)
    kokoro = Kokoro('.tts-cache/kokoro-v1.0.onnx', '.tts-cache/voices-v1.0.bin')
    manifest = []
    for phrase_id, text in PHRASES.items():
        for take, speed in TAKES.items():
            audio, sample_rate = kokoro.create(text, voice='af_heart', speed=speed, lang='en-us')
            path = output / f'{phrase_id}_{take}.wav'
            sf.write(path, audio, sample_rate, subtype='PCM_16')
            manifest.append({"phraseId": phrase_id, "take": take, "speed": speed, "text": text, "durationSeconds": round(len(audio) / sample_rate, 3), "path": str(path)})
            print(f'{phrase_id} {take}: {len(audio) / sample_rate:.3f}s')
    (output / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    print(f'Generated {len(manifest)} phrase takes.')


if __name__ == '__main__':
    main()
