import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {KaraokeCaptions} from '../components/KaraokeCaptions';
import {THEME} from '../constants/theme';
import wordTimings from '../data/word-timings.json';

export const C = THEME.colors;
export const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
export const ease = (frame: number, start: number, end: number, from = 0, to = 1) => interpolate(frame, [start, end], [from, to], clamp);
export const windowed = (frame: number, start: number, end: number, feather = 16) => Math.min(ease(frame, start, start + feather), 1 - ease(frame, end - feather, end));

export const SceneFrame: React.FC<{accent?: string; children: React.ReactNode; camera?: number; vignette?: boolean}> = ({accent = C.cyan, children, camera = 1, vignette = true}) => {
  const frame = useCurrentFrame();
  const shift = Math.sin(frame / 83) * 5;
  return <AbsoluteFill style={{overflow: 'hidden', background: '#050d15', color: C.ice}}>
    <div style={{position:'absolute',inset:-120,transform:`scale(${camera}) translate(${shift}px,${-shift*.35}px)`,background:`radial-gradient(circle at ${25+shift}% 18%,${accent}20,transparent 30%),radial-gradient(circle at 82% 72%,#7f5af018,transparent 32%),linear-gradient(135deg,#050c14 0%,#081827 50%,#061019 100%)`}}/>
    <div style={{position:'absolute',inset:-80,opacity:.18,transform:`perspective(900px) rotateX(67deg) translateY(${370+frame*.1}px)`,transformOrigin:'center bottom',backgroundImage:`linear-gradient(${accent}24 1px,transparent 1px),linear-gradient(90deg,${accent}24 1px,transparent 1px)`,backgroundSize:'92px 92px'}}/>
    {Array.from({length:32},(_,i)=><div key={i} style={{position:'absolute',left:`${(i*37)%101}%`,top:`${(i*61+frame*(.04+(i%4)*.018))%104}%`,width:2+i%3,height:2+i%3,borderRadius:9,background:i%7===0?'#8b6cff':accent,opacity:.16+(i%5)*.05,boxShadow:`0 0 14px ${accent}`}}/>)}
    <div style={{position:'absolute',inset:0,transform:`scale(${camera})`}}>{children}</div>
    {vignette && <div style={{position:'absolute',inset:0,pointerEvents:'none',background:'radial-gradient(circle at center,transparent 46%,rgba(0,0,0,.5) 100%)'}}/>}
    <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:.055,backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=%270 0 160 160%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.9%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.7%27/%3E%3C/svg%3E")'}}/>
  </AbsoluteFill>;
};

export const SceneTitle: React.FC<{eyebrow: string; title: React.ReactNode; tone?: string; compact?: boolean}> = ({eyebrow,title,tone=C.cyan,compact=false}) => {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  const p=spring({frame,fps,config:{damping:18,stiffness:105,mass:.8}});
  return <div style={{position:'absolute',left:108,right:108,top:compact?54:66,zIndex:30,opacity:p,transform:`translateY(${(1-p)*30}px)`}}>
    <div style={{fontFamily:THEME.fonts.mono,fontSize:19,fontWeight:850,letterSpacing:'.18em',textTransform:'uppercase',color:tone}}>{eyebrow}</div>
    <div style={{fontFamily:THEME.fonts.primary,fontSize:compact?60:76,lineHeight:.98,fontWeight:800,letterSpacing:'-.048em',marginTop:13,maxWidth:1540}}>{title}</div>
  </div>;
};

