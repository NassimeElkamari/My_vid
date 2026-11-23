import React from 'react';
import {AbsoluteFill,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';

export type ComicSceneKind='title'|'meter'|'mystery'|'triggers';
const yellow='#FFD60A';
const sky='#5AC8FA';
const blue='#1E40FF';
const dark='#111827';
const cream='#FFF5D8';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const reveal=(frame:number,fps:number)=>spring({frame:Math.max(0,frame),fps,config:{damping:13,stiffness:190,mass:.75},durationInFrames:12});

const Backdrop:React.FC<{frame:number}> = ({frame}) => <>
  <rect width="1080" height="1920" fill={sky}/>
  <path d={`M-100 ${530+22*Math.sin(frame/35)} Q190 310 470 500 T1180 430 V-30 H-100Z`} fill={cream}/>
  <path d={`M-100 ${1490+24*Math.sin(frame/43)} Q200 1300 520 1460 T1180 1350 V2000 H-100Z`} fill={yellow}/>
  <path d="M0 810 Q120 760 240 810 M840 1120 Q960 1070 1080 1120" fill="none" stroke={dark} strokeWidth="6" opacity=".45"/>
  {Array.from({length:45},(_,i)=><circle key={i} cx={45+(i%9)*31} cy={1120+Math.floor(i/9)*31+9*Math.sin(frame/23)} r="4" fill={dark} opacity=".23"/>)}
  <g stroke={dark} strokeWidth="6" strokeLinecap="round" opacity=".55" transform={`translate(890 ${540+10*Math.sin(frame/19)})`}><path d="M0 0 l90 -40 M0 25 h110 M0 50 l90 40"/></g>
</>;
const Lightning:React.FC<{x:number;y:number;rotate?:number;scale?:number}> = ({x,y,rotate=0,scale=1}) => <path transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} d="M0 0 L-46 105 H-8 L-40 190 L64 70 H20 L48 0Z" fill={yellow} stroke={dark} strokeWidth="7" strokeLinejoin="round"/>;
const SvgText:React.FC<{x:number;y:number;size:number;children:React.ReactNode;fill?:string}> = ({x,y,size,children,fill=dark}) => <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" direction="rtl" fontFamily="Cairo" fontWeight="700" fontSize={size} fill={fill}>{children}</text>;

const TitleScene:React.FC<{frame:number;fps:number}> = ({frame,fps}) => {
  const pop=reveal(frame,fps);
  return <>
    <g transform={`translate(540 930) rotate(${-3+2*Math.sin(frame/20)}) scale(${pop})`}><path d="M-410 -250 L-250 -305 L-95 -245 L30 -320 L165 -250 L315 -295 L410 -190 L380 245 L235 285 L80 245 L-75 310 L-230 250 L-395 280Z" fill={yellow} stroke={dark} strokeWidth="12" strokeLinejoin="round"/><rect x="-358" y="-150" width="716" height="300" rx="48" fill={cream} stroke={dark} strokeWidth="10"/><SvgText x={0} y={-62} size={70}>نفضة</SvgText><SvgText x={0} y={48} size={75}>بداية النعاس</SvgText></g>
    <Lightning x={175} y={600} rotate={-22} scale={1.25}/><Lightning x={870} y={1130} rotate={20} scale={1.2}/>
  </>;
};

const MeterScene:React.FC<{frame:number;fps:number}> = ({frame,fps}) => {
  const move=interpolate(frame,[5,70],[0,1],clamp);
  const shake=frame>=35?Math.sin((frame-35)*2.3)*10*spring({frame:frame-35,fps,config:{damping:7,stiffness:240},durationInFrames:16}):0;
  const flash=frame>=35&&frame<43?1-(frame-35)/8:0;
  return <g transform={`translate(${shake} 0)`}>
    <SvgText x={540} y={600} size={58}>من اليقظة للنعاس</SvgText>
    <g transform="translate(185 940)"><circle r="84" fill={yellow} stroke={dark} strokeWidth="9"/>{Array.from({length:8},(_,i)=><path key={i} d="M0 -112 V-145" stroke={dark} strokeWidth="9" strokeLinecap="round" transform={`rotate(${i*45})`}/>)}</g>
    <g transform="translate(895 940)"><circle r="89" fill={cream} stroke={dark} strokeWidth="9"/><circle cx="35" cy="-28" r="72" fill={sky}/></g>
    <rect x="300" y="900" width="480" height="80" rx="40" fill={cream} stroke={dark} strokeWidth="9"/><rect x="312" y="912" width={Math.max(1,456*move)} height="56" rx="28" fill={yellow}/>
    <circle cx={340+400*move} cy="940" r="49" fill={blue} stroke={dark} strokeWidth="9"/>
    <SvgText x={185} y={1110} size={41}>اليقظة</SvgText><SvgText x={895} y={1110} size={41}>النعاس</SvgText>
    <g opacity={flash}><Lightning x={520} y={750} scale={1.3}/></g>
  </g>;
};

