# FlowGuard V4 — Final QA

Verified: 2026-10-27 (Asia/Jakarta)

## Native master

- File: `remotion-project/out/FlowGuardDemo_V4_3m30_MASTERED.mp4`
- SHA-256: `1a6c2ba25e44359154787514fedbb57c1b460a9d6235e8cf59435e9b6288487f`
- Size: 83,592,036 bytes.
- H.264 High Level 4.1, 1920×1080, limited-range `yuv420p`, 30 fps.
- Exactly 6300 decoded video frames and 210.000 seconds.
- AAC-LC, 48 kHz, stereo.
- Integrated loudness: -16.24 LUFS; true peak: -1.41 dBTP; LRA: 7.10 LU.

## Download-sized 1080p copy

- File: `remotion-project/out/FlowGuardDemo_V4_1080p_DOWNLOAD.mp4`
- SHA-256: `198fa4e4a0cbf55dc8f5895d62601f0b3110f5077f037d1b64cf52f29e92cca4`
- Size: 26,868,436 bytes—below the Codex artifact download threshold.
- H.264 High Level 4.1, 1920×1080, `yuv420p`, 30 fps, 6300 frames.
- AAC-LC, 48 kHz, stereo.

## Verification results

| Check | Result |
|---|---|
| Native master full decode | PASS — no FFmpeg error |
| Download copy full decode | PASS — no FFmpeg error |
| Black-frame detection | PASS — no segment at `d=0.12`, `pix_th=0.02` |
| TypeScript | PASS |
| Locked timeline | PASS — 11 scenes / 6300 frames |
| Narration scene bounds | PASS |
| Word timing monotonicity | PASS |
| Alignment confidence | PASS — 93.72–100% |
| Evidence labels | PASS |
| Screenshot integrity policy | PASS |

## Visual review

- Native 1080p S01 proof inspected at four frames per second.
- Six native 1080p S08 state frames inspected.
- Full 540p V4 mastered draft inspected across 210 one-second samples.
- Native 1080p final master inspected with a 15-second representative contact sheet.
- Entry blooms were reduced after draft review to protect readability while retaining impact transitions.

## Honest limitations

- No subjective human audio listening session is claimed; the cloud runtime supplied technical audio analysis only.
- The prompt-referenced external `docs-v3/` director pack remained unavailable.
- MP4 files are untracked; source, deterministic timings, provenance, and reproducible render/export commands are committed.
