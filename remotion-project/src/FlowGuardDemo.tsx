import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import { SCENES } from './constants/manifest';
import { THEME } from './constants/theme';
import { SceneDirector } from './scenes/SceneDirector';
import wordTimings from './data/word-timings.json';

export const FlowGuardDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.midnight }}>
      {SCENES.map((scene, index) => (
        <Sequence key={scene.id} from={scene.from} durationInFrames={scene.durationInFrames} name={`${scene.id} · ${scene.name}`}>
          <SceneDirector sceneIndex={index} />
          <Audio src={staticFile(wordTimings.scenes[scene.id as keyof typeof wordTimings.scenes].audio)} volume={1.4} />
        </Sequence>
      ))}
      <Audio src={staticFile('audio/generated/MASTER_SFX.wav')} volume={0.5} />
    </AbsoluteFill>
  );
};
