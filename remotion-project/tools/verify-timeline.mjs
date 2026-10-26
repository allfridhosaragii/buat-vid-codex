import fs from 'node:fs';
import path from 'node:path';

const project = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(project, '..', 'docs', '03_TIMING_6300_FRAMES.json'), 'utf8'));
const root = fs.readFileSync(path.join(project, 'src', 'Root.tsx'), 'utf8');
const v3Directory = path.join(project, 'src', 'v3');
const collectSource = (directory) => fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
  const target = path.join(directory, entry.name);
  return entry.isDirectory() ? collectSource(target) : entry.name.endsWith('.tsx') ? [fs.readFileSync(target, 'utf8')] : [];
});
const director = collectSource(v3Directory).join('\n');

if (manifest.compositionId !== 'FlowGuardDemo' || manifest.fps !== 30 || manifest.durationInFrames !== 6300) throw new Error('master metadata drift');
if (manifest.width !== 1920 || manifest.height !== 1080 || manifest.scenes.length !== 11) throw new Error('composition dimensions or scene count drift');
let cursor = 0;
for (const scene of manifest.scenes) {
  if (scene.from !== cursor || scene.toExclusive - scene.from !== scene.durationInFrames) throw new Error(`timeline gap/overlap at ${scene.id}`);
  cursor = scene.toExclusive;
}
if (cursor !== 6300) throw new Error('terminal frame drift');
if (!root.includes('fps={FPS}') || root.includes('fps={60}')) throw new Error('Root must use locked 30 FPS constant');
if (/Coverage Rate/i.test(director)) throw new Error('unsupported coverage claim in active director');
if (/objectFit:\s*['"]cover/.test(director)) throw new Error('destructive screenshot cropping in active director');
if (!director.includes('FIRST-PARTY SYNTHETIC FIXTURE') || !director.includes('POTENTIAL')) throw new Error('evidence-boundary labels missing');
if (!director.includes('HISTORICAL TESTSPRITE CAPTURE') || !director.includes('FINAL POST-MERGE REPORT')) throw new Error('historical/final TestSprite labels missing');
console.log('PASS: FlowGuardDemo is 1920x1080, 30 FPS, 6300 frames, 11 continuous scenes');
console.log('PASS: active evidence labels and non-cropping screenshot policy present');
