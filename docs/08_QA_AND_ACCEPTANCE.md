# QA gates and must-fix baseline issues

## Baseline V1 known risks from independent code audit
1. Main `Root.tsx fps={60}` conflicts with manifest FPS 30 (6300 frames / 60 =105 sec); probe previous MP4 because exporter may have used FPS override. Fix new composition regardless.
2. S02 invented amount Rp50,000 / saldo 150,000->100,000 not verified; remove or label illustrative.
3. S03 `NOT SETTLED` too definitive; S04 provider execution already successful presented as fact, must make conditional.
4. S09 `Coverage Rate 100%` misuse; use Test Pass Rate. Historic draft screenshot not final TestSprite screenshot.
5. `Subtitles.tsx` displays complete paragraph instead of timed karaoke captions.
6. BrowserMockup screenshots in 1360x~380 `objectFit:cover` crop much of real UI; make readable and frame intentional.
7. `Atomic mutex lock` misleading; corrected fixture synchronous in-flight reservation.
8. Previous QA boundary tool merely checked return code, did not prove absence of blank frames or audio synchronization.
9. Some fade-to-black transitions may produce awkward dip at boundaries; inspect actual frames.

## Required tests and measurable acceptance
- Composition output: exactly 6300 frames / 30fps / 210s / 1920x1080. Verify `npx remotion compositions` and `ffprobe` binary metadata separately.
- Audio: actual English VO playable, no truncation, no clipping, intelligible QRIS/idempotency/Medusa/TestSprite/CI terms. Music not overpowering. Disclose TTS model and license; no other creator's voice cloned.
- Captions: word alignment derived from actual WAV and checked, 2–6 words/cue, <=2 lines, highlighted active token, semantic colors, not covering source/footer or proof. If audio missing, report pending and don't label final complete.
- Visual: all eleven scenes animated, no generic unchanged static cards >7s; 1fps contact-sheet inspection, per-scene focus, image load checks, full-screen proof. Validate boundary ±1 frames and first/last frames, no unintentional full-black gaps.
- Facts: read 05 ledger; visuals and text cannot assert root causes of consumer reports, settled vs pending certainty, actual bank effects or use historical screenshot as final.
- Source link ledger in final report/video description.
- Code: TypeScript/lint passes; safe local dependency installation only. No arbitrary app repo edits and no Git push.
- Output files: `V2ProofSample.mp4`, 11 middle-frame screenshots, `FlowGuardDemo_V2_3m30.mp4`, `FINAL_QA.md`, `PROGRESS.md`, TTS licensing/metadata and test logs.
- Fail-safe: if cannot finish within model or workstation limits, checkpoint runnable code and return exact path/log of blocker; do NOT claim full video made.
