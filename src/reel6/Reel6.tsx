import React from 'react';
import {AbsoluteFill,Audio,Composition,OffthreadVideo,Sequence,continueRender,delayRender,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {getInfo} from '@remotion/google-fonts/Cairo';
import captions from '../../public/reel6/captions.json';

const FPS=30;
const DURATION=1019;
const family=getInfo().fontFamily;
const INK='#111827';const BLUE='#1E40FF';const SKY='#5AC8FA';const YELLOW='#FFD60A';const CREAM='#FFF5D8';
const bounds={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const fade=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],bounds);
type Caption=typeof captions[number];
const pages:Caption[][]=[];
for(let i=0;i<captions.length;){const left=captions.length-i;const count=left===4?2:Math.min(3,left);pages.push(captions.slice(i,i+count));i+=count;}

const Background:React.FC<{frame:number}>=({frame})=><>
 <rect width="1080" height="1920" fill={SKY}/>
 <path d={`M-30 ${470+15*Math.sin(frame/30)} Q230 300 520 440 T1120 380 V-10 H-30Z`} fill={CREAM}/>
 <path d={`M-30 ${1510+12*Math.sin(frame/33)} Q260 1320 540 1460 T1120 1390 V1930 H-30Z`} fill={YELLOW}/>
 {Array.from({length:48},(_,i)=><circle key={i} cx={52+(i%8)*32} cy={1100+Math.floor(i/8)*32+5*Math.sin(frame/22)} r="4" fill={INK} opacity=".18"/>)}
</>;
const Text:React.FC<{y:number;children:React.ReactNode;size?:number;color?:string}>=({y,children,size=55,color=INK})=><text x="540" y={y} textAnchor="middle" dominantBaseline="central" direction="rtl" fontFamily="Cairo" fontWeight="700" fontSize={size} fill={color}>{children}</text>;

const BlindSpotTest:React.FC<{frame:number}>=({frame})=>{
 const second=frame/FPS;
 const instruction=second<9.06?'شوف النجمة والنقطة':second<12.24?'سد عينك اليسرى وركز على النجمة':second<17.74?'قرّب وبعّد التليفون بشوية':'بقا مركز على النجمة';
 return <AbsoluteFill style={{background:CREAM}}>
  <div dir="rtl" style={{position:'absolute',top:220,left:70,right:70,textAlign:'center',fontSize:44,fontWeight:700,color:INK}}>{instruction}</div>
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute'}} aria-label="Black star on the left and black dot on the right">
   <path d="M310 866 L323 901 L360 901 L330 923 L342 958 L310 936 L278 958 L290 923 L260 901 L297 901Z" fill={INK}/>
   <circle cx="770" cy="912" r="23" fill={INK}/>
  </svg>
 </AbsoluteFill>;
};

const Eye:React.FC<{frame:number}>=({frame})=><>
 <Text y={520} size={62}>ماشي سحر!</Text>
 <g transform="translate(0 20)">
  <path d="M300 940 C310 730 500 630 650 685 C815 745 875 890 845 1030 C815 1200 675 1295 515 1250 C390 1210 310 1090 300 940Z" fill={CREAM} stroke={INK} strokeWidth="10"/>
  <path d="M310 825 C245 850 225 1025 310 1080" fill="#e9faff" stroke={INK} strokeWidth="10"/>
  <ellipse cx="397" cy="950" rx="45" ry="155" fill="#c1f2ff" stroke={INK} strokeWidth="8"/>
  <path d="M625 695 C770 750 825 865 808 942 M808 1000 C795 1125 705 1225 625 1245" fill="none" stroke="#ff9278" strokeWidth="23" strokeLinecap="round"/>
  <path d="M805 940 C900 925 970 950 1000 1000 C963 1010 895 1008 804 1000Z" fill="#ffc777" stroke={INK} strokeWidth="9"/>
  <circle cx="808" cy="970" r={25+5*Math.sin(frame/7)} fill={YELLOW} stroke={INK} strokeWidth="7"/>
  <path d="M65 840 L320 900 M65 960 H310 M65 1080 L320 1020" fill="none" stroke={YELLOW} strokeWidth="12" strokeLinecap="round"/>
  {[0,1,2].map(i=><path key={i} d="M0 0 l15 24 l-15 24" transform={`translate(${780-i*32} ${790+i*95}) rotate(15)`} fill={BLUE} opacity=".65"/>)}
 </g>
 <Text y={1390} size={45}>بلاصة خروج العصب البصري</Text>
 <Text y={1470} size={41} color={BLUE}>ما فيهاش خلايا كتستقبل الضوء</Text>
</>;

