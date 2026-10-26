import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {C,CaptionTrack,EvidenceFooter,KineticWord,SceneFrame,ScopeRibbon,clamp,ease} from '../CinematicKit';

export const S01Hook:React.FC=()=>{const f=useCurrentFrame();const split=ease(f,72,190);const resolve=ease(f,255,330);const pulse=ease(f,82,250);return <SceneFrame accent={C.failure} camera={interpolate(f,[0,359],[1.08,1],clamp)}>
  <ScopeRibbon tone={C.warning}>CONCEPTUAL ILLUSTRATION · CAUSE UNVERIFIED</ScopeRibbon>
  <KineticWord start={0} exit={86} left={120} top={130} size={100}>ONE ACTION.</KineticWord>
  <KineticWord start={28} exit={115} left={760} top={260} size={82} tone={C.cyan}>ONE PERSON.</KineticWord>
  <div style={{position:'absolute',left:150,right:150,top:300,height:390,opacity:ease(f,58,95)*(1-ease(f,270,320)),transform:`perspective(1200px) rotateX(${interpolate(f,[60,180],[8,0],clamp)}deg)`}}>
    <svg viewBox="0 0 1620 390" width="100%" height="100%">
      <defs><filter id="hookGlow"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <path d="M120 195 C420 195 470 195 690 195" fill="none" stroke="#315265" strokeWidth="14" strokeLinecap="round"/>
      <path d="M690 195 C880 195 870 82 1110 82 S1380 96 1510 96" fill="none" stroke="#315265" strokeWidth="14" strokeLinecap="round" opacity={.3+.7*split}/>
      <path d="M690 195 C880 195 870 308 1110 308 S1380 294 1510 294" fill="none" stroke="#315265" strokeWidth="14" strokeLinecap="round" opacity={.3+.7*split}/>
      <path d="M120 195 C420 195 470 195 690 195" fill="none" stroke={C.cyan} strokeWidth="7" strokeDasharray="760" strokeDashoffset={760*(1-Math.min(1,pulse*1.5))} filter="url(#hookGlow)"/>
      <path d="M690 195 C880 195 870 82 1110 82 S1380 96 1510 96" fill="none" stroke={C.failure} strokeWidth="7" strokeDasharray="940" strokeDashoffset={940*(1-Math.max(0,(pulse-.34)/.66))} filter="url(#hookGlow)"/>
      <path d="M690 195 C880 195 870 308 1110 308 S1380 294 1510 294" fill="none" stroke={C.warning} strokeWidth="7" strokeDasharray="940" strokeDashoffset={940*(1-Math.max(0,(pulse-.34)/.66))} filter="url(#hookGlow)"/>
      <circle cx={120+570*Math.min(1,pulse*1.5)} cy="195" r="16" fill={C.cyan} filter="url(#hookGlow)"/>
    </svg>
    <div style={{position:'absolute',left:10,top:150,padding:'14px 20px',borderRadius:16,border:`2px solid ${C.cyan}`,background:'#081825',fontFamily:'monospace',fontWeight:900}}>REQUEST</div>
    <div style={{position:'absolute',right:0,top:35,opacity:ease(f,146,185),padding:'14px 20px',borderRadius:16,border:`2px solid ${C.failure}`,background:'#221119',color:C.failure,fontFamily:'monospace',fontWeight:900}}>DELAYED PURCHASE</div>
    <div style={{position:'absolute',right:0,bottom:28,opacity:ease(f,166,205),padding:'14px 20px',borderRadius:16,border:`2px solid ${C.warning}`,background:'#211b10',color:C.warning,fontFamily:'monospace',fontWeight:900}}>MONEY UNAVAILABLE</div>
  </div>
  <div style={{position:'absolute',inset:0,opacity:resolve,transform:`scale(${.9+resolve*.1})`,display:'grid',placeItems:'center',textAlign:'center'}}><div><div style={{fontFamily:'monospace',fontSize:20,letterSpacing:'.24em',color:C.cyan}}>ONE LOGICAL PATH</div><div style={{fontFamily:'Inter,Arial,sans-serif',fontWeight:900,fontSize:112,lineHeight:.86,letterSpacing:'-.065em',marginTop:22}}>WHEN ONE PATH<br/><span style={{color:C.failure}}>BECOMES TWO</span></div></div></div>
  <CaptionTrack sceneId="S01"/><EvidenceFooter label="Human-impact hook · no real transaction shown" badge="ILLUSTRATION, NOT ROOT-CAUSE EVIDENCE" tone={C.warning}/>
</SceneFrame>};
