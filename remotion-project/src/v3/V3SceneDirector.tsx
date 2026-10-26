import React from 'react';
import {S01Hook} from './scenes/S01Hook';
import {S02QrisReport} from './scenes/S02QrisReport';
import {S03PendingHold} from './scenes/S03PendingHold';
import {S04MedusaRisk} from './scenes/S04MedusaRisk';
import {S05Invariant} from './scenes/S05Invariant';
import {S06ProductReveal} from './scenes/S06ProductReveal';
import {S07AgentPipeline} from './scenes/S07AgentPipeline';
import {S08VerificationLab} from './scenes/S08VerificationLab';
import {S09TestSprite} from './scenes/S09TestSprite';
import {S10PostmergeCI} from './scenes/S10PostmergeCI';
import {S11Closing} from './scenes/S11Closing';

const scenes=[S01Hook,S02QrisReport,S03PendingHold,S04MedusaRisk,S05Invariant,S06ProductReveal,S07AgentPipeline,S08VerificationLab,S09TestSprite,S10PostmergeCI,S11Closing] as const;

export const V3SceneDirector:React.FC<{sceneIndex:number}>=({sceneIndex})=>{const Component=scenes[sceneIndex];return Component?<Component/>:null;};
