import React from 'react';
import {AbsoluteFill,Audio,staticFile} from 'remotion';
import wordTimings from '../data/word-timings.json';
import {S01Hook} from './scenes/S01Hook';
import {S08VerificationLab} from './scenes/S08VerificationLab';

export const V3S01Lookdev:React.FC=()=> <AbsoluteFill><S01Hook/><Audio src={staticFile(wordTimings.scenes.S01.audio)} volume={1.4}/></AbsoluteFill>;
export const V3S08Lookdev:React.FC=()=> <AbsoluteFill><S08VerificationLab/><Audio src={staticFile(wordTimings.scenes.S08.audio)} volume={1.4}/></AbsoluteFill>;
