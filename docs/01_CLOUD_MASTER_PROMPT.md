# MASTER TASK PROMPT — CODEX CLOUD, `buat-vid-codex` ONLY

ROLE: You are the end-to-end Remotion Video Production Engineer, Original Motion Director, English AI Voiceover Engineer, Word-Synced Subtitle Engineer, and Evidence Integrity QA. **GPT-6 supplied the locked creative brief. You implement.** Produce an editable Remotion project and a real playable cinematic film, not a plan or dummy code.

## Repository / permissions / anti-conflict
- **This checkout is the destination:** `https://github.com/allfridhosaragii/buat-vid-codex`. Root of this Codex Cloud task is the repository workspace. **Never mention or use `P:\Demo Vid` as a file path.** That is a separate computer, and Antigravity is editing a different repository.
- References: V1 video repo `https://github.com/allfridhosaragii/buat-vid`, audited `main` commit `5de55c48fadd69330639cda2756be62fd0cf1321`, and original product `https://github.com/allfridhosaragii/FlowGuard-AI` are **strictly READ ONLY**. Never push/commit/open PR to either of them; do not run TestSprite or modify Vercel, workflow, branch rules, Discord submission, or billing.
- Commits and draft PRs are allowed *only* on this target repo through the Codex task workflow. No force push, no auto-merge to main without owner's review.
- The production source, reports, asset screenshots, VO, test/QA code stay in target; large MP4/WAV/private reference media and model weights should not be automatically committed. Supply downloadable artifacts or a manual GitHub Actions artifact path under THIS video repo; be honest if cloud cannot provide binary download.

## Read first and verify source
Read fully `AGENTS.md` and every specification in `docs/`, especially 02–09, inspect the 29 original images in `assets/flowguard` and their SHA-256 ledger, and run `python tools/check_timeline.py`. The 6 real video references are **not** stored in this public repo. Adopt the detailed descriptions in `docs/05_REFERENCE_VISUAL_TECHNIQUES.md`, including the deliberate combination of:
(a) kinetic typography/3D generative geometry from clips 7157 and 7160;
(b) human-first narrative staging from 7158;
(c) premium dark UI reveal from 7159;
(d) highly understandable animated technical explainer and well-timed word highlight from 7161;
(e) A/B technical flow diagrams from 7162. Create wholly original designs and audio; do not recreate videos pixel-for-pixel.

## Baseline bootstrap, do NOT mistakenly edit Antigravity
1. Inspect target repo `git status`, available Node/npm/ffmpeg/ffprobe/Chromium, CPU/RAM/GPU, network. Read `docs/00_CLOUD_SETUP_GITHUB.md`.
2. Try to access V1 public repo using Git read-only. If allowed, clone shallow/sparse into a disposable directory **outside the tracked project** (or ignored `.tmp/v1`), pinned to commit `5de55c4`. Inspect actual `remotion-project/src`, 11 scenes, components, tools, V1 QA, and bundle. **Copy only necessary source, package manifests and authentic public assets** into this target worktree; never copy `.git`, completed V1 video outputs or proprietary reference clips. Reuse good components, discard misleading lines. Do not mirror/overwrite this repo's history.
3. If public Git clone is blocked, do NOT stop: scaffold modern Remotion React/TS project in `remotion-project/` using installed packages or npm registry if available; implement from provided storyboard and original assets. Document source bootstrap method.
4. Preserve previous work via Git commit/checkpoint in target task branch. Write `PROGRESS.md` and keep it updated. Do not ask which visuals or colors to use: the Production Bible specifies them.

## Production contract
- **Master title/composition ID:** `FlowGuardDemo`.
- **Resolution:** 1920×1080, 30 fps, 6300 frames, **03:30 exactly**; H.264/AAC when narrated.
- **Exactly 11 locked scenes** and time bounds from `docs/03_TIMING_6300_FRAMES.json` (do not accidentally use V1 main composition `fps={60}`); create test asserting no frame gaps, correct terminal frame 6299, runtime `getVideoMetadata`/`ffprobe` where appropriate.
- Film should be a deliberate premium engineering documentary, not static screenshots or PowerPoint slide transitions. Animated layers should explain a real change in state or meaning. Use `spring/interpolate`, 2.5D camera, original particles/lines/chips, kinetic title hierarchy, sound-driven visual punctuation and controlled glows, but always leave facts readable.
- Include **five audience POVs** interwoven in narrative: ordinary users, developers, CTO/tech leads, QA/security reviewers, hackathon judges. Across every scene satisfy the sixth skeptical lens: direct provenance, evidence distinctions, honest limits.
- Story: public consumer reports → developer risk report → idempotency invariant → real FlowGuard site → Requirement Analyst / Risk Hunter / Verification Planner (`POTENTIAL`) → controlled first-party synthetic Verification Lab (vulnerable `2 committed side effects / VERIFIED_FAIL`, corrected `1 / VERIFIED_PASS` with same two attempts) → official TestSprite V3 final 97/97 on PR #14 SHA `0f575c3` → postmerge CI 118/118 Vitest & 70/70 Chromium Playwright → verified closing URL.
- Sources are quoted or paraphrased **as reports**, NOT certified root causes. Avoid invented debit amounts, fictional customer endorsements and `NOT SETTLED` assertions. The Medusa issue described a **conditional** risk, not confirmed actual double payout. `Coverage Rate` not supported; call it `Test Pass Rate`. Fixed fixture uses synchronous in-flight reservation before async operation, not arbitrary distributed mutex. Never present older historical PR screenshot as final vendor execution.
- Every evidence screenshot must be original recognizable FlowGuard media, its aspect ratio handled intentionally. Never cram 16:9 screenshot into a 1360×332 crop with `objectFit:cover` such that important result disappears. Crop only intentionally with source anchor / caption. Label illustrative diagrams `CONCEPTUAL ILLUSTRATION` and lab `FIRST-PARTY SYNTHETIC FIXTURE ONLY`.

