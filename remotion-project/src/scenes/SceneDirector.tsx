import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {KaraokeCaptions} from '../components/KaraokeCaptions';
import {SCENES} from '../constants/manifest';
import {THEME} from '../constants/theme';
import wordTimings from '../data/word-timings.json';

const C = THEME.colors;
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = (frame: number, start: number, end: number) => interpolate(frame, [start, end], [0, 1], clamp);
const CaptionTrack: React.FC<{sceneId: keyof typeof wordTimings.scenes; reserveBottom?: number}> = ({sceneId, reserveBottom}) => <KaraokeCaptions words={wordTimings.scenes[sceneId].words} reserveBottom={reserveBottom}/>;

const Grid: React.FC<{accent?: string}> = ({accent = C.cyan}) => {
  const frame = useCurrentFrame();
  return <>
    <div style={{position: 'absolute', inset: -120, opacity: .26, transform: `perspective(900px) rotateX(63deg) translateY(${150 + frame * .16}px)`, transformOrigin: 'center bottom', backgroundImage: `linear-gradient(${accent}22 1px, transparent 1px),linear-gradient(90deg,${accent}22 1px,transparent 1px)`, backgroundSize: '90px 90px'}} />
    <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at ${48 + Math.sin(frame / 90) * 8}% 38%, ${accent}22 0, transparent 38%),radial-gradient(circle at 82% 10%, #7f5af022 0, transparent 28%),linear-gradient(135deg,#07121d,#091927 54%,#07121d)`}} />
    {Array.from({length: 24}, (_, i) => <div key={i} style={{position: 'absolute', width: 4 + i % 4, height: 4 + i % 4, borderRadius: '50%', left: `${(i * 41) % 96}%`, top: `${(i * 67 + frame * (.05 + (i % 3) * .03)) % 96}%`, background: i % 5 === 0 ? '#7f5af0' : accent, opacity: .18 + (i % 4) * .08, boxShadow: `0 0 18px ${accent}`}} />)}
  </>;
};

const Header: React.FC<{eyebrow: string; title: string; tone?: string}> = ({eyebrow, title, tone = C.cyan}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = Math.max(.34, spring({frame, fps, config: {damping: 18, stiffness: 100}}));
  return <div style={{position: 'absolute', top: 68, left: 108, right: 108, opacity: p, transform: `translateY(${(1 - p) * 28}px)`, zIndex: 12}}>
    <div style={{fontFamily: THEME.fonts.mono, fontSize: 21, letterSpacing: '.16em', color: tone, fontWeight: 800, textTransform: 'uppercase'}}>{eyebrow}</div>
    <h1 style={{fontFamily: THEME.fonts.primary, fontSize: 72, lineHeight: 1.02, letterSpacing: '-.045em', color: C.ice, margin: '14px 0 0', maxWidth: 1420}}>{title}</h1>
  </div>;
};

