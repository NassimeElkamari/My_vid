import React from 'react';
import {AbsoluteFill,Audio,Composition,OffthreadVideo,Sequence,continueRender,delayRender,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {getInfo} from '@remotion/google-fonts/Cairo';
import captions from '../../public/reel5/captions.json';

const fps=30;
const duration=1103;
const family=getInfo().fontFamily;
const Y='#FFD60A'; const SKY='#5AC8FA'; const BLUE='#1E40FF'; const INK='#111827'; const CREAM='#FFF5D8';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const tween=(frame:number,start:number,end:number)=>interpolate(frame,[start,end],[0,1],clamp);
type SceneKind='idea'|'title'|'context'|'memory'|'nuance'|'attention'|'outro';
type Beat={start:number;end:number;clip?:number;scene?:SceneKind;sourceStart?:number};
const beats:Beat[]=[
 {start:0,end:3.8,clip:1,sourceStart:0},
 {start:3.8,end:6.8,clip:2,sourceStart:.25},
 {start:6.8,end:9.65,scene:'idea'},
 {start:9.65,end:13.3,scene:'title'},
 {start:13.3,end:17.1,clip:3,sourceStart:0},
 {start:17.1,end:20.2,scene:'context'},
 {start:20.2,end:23.84,scene:'memory'},
 {start:23.84,end:26.56,clip:4,sourceStart:.2},
 {start:26.56,end:28.6,scene:'nuance'},
 {start:28.6,end:30.66,scene:'attention'},
 {start:30.66,end:33.6,clip:5,sourceStart:.25},
 {start:33.6,end:36.7667,scene:'outro'},
];
type Caption=typeof captions[number];
const pages:Caption[][]=[];
for(let i=0;i<captions.length;){const left=captions.length-i;const count=left===4?2:Math.min(3,left);pages.push(captions.slice(i,i+count));i+=count;}
const Title:React.FC<{y:number;children:React.ReactNode;size?:number;color?:string}>=({y,children,size=58,color=INK})=><text x="540" y={y} textAnchor="middle" dominantBaseline="middle" direction="rtl" fontFamily="Cairo" fontWeight="700" fontSize={size} fill={color}>{children}</text>;
const Background:React.FC<{frame:number;light?:boolean}>=({frame,light=false})=><>
 <rect width="1080" height="1920" fill={light?CREAM:SKY}/>
 <path d={`M-60 ${470+15*Math.sin(frame/27)} Q260 270 520 440 T1140 380 V-10 H-60Z`} fill={light?SKY:CREAM}/>
 <path d={`M-50 ${1480+18*Math.sin(frame/31)} Q230 1300 500 1440 T1130 1380 V1930 H-50Z`} fill={Y}/>
 {Array.from({length:48},(_,i)=><circle key={i} cx={50+(i%8)*33} cy={1050+Math.floor(i/8)*33+6*Math.sin(frame/20)} r="4" fill={INK} opacity=".16"/>)}
 <g stroke={INK} strokeWidth="6" strokeLinecap="round" opacity=".35"><path d="M865 600 l90 -35 M870 625 h105 M865 650 l90 35"/><path d="M80 850 l65 -30 M75 875 h80 M80 900 l65 30"/></g>
</>;
const Bubble:React.FC<{x:number;y:number;scale?:number;children?:React.ReactNode}>=({x,y,scale=1,children})=><g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M-150 20 C-190 -35 -155 -110 -90 -105 C-55 -165 25 -160 55 -120 C125 -135 170 -80 150 -20 C180 40 130 90 65 75 C20 120 -50 110 -70 80 C-140 100 -175 60 -150 20Z" fill={CREAM} stroke={INK} strokeWidth="8"/>{children}</g>;
const Door:React.FC<{x:number;y:number;scale?:number;open?:number}>=({x,y,scale=1,open=0})=><g transform={`translate(${x} ${y}) scale(${scale})`}><rect x="-100" y="-190" width="200" height="380" rx="7" fill={INK}/><rect x="-80" y="-170" width="160" height="340" fill="#5684c8"/><path d={`M-80 -170 L${80-open*90} ${-170-open*18} L${80-open*90} ${170+open*18} L-80 170Z`} fill={Y} stroke={INK} strokeWidth="7"/><circle cx={55-open*80} cy="3" r="7" fill={INK}/></g>;
const Symbol:React.FC<{type:'idea'|'clock'|'phone'}>=({type})=>type==='idea'?<g><circle cy="-25" r="60" fill={Y} stroke={INK} strokeWidth="7"/><path d="M-30 25 V55 H30 V25 M-25 74 H25" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round"/></g>:type==='clock'?<g><circle r="67" fill={CREAM} stroke={INK} strokeWidth="7"/><path d="M0 -38 V0 L28 20" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round"/></g>:<g><rect x="-40" y="-72" width="80" height="144" rx="13" fill={BLUE} stroke={INK} strokeWidth="7"/><rect x="-28" y="-48" width="56" height="85" fill={CREAM}/></g>;
const Graphic:React.FC<{kind:SceneKind;frame:number;rate:number}>=({kind,frame,rate})=>{
 const pop=spring({frame,fps:rate,config:{damping:14,stiffness:180},durationInFrames:12});
 if(kind==='idea')return <><Title y={555}>قبل ثواني...</Title><g transform={`translate(540 950) scale(${pop})`}><Bubble x={0} y={0} scale={1.7}><g transform={`translate(0 ${-5*Math.sin(frame/8)})`}><Symbol type="idea"/></g></Bubble></g><g opacity={tween(frame,35,50)}><text x="780" y="1120" textAnchor="middle" fontFamily="Cairo" fontSize="125" fontWeight="700" fill={BLUE}>؟</text></g></>;
 if(kind==='title')return <><g transform={`translate(540 930) scale(${pop}) rotate(${Math.sin(frame/18)*2})`}><path d="M-400 -230 L-250 -275 L-80 -235 L60 -300 L210 -245 L365 -270 L400 -190 L380 230 L230 270 L80 235 L-80 290 L-245 240 L-390 270Z" fill={Y} stroke={INK} strokeWidth="10"/><rect x="-320" y="-130" width="640" height="260" rx="42" fill={CREAM} stroke={INK} strokeWidth="9"/><text y="35" textAnchor="middle" fontFamily="Cairo" direction="rtl" fontWeight="700" fontSize="91" fill={INK}>تأثير الباب</text></g><g transform={`translate(850 620) rotate(${frame*2})`}><text textAnchor="middle" fontSize="90" fill={BLUE}>✳</text></g></>;
 if(kind==='context')return <><Title y={555}>المكان كيتبدّل</Title><Door x={540} y={970} scale={1.25} open={tween(frame,8,65)*.8}/><g opacity={tween(frame,15,35)}><circle cx="195" cy="970" r="118" fill={CREAM} stroke={INK} strokeWidth="8"/><rect x="135" y="950" width="120" height="48" rx="12" fill={BLUE}/><circle cx="885" cy="970" r="118" fill={Y} stroke={INK} strokeWidth="8"/><path d="M830 1000 h110 l-55 -100Z" fill={BLUE}/><path d="M320 970 H380 M700 970 H760" stroke={INK} strokeWidth="12" strokeLinecap="round"/></g><Title y={1420} size={48}>حتى السياق كيتبدّل</Title></>;
 if(kind==='memory')return <><Title y={555}>الفكرة كتبعد شوية</Title><g transform={`translate(${540+90*tween(frame,20,95)} ${930-80*tween(frame,20,95)}) scale(${1.6-.35*tween(frame,20,95)})`} opacity={1-.45*tween(frame,20,95)}><Bubble x={0} y={0}><Symbol type="idea"/></Bubble></g><g transform={`translate(260 ${1160+10*Math.sin(frame/11)})`}><circle r="76" fill={CREAM} stroke={INK} strokeWidth="8"/><text textAnchor="middle" y="37" fill={BLUE} fontFamily="Cairo" fontSize="100" fontWeight="700">؟</text></g><path d="M350 1280 Q540 1190 750 1280" fill="none" stroke={INK} strokeWidth="8" strokeDasharray="14 15" strokeLinecap="round"/></>;
 if(kind==='nuance')return <><Title y={555} size={51}>ماشي الباب بوحدو</Title><Door x={540} y={940} scale={1.2} open={.65}/><g transform="translate(230 860)"><circle r="110" fill={CREAM} stroke={INK} strokeWidth="7"/><Symbol type="phone"/></g><g transform="translate(850 1040)"><circle r="110" fill={CREAM} stroke={INK} strokeWidth="7"/><Symbol type="clock"/></g><path d="M300 1190 Q540 1330 780 1190" fill="none" stroke={BLUE} strokeWidth="10" strokeDasharray="14 14" strokeDashoffset={-frame*2}/><Title y={1435} size={46}>السياق والانتباه حتى هما مهمّين</Title></>;
 if(kind==='attention')return <><Title y={555} size={51}>الانتباه والسياق</Title><g transform={`translate(540 890) scale(${pop})`}><circle r="230" fill={CREAM} stroke={INK} strokeWidth="9"/><Symbol type="phone"/></g><g transform="translate(285 1220)"><circle r="105" fill={Y} stroke={INK} strokeWidth="7"/><Symbol type="clock"/></g><g transform="translate(800 1220)"><circle r="105" fill={CREAM} stroke={INK} strokeWidth="7"/><Symbol type="idea"/></g><path d="M350 1120 Q540 1020 730 1120" fill="none" stroke={BLUE} strokeWidth="10" strokeDasharray="14 14" strokeDashoffset={-frame*2}/></>;
 return <><g transform={`translate(540 945) scale(${pop})`}><circle r="330" fill={CREAM} stroke={INK} strokeWidth="10"/><Door x={0} y={-55} scale={.8} open={.65}/><g transform="translate(210 -150) scale(.65)"><Symbol type="idea"/></g></g><Title y={1360} size={60}>المخ بدّل المشهد</Title><Title y={1450} size={65} color={BLUE}>واش عارف؟ ✳</Title></>;
};
const BeatView:React.FC<{beat:Beat;length:number}>=({beat,length})=>{
 const frame=useCurrentFrame();const {fps:rate}=useVideoConfig();
 const pop=spring({frame,fps:rate,config:{damping:22,stiffness:220,mass:.65},durationInFrames:8});
 const scale=1.04+.05*(1-pop);
 return <AbsoluteFill style={{background:SKY,overflow:'hidden'}}>{beat.clip?<OffthreadVideo src={staticFile(`reel5/scenne${beat.clip}.mp4`)} startFrom={Math.round((beat.sourceStart??0)*fps)} endAt={Math.round((beat.sourceStart??0)*fps)+length} volume={0} style={{width:'100%',height:'100%',objectFit:'cover',transform:`scale(${scale})`}}/>:<svg width="1080" height="1920" viewBox="0 0 1080 1920"><Background frame={frame} light={beat.scene==='nuance'}/><Graphic kind={beat.scene!} frame={frame} rate={rate}/></svg>}</AbsoluteFill>;
};
export const Reel5:React.FC=()=>{
 const frame=useCurrentFrame();const {fps:rate,durationInFrames}=useVideoConfig();
 const [handle]=React.useState(()=>delayRender('Loading Cairo'));
 React.useEffect(()=>{const face=new FontFace(family,`url(${staticFile('reel4/fonts/Cairo.ttf')})`,{weight:'700'});face.load().then(font=>{document.fonts.add(font);continueRender(handle);}).catch(error=>{console.error(error);continueRender(handle);});},[handle]);
 const ms=frame/rate*1000;const current=pages.find(p=>ms>=p[0].startMs&&ms<p[p.length-1].endMs);
 return <AbsoluteFill style={{background:SKY,fontFamily:family}}>
  {beats.map(beat=>{const from=Math.round(beat.start*rate);const length=Math.min(durationInFrames,Math.round(beat.end*rate))-from;return <Sequence key={beat.start} from={from} durationInFrames={length} premountFor={rate}><BeatView beat={beat} length={length}/></Sequence>;})}
  <Audio src={staticFile('reel5/audio (2).mp3')}/>
  <div style={{position:'absolute',top:0,left:0,height:9,width:`${interpolate(frame,[0,durationInFrames-1],[0,100])}%`,background:Y}}/>
  {current&&<div dir="rtl" lang="ar" style={{position:'absolute',bottom:280,left:70,right:70,display:'flex',justifyContent:'center'}}><div style={{direction:'rtl',unicodeBidi:'plaintext',background:'rgba(8,22,40,.9)',borderRadius:22,padding:'12px 23px',fontSize:55,fontWeight:700,lineHeight:1.5,textAlign:'center',color:'#fff',textShadow:'0 3px 3px #000',maxWidth:'100%'}}>{current.map((word,index)=><React.Fragment key={`${word.startMs}-${index}`}><span style={{color:ms>=word.startMs&&ms<word.endMs?Y:'#fff'}}>{word.text}</span>{index<current.length-1?' ':''}</React.Fragment>)}</div></div>}
 </AbsoluteFill>;
};
export const Reel5Composition:React.FC=()=> <Composition id="Reel5" component={Reel5} width={1080} height={1920} fps={fps} durationInFrames={duration}/>;
