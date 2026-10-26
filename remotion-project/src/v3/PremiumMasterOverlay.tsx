import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame} from 'remotion';
import {SCENES,TOTAL_FRAMES} from '../constants/manifest';
import {THEME} from '../constants/theme';

const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};

export const PremiumMasterOverlay:React.FC=()=>{
  const frame=useCurrentFrame();
  const active=Math.max(0,SCENES.findIndex((s)=>frame>=s.from&&frame<s.toExclusive));
  const scene=SCENES[active];
  const progress=frame/TOTAL_FRAMES;
  const boundary=SCENES.slice(1).reduce((best,s)=>Math.abs(frame-s.from)<Math.abs(frame-best)?s.from:best,SCENES[1].from);
  const distance=Math.abs(frame-boundary);
  const transition=interpolate(distance,[0,9],[1,0],clamp);
  const seconds=Math.floor(frame/30);
  const tc=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}:${String(frame%30).padStart(2,'0')}`;
  return <AbsoluteFill style={{pointerEvents:'none',zIndex:120}}>
    <div style={{position:'absolute',left:28,right:28,top:14,height:2,background:'rgba(136,169,182,.16)'}}>
      <div style={{height:'100%',width:`${progress*100}%`,background:`linear-gradient(90deg,${THEME.colors.cyan},${THEME.colors.pass})`,boxShadow:`0 0 14px ${THEME.colors.cyan}`}}/>
      {SCENES.slice(1).map((s)=><div key={s.id} style={{position:'absolute',left:`${s.from/TOTAL_FRAMES*100}%`,top:-3,width:2,height:8,background:'rgba(232,250,249,.35)'}}/>)}
    </div>
    <div style={{position:'absolute',left:34,top:24,fontFamily:THEME.fonts.mono,fontSize:11,fontWeight:900,letterSpacing:'.16em',color:'rgba(136,169,182,.66)'}}>FLOWGUARD / EVIDENCE SYSTEM / {scene.id}</div>
    <div style={{position:'absolute',right:34,top:24,fontFamily:THEME.fonts.mono,fontSize:11,fontWeight:900,letterSpacing:'.14em',color:'rgba(136,169,182,.66)'}}>{tc} · 30FPS</div>
    {transition>0&&<div style={{position:'absolute',inset:0,opacity:transition,background:'radial-gradient(circle at center,rgba(255,255,255,.82),rgba(26,217,209,.38) 18%,transparent 62%)'}}/>}
    {[-1,0,1].map((n)=><div key={n} style={{position:'absolute',left:`${50+n*8}%`,top:-300,width:3,height:1700,opacity:transition*.75,background:n===0?'white':THEME.colors.cyan,transform:`rotate(28deg) translateX(${(1-transition)*400}px)`,boxShadow:`0 0 38px ${THEME.colors.cyan}`}}/>)}
  </AbsoluteFill>;
};