const Footer: React.FC<{label: string; url?: string; badge?: string}> = ({label, url, badge}) => <div style={{position: 'absolute', left: 106, right: 106, bottom: 30, minHeight: 54, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, borderRadius: 13, background: 'rgba(4,12,20,.9)', border: `1px solid ${C.panelBorderMuted}`, zIndex: 70}}>
  <span style={{fontFamily: THEME.fonts.primary, color: C.muted, fontSize: 18, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{label}</span>
  <span style={{fontFamily: THEME.fonts.mono, color: C.cyan, fontSize: 16, maxWidth: '49%', textAlign: 'right', lineHeight: 1.2}}>{badge ?? url?.replace('https://', '')}</span>
</div>;

const Pill: React.FC<{children: React.ReactNode; tone?: string}> = ({children, tone = C.cyan}) => <div style={{padding: '10px 18px', borderRadius: 999, color: tone, background: `${tone}16`, border: `1px solid ${tone}66`, fontFamily: THEME.fonts.mono, fontSize: 20, fontWeight: 800, letterSpacing: '.06em'}}>{children}</div>;

const Browser: React.FC<{src: string; url: string; zoom?: number; x?: number; y?: number; label?: string}> = ({src, url, zoom = 1, x = 0, y = 0, label}) => <div style={{width: '100%', height: '100%', borderRadius: 22, overflow: 'hidden', background: '#fff', border: `1px solid ${C.panelBorder}`, boxShadow: '0 32px 100px rgba(0,0,0,.55)'}}>
  <div style={{height: 54, display: 'flex', alignItems: 'center', gap: 9, padding: '0 18px', background: '#09131e', borderBottom: `1px solid ${C.panelBorder}`}}>
    {[C.failure, C.warning, C.pass].map((color) => <span key={color} style={{width: 12, height: 12, borderRadius: 12, background: color}} />)}
    <div style={{marginLeft: 14, flex: 1, padding: '8px 14px', borderRadius: 9, background: '#102638', color: '#b8d4dc', fontFamily: THEME.fonts.mono, fontSize: 15}}>{url}</div>
    {label && <Pill>{label}</Pill>}
  </div>
  <div style={{height: 'calc(100% - 54px)', overflow: 'hidden', background: '#f7fafc'}}>
    <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'contain', transform: `translate(${x}px,${y}px) scale(${zoom})`, transformOrigin: 'center center'}} />
  </div>
</div>;

const FlowPath: React.FC<{failed?: boolean; corrected?: boolean; progress: number}> = ({failed, corrected, progress}) => {
  const tone = failed ? C.failure : corrected ? C.pass : C.warning;
  return <div style={{position: 'relative', width: 1420, height: 350}}>
    <svg viewBox="0 0 1420 350" width="1420" height="350" style={{position: 'absolute', inset: 0}}>
      <defs><filter id="glow"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <path d="M150 175 C370 175 360 85 585 85 S820 175 940 175 S1160 175 1280 175" fill="none" stroke="#28485d" strokeWidth="12" strokeLinecap="round" />
      <path d="M150 175 C370 175 360 265 585 265 S820 175 940 175" fill="none" stroke="#28485d" strokeWidth="12" strokeLinecap="round" opacity={failed ? 1 : .35} />
      <path d="M150 175 C370 175 360 85 585 85 S820 175 940 175 S1160 175 1280 175" fill="none" stroke={tone} strokeWidth="7" strokeLinecap="round" strokeDasharray="1500" strokeDashoffset={1500 * (1 - progress)} filter="url(#glow)" />
      {failed && <path d="M150 175 C370 175 360 265 585 265 S820 175 940 175" fill="none" stroke={tone} strokeWidth="7" strokeLinecap="round" strokeDasharray="1100" strokeDashoffset={1100 * (1 - progress)} filter="url(#glow)" />}
      {corrected && <rect x="500" y="120" width="200" height="110" rx="24" fill="#0b2a29" stroke={C.pass} strokeWidth="3" />}
    </svg>
    {[{x: 80,t:'REQUEST A'},{x: 80,t:'REQUEST B'},{x: 1180,t:failed?'2 EFFECTS':'1 EFFECT'}].map((n,i) => <div key={n.t} style={{position: 'absolute', left: n.x, top: i === 1 ? 245 : 155, transform: 'translateY(-50%)', width: 170, padding: '16px 10px', textAlign: 'center', borderRadius: 16, background: '#0c1d2b', border: `2px solid ${i === 2 ? tone : C.cyan}`, color: i === 2 ? tone : C.ice, fontFamily: THEME.fonts.mono, fontSize: 18, fontWeight: 900}}>{n.t}</div>)}
    {corrected && <div style={{position: 'absolute', left: 510, top: 144, width: 180, textAlign: 'center', color: C.pass, fontFamily: THEME.fonts.mono, fontSize: 18, fontWeight: 900}}>RESERVE KEY<br/><span style={{fontSize: 14, color: C.muted}}>before await</span></div>}
  </div>;
};

