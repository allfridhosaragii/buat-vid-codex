# GitHub Cloud setup for a currently empty repository

## Reality check
`https://github.com/allfridhosaragii/buat-vid-codex` initially has zero commits/zero branches. Codex Cloud may NOT offer it in the repo picker until a first commit exists. Its workspace is remote Linux, **not** the user's Windows `P:` drive.

## Initialize once (manually via GitHub website)
1. Open the target repo and click **creating a new file** (or `Add file → Create new file` when shown). Make `README.md` and commit it to `main`. Do not copy over or reset the original app repository.
2. Upload the CONTENTS of this SEED ZIP (extracted locally) into the target repository using the website or a separate local Git clone. Preserve directories. **Do not upload the ZIP itself** instead of extracting; Codex needs actual files in the checkout. In particular, upload `AGENTS.md`, `docs/`, `assets/flowguard/`, `tools/`. Existing README may be replaced with supplied one. Avoid `.gitignore` accidental omission. If GitHub website uploader cannot preserve nested paths, use a local Git client to commit the extracted directory tree to this target repo.
3. Confirm the `main` branch shows `AGENTS.md`, `docs/01_CLOUD_MASTER_PROMPT.md`, `docs/03_TIMING_6300_FRAMES.json`, `assets/flowguard/homepage-desktop.webp`, plus `tools/check_timeline.py`.
4. In **Codex Cloud**, select GitHub repository `allfridhosaragii/buat-vid-codex`, model GPT-5.6 Sol Medium if actually offered. Paste user-facing short task prompt from `docs/01_CLOUD_MASTER_PROMPT.md` or cite that file. Grant permissions only for this target repo.
5. If reference videos are supported as *private task attachments*, they may be provided there, not pushed to GitHub; otherwise `docs/05_REFERENCE_VISUAL_TECHNIQUES.md` is sufficient.

## If uploads are inconvenient
Codex can work from initial README-only commit using the self-contained short prompt and attempt to clone V1 public repo, but without these seed assets/role and evidence documents, it will have weaker source fidelity. **Preferred:** seed first, then run Codex task.

## Rendering in cloud
Cloud sandbox may have no GPU, TTS models may need big downloads, rendering may run out of memory or time. Require actual logs, scene preview checks, portable Remotion project, a GitHub Actions **manual** `workflow_dispatch` render route in `buat-vid-codex` if viable, plus downloadable artifacts; do not claim MP4 is complete if generated output is not recoverable.
