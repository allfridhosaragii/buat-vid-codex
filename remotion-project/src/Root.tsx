import React from 'react';
import { Composition } from 'remotion';
import { FlowGuardDemo } from './FlowGuardDemo';
import { V2ProofSample } from './V2ProofSample';
import { TOTAL_FRAMES, FPS, WIDTH, HEIGHT } from './constants/manifest';
import {V3S01Lookdev,V3S08Lookdev} from './v3/V3Lookdev';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Master 3m30s Composition (6,300 frames) */}
      <Composition
        id="FlowGuardDemo"
        component={FlowGuardDemo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition
        id="V2ProofSample"
        component={V2ProofSample}
        durationInFrames={570}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition id="V3S01Lookdev" component={V3S01Lookdev} durationInFrames={360} fps={FPS} width={WIDTH} height={HEIGHT}/>
      <Composition id="V3S08Lookdev" component={V3S08Lookdev} durationInFrames={1080} fps={FPS} width={WIDTH} height={HEIGHT}/>

    </>
  );
};
