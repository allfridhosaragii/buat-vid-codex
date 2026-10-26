import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {KaraokeCaptions} from './components/KaraokeCaptions';
import {THEME} from './constants/theme';
import wordTimings from './data/word-timings.json';
import {VerificationLabVisual} from './scenes/SceneDirector';

export const V2ProofSample: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: THEME.colors.midnight}}>
    <VerificationLabVisual duration={570} pilot />
    <Audio src={staticFile(wordTimings.scenes.PILOT.audio)} volume={1.4} />
    <Audio src={staticFile('audio/generated/PILOT_SFX.wav')} volume={0.55} />
    <KaraokeCaptions words={wordTimings.scenes.PILOT.words} reserveBottom={108} />
  </AbsoluteFill>
);
