# FlowGuard AI Cinematic Video V2 — QA Status

This file distinguishes observed results from unfinished work. A runnable composition is not the same as a completed narrated film.

## VERIFIED PASS

| Check | Evidence |
|---|---|
| Seed assets | 29/29 SHA-256 hashes match `docs/10_ASSET_SHA256.csv` |
| Timeline manifest | 11 continuous scenes, frames 0–6299, 6,300 frames total |
| Remotion metadata | `FlowGuardDemo`: 1920×1080, 30 FPS, 6,300 frames / 210 seconds |
| Pilot metadata | `V2ProofSample`: H.264, 1920×1080, 30 FPS, 19.000 seconds |
| Pilot visual inspection | Nine temporal samples inspected; vulnerable and corrected stages, evidence screenshots, and 2→1 result are visible |
| Pilot blank-frame check | ffmpeg `blackdetect` reported no black interval |
| Full silent draft | H.264, 960×540, 30 FPS, exactly 6,300 frames / 210.000 seconds |
| Full visual inspection | All 11 scene midpoints plus every scene boundary sampled; first-frame content floor added after the first boundary review |
| Full blank-frame check | Corrected 210-second draft produced no ffmpeg `blackdetect` interval |
| TypeScript | `npm run typecheck` passes |
| Source QA | `npm run test:timeline` passes factual-label, FPS, continuity, and active non-cropping checks |
| Product screenshot policy | Active director uses `objectFit: contain`; genuine media remains recognizable |
| Evidence wording | Conditional, POTENTIAL, historical/final, synthetic, and browser-scope boundaries are explicit |

## NOT VERIFIED / BLOCKED

| Check | Status |
|---|---|
| Natural English narration | `AUDIO_BLOCKED`; no suitable open TTS model installed and no voice was cloned or fetched from an unapproved service |
| Word-level alignment | Not verified because produced narration does not exist; current highlight timing is a visual draft only |
| AAC audio / loudness / clipping | Not applicable to the silent draft |
| 1080p 210-second final MP4 | Not yet rendered; never infer completion from source or workflow YAML |
| Fresh GitHub Actions execution | Workflow is committed source only until a user manually triggers it |
| Pull request object | Not created: GitHub GraphQL returned `403 Forbidden`; pushed branch is ready at the compare URL recorded in `PROGRESS.md` |

## Five-audience evidence matrix

| Audience | Timecodes and answer |
|---|---|
| Ordinary user | 00:12 report with cause unverified; 02:13 lab makes 2 effects versus 1 understandable |
| Developer | 00:50 conditional retry-key path; 01:43 analyst/risk/planner pipeline |
| CTO / tech lead | 01:10 explicit invariant; 03:12 independently linked post-merge CI |
| QA / security | 02:13 synthetic fixture scope and reproducible outcomes; 02:49 exact PR head and vendor result |
| Hackathon judge | 01:26 genuine product UI; 02:49 and 03:12 linked testing evidence |
| Skeptic (cross-cutting) | Persistent source footers, exact SHAs, POTENTIAL/VERIFIED distinctions, and limitations |

## Expected local outputs

- `remotion-project/out/V2ProofSample.mp4` — actual local pilot, ignored by Git.
- `remotion-project/out/FlowGuardDemo_V2_draft.mp4` — silent 540p review draft when render succeeds, ignored by Git.
- `remotion-project/out/FlowGuardDemo_V2_3m30.mp4` — reserved final filename; not present unless a full final render succeeds.

## Reproduce

```bash
cd remotion-project
NPM_CONFIG_CACHE=/tmp/flowguard-npm-cache npm ci
npm test
npm run compositions
npm run render:proof
npm run render:draft
# Only after narration/alignment is complete:
npm run render:final
```
