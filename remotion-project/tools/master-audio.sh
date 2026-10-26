#!/usr/bin/env bash
set -euo pipefail

target="${1:-}"
case "$target" in
  proof) input='out/V2ProofSample.mp4'; duration='19' ;;
  draft) input='out/FlowGuardDemo_V2_draft.mp4'; duration='210' ;;
  final) input='out/FlowGuardDemo_V2_3m30.mp4'; duration='210' ;;
  v3-preview) input='out/FlowGuardDemo_V3_preview.mp4'; duration='210' ;;
  v3-final) input='out/FlowGuardDemo_V3_3m30.mp4'; duration='210' ;;
  *) echo 'usage: tools/master-audio.sh proof|draft|final|v3-preview|v3-final' >&2; exit 2 ;;
esac

output="${input%.mp4}_MASTERED.mp4"
ffmpeg -y -loglevel error -i "$input" \
  -map 0:v:0 -map 0:a:0 -c:v copy \
  -af loudnorm=I=-16:TP=-1.5:LRA=11 \
  -ar 48000 -c:a aac -b:a 192k -t "$duration" \
  -movflags +faststart "$output"
echo "$output"
