#!/usr/bin/env python3
"""Generate deterministic, original sound design for the FlowGuard V3 film.

The synthesis is project-owned: no sampled music or third-party sound library is
used. Events below follow the V3 shot plan instead of firing only on scene cuts.
"""

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


def energy_at(time: float, sections: list[tuple[float, float, float]]) -> float:
    for start, end, gain in sections:
        if start <= time < end:
            edge_in = min(1.0, (time - start) / .7)
            edge_out = min(1.0, (end - time) / .7)
            return gain * min(edge_in, edge_out)
    return 0.0


def generate(
    destination: Path,
    duration: float,
    events: list[tuple[float, float, float]],
    sections: list[tuple[float, float, float]],
    sweep_events: list[float] | None = None,
) -> None:
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
            bed_gain = energy_at(time, sections)
            bed = bed_gain * math.sin(phase) + bed_gain * .48 * math.sin(phase * 2.013)
            texture = (random.random() * 2 - 1) * bed_gain * .16
            pulse = 0.0
            for at, frequency, gain in events:
                if time < at or time > at + .45:
                    continue
                env = envelope(time, at, .018, .42)
                pulse += gain * env * math.sin(2 * math.pi * frequency * (time - at))
            sweep = 0.0
            for sweep_at in sweep_events or []:
                if time < sweep_at or time > sweep_at + .65:
                    continue
                sweep_env = envelope(time, sweep_at, .08, .55)
                sweep_delta = time - sweep_at
                sweep += .065 * sweep_env * math.sin(2 * math.pi * (180 + 560 * sweep_delta) * sweep_delta)
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
        [(0, 19, .025)],
        [11.42],
    )
    # Absolute seconds. Frequencies intentionally move from low/uncertain to
    # bright/resolved. These beats mirror the shot choreography in V3_SHOT_PLAN.
    events = [
        (1.4, 126, .048), (3.8, 92, .060), (6.2, 74, .070), (9.1, 220, .046),
        (12.0, 180, .050), (16.0, 112, .052), (21.0, 88, .060), (28.0, 240, .045),
        (33.0, 150, .050), (37.0, 105, .055), (42.0, 78, .066), (47.0, 260, .045),
        (50.0, 155, .050), (55.0, 118, .054), (61.0, 84, .068), (66.0, 205, .046),
        (70.0, 172, .050), (75.0, 300, .045), (80.5, 420, .046), (84.0, 520, .050),
        (86.0, 196, .052), (91.0, 280, .048), (97.0, 360, .046), (101.0, 480, .050),
        (103.0, 160, .052), (108.0, 210, .048), (114.0, 270, .050), (121.0, 330, .052), (128.0, 440, .055),
        (133.0, 128, .058), (138.0, 96, .064), (143.0, 72, .076), (148.2, 260, .055),
        (153.0, 118, .060), (158.0, 360, .054), (163.0, 520, .060), (167.2, 680, .064),
        (169.0, 180, .052), (175.0, 260, .050), (181.0, 420, .054), (188.0, 620, .060),
        (192.0, 220, .052), (197.0, 380, .054), (201.0, 640, .060),
        (203.0, 260, .050), (206.0, 440, .052), (208.4, 760, .060),
    ]
    sections = [
        (0, 12, .012), (12, 33, .014), (33, 50, .012), (50, 70, .014),
        (70, 86, .014), (86, 103, .015), (103, 133, .016), (133, 169, .018),
        (169, 192, .016), (192, 203, .018), (203, 210, .014),
    ]
    generate(
        Path('remotion-project/public/audio/generated/MASTER_SFX.wav'),
        210.0,
        events,
        sections,
        [11.65, 49.55, 85.55, 102.55, 132.55, 152.7, 168.55, 191.55, 202.55],
    )


if __name__ == '__main__':
    main()
