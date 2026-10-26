import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Badge,BrowserFrame,C,CaptionTrack,CountUp,EvidenceFooter,GlassPanel,SceneFrame,SceneTitle,ScopeRibbon,ease,windowed} from '../CinematicKit';

export const S10PostmergeCI:React.FC=()=>{const f=useCurrentFrame();const shot=windowed(f,0,210,18);const scores=ease(f,110,175);const close=ease(f,235,285);return <SceneFrame accent={C.pass}>
  <SceneTitle eyebrow="S10 · post-merge independent CI" title={f<235?'Two suites. One verifiable main run.':'Evidence links back to source.'} tone={C.pass} compact/>
  <ScopeRibbon tone={C.warning}>CHROMIUM ONLY · NO ALL-BROWSER CLAIM</ScopeRibbon>
  <div style={{position:'absolute',left:110,top:220,width:1080,height:590,opacity:shot,transform:`translateY(${ease(f,0,45,55,0)}px)`}}><BrowserFrame src="source-originals/github-actions-regression-tests.png" url="github.com/allfridhosaragii/FlowGuard-AI/actions/runs/40273469302" label="MAIN CI" tone={C.pass}/></div>
  <div style={{position:'absolute',right:105,top:270,width:590,display:'grid',gap:24,opacity:scores}}><GlassPanel tone={C.pass} style={{padding:'28px 34px'}}><Badge tone={C.pass}>UNIT TESTS</Badge><div style={{marginTop:14}}><CountUp value={118} start={120} suffix=" / 118"/></div><div style={{fontFamily:'monospace',fontSize:16,color:C.muted}}>VITEST</div></GlassPanel><GlassPanel tone={C.cyan} style={{padding:'28px 34px'}}><Badge>BROWSER TESTS</Badge><div style={{marginTop:14}}><CountUp value={70} start={155} suffix=" / 70" tone={C.cyan}/></div><div style={{fontFamily:'monospace',fontSize:16,color:C.muted}}>CHROMIUM PLAYWRIGHT</div></GlassPanel></div>
  <div style={{position:'absolute',left:300,right:300,top:350,opacity:close}}><GlassPanel tone={C.pass} style={{padding:'40px 55px',textAlign:'center'}}><Badge tone={C.pass}>POST-MERGE MAIN</Badge><div style={{fontSize:58,fontWeight:900,marginTop:20}}>188 checks passed</div><div style={{fontFamily:'monospace',fontSize:19,color:C.muted,marginTop:14}}>main @ dd00c0b · Actions run 40273469302</div></GlassPanel></div>
  <CaptionTrack sceneId="S10"/><EvidenceFooter label="GitHub Actions run 40273469302 · main @ dd00c0b" badge="118 VITEST · 70 CHROMIUM PLAYWRIGHT" tone={C.pass}/>
</SceneFrame>};