const ScreenshotScene: React.FC<{index: number; src: string; url: string; label?: string; zoom?: number}> = ({index, src, url, label, zoom = 1}) => {
  const frame = useCurrentFrame(); const scene = SCENES[index];
  const p = .25 + ease(frame, 20, 75) * .75; const drift = interpolate(frame, [0, scene.durationInFrames], [-8, 8], clamp);
  return <AbsoluteFill style={{overflow: 'hidden'}}><Grid/><Header eyebrow={`${scene.id} · authentic product evidence`} title={scene.name} />
    <div style={{position: 'absolute', left: 130, right: 130, top: 220, height: 630, opacity: p, transform: `perspective(1400px) rotateX(${(1-p)*5}deg) rotateY(${(1-p)*-8}deg) translateY(${(1-p)*40}px) scale(${.95 + p*.05})`}}>
      <Browser src={src} url={url} label={label} zoom={zoom} x={drift}/>
    </div>
    <CaptionTrack sceneId={scene.id as keyof typeof wordTimings.scenes} reserveBottom={105}/><Footer label={scene.citationLabel ?? scene.name} url={scene.sourceUrls[0]}/>
  </AbsoluteFill>;
};

export const VerificationLabVisual: React.FC<{duration: number; pilot?: boolean}> = ({duration, pilot = false}) => {
  const frame = useCurrentFrame();
  const switchFrame = pilot ? 345 : 447;
  const corrected = frame >= switchFrame;
  const local = corrected ? frame - switchFrame : frame;
  const progress = corrected ? ease(local, 8, pilot ? 78 : 125) : ease(frame, pilot ? 82 : 90, pilot ? 195 : 205);
  const tone = corrected ? C.pass : C.failure;
  const failShotStart = pilot ? 205 : 210;
  const correctedShotLocal = pilot ? 75 : 66;
  const failShotOpacity = ease(frame, failShotStart, failShotStart + 22) * (1 - ease(frame, switchFrame - 20, switchFrame + 8));
  const correctedShotOpacity = corrected ? ease(local, correctedShotLocal, correctedShotLocal + 25) : 0;
  const showEndPlate = pilot && frame >= 520;
  const camera = pilot ? interpolate(frame, [0, duration], [1.035, 1], clamp) : 1;
  return <AbsoluteFill style={{overflow: 'hidden'}}><Grid accent={tone}/>
    <div style={{position:'absolute',inset:0,transform:`scale(${camera})`}}>
      <Header eyebrow={`${pilot ? 'V2 proof sample' : 'S08 · controlled verification lab'} · first-party synthetic fixture only`} title={corrected ? 'Reserve first. Then perform the work.' : 'Two retries enter the same race window.'} tone={tone}/>
      <div style={{position: 'absolute', left: 250, top: 300, opacity: corrected ? 1 - correctedShotOpacity : 1 - failShotOpacity, transform: `scale(${.94 + progress*.06})`}}><FlowPath failed={!corrected} corrected={corrected} progress={progress}/></div>
      <div style={{position: 'absolute', left: 180, right: 180, top: 250, height: 570, opacity: failShotOpacity, transform: `translateY(${interpolate(frame, [failShotStart, failShotStart + 28], [35,0], clamp)}px) scale(${.985 + failShotOpacity*.015})`}}>
        <Browser src="flowguard/lab-vulnerable-evidence.webp" url="flowguard-ai-smoky.vercel.app/lab · controlled fixture" label="VERIFIED FAIL"/>
      </div>
      <div style={{position: 'absolute', left: 180, right: 180, top: 250, height: 570, opacity: correctedShotOpacity, transform: `translateY(${interpolate(local, [correctedShotLocal, correctedShotLocal + 28], [35,0], clamp)}px) scale(${.985 + correctedShotOpacity*.015})`}}>
        <Browser src="flowguard/lab-corrected-evidence.webp" url="flowguard-ai-smoky.vercel.app/lab · controlled fixture" label="VERIFIED PASS"/>
      </div>
    </div>
    <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:interpolate(frame,[switchFrame-10,switchFrame,switchFrame+16],[0,.72,0],clamp),background:`linear-gradient(90deg,transparent,${C.cyan}44,transparent)`,transform:`translateX(${interpolate(frame,[switchFrame-10,switchFrame+16],[-900,900],clamp)}px) skewX(-12deg)`}}/>
    <div style={{position: 'absolute', right: 130, top: 184}}><Pill tone={tone}>{corrected ? '2 ATTEMPTS → 1 EFFECT' : '2 ATTEMPTS → 2 EFFECTS'}</Pill></div>
    {showEndPlate && <div style={{position:'absolute',left:480,right:480,top:300,bottom:190,display:'grid',placeItems:'center',textAlign:'center',borderRadius:30,background:'rgba(5,19,27,.96)',border:`2px solid ${C.pass}`,boxShadow:`0 0 90px ${C.pass}44`,opacity:ease(frame,520,540),transform:`scale(${interpolate(frame,[520,550],[.92,1],clamp)})`,zIndex:45}}><div><div style={{fontFamily:THEME.fonts.mono,fontSize:20,letterSpacing:'.15em',color:C.pass}}>CONTROLLED RESULT</div><div style={{fontFamily:THEME.fonts.primary,fontSize:62,fontWeight:900,color:C.ice,marginTop:18}}>2 attempts → 1 effect</div><div style={{fontFamily:THEME.fonts.mono,fontSize:18,color:C.muted,marginTop:22}}>FIRST-PARTY SYNTHETIC FIXTURE · REPRODUCIBLE</div></div></div>}
    {!pilot && <CaptionTrack sceneId="S08"/>}<Footer label="Controlled Verification Lab · no live banking integration" badge="FIRST-PARTY SYNTHETIC FIXTURE ONLY"/>
  </AbsoluteFill>;
};

