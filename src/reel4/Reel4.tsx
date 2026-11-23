import React from 'react';
import {AbsoluteFill,Audio,Composition,OffthreadVideo,Sequence,continueRender,delayRender,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {getInfo} from '@remotion/google-fonts/Cairo';
import captions from '../../public/reel4/captions.json';

const FPS=30;
const DURATION_FRAMES=1821;
const family=getInfo().fontFamily;
type Beat={start:number;end:number;clip:number;sourceStart?:number;zoom?:number;position?:string};
// Cut times follow the narration. Source offsets are in seconds and stay within each 4-second clip.
const beats:Beat[]=[
  {start:0,end:3.05,clip:1,sourceStart:.45},
  {start:3.05,end:5.55,clip:1,sourceStart:1.25,zoom:1.13},
  {start:5.55,end:7.05,clip:2,sourceStart:.4},
  {start:7.05,end:8.6,clip:1,sourceStart:2.2,zoom:1.12,position:'50% 32%'},
  {start:8.6,end:9.6,clip:1,sourceStart:2.95,zoom:1.3,position:'50% 30%'},
  {start:9.6,end:10.2,clip:1,sourceStart:3.25,zoom:1.13,position:'50% 32%'},
  {start:10.2,end:13.36,clip:3,sourceStart:.3},
  {start:13.36,end:16.36,clip:3,sourceStart:.3,zoom:1.14,position:'50% 30%'},
  {start:16.36,end:19.36,clip:3,sourceStart:.3},
  {start:19.36,end:22.36,clip:3,sourceStart:.3,zoom:1.16,position:'50% 65%'},
  {start:22.36,end:25.02,clip:3,sourceStart:.5,zoom:1.08},
  {start:25.02,end:27.92,clip:2,sourceStart:.2},
  {start:27.92,end:29.34,clip:2,sourceStart:1.2,zoom:1.12},
  {start:29.34,end:31.4,clip:1,sourceStart:1.8,zoom:1.15,position:'50% 30%'},
  {start:31.4,end:34.4,clip:3,sourceStart:.3},
  {start:34.4,end:37.4,clip:3,sourceStart:.3,zoom:1.18,position:'50% 28%'},
  {start:37.4,end:40.3,clip:4,sourceStart:.4},
  {start:40.3,end:43.3,clip:4,sourceStart:.3,zoom:1.1},
  {start:43.3,end:46.64,clip:4,sourceStart:.2,zoom:1.05},
  {start:46.64,end:49.5,clip:5,sourceStart:.3},
  {start:49.5,end:52.4,clip:5,sourceStart:.3,zoom:1.1,position:'50% 32%'},
  {start:52.4,end:55.4,clip:5,sourceStart:.25},
  {start:55.4,end:58.4,clip:5,sourceStart:.25,zoom:1.1,position:'50% 32%'},
  {start:58.4,end:60.7,clip:5,sourceStart:.8},
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

const ClipBeat:React.FC<{beat:Beat;duration:number}> = ({beat,duration})=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const pop=spring({frame,fps,config:{damping:22,stiffness:160,mass:.8},durationInFrames:12});
  const scale=(beat.zoom??1.04)+.035*pop;
  return <AbsoluteFill style={{overflow:'hidden',background:'#173255'}}>
    <OffthreadVideo src={staticFile(`reel4/scene${beat.clip}.mp4`)} startFrom={Math.round((beat.sourceStart??0)*FPS)} endAt={Math.round((beat.sourceStart??0)*FPS)+duration} volume={0} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:beat.position??'center',transform:`scale(${scale})`,transformOrigin:beat.position??'center'}}/>
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
  const badge=badges.find(item=>frame>=Math.round(item.start*fps)&&frame<Math.round(item.end*fps));
  const badgeFrame=badge?frame-Math.round(badge.start*fps):0;
  const badgeScale=spring({frame:badgeFrame,fps,config:{damping:15,stiffness:180},durationInFrames:12});
  return <AbsoluteFill style={{background:'#112844',fontFamily:family}}>
    {beats.map(beat=>{
      const from=Math.round(beat.start*fps);
      const duration=Math.min(durationInFrames,Math.round(beat.end*fps))-from;
      return <Sequence key={`${beat.start}-${beat.clip}`} from={from} durationInFrames={duration} premountFor={fps}><ClipBeat beat={beat} duration={duration}/></Sequence>;
    })}
    <Audio src={staticFile('reel4/audio.mp3')}/>
    <div style={{position:'absolute',top:0,left:0,height:9,width:`${interpolate(frame,[0,durationInFrames-1],[0,100])}%`,background:'#FFD60A',zIndex:3}}/>
    {badge && <div dir="rtl" style={{position:'absolute',top:180,left:55,right:55,display:'flex',justifyContent:'center',zIndex:2,transform:`scale(${badgeScale})`}}><div style={{background:'#122b4a',color:'#fff',fontSize:badge.text.length>27?38:48,fontWeight:700,lineHeight:1.35,textAlign:'center',border:'4px solid #FFD60A',borderRadius:24,padding:'12px 22px',maxWidth:'100%',boxShadow:'0 6px 18px #0005'}}>{badge.text}</div></div>}
    {currentPage && <div dir="rtl" lang="ar" style={{position:'absolute',bottom:280,left:70,right:70,display:'flex',justifyContent:'center',zIndex:2}}><div style={{direction:'rtl',unicodeBidi:'plaintext',background:'rgba(8,22,40,.88)',borderRadius:22,padding:'12px 23px',fontSize:55,fontWeight:700,lineHeight:1.5,textAlign:'center',color:'#fff',textShadow:'0 3px 3px #000',maxWidth:'100%'}}>{currentPage.map((word,index)=><React.Fragment key={`${word.startMs}-${index}`}><span style={{color:ms>=word.startMs&&ms<word.endMs?'#FFD60A':'#fff'}}>{word.text}</span>{index<currentPage.length-1?' ':''}</React.Fragment>)}</div></div>}
  </AbsoluteFill>;
};
export const Reel4Composition:React.FC=()=> <Composition id="Reel4" component={Reel4} fps={FPS} width={1080} height={1920} durationInFrames={DURATION_FRAMES}/>;
