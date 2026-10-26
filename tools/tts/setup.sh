#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$repo_root"

python3 -m venv .venv-tts
.venv-tts/bin/python -m pip install --disable-pip-version-check -r tools/tts/requirements.txt
mkdir -p .tts-cache

download_and_check() {
  local url="$1" destination="$2" expected="$3"
  if [[ ! -f "$destination" ]]; then
    curl --fail --location --retry 3 --output "$destination" "$url"
  fi
  printf '%s  %s\n' "$expected" "$destination" | sha256sum --check --status
}

download_and_check \
  'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx' \
  '.tts-cache/kokoro-v1.0.onnx' \
  'beb0d1848dee9a49da392cc3df26958d46cfa35d321edf434f52949153f0df3a'
download_and_check \
  'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin' \
  '.tts-cache/voices-v1.0.bin' \
  'bca610b8308e8d99f32e6fe4197e7ec01679264efed0cac9140fe9c29f1fbf7d'

echo 'Kokoro ONNX CPU environment is ready.'