## English voice-over and professional karaoke captions
- Use actual script `docs/04_VOICEOVER_SCRIPT_EN.md` as factual baseline; adapt for pacing only while preserving claims. A single coherent natural English narrator (clear articulation of QRIS, idempotency, Medusa, TestSprite, Vitest, Playwright), no avatar impersonations.
- Check availability of legal open TTS in cloud. Try Chatterbox if resource/license suitable, otherwise Kokoro; if no GPU, prefer CPU-suitable option and smaller model. Never use paid APIs or upload private data without authorization. Do not clone any creator's voice. Record model/checkpoint and license provenances. Generate 15-20s A/B voice samples **only when feasible**; choose superior option from actual listening/measurement; do not claim human-like quality unverified.
- Generate real word start/end timestamps **based on the produced audio** (forced alignment/ASR or verified correction), not dividing whole paragraphs evenly. Use Remotion captions API where it fits, showing 2–6 words, max 2 lines, active-word highlight, safe margins; contrast on dark UI, place away from citations and PASS/FAIL. Correct or shorten narration if spoken length exceeds a scene rather than speeding unnaturally or cropping speech.
- Music/SFX should be original generated or license-cleared, with ducking under VO and no clipping. If TTS cannot run, render honest silent/text-only draft and mark AUDIO_BLOCKED. Do not substitute fake silent file while claiming final success.

## Implement, test, render — in reviewable stages
**Phase 0:** inventory and verify docs/assets, git & environment; bootstrap from V1 or scaffold, confirm Remotion preview works. Save checkpoint.
**Phase 1:** repair V1 flaws and implement compositional system. Fix 30fps, business facts, TestSprite historical proof, cropping, subtitle architecture. Run typecheck and source checks. Save checkpoint.
**Phase 2:** create A/B narration samples if feasible, audio processing/word captions. Save real file metadata, alignment JSON and spoken test words. Save checkpoint.
**Phase 3:** implement and render original `V2ProofSample` 18–20 seconds from S08 with high-motion original cinematic diagram + actual proof UI. Run ffprobe and 6–10 thumbnail QA. This is your **internal quality gate**, not a stopping point if the sample is functional. Fix failures before continuing.
**Phase 4:** build all 11 scenes to locked manifest, using reusable original components and a consistent visual system. Produce draft 720p preview, verify story pacing/5 POVs; adjust within scene windows. Save checkpoint every 3–4 scenes.
**Phase 5:** produce 1080p final MP4 and `out/codex-v2/FINAL_QA.md` if cloud limits permit. Verify via ffprobe: ~210s, 30fps, 1920x1080, AAC audio present if claimed. Generate sampled frames (at least 1/sec + boundary, but batch resize to reduce work), visually inspect meaningful states, check nonblank frames, spoken audio cuts, captions at 5 random word positions. Provide full evidence URLs, package versions, source commit, QA scope, limits, and reproducible commands.

## Cloud resource fallback — do not pretend success
Cloud may not have GPU/long enough CPU render or network to download TTS. Optimize draft/low concurrency/cache, do a few-scene verified render and preserve workable TSX if full render cannot complete. Provide a **manual GitHub Actions `workflow_dispatch` render workflow** in this target repo if sensible, publishing full film as downloadable GitHub Actions artifacts (not committing huge output into Git history). This workflow must NEVER reach out to original FlowGuard repo for writes or run TestSprite. Any uploaded artifact containing reference videos is forbidden. Record exactly what passed and what remains unverified.

## Completion report
Provide working code/commit/PR in `buat-vid-codex`, a short sample and ideally downloadable full MP4 if actually rendered, a provenance/license statement, and a 5-POV matrix with scene timecodes/evidence. `PROGRESS.md` lists work done per phase. `FINAL_QA.md` distinguishes `VERIFIED PASS`, `FAIL`, and `NOT VERIFIED`. If file was not rendered, say so—never claim completion just because TSX compiles. Do not ask repetitive questions; use the documented design direction.

START IMMEDIATELY: verify checkout, inventory documents/assets, try a read-only import of V1, and implement as far as tooling/limits allow. Keep all writes limited to this Codex video repository.
