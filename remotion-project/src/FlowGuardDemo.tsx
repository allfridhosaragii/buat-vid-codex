import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { SCENES } from './constants/manifest';
import { THEME } from './constants/theme';
import { SceneDirector } from './scenes/SceneDirector';

export const FlowGuardDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.midnight }}>
      {SCENES.map((scene, index) => (
        <Sequence key={scene.id} from={scene.from} durationInFrames={scene.durationInFrames} name={`${scene.id} · ${scene.name}`}>
          <SceneDirector sceneIndex={index} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
