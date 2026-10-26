import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Badge,C,CaptionTrack,EvidenceFooter,GlassPanel,SceneFrame,SceneTitle,ScopeRibbon,ease,windowed} from '../CinematicKit';

export const S02QrisReport:React.FC=()=>{const f=useCurrentFrame();const paper=ease(f,16,65);const ledger=windowed(f,105,390,24);const verdict=ease(f,480,570);return <SceneFrame accent={C.warning}>
  <SceneTitle eyebrow="S02 · public user report · November 2025" title={f<480?'A reported purchase never appeared.':'Experience documented. Cause unverified.'} tone={C.warning} compact/>
  <ScopeRibbon tone={C.warning}>PUBLIC REPORT · NOT A TECHNICAL DIAGNOSIS</ScopeRibbon>
  <GlassPanel tone={C.warning} style={{position:'absolute',left:130,top:220,width:590,height:575,padding:38,opacity:paper*(1-ease(f,330,390)),transform:`translateX(${(1-paper)*-90}px) rotateY(${(1-paper)*8}deg)`,transformOrigin:'left center'}}>
    <Badge tone={C.warning}>SOURCE NOTE</Badge><div style={{fontFamily:'Georgia,serif',fontSize:42,lineHeight:1.08,marginTop:30}}>A QRIS-funded app purchase was publicly described.</div>
    <div style={{height:1,background:`${C.warning}55`,margin:'28px 0'}}/><div style={{fontFamily:'monospace',fontSize:20,lineHeight:1.7,color:C.muted}}>r/indotech<br/>NOVEMBER 2025<br/>AMOUNT NOT SPECIFIED<br/>PERSONAL DETAILS OMITTED</div>
  </GlassPanel>
  <div style={{position:'absolute',left:790,right:130,top:250,height:500,opacity:ledger,display:'grid',gridTemplateRows:'1fr 70px 1fr',alignItems:'center'}}>
    <GlassPanel tone={C.cyan} style={{padding:'28px 34px',transform:`translateX(${(1-ease(f,110,160))*90}px)`}}><Badge>REPORTED</Badge><div style={{fontSize:42,fontWeight:850,marginTop:18}}>Mobile balance decreased</div><div style={{fontSize:22,color:C.muted,marginTop:10}}>Observed by the customer</div></GlassPanel>
    <div style={{position:'relative',height:70}}><div style={{position:'absolute',left:55,right:55,top:33,height:4,background:`linear-gradient(90deg,${C.cyan},${C.warning})`}}/><div style={{position:'absolute',left:`${ease(f,175,260,8,82)}%`,top:21,width:28,height:28,borderRadius:20,background:C.warning,boxShadow:`0 0 30px ${C.warning}`}}/></div>
    <GlassPanel tone={C.failure} style={{padding:'28px 34px',transform:`translateX(${(1-ease(f,235,295))*90}px)`}}><Badge tone={C.failure}>CANCELLED</Badge><div style={{fontSize:42,fontWeight:850,marginTop:18}}>Purchase never appeared</div><div style={{fontSize:22,color:C.muted,marginTop:10}}>Google Play reportedly marked it cancelled</div></GlassPanel>
  </div>
  <div style={{position:'absolute',left:230,right:230,top:310,height:340,display:'grid',placeItems:'center',textAlign:'center',opacity:verdict,transform:`scale(${.86+verdict*.14})`}}><div><div style={{fontSize:78,fontWeight:900,letterSpacing:'-.055em'}}>CAUSE <span style={{color:C.warning}}>UNVERIFIED</span></div><div style={{fontSize:28,color:C.muted,marginTop:25}}>The report establishes an experience—not concurrency, settlement, or root cause.</div></div></div>
  <CaptionTrack sceneId="S02"/><EvidenceFooter label="Reddit r/indotech · Nov 2025 · public report" badge="CAUSE UNVERIFIED" tone={C.warning}/>
</SceneFrame>};