const ConceptScene: React.FC<{index: number}> = ({index}) => {
  const frame = useCurrentFrame(); const scene = SCENES[index]; const p = .28 + ease(frame, 15, 90) * .72;
  if (index === 0) return <AbsoluteFill style={{overflow:'hidden'}}><Grid/><div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', transform:`scale(${.85 + p*.15})`}}><div style={{fontFamily:THEME.fonts.mono,color:C.cyan,fontSize:20,letterSpacing:'.22em'}}>ONE LOGICAL ACTION</div><h1 style={{margin:'22px 0',fontFamily:THEME.fonts.primary,fontSize:104,lineHeight:.95,letterSpacing:'-.055em',color:C.ice,textAlign:'center'}}>WHEN ONE PATH<br/><span style={{color:C.failure}}>BECOMES TWO</span></h1><FlowPath failed progress={ease(frame,75,260)}/></div><CaptionTrack sceneId="S01"/><Footer label="Conceptual illustration · no real transaction shown" badge="CAUSE UNVERIFIED"/></AbsoluteFill>;
  if (index === 1) return <AbsoluteFill style={{overflow:'hidden'}}><Grid accent={C.warning}/><Header eyebrow="S02 · public user report · November 2025" title="A balance changed. The purchase did not appear." tone={C.warning}/><div style={{position:'absolute',left:180,right:180,top:300,display:'grid',gridTemplateColumns:'1fr 100px 1fr',alignItems:'center',gap:30,opacity:p}}><div style={cardStyle}><Pill tone={C.warning}>REPORTED</Pill><strong style={bigStyle}>QRIS-funded purchase</strong><span style={bodyStyle}>Mobile banking balance reportedly decreased.</span></div><div style={{fontSize:64,color:C.warning,textAlign:'center'}}>→</div><div style={cardStyle}><Pill tone={C.failure}>CANCELLED</Pill><strong style={bigStyle}>Purchase never appeared</strong><span style={bodyStyle}>Google Play reportedly marked it cancelled.</span></div></div><CaptionTrack sceneId="S02"/><Footer label={scene.citationLabel ?? ''} url={scene.sourceUrls[0]}/></AbsoluteFill>;
  if (index === 2) return <AbsoluteFill style={{overflow:'hidden'}}><Grid accent={C.warning}/><Header eyebrow="S03 · evidence boundary" title="Unavailable funds are not proof of two settled charges." tone={C.warning}/><div style={{position:'absolute',left:210,right:210,top:330,display:'grid',gap:34,opacity:p}}><Track label="VISIBLE BALANCE" tone={C.cyan} width={ease(frame,60,200)*.72}/><Track label="POSSIBLE AUTHORIZATION HOLD" tone={C.warning} width={ease(frame,120,290)*.45}/><div style={{display:'flex',gap:20}}><Pill tone={C.warning}>POSSIBLE HOLD</Pill><Pill tone={C.muted}>SETTLEMENT NOT VERIFIED</Pill></div></div><CaptionTrack sceneId="S03"/><Footer label={scene.citationLabel ?? ''} url={scene.sourceUrls[0]}/></AbsoluteFill>;
  if (index === 3) return <AbsoluteFill style={{overflow:'hidden'}}><Grid accent={C.warning}/><Header eyebrow="S04 · Medusa issue #16681 · conditional risk" title="A changed key can turn a retry into a new operation." tone={C.warning}/><div style={{position:'absolute',left:250,top:335}}><FlowPath failed progress={ease(frame,60,300)}/></div><div style={{position:'absolute',right:160,top:235}}><Pill tone={C.warning}>IF FIRST RESPONSE WAS LOST</Pill></div><CaptionTrack sceneId="S04"/><Footer label={scene.citationLabel ?? ''} url={scene.sourceUrls[0]}/></AbsoluteFill>;
  if (index === 4) return <AbsoluteFill style={{overflow:'hidden'}}><Grid/><Header eyebrow="S05 · engineering invariant" title="One logical operation. At most one committed effect."/><div style={{position:'absolute',left:260,right:260,top:360,display:'grid',gridTemplateColumns:'1fr 180px 1fr',alignItems:'center',gap:26,opacity:p}}><InvariantNode title="LOGICAL OPERATION" detail="same intent + stable key" tone={C.cyan}/><div style={{height:4,background:`linear-gradient(90deg,${C.cyan},${C.pass})`,boxShadow:`0 0 22px ${C.cyan}`}}/><InvariantNode title="≤ 1 EFFECT" detail="retries return the same result" tone={C.pass}/></div><CaptionTrack sceneId="S05"/><Footer label={scene.citationLabel ?? ''} url={scene.sourceUrls[0]}/></AbsoluteFill>;
  if (index === 10) return <AbsoluteFill style={{overflow:'hidden'}}><Grid/><div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',opacity:p}}><div style={{width:116,height:116,borderRadius:30,border:`3px solid ${C.cyan}`,display:'grid',placeItems:'center',boxShadow:`0 0 80px ${C.cyanGlow}`,fontSize:58}}>✓</div><h1 style={{fontFamily:THEME.fonts.primary,fontSize:102,letterSpacing:'-.05em',color:C.ice,margin:'30px 0 6px'}}>FlowGuard AI</h1><div style={{fontFamily:THEME.fonts.primary,fontSize:42,color:C.cyan}}>EVIDENCE BEFORE VERDICTS</div><div style={{marginTop:62,fontFamily:THEME.fonts.mono,fontSize:29,color:'#fff'}}>flowguard-ai-smoky.vercel.app</div></div><CaptionTrack sceneId="S11"/><Footer label="Public product demo" url={scene.sourceUrls[0]}/></AbsoluteFill>;
  return null;
};

