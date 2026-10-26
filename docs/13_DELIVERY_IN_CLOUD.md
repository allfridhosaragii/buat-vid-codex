# Delivering film from Codex Cloud

Codex Cloud code changes are reviewed as a task diff/PR in this target repo. Large video files may not automatically survive into the repository or task result. To avoid losing all work, build source reproducibly and configure a manual-only render workflow for `buat-vid-codex` using GitHub Actions if required.

- Use GitHub Actions `workflow_dispatch` **manual trigger only** (not push/PR) for expensive full renders; `ubuntu-latest`, check out target repo, install pinned Node/npm versions, ffmpeg, render with appropriate memory/threads, probe output, upload video + QA assets via `actions/upload-artifact`. Never clone/or trigger the original app's CI/TestSprite for writes.
- Ensure actions do not require third-party video reference assets (only genuine FlowGuard `assets/flowguard`). Do not place external TTS cloud credentials into workflow. Audio either locally pre-generated and legally obtained, or generate via permitted open model in CI if resources permit. If not feasible, add optional audio input or mark voice unfinished honestly.
- A project-level `video:render` npm script and `README` must reproduce output. Include a low-res preview render job/command. Avoid writing `.mp4`, `.wav`, `.mov` and external video samples to Git by default, especially Git LFS surprises.
- In completion report, clarify whether final MP4 has been rendered and actually downloaded; merely having an Actions YAML file is NOT equivalent to a rendered final.
