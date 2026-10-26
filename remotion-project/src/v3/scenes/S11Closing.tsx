import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C,CaptionTrack,EvidenceFooter,KineticWord,SceneFrame,ease} from '../CinematicKit';

export const S11Closing:React.FC=()=>{const f=useCurrentFrame();const brand=ease(f,80,125);return <SceneFrame accent={C.cyan}>
  <div style={{opacity:1-ease(f,85,115)}}><KineticWord start={0} left={250} top={170} size={118}>EVIDENCE</KineticWord><KineticWord start={18} left={770} top={330} size={88} tone={C.cyan}>BEFORE</KineticWord><KineticWord start={36} left={1030} top={485} size={112}>VERDICTS.</KineticWord></div>
  <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',textAlign:'center',opacity:brand,transform:`scale(${.86+brand*.14})`}}><div><div style={{width:108,height:108,borderRadius:28,border:`3px solid ${C.cyan}`,display:'grid',placeItems:'center',fontSize:54,margin:'0 auto',boxShadow:`0 0 70px ${C.cyan}55`}}>✓</div><div style={{fontSize:102,fontWeight:900,letterSpacing:'-.055em',marginTop:22}}>FlowGuard AI</div><div style={{fontSize:38,color:C.cyan,marginTop:6}}>EVIDENCE BEFORE VERDICTS</div><div style={{fontFamily:'monospace',fontSize:28,marginTop:45}}>flowguard-ai-smoky.vercel.app</div></div></div>
  <CaptionTrack sceneId="S11" reserveBottom={100}/><EvidenceFooter label="Public product demo" badge="FLOWGUARD-AI-SMOKY.VERCEL.APP"/>
</SceneFrame>};