const cardStyle: React.CSSProperties = {height:310,padding:38,borderRadius:26,display:'flex',flexDirection:'column',gap:25,background:'rgba(12,29,43,.92)',border:`1px solid ${C.panelBorder}`,boxShadow:'0 24px 80px rgba(0,0,0,.45)'};
const bigStyle: React.CSSProperties = {fontFamily:THEME.fonts.primary,fontSize:43,lineHeight:1.1,color:C.ice};
const bodyStyle: React.CSSProperties = {fontFamily:THEME.fonts.primary,fontSize:27,lineHeight:1.35,color:C.muted};
const Track: React.FC<{label:string;tone:string;width:number}> = ({label,tone,width}) => <div><div style={{fontFamily:THEME.fonts.mono,fontSize:19,color:tone,marginBottom:10}}>{label}</div><div style={{height:44,borderRadius:22,background:'#132838',overflow:'hidden'}}><div style={{height:'100%',width:`${width*100}%`,borderRadius:22,background:`linear-gradient(90deg,${tone}55,${tone})`,boxShadow:`0 0 30px ${tone}`}}/></div></div>;
const InvariantNode: React.FC<{title:string;detail:string;tone:string}> = ({title,detail,tone}) => <div style={{padding:'42px 30px',textAlign:'center',borderRadius:28,background:'#0c1d2b',border:`2px solid ${tone}`,boxShadow:`0 0 55px ${tone}33`}}><div style={{fontFamily:THEME.fonts.primary,fontSize:42,fontWeight:900,color:tone}}>{title}</div><div style={{fontFamily:THEME.fonts.mono,fontSize:20,color:C.muted,marginTop:14}}>{detail}</div></div>;