const FillingIn:React.FC<{frame:number;fps:number}>=({frame,fps})=>{
 const fill=fade(frame,25,70);
 const pop=spring({frame,fps,config:{damping:16,stiffness:180},durationInFrames:12});
 return <>
  <Text y={525} size={58}>والمخ كيكمل الفراغ</Text>
  <g transform={`translate(540 900) scale(${pop})`}><path d="M-230 10 C-275 -40 -255 -125 -190 -135 C-200 -205 -125 -235 -75 -195 C-35 -250 40 -245 75 -195 C140 -220 205 -180 195 -120 C265 -100 270 -30 230 10 C245 60 200 105 150 100 C115 150 55 160 10 135 C-35 155 -90 148 -110 115 C-170 135 -225 95 -220 50Z" fill="#F49793" stroke={INK} strokeWidth="10"/><path d="M0 -195 C-30 -130 20 -100 0 -45 C-20 0 25 35 0 135 M-190 -125 Q-110 -140 -110 -65 M-215 10 Q-150 -20 -110 40 M190 -115 Q120 -140 110 -60 M220 10 Q150 -20 110 40" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round"/></g>
  <path d="M540 1100 V1200" stroke={INK} strokeWidth="9" strokeLinecap="round"/>
  <rect x="190" y="1205" width="700" height="150" rx="28" fill={CREAM} stroke={INK} strokeWidth="8"/>
  {Array.from({length:9},(_,i)=><path key={i} d={`M${205+i*80} 1217 v126`} stroke={BLUE} strokeWidth="9"/>)}
  <rect x="455" y="1214" width="150" height="132" fill={CREAM} opacity={1-fill}/>
  <rect x="455" y="1214" width="150" height="132" fill="none" stroke={INK} strokeWidth="4" strokeDasharray="10 10" opacity={1-fill}/>
  <Text y={1465} size={43}>بالمعلومات اللي حداها</Text>
 </>;
};

const Outro:React.FC<{frame:number;fps:number}>=({frame,fps})=>{
 const pop=spring({frame,fps,config:{damping:15,stiffness:180},durationInFrames:12});
 return <g transform={`translate(540 940) scale(${pop})`}><circle r="330" fill={CREAM} stroke={INK} strokeWidth="10"/><text textAnchor="middle" y="-50" direction="rtl" fontFamily="Cairo" fontWeight="700" fontSize="65" fill={INK}>واش نجحات</text><text textAnchor="middle" y="48" direction="rtl" fontFamily="Cairo" fontWeight="700" fontSize="65" fill={INK}>معاك التجربة؟</text><text textAnchor="middle" y="170" direction="rtl" fontFamily="Cairo" fontWeight="700" fontSize="58" fill={BLUE}>قول لينا ✳</text></g>;
};

const Intro:React.FC<{clip:number;length:number}>=({clip,length})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const zoom=1.02+.025*spring({frame,fps,config:{damping:22,stiffness:170},durationInFrames:8});
 return <AbsoluteFill style={{background:CREAM,overflow:'hidden'}}><OffthreadVideo src={staticFile(`reel6/sc${clip}.mp4`)} startFrom={0} endAt={length} volume={0} style={{width:'100%',height:'100%',objectFit:'cover',transform:`scale(${zoom})`}}/></AbsoluteFill>;
};

export const Reel6:React.FC=()=>{
 const frame=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 const [fontHandle]=React.useState(()=>delayRender('Loading Cairo'));
 React.useEffect(()=>{const face=new FontFace(family,`url(${staticFile('reel4/fonts/Cairo.ttf')})`,{weight:'700'});face.load().then(font=>{document.fonts.add(font);continueRender(fontHandle);}).catch(error=>{console.error(error);continueRender(fontHandle);});},[fontHandle]);
 const ms=frame/fps*1000;const page=pages.find(p=>ms>=p[0].startMs&&ms<p[p.length-1].endMs);
 const testStart=Math.round(5.94*fps);const testEnd=Math.round(20.92*fps);const eyeEnd=Math.round(27.06*fps);const brainEnd=Math.round(31.44*fps);
 return <AbsoluteFill style={{background:CREAM,fontFamily:family}}>
  <Sequence durationInFrames={Math.round(3.1*fps)}><Intro clip={2} length={Math.round(3.1*fps)}/></Sequence>
  <Sequence from={Math.round(3.1*fps)} durationInFrames={testStart-Math.round(3.1*fps)} premountFor={fps}><Intro clip={1} length={testStart-Math.round(3.1*fps)}/></Sequence>
  {frame>=testStart&&frame<testEnd?<BlindSpotTest frame={frame}/>:null}
  {frame>=testEnd&&<svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute'}}><Background frame={frame}/>{frame<eyeEnd?<Eye frame={frame-testEnd}/>:frame<brainEnd?<FillingIn frame={frame-eyeEnd} fps={fps}/>:<Outro frame={frame-brainEnd} fps={fps}/>}</svg>}
  <Audio src={staticFile('reel6/audio.mp3')}/>
  <div style={{position:'absolute',top:0,left:0,width:`${interpolate(frame,[0,durationInFrames-1],[0,100])}%`,height:9,background:YELLOW}}/>
  {page&&<div dir="rtl" lang="ar" style={{position:'absolute',bottom:280,left:70,right:70,display:'flex',justifyContent:'center'}}><div style={{direction:'rtl',unicodeBidi:'plaintext',background:'rgba(8,22,40,.9)',borderRadius:22,padding:'12px 23px',fontSize:55,fontWeight:700,lineHeight:1.5,textAlign:'center',color:'#fff',maxWidth:940}}>{page.map((word,index)=><React.Fragment key={`${word.startMs}-${index}`}><span style={{color:ms>=word.startMs&&ms<word.endMs?YELLOW:'#fff'}}>{word.text}</span>{index<page.length-1?' ':''}</React.Fragment>)}</div></div>}
 </AbsoluteFill>;
};
export const Reel6Composition:React.FC=()=> <Composition id="Reel6" component={Reel6} width={1080} height={1920} fps={FPS} durationInFrames={DURATION}/>;
