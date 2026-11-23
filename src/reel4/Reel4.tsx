import React from 'react';
import {AbsoluteFill,Audio,Composition,OffthreadVideo,Sequence,continueRender,delayRender,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {getInfo} from '@remotion/google-fonts/Cairo';
import captions from '../../public/reel4/captions.json';
import {ComicScene, ComicSceneKind} from './ComicScenes';
import {MoreScene, MoreSceneKind} from './MoreScenes';

const FPS=30;
const DURATION_FRAMES=1821;
const family=getInfo().fontFamily;
type Beat={start:number;end:number;clip?:number;scene?:ComicSceneKind;more?:MoreSceneKind;sourceStart?:number;zoom?:number;position?:string};
// Cuts follow the voiceover. Source offsets are in seconds within each four-second clip.
const beats:Beat[]=[
  {start:0,end:3.9,clip:1,sourceStart:0,zoom:1.04},
  {start:3.9,end:5.6,more:'jolt'},
  {start:5.6,end:8.8,clip:2,sourceStart:.3},
  {start:8.8,end:12.6,more:'surprise'},
  {start:12.6,end:15.2,scene:'title'},
  {start:15.2,end:17.75,more:'transition'},
  {start:17.75,end:20.3,scene:'meter'},
  {start:20.3,end:22.8,clip:3,sourceStart:.3},
  {start:22.8,end:25.02,more:'contraction'},
  {start:25.02,end:26.1,more:'signal'},
  {start:26.1,end:29.34,more:'fall'},
  {start:29.34,end:31.4,more:'question'},
  {start:31.4,end:34.4,scene:'mystery'},
  {start:34.4,end:37.3,more:'uncertain'},
  {start:37.3,end:40.3,clip:4,sourceStart:.3},
  {start:40.3,end:41.48,more:'factorIntro'},
  {start:41.48,end:46.64,scene:'triggers'},
  {start:46.64,end:49.84,clip:5,sourceStart:.3},
  {start:49.84,end:52.12,more:'safe'},
  {start:52.12,end:55.8,more:'sleep'},
  {start:55.8,end:58.5,more:'closer'},
  {start:58.5,end:60.7,more:'end'},
];
const badges=[
  {start:13.36,end:15.15,text:'نفضة بداية النعاس'},
  {start:29.34,end:31.4,text:'شنو السبب؟ 🤔'},
  {start:41.48,end:46.64,text:'العيا • قلة النعاس • التوتر • الكافيين'},
  {start:48.58,end:52.12,text:'عادية وما فيها حتى خطر ✓'},
];

type Caption=typeof captions[number];
const pages:Caption[][]=[];
for (let i=0;i<captions.length;i+=3) {
  const remaining=captions.length-i;
  const count=remaining===4?2:Math.min(3,remaining);
  pages.push(captions.slice(i,i+count));
  if(count!==3) i-=3-count;
}

const VisualBeat:React.FC<{beat:Beat;duration:number}> = ({beat,duration})=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const entrance=spring({frame,fps,config:{damping:22,stiffness:220,mass:.65},durationInFrames:8});
  const globalFrame=frame+Math.round(beat.start*fps);
  const impactStart=Math.round(4.8*fps);
  const impactFrame=globalFrame-impactStart;
  const shaking=beat.clip===1 && impactFrame>=0 && impactFrame<14 ? Math.sin(impactFrame*2.4)*12*(1-impactFrame/14) : 0;
  const scale=(beat.zoom??1.04)+.06*(1-entrance);
  return <AbsoluteFill style={{overflow:'hidden',background:'#5AC8FA'}}>
    <AbsoluteFill style={{transform:`translateX(${shaking}px) scale(${beat.scene||beat.more?1+.06*(1-entrance):1})`}}>
      {beat.scene ? <ComicScene kind={beat.scene} start={beat.start}/> : beat.more ? <MoreScene kind={beat.more}/> : <OffthreadVideo src={staticFile(`reel4/scene${beat.clip}.mp4`)} startFrom={Math.round((beat.sourceStart??0)*FPS)} endAt={Math.round((beat.sourceStart??0)*FPS)+duration} volume={0} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:beat.position??'center',transform:`scale(${scale})`,transformOrigin:beat.position??'center'}}/>}
    </AbsoluteFill>
    {beat.clip===1 && globalFrame>=Math.round(3.15*fps) && globalFrame<Math.round(5.65*fps) && <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position:'absolute',pointerEvents:'none',opacity:.8}}><g fill="#FFD60A" stroke="#111827" strokeWidth="5"><path d="M30 400 L140 475 L85 480 L150 550 L20 480 L75 475Z"/><path d="M1050 480 L935 530 L995 540 L925 610 L1060 540 L1000 530Z"/><path d="M35 900 L145 940 L80 955 L145 1000 L25 970 L70 950Z"/><path d="M1040 960 L940 1005 L1000 1015 L930 1070 L1050 1035 L1005 1010Z"/></g></svg>}
  </AbsoluteFill>;
};