const MysteryScene:React.FC<{frame:number;fps:number}> = ({frame,fps}) => <>
  <SvgText x={540} y={550} size={64}>شنو السبب؟</SvgText>
  <g transform="translate(540 930)"><path d="M-240 18 C-285 -40 -262 -130 -198 -140 C-205 -210 -125 -240 -75 -200 C-35 -258 43 -252 75 -200 C135 -230 205 -188 200 -130 C270 -110 274 -35 235 10 C245 66 200 110 150 105 C120 155 60 168 15 140 C-33 165 -90 155 -112 120 C-177 140 -230 100 -225 50Z" fill="#F49793" stroke={dark} strokeWidth="10"/><path d="M0 -200 C-30 -130 22 -100 0 -50 C-20 0 25 38 0 140 M-190 -130 Q-110 -140 -115 -70 M-220 10 Q-150 -20 -110 40 M190 -125 Q120 -145 115 -65 M225 10 Q150 -20 115 42" fill="none" stroke={dark} strokeWidth="9" strokeLinecap="round"/></g>
  <g transform={`translate(${340+280*(.5+.5*Math.sin(frame/23))} ${800+40*Math.cos(frame/25)}) rotate(-25)`}><circle r="105" fill={sky} fillOpacity=".35" stroke={dark} strokeWidth="15"/><path d="M70 78 L170 178" stroke={dark} strokeWidth="25" strokeLinecap="round"/><circle cx="-25" cy="-25" r="45" fill="none" stroke="#fff" strokeWidth="9" opacity=".8"/></g>
  {[0,1,2].map(i=><g key={i} transform={`translate(${215+i*320} ${1250-20*Math.sin(frame/8+i)}) scale(${reveal(frame-i*10,fps)})`}><SvgText x={0} y={0} size={100} fill={blue}>?</SvgText></g>)}
</>;

const TriggerIcon:React.FC<{kind:number}> = ({kind}) => {
  if(kind===0)return <g><rect x="-70" y="-42" width="130" height="84" rx="12" fill={cream} stroke={dark} strokeWidth="8"/><path d="M65 -20 h18 v40 H65" fill={dark}/><path d="M-55 -25 H-18 V25 H-55Z" fill="#ff775d"/></g>;
  if(kind===1)return <g><circle r="64" fill={cream} stroke={dark} strokeWidth="8"/><circle cx="24" cy="-20" r="55" fill={sky}/><circle cx="44" cy="35" r="38" fill="white" stroke={dark} strokeWidth="7"/><path d="M44 12 v24 l17 11" fill="none" stroke={dark} strokeWidth="6" strokeLinecap="round"/></g>;
  if(kind===2)return <g><path d="M-80 8 Q-92 -34 -48 -45 Q-26 -94 20 -65 Q70 -75 76 -23 Q110 7 78 34 H-67 Q-100 30 -80 8Z" fill="#abc5d3" stroke={dark} strokeWidth="8"/><path d="M0 15 l-30 55 h25 l-13 43 65 -75 H18 L40 15Z" fill={yellow} stroke={dark} strokeWidth="6"/></g>;
  return <g><path d="M-75 -28 H65 V38 Q65 78 -5 78 Q-75 78 -75 38Z" fill={cream} stroke={dark} strokeWidth="8"/><path d="M65 -5 Q125 -5 105 42 Q95 58 65 50 M-40 -50 Q-55 -75 -35 -100 M0 -50 Q-15 -75 5 -100 M40 -50 Q25 -75 45 -100" fill="none" stroke={dark} strokeWidth="8" strokeLinecap="round"/></g>;
};

const TriggerGrid:React.FC<{frame:number;fps:number;start:number}> = ({frame,fps,start}) => {
  const cards=[{label:'العيا بزاف',at:41830},{label:'قلة النعاس',at:42600},{label:'التوتر',at:43720},{label:'الكافيين',at:45120}];
  return <><SvgText x={540} y={540} size={61}>شنو كيقدر يزيدها؟</SvgText>{cards.map((card,i)=>{
    const from=Math.round(card.at/1000*fps)-Math.round(start*fps);
    const visible=frame>=from;
    const pop=reveal(frame-from,fps);
    const x=310+(i%2)*460;const y=825+Math.floor(i/2)*345;
    return visible?<g key={card.label} transform={`translate(${x} ${y}) scale(${pop})`}><rect x="-205" y="-145" width="410" height="290" rx="32" fill={cream} stroke={dark} strokeWidth="9"/><g transform="translate(0 -30)"><TriggerIcon kind={i}/></g><SvgText x={0} y={100} size={38}>{card.label}</SvgText></g>:null;
  })}</>;
};

export const ComicScene:React.FC<{kind:ComicSceneKind;start:number}> = ({kind,start})=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  return <AbsoluteFill><svg viewBox="0 0 1080 1920" width="1080" height="1920"><Backdrop frame={frame}/>{kind==='title'&&<TitleScene frame={frame} fps={fps}/>} {kind==='meter'&&<MeterScene frame={frame} fps={fps}/>} {kind==='mystery'&&<MysteryScene frame={frame} fps={fps}/>} {kind==='triggers'&&<TriggerGrid frame={frame} fps={fps} start={start}/>}</svg></AbsoluteFill>;
};
