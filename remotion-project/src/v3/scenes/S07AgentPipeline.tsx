import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Badge,BrowserFrame,C,CaptionTrack,EvidenceFooter,GlassPanel,SceneFrame,SceneTitle,ScopeRibbon,Wipe,ease,windowed} from '../CinematicKit';

const agents=[['A','REQUIREMENT ANALYST','extract invariant',C.cyan],['B','RISK HUNTER','identify possible path',C.warning],['C','VERIFICATION PLANNER','propose assertions',C.pass]] as const;
export const S07AgentPipeline:React.FC=()=>{const f=useCurrentFrame();const input=windowed(f,0,220,24);const pipeline=windowed(f,180,690,28);const boundary=ease(f,705,790);return <SceneFrame accent={C.cyan}>
  <SceneTitle eyebrow="S07 · read → reason → propose" title={f<180?'Start with code—and the rule that matters.':f<705?'Three agents pass the evidence baton.':'POTENTIAL is not VERIFIED.'} compact/>
  <ScopeRibbon>EXTERNAL CODE IS READ, NOT EXECUTED</ScopeRibbon>
  <div style={{position:'absolute',left:170,right:170,top:220,height:610,opacity:input,transform:`scale(${.95+ease(f,20,75)*.05})`}}><BrowserFrame src="flowguard/analysis-workspace.webp" url="flowguard-ai-smoky.vercel.app/analysis" label="INPUT WORKSPACE"/></div>
  <div style={{position:'absolute',left:110,right:110,top:250,height:520,opacity:pipeline}}>
    <div style={{position:'absolute',left:0,width:580,height:500,transform:`translateX(${ease(f,190,250,-80,0)}px)`}}><BrowserFrame src="flowguard/analysis-risk-results.webp" url="authentic FlowGuard analysis result" label="POTENTIAL"/></div>
    <div style={{position:'absolute',left:650,right:0,top:5,display:'grid',gap:20}}>{agents.map(([letter,name,detail,tone],i)=>{const p=ease(f,270+i*115,320+i*115);const baton=ease(f,320+i*115,380+i*115);return <GlassPanel key={letter} tone={tone} style={{height:118,padding:'18px 24px',display:'grid',gridTemplateColumns:'78px 1fr 42px',gap:18,alignItems:'center',opacity:p,transform:`translateX(${(1-p)*90}px)`}}><div style={{width:62,height:62,borderRadius:18,display:'grid',placeItems:'center',fontFamily:'monospace',fontSize:28,fontWeight:900,color:tone,background:`${tone}18`,border:`1px solid ${tone}77`}}>{letter}</div><div><div style={{fontFamily:'monospace',fontWeight:900,fontSize:20}}>{name}</div><div style={{fontSize:22,color:C.muted,marginTop:6}}>{detail}</div></div><div style={{width:24,height:24,borderRadius:20,background:tone,opacity:baton,boxShadow:`0 0 28px ${tone}`}}/></GlassPanel>})}</div>
    <div style={{position:'absolute',left:1210,top:120,width:5,height:260,background:`linear-gradient(${C.cyan},${C.warning},${C.pass})`,opacity:ease(f,330,620)}}/>
  </div>
  <div style={{position:'absolute',left:260,right:260,top:300,height:290,display:'grid',placeItems:'center',opacity:boundary,transform:`scale(${.88+boundary*.12})`}}><GlassPanel tone={C.warning} style={{padding:'45px 65px',textAlign:'center'}}><Badge tone={C.warning}>EVIDENCE CATEGORY</Badge><div style={{fontSize:88,fontWeight:900,color:C.warning,letterSpacing:'-.055em',marginTop:18}}>POTENTIAL</div><div style={{fontSize:26,color:C.muted}}>Proposed investigation—not executed third-party proof.</div></GlassPanel></div>
  <Wipe at={700} tone={C.warning}/><CaptionTrack sceneId="S07"/><EvidenceFooter label="FlowGuard three-agent pipeline · authentic product screenshot" badge="POTENTIAL · NOT EXECUTED" tone={C.warning}/>
</SceneFrame>};