export const EvidenceFooter: React.FC<{label:string; badge?:string; tone?:string}> = ({label,badge,tone=C.cyan}) => <div style={{position:'absolute',left:106,right:106,bottom:28,minHeight:52,padding:'0 20px',display:'grid',gridTemplateColumns:'minmax(0,1fr) auto',gap:24,alignItems:'center',borderRadius:13,background:'rgba(3,10,17,.91)',border:`1px solid ${C.panelBorderMuted}`,zIndex:80}}>
  <div style={{fontFamily:THEME.fonts.primary,fontSize:17,color:C.muted,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{label}</div>
  {badge&&<div style={{fontFamily:THEME.fonts.mono,fontSize:15,fontWeight:800,color:tone,textAlign:'right'}}>{badge}</div>}
</div>;

export const ScopeRibbon: React.FC<{children:React.ReactNode;tone?:string;top?:number}> = ({children,tone=C.warning,top=30}) => <div style={{position:'absolute',right:108,top,zIndex:75,padding:'10px 16px',borderRadius:999,background:`${tone}16`,border:`1px solid ${tone}77`,color:tone,fontFamily:THEME.fonts.mono,fontWeight:850,fontSize:15,letterSpacing:'.08em'}}>{children}</div>;

export const Badge: React.FC<{children:React.ReactNode;tone?:string}> = ({children,tone=C.cyan}) => <div style={{display:'inline-flex',padding:'9px 15px',borderRadius:999,background:`${tone}17`,border:`1px solid ${tone}70`,color:tone,fontFamily:THEME.fonts.mono,fontSize:16,fontWeight:850,letterSpacing:'.06em'}}>{children}</div>;

export const GlassPanel: React.FC<{children:React.ReactNode;tone?:string;style?:React.CSSProperties}> = ({children,tone=C.cyan,style}) => <div style={{borderRadius:24,background:'linear-gradient(145deg,rgba(14,35,50,.94),rgba(7,18,29,.9))',border:`1px solid ${tone}55`,boxShadow:`0 28px 90px rgba(0,0,0,.42),inset 0 1px ${tone}24`,...style}}>{children}</div>;

export const BrowserFrame: React.FC<{src:string;url:string;label?:string;tone?:string;zoom?:number;x?:number;y?:number;style?:React.CSSProperties}> = ({src,url,label,tone=C.cyan,zoom=1,x=0,y=0,style}) => <div style={{borderRadius:22,overflow:'hidden',background:'#fff',border:`1px solid ${tone}77`,boxShadow:'0 35px 110px rgba(0,0,0,.58)',...style}}>
  <div style={{height:50,display:'flex',alignItems:'center',gap:8,padding:'0 16px',background:'#07121d',borderBottom:`1px solid ${C.panelBorder}`}}>
    {[C.failure,C.warning,C.pass].map(color=><span key={color} style={{width:11,height:11,borderRadius:9,background:color}}/>)}
    <div style={{marginLeft:12,flex:1,minWidth:0,padding:'7px 12px',borderRadius:8,background:'#102638',fontFamily:THEME.fonts.mono,fontSize:14,color:'#b8d4dc',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{url}</div>
    {label&&<Badge tone={tone}>{label}</Badge>}
  </div>
  <div style={{height:'calc(100% - 50px)',overflow:'hidden',background:'#f7fafc'}}><Img src={staticFile(src)} style={{width:'100%',height:'100%',objectFit:'contain',transform:`translate(${x}px,${y}px) scale(${zoom})`,transformOrigin:'center'}}/></div>
</div>;

export const CaptionTrack: React.FC<{sceneId:keyof typeof wordTimings.scenes;reserveBottom?:number}> = ({sceneId,reserveBottom=104}) => <KaraokeCaptions words={wordTimings.scenes[sceneId].words} reserveBottom={reserveBottom}/>;

export const KineticWord: React.FC<{children:React.ReactNode;start:number;left:number;top:number;tone?:string;size?:number;exit?:number}> = ({children,start,left,top,tone=C.ice,size=88,exit}) => {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  const p=spring({frame:frame-start,fps,config:{damping:14,stiffness:125,mass:.7}});
  const out=exit===undefined?1:1-ease(frame,exit,exit+14);
  return <div style={{position:'absolute',left,top,fontFamily:THEME.fonts.primary,fontSize:size,fontWeight:900,letterSpacing:'-.06em',lineHeight:.88,color:tone,opacity:p*out,transform:`translateY(${(1-p)*70}px) rotate(${(1-p)*-3}deg) scale(${.82+p*.18})`,textShadow:`0 0 42px ${tone}28`}}>{children}</div>;
};

export const CountUp: React.FC<{value:number;start:number;suffix?:string;tone?:string;size?:number}> = ({value,start,suffix='',tone=C.pass,size=74}) => {
  const frame=useCurrentFrame(); const shown=Math.round(ease(frame,start,start+28,0,value));
  return <span style={{fontFamily:THEME.fonts.primary,fontSize:size,fontWeight:900,color:tone,fontVariantNumeric:'tabular-nums'}}>{shown}{suffix}</span>;
};

export const Wipe: React.FC<{at:number;tone?:string}> = ({at,tone=C.cyan}) => {const frame=useCurrentFrame();const x=ease(frame,at-12,at+18,-1200,1200);const opacity=interpolate(frame,[at-12,at,at+18],[0,.8,0],clamp);return <div style={{position:'absolute',inset:-100,pointerEvents:'none',zIndex:65,opacity,background:`linear-gradient(90deg,transparent,${tone}55,transparent)`,transform:`translateX(${x}px) skewX(-14deg)`}}/>;};
