import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const manifest = JSON.parse(readFileSync(resolve('src/data/word-timings.json'), 'utf8'));
const limits = {S01: 12000, S02: 21000, S03: 17000, S04: 20000, S05: 16000, S06: 17000, S07: 30000, S08: 36000, S09: 23000, S10: 11000, S11: 7000, PILOT: 19000};
const errors = [];

for (const [sceneId, limitMs] of Object.entries(limits)) {
  const scene = manifest.scenes[sceneId];
  if (!scene) {
    errors.push(`${sceneId}: timing data missing`);
    continue;
  }
  const audioPath = resolve('public', scene.audio);
  if (!existsSync(audioPath)) errors.push(`${sceneId}: generated audio missing at ${audioPath}`);
  if (scene.durationMs > limitMs) errors.push(`${sceneId}: ${scene.durationMs}ms exceeds ${limitMs}ms scene`);
  if (scene.alignmentConfidence < .9) errors.push(`${sceneId}: low alignment confidence ${scene.alignmentConfidence}`);
  let previousEnd = 0;
  for (const word of scene.words) {
    if (word.startMs < previousEnd || word.endMs <= word.startMs) errors.push(`${sceneId}: non-monotonic word timing at ${word.text}`);
    if (word.endMs > scene.durationMs + 2) errors.push(`${sceneId}: ${word.text} exceeds audio duration`);
    previousEnd = word.endMs;
  }
  console.log(`${sceneId}: ${(scene.durationMs / 1000).toFixed(3)}s · ${scene.words.length} words · ${(scene.alignmentConfidence * 100).toFixed(2)}% phoneme alignment`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Narration timing and scene-bound checks passed.');
