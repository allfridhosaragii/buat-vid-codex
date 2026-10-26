import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {Badge,C,CaptionTrack,EvidenceFooter,GlassPanel,SceneFrame,SceneTitle,ScopeRibbon,clamp,ease,windowed} from '../CinematicKit';

export const S03PendingHold:React.FC=()=>{const f=useCurrentFrame();const tracks=windowed(f,80,390,22);const conclusion=ease(f,380,450);return <SceneFrame accent={C.warning} camera={interpolate(f,[0,509],[1.03,1],clamp)}>
  <SceneTitle eyebrow="S03 · evidence boundary" title={f<380?'Where did the available funds go?':'Unavailable is not the same as settled twice.'} tone={C.warning} compact/>
  <ScopeRibbon tone={C.warning}>POSSIBLE AUTHORIZATION HOLD</ScopeRibbon>
  <div style={{position:'absolute',left:170,right:170,top:290,opacity:tracks}}>
    {[['VISIBLE BALANCE',C.cyan,1],['PENDING AUTHORIZATION',C.warning,.64],['SECOND SETTLED CHARGE',C.failure,.08]].map(([label,tone,target],i)=>{const width=ease(f,100+i*52,225+i*52,0,Number(target));return <div key={String(label)} style={{marginBottom:42}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><div style={{fontFamily:'monospace',fontSize:19,color:String(tone),fontWeight:850}}>{label}</div>{i===2&&<Badge tone={C.muted}>NOT ESTABLISHED</Badge>}</div><div style={{height:54,borderRadius:28,background:'#102637',overflow:'hidden',border:'1px solid #315064'}}><div style={{height:'100%',width:`${width*100}%`,borderRadius:28,background:`linear-gradient(90deg,${tone}33,${tone})`,boxShadow:`0 0 36px ${tone}`}}/></div></div>})}
    <GlassPanel tone={C.warning} style={{marginTop:12,padding:'24px 30px',display:'flex',gap:20,alignItems:'center'}}><Badge tone={C.warning}>UNCERTAINTY</Badge><div style={{fontSize:24,color:C.muted}}>A hold can make funds unavailable without proving a second settlement.</div></GlassPanel>
  </div>
  <div style={{position:'absolute',inset:'265px 150px 180px',display:'grid',placeItems:'center',opacity:conclusion,transform:`perspective(900px) rotateX(${(1-conclusion)*8}deg) scale(${.9+conclusion*.1})`}}><GlassPanel tone={C.warning} style={{padding:'52px 70px',textAlign:'center'}}><div style={{fontFamily:'monospace',fontSize:19,color:C.warning,letterSpacing:'.16em'}}>EVIDENCE LIMIT</div><div style={{fontSize:72,fontWeight:900,lineHeight:.92,letterSpacing:'-.055em',marginTop:20}}>NOT PROOF OF<br/><span style={{color:C.warning}}>TWO SETTLED CHARGES</span></div></GlassPanel></div>
  <CaptionTrack sceneId="S03"/><EvidenceFooter label="Reddit r/UberEATS · Apr 2026 · pending-hold discussion" badge="SETTLEMENT NOT VERIFIED" tone={C.warning}/>
</SceneFrame>};
