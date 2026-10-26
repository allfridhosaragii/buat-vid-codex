#!/usr/bin/env python3
"""Generate an original, deterministic pilot sound-design bed (CC0-equivalent project output)."""

import math
import random
import struct
import wave
from pathlib import Path

SAMPLE_RATE = 48_000


def envelope(time: float, at: float, attack: float, decay: float) -> float:
    delta = time - at
    if delta < 0 or delta > attack + decay:
        return 0.0
    if delta < attack:
        return delta / attack
    return math.exp(-5 * (delta - attack) / decay)


def generate(destination: Path, duration: float, events: list[tuple[float, float, float]], bed_gain: float, sweep_at: float | None = None) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    random.seed(24014)
    phase = 0.0
    with wave.open(str(destination), 'wb') as output:
        output.setnchannels(2)
        output.setsampwidth(2)
        output.setframerate(SAMPLE_RATE)
        frames = bytearray()
        for index in range(round(SAMPLE_RATE * duration)):
            time = index / SAMPLE_RATE
            phase += 2 * math.pi * (52 + 3 * math.sin(time * .31)) / SAMPLE_RATE
            bed = bed_gain * math.sin(phase) + bed_gain * .48 * math.sin(phase * 2.013)
            texture = (random.random() * 2 - 1) * bed_gain * .16
            pulse = 0.0
            for at, frequency, gain in events:
                env = envelope(time, at, .018, .42)
                pulse += gain * env * math.sin(2 * math.pi * frequency * (time - at))
            sweep_env = envelope(time, sweep_at, .08, .55) if sweep_at is not None else 0
            sweep_delta = max(0, time - sweep_at) if sweep_at is not None else 0
            sweep = .065 * sweep_env * math.sin(2 * math.pi * (180 + 560 * sweep_delta) * sweep_delta)
            sample = max(-.7, min(.7, bed + texture + pulse + sweep))
            left = int(sample * 32767)
            right = int((sample * .96 + .004 * math.sin(phase * .51)) * 32767)
            frames.extend(struct.pack('<hh', left, right))
        output.writeframes(frames)
    print(f'{destination}: {duration:.1f}s stereo PCM16 at {SAMPLE_RATE} Hz')


def main() -> None:
    generate(
        Path('remotion-project/public/audio/generated/PILOT_SFX.wav'),
        19.0,
        [(2.8, 180, .08), (7.0, 110, .1), (10.75, 72, .14), (11.5, 320, .09), (16.65, 620, .12)],
        .025,
        11.42,
    )
    boundaries = [12, 33, 50, 70, 86, 103, 133, 169, 192, 203]
    generate(
        Path('remotion-project/public/audio/generated/MASTER_SFX.wav'),
        210.0,
        [(at, 150 + (index % 4) * 90, .045) for index, at in enumerate(boundaries)],
        .013,
    )


if __name__ == '__main__':
    main()
