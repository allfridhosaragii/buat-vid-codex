import React from 'react';
import {AbsoluteFill} from 'remotion';
import {THEME} from './constants/theme';
import {VerificationLabVisual} from './scenes/SceneDirector';

export const V2ProofSample: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: THEME.colors.midnight}}>
    <VerificationLabVisual duration={570} pilot />
  </AbsoluteFill>
);