const PipelineScene: React.FC = () => {const frame=useCurrentFrame();const scene=SCENES[6];return <AbsoluteFill style={{overflow:'hidden'}}><Grid/><Header eyebrow="S07 · read → reason → propose" title="Three agents turn a rule into testable expectations."/><div style={{position:'absolute',left:110,top:260,width:650,height:530,transform:`translateX(${interpolate(frame,[0,scene.durationInFrames],[-15,15],clamp)}px)`}}><Browser src="flowguard/analysis-risk-results.webp" url="flowguard-ai-smoky.vercel.app/analysis" label="POTENTIAL"/></div><div style={{position:'absolute',left:830,right:110,top:292,display:'grid',gap:24}}>{[['A','REQUIREMENT ANALYST','extract invariant'],['B','RISK HUNTER','identify possible path'],['C','VERIFICATION PLANNER','propose assertions']].map((r,i)=><div key={r[0]} style={{display:'grid',gridTemplateColumns:'78px 1fr',gap:22,alignItems:'center',padding:'22px 28px',borderRadius:20,background:'#0c1d2bea',border:`1px solid ${i===1?C.warning:C.panelBorder}`,opacity:ease(frame,70+i*75,120+i*75),transform:`translateX(${interpolate(frame,[70+i*75,125+i*75],[50,0],clamp)}px)`}}><div style={{width:66,height:66,borderRadius:18,display:'grid',placeItems:'center',background:i===1?`${C.warning}22`:`${C.cyan}18`,color:i===1?C.warning:C.cyan,fontFamily:THEME.fonts.mono,fontSize:28,fontWeight:900}}>{r[0]}</div><div><div style={{fontFamily:THEME.fonts.mono,fontSize:22,color:C.ice,fontWeight:900}}>{r[1]}</div><div style={{fontFamily:THEME.fonts.primary,fontSize:24,color:C.muted,marginTop:5}}>{r[2]}</div></div></div>)}</div><CaptionTrack sceneId="S07"/><Footer label={scene.citationLabel??''} url={scene.sourceUrls[0]} badge="EXTERNAL FINDINGS: POTENTIAL · NOT EXECUTED"/></AbsoluteFill>};

