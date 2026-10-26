# FlowGuard AI Cinematic Video V2 — Final QA

Observed results from Codex Cloud on 2026-10-26. The two mastered MP4s below are real playable files, not inferred workflow outputs.

## Verified master

| Check | Observed result |
|---|---|
| File | `remotion-project/out/FlowGuardDemo_V2_3m30_MASTERED.mp4` |
| Video | H.264, 1920×1080, 30/1 FPS |
| Timeline | 6,300 decoded frames, 210.000 seconds, 11 continuous scenes |
| Audio | AAC, 48 kHz, stereo; narration plus original generated sound design |
| Loudness scan | -16.24 LUFS integrated, -1.44 dB true peak, 5.90 LU LRA |
| Size | 41,867,042 bytes |
| SHA-256 | `4da23899df4b7c93c978f36d586bef4a000a46a670e3f30820fc492354d533dc` |
| Decode test | Complete video and audio decode passed with no ffmpeg error |
| Blank-frame scan | No `blackdetect` interval reported |
| Visual inspection | Twelve representative 1080p frames inspected across all scenes, including fail/pass lab states, S09, S10, and closing |

## Verified pilot

| Check | Observed result |
|---|---|
| File | `remotion-project/out/V2ProofSample_MASTERED.mp4` |
| Video | H.264, 1920×1080, 30/1 FPS |
| Timeline | 570 decoded frames, 19.000 seconds |
| Audio | AAC, 48 kHz, stereo; narration plus original generated sound design |
| Loudness scan | -16.33 LUFS integrated, -1.48 dB true peak, 5.10 LU LRA |
| Size | 4,898,118 bytes |
| SHA-256 | `e2213b6d8d6b59971df172663f78ad29f6913b8a083b36a52b65dc31d4f4153d` |
| Decode test | Complete video and audio decode passed with no ffmpeg error |
| Blank-frame scan | No `blackdetect` interval reported |

## Source and timing QA

| Check | Result |
|---|---|
| TypeScript | `npm run typecheck` passes |
| Timeline contract | 1920×1080, 30 FPS, 6,300 frames, 11 continuous scenes passes |
| Narration bounds | All 12 audio tracks fit their scene/composition |
| Word timing | Monotonic and within audio duration for every word |
| Alignment evidence | Kokoro model phoneme durations plus contextual forced alignment; 93.72–100% confidence |
| Model provenance | Kokoro ONNX v1.0, Apache-2.0; model and voices SHA-256 pinned in `tools/tts/model-manifest.json` |
| Screenshot policy | Genuine images use `objectFit: contain`; no evidence crop |
| TestSprite history | Historical screenshot and final report labels are explicitly separated in S09 |
| Factual scope | Public reports remain reports; Medusa risk remains conditional; external analysis remains POTENTIAL; lab remains first-party synthetic; Playwright remains Chromium-only |

## Five-audience and skeptical-review coverage

| Audience | Coverage |
|---|---|
| Ordinary user | Human impact and report uncertainty in S01–S03 |
| Developer | Retry-key mechanics, invariant, and three-stage analysis in S04–S07 |
| CTO / tech lead | Business invariant, product workflow, and linked post-merge CI |
| QA / security | Reproducible synthetic fail/pass lab and exact test counts |
| Hackathon judge | Genuine product UI, cinematic pilot, vendor verification, and closing proposition |
| Skeptical reviewer | Persistent provenance, limitation badges, historical/final separation, exact SHAs, and no external-system causation claims |

## Reproduce locally

```bash
cd remotion-project
npm ci
npm run tts:setup
npm run tts:generate
npm test
npm run render:proof && npm run master:proof
npm run render:draft && npm run master:draft
npm run render:final && npm run master:final
```

The manual GitHub Actions workflow performs the same TTS, validation, render, mastering, probe, and artifact upload steps. It has not been triggered in this task.
