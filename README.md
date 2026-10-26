# FlowGuard AI — Cinematic Remotion Demo (Codex Cloud)

Dedicated independent **video production** repository, not the FlowGuard AI application.

- Original app and primary evidence: https://github.com/allfridhosaragii/FlowGuard-AI — strictly read-only.
- Antigravity video V1 reference: https://github.com/allfridhosaragii/buat-vid — strictly read-only from this repository.
- Codex production destination: https://github.com/allfridhosaragii/buat-vid-codex — ONLY destination for code commits and PRs.

## Start a Codex Cloud task
Read `AGENTS.md` and `docs/01_CLOUD_MASTER_PROMPT.md`. The starter material is self-contained for scene timing, evidence, roles and FlowGuard-original images. If public reference V1 code can be fetched, reuse that as a starting scaffold while preserving the **new target repository git history**, never pushing to the other two repositories. If not reachable, scaffold Remotion here and proceed using `assets/flowguard` and source documents.

## Master contract
`FlowGuardDemo`, 1920×1080, 30fps, 6300 frames (03:30), English narration and honest word-timed subtitles. 11 scenes, real public evidence, first-party synthetic lab disclaimers. Code plus a renderable, verifiable video; report any blockers rather than fabricate completions.

## Third-party video references
User's six social-video clips are NOT checked in. Consult `docs/05_REFERENCE_VISUAL_TECHNIQUES.md`. They can be supplied privately to Codex separately if the user-facing interface supports it. Never copy their footage/audio into the final film or public repo.

## QA and deliverables
`remotion-project` generated or adapted by Codex. Source code in target repo, test/QA scripts in `tools`, local preview frames and rendered video when feasible. Keep large generated binaries out of routine Git commits; use approved Codex download/artifacts or optional GitHub Actions artifacts only in this video repository.

## Current V2 workflow

```bash
cd remotion-project
NPM_CONFIG_CACHE=/tmp/flowguard-npm-cache npm ci
npm run tts:setup      # CPU-only Kokoro ONNX; verifies pinned model hashes
npm run tts:generate   # narration, word timing, and original sound design
npm test
npm run compositions
npm run render:proof   # 19-second Verification Lab quality gate
npm run master:proof
npm run render:draft   # narrated 960×540, 210-second review draft
npm run master:draft
npm run render:final   # narrated 1920×1080, 210-second master
npm run master:final
```

The master `FlowGuardDemo` is locked to 1920×1080, 30 FPS, 6,300 frames. `V2ProofSample` is 570 frames (19 seconds). Narration uses the Apache-2.0 Kokoro v1.0 model through CPU-capable `kokoro-onnx`; model and voice-bundle hashes are pinned. Karaoke timing comes from the model's phoneme-duration output and deterministic contextual word alignment, not scene-duration division. Generated models, WAVs, and MP4s stay out of Git; see [FINAL_QA.md](FINAL_QA.md) for measured artifacts.

For an artifact that does not rely on a long-lived cloud process, manually trigger **Render FlowGuard V2** in GitHub Actions and choose `proof`, `draft`, or `final`. The workflow is manual-only and writes MP4 files to downloadable Actions artifacts, never to Git history.