const EvidenceScoreScene: React.FC<{index:8|9}> = ({index}) => {
  const frame=useCurrentFrame();
  const scene=SCENES[index];
  const testsprite=index===8;
  const metrics = testsprite ? [['97 / 97','FINAL REPORT · PASSED'],['0','FINAL REPORT · FAILED'],['0','FINAL REPORT · BLOCKED'],['0f575c33','PR #14 FINAL HEAD']] : [['118 / 118','VITEST'],['70 / 70','CHROMIUM PLAYWRIGHT'],['dd00c0b','MAIN MERGE SHA']];
  return <AbsoluteFill style={{overflow:'hidden'}}><Grid accent={C.pass}/><Header eyebrow={`${scene.id} · ${testsprite?'vendor PR verification':'post-merge independent CI'}`} title={testsprite?'Final report: 97 passed. 0 failed. 0 blocked.':'118 Vitest + 70 Chromium Playwright.'} tone={C.pass}/>
    <div style={{position:'absolute',left:130,top:250,width:1000,height:570,transform:`translateX(${interpolate(frame,[0,scene.durationInFrames],[-10,10],clamp)}px)`}}><Browser src={testsprite?'source-originals/testsprite-official-results-1.png':'source-originals/github-actions-regression-tests.png'} url={testsprite?'Historical run · 2026-10-25 · execution a1c6ffa8…':'github.com/allfridhosaragii/FlowGuard-AI/actions/runs/40273469302'} label={testsprite?'HISTORICAL 97/97':'MAIN CI'}/></div>
    <div style={{position:'absolute',right:115,top:testsprite?250:300,width:570,display:'grid',gap:testsprite?13:24,opacity:ease(frame,70,150)}}>
      {testsprite && <div style={{padding:'15px 22px',borderRadius:16,background:`${C.cyan}15`,border:`1px solid ${C.cyan}77`}}><div style={{fontFamily:THEME.fonts.mono,fontSize:16,color:C.cyan,fontWeight:900}}>FINAL OFFICIAL V3 REPORT</div><div style={{fontFamily:THEME.fonts.mono,fontSize:14,color:C.muted,marginTop:6}}>execution 901e7027… · linked below</div></div>}
      {metrics.map(([a,b])=><div key={b} style={{padding:testsprite?'13px 24px':'20px 26px',borderRadius:18,background:'#0b211f',border:`1px solid ${C.pass}66`}}><div style={{fontFamily:THEME.fonts.primary,fontSize:testsprite?35:42,fontWeight:900,color:C.pass}}>{a}</div><div style={{fontFamily:THEME.fonts.mono,fontSize:15,color:C.muted,marginTop:3}}>{b}</div></div>)}
    </div>
    <CaptionTrack sceneId={testsprite?'S09':'S10'}/><Footer label={scene.citationLabel??''} url={scene.sourceUrls[0]} badge={testsprite?'SCREENSHOT: HISTORICAL · FINAL: LINKED REPORT':'CHROMIUM ONLY · OTHER BROWSERS NOT CLAIMED'}/>
  </AbsoluteFill>;
};

export const SceneDirector: React.FC<{sceneIndex:number}> = ({sceneIndex}) => {
  if (sceneIndex <= 4 || sceneIndex === 10) return <ConceptScene index={sceneIndex}/>;
  if (sceneIndex === 5) return <ScreenshotScene index={5} src="flowguard/homepage-desktop.webp" url="flowguard-ai-smoky.vercel.app" label="LIVE PRODUCT UI"/>;
  if (sceneIndex === 6) return <PipelineScene/>;
  if (sceneIndex === 7) return <VerificationLabVisual duration={SCENES[7].durationInFrames}/>;
  if (sceneIndex === 8 || sceneIndex === 9) return <EvidenceScoreScene index={sceneIndex}/>;
  return null;
};
