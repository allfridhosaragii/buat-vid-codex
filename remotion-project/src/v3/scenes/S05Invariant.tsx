import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Badge,C,CaptionTrack,EvidenceFooter,GlassPanel,SceneFrame,SceneTitle,ease} from '../CinematicKit';

export const S05Invariant:React.FC=()=>{const f=useCurrentFrame();const gate=ease(f,115,190);const effect=ease(f,210,285);const docs=ease(f,350,420);return <SceneFrame accent={C.cyan}>
  <SceneTitle eyebrow="S05 · engineering invariant" title={f<350?'One logical operation. At most one effect.':'Retries should return the same result.'} compact/>
  <div style={{position:'absolute',left:150,right:150,top:310,height:330,opacity:1-ease(f,345,390)}}>
    <GlassPanel style={{position:'absolute',left:0,top:70,width:360,padding:'36px 25px',textAlign:'center',transform:`scale(${.85+ease(f,20,80)*.15})`}}><Badge>LOGICAL INTENT</Badge><div style={{fontSize:40,fontWeight:900,marginTop:20}}>ONE OPERATION</div><div style={{fontFamily:'monospace',fontSize:16,color:C.muted,marginTop:12}}>same key · same amount</div></GlassPanel>
    <div style={{position:'absolute',left:360,right:360,top:154,height:6,background:'#24475a',overflow:'hidden'}}><div style={{width:`${ease(f,70,250)*100}%`,height:'100%',background:`linear-gradient(90deg,${C.cyan},${C.pass})`,boxShadow:`0 0 25px ${C.cyan}`}}/></div>
    <GlassPanel tone={C.warning} style={{position:'absolute',left:'50%',top:25,width:300,padding:'26px 20px',textAlign:'center',transform:`translateX(-50%) scale(${.8+gate*.2})`,opacity:gate}}><Badge tone={C.warning}>IDEMPOTENCY GATE</Badge><div style={{fontFamily:'monospace',fontSize:18,color:C.muted,marginTop:14}}>reserve before async work</div></GlassPanel>
    <GlassPanel tone={C.pass} style={{position:'absolute',right:0,top:70,width:360,padding:'36px 25px',textAlign:'center',transform:`scale(${.85+effect*.15})`,opacity:effect}}><Badge tone={C.pass}>COMMITTED EFFECT</Badge><div style={{fontSize:52,fontWeight:900,color:C.pass,marginTop:18}}>≤ 1</div><div style={{fontFamily:'monospace',fontSize:16,color:C.muted,marginTop:8}}>retries reuse the result</div></GlassPanel>
  </div>
  <GlassPanel tone={C.cyan} style={{position:'absolute',left:250,right:250,top:285,height:350,padding:'40px 55px',opacity:docs,transform:`perspective(1000px) rotateX(${(1-docs)*9}deg) translateY(${(1-docs)*50}px)`}}><Badge>STRIPE API DOCUMENTATION</Badge><div style={{fontSize:62,fontWeight:900,letterSpacing:'-.05em',marginTop:28}}>Idempotency protects<br/><span style={{color:C.cyan}}>business behavior</span>.</div><div style={{fontSize:25,color:C.muted,lineHeight:1.45,marginTop:25,maxWidth:1050}}>The test is not merely “did the code execute?” It is “did the invariant survive the retry?”</div></GlassPanel>
  <CaptionTrack sceneId="S05"/><EvidenceFooter label="docs.stripe.com/api/idempotent_requests" badge="ENGINEERING PRINCIPLE"/>
</SceneFrame>};
