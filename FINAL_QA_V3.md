# FlowGuard V3 — Final QA

Verified: 2026-10-27 (Asia/Jakarta)

## Deliverable

- File: `remotion-project/out/FlowGuardDemo_V3_3m30_MASTERED.mp4`
- SHA-256: `0d1993f0942ad8ee2909a591ab20ddc451d9197b386b86d0b0aab74423526441`
- Size: 70,487,715 bytes

## Media verification

| Check | Result |
|---|---|
| Container decode | PASS — complete FFmpeg decode, no reported error |
| Video | H.264 High, 1920×1080, 30 fps |
| Pixel format | yuvj420p |
| Timeline | 210.000 seconds, exactly 6300 decoded frames |
| Audio | AAC-LC, 48 kHz, stereo |
| Loudness | -16.24 LUFS integrated |
| True peak | -1.41 dBTP |
| Loudness range | 7.10 LU |
| Black frames | PASS — no segment at `d=0.12`, `pix_th=0.02` |

## Source and synchronization verification

- `npm test`: PASS.
- TypeScript: PASS.
- Locked 11-scene timeline: PASS.
- Active evidence labels and non-destructive screenshot policy: PASS.
- Generated narration exists for every scene and fits its scene boundary: PASS.
- Word timings are monotonic, within audio duration, and at least 90% aligned: PASS; actual range 93.72–100%.
- Authentic asset hashes: PASS, 29/29.

## Visual inspection

- Inspected 210 one-second samples from the mastered draft.
- Inspected S01 and S08 1080p look-development renders at four frames per second.
- Inspected a representative 1080p contact sheet decoded from the final mastered file.
- Confirmed shot progression, caption/evidence separation, genuine screenshot rendering, controlled fail/reset/pass sequence, historical/final TestSprite distinction, and final brand resolve.

## Honest limitations

- No subjective human listening session was possible inside the non-interactive cloud runtime; no such approval is claimed.
- The prompt-referenced separate `docs-v3/` director pack and its nine review frames were not present in the task attachments or repository.
- Large MP4 outputs remain untracked by Git. The reproducible source, narration tooling, timing data, and render commands are committed.
