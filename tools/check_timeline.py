#!/usr/bin/env python3
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
d=json.loads((root/'docs'/'03_TIMING_6300_FRAMES.json').read_text(encoding='utf-8'))
assert d['compositionId']=='FlowGuardDemo'
assert d['fps']==30 and d['width']==1920 and d['height']==1080
assert d['durationInFrames']==6300 and len(d['scenes'])==11
pos=0
for s in d['scenes']:
 assert s['from']==pos, f"gap or overlap at {s['id']}: {pos} != {s['from']}"
 assert s['toExclusive']-s['from']==s['durationInFrames']
 pos=s['toExclusive']
assert pos==6300
print('PASS: 11 scenes, 30 FPS, 6,300 continuous frames, 3:30 exact')