export const Reel4:React.FC=()=>{
  const frame=useCurrentFrame();
  const {fps,durationInFrames}=useVideoConfig();
  const [fontHandle]=React.useState(()=>delayRender('Loading Cairo'));
  React.useEffect(()=>{
    const face=new FontFace(family,`url(${staticFile('reel4/fonts/Cairo.ttf')})`,{weight:'700'});
    face.load().then(font=>{document.fonts.add(font);continueRender(fontHandle);}).catch(error=>{console.error('Cairo failed to load',error);continueRender(fontHandle);});
  },[fontHandle]);
  const ms=frame/fps*1000;
  const currentPage=pages.find(words=>ms>=words[0].startMs && ms<words[words.length-1].endMs);
  const onComicScene=beats.some(beat=>(beat.scene||beat.more) && frame>=Math.round(beat.start*fps) && frame<Math.round(beat.end*fps));
  const badge=onComicScene ? undefined : badges.find(item=>frame>=Math.round(item.start*fps)&&frame<Math.round(item.end*fps));
  const badgeFrame=badge?frame-Math.round(badge.start*fps):0;
  const badgeScale=spring({frame:badgeFrame,fps,config:{damping:15,stiffness:180},durationInFrames:12});
  return <AbsoluteFill style={{background:'#112844',fontFamily:family}}>
    {beats.map(beat=>{
      const from=Math.round(beat.start*fps);
      const duration=Math.min(durationInFrames,Math.round(beat.end*fps))-from;
      return <Sequence key={`${beat.start}-${beat.clip}`} from={from} durationInFrames={duration} premountFor={fps}><VisualBeat beat={beat} duration={duration}/></Sequence>;
    })}
    <Audio src={staticFile('reel4/audio.mp3')}/>
    <div style={{position:'absolute',top:0,left:0,height:9,width:`${interpolate(frame,[0,durationInFrames-1],[0,100])}%`,background:'#FFD60A',zIndex:3}}/>
    {badge && <div dir="rtl" style={{position:'absolute',top:180,left:55,right:55,display:'flex',justifyContent:'center',zIndex:2,transform:`scale(${badgeScale})`}}><div style={{background:'#122b4a',color:'#fff',fontSize:badge.text.length>27?38:48,fontWeight:700,lineHeight:1.35,textAlign:'center',border:'4px solid #FFD60A',borderRadius:24,padding:'12px 22px',maxWidth:'100%',boxShadow:'0 6px 18px #0005'}}>{badge.text}</div></div>}
    {currentPage && <div dir="rtl" lang="ar" style={{position:'absolute',bottom:280,left:70,right:70,display:'flex',justifyContent:'center',zIndex:2}}><div style={{direction:'rtl',unicodeBidi:'plaintext',background:'rgba(8,22,40,.88)',borderRadius:22,padding:'12px 23px',fontSize:55,fontWeight:700,lineHeight:1.5,textAlign:'center',color:'#fff',textShadow:'0 3px 3px #000',maxWidth:'100%'}}>{currentPage.map((word,index)=><React.Fragment key={`${word.startMs}-${index}`}><span style={{color:ms>=word.startMs&&ms<word.endMs?'#FFD60A':'#fff'}}>{word.text}</span>{index<currentPage.length-1?' ':''}</React.Fragment>)}</div></div>}
  </AbsoluteFill>;
};
export const Reel4Composition:React.FC=()=> <Composition id="Reel4" component={Reel4} fps={FPS} width={1080} height={1920} durationInFrames={DURATION_FRAMES}/>;
