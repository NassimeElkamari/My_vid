import React from 'react';
import {interpolate,spring,staticFile} from 'remotion';

type Kind='idea'|'context'|'memory'|'recall';
const ink='#111827';const yellow='#FFD60A';const blue='#1E40FF';const cream='#FFF5D8';const sky='#5AC8FA';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ramp=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],clamp);
const Text:React.FC<{x?:number;y:number;size?:number;children:React.ReactNode;fill?:string}>=({x=540,y,size=50,children,fill=ink})=><text x={x} y={y} fill={fill} textAnchor="middle" dominantBaseline="central" direction="rtl" fontFamily="Cairo" fontWeight="700" fontSize={size}>{children}</text>;
const Water:React.FC<{x:number;y:number;scale?:number}>=({x,y,scale=1})=><g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M-55 -78 H55 L43 75 Q0 90 -43 75Z" fill="white" stroke={ink} strokeWidth="8" strokeLinejoin="round"/><path d="M-43 -12 Q-20 -28 0 -12 T43 -12 L36 65 Q0 76 -36 65Z" fill={sky}/><path d="M-43 -12 Q-20 -28 0 -12 T43 -12" fill="none" stroke={blue} strokeWidth="5"/></g>;
const Thought:React.FC<{x:number;y:number;scale?:number;opacity?:number}>=({x,y,scale=1,opacity=1})=><g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}><path d="M-158 10 C-178 -60 -120 -105 -70 -97 C-36 -160 35 -146 60 -108 C125 -121 168 -65 145 -5 C170 48 125 92 65 80 C25 120 -45 105 -65 78 C-130 95 -170 55 -158 10Z" fill={cream} stroke={ink} strokeWidth="7"/><Water x={0} y={0} scale={.75}/></g>;
const Room:React.FC<{x:number;y:number;kitchen?:boolean}>=({x,y,kitchen=false})=><g transform={`translate(${x} ${y})`}><rect x="-210" y="-180" width="420" height="360" rx="32" fill={kitchen?'#DFF3F5':cream} stroke={ink} strokeWidth="8"/><path d="M-200 80 H200" stroke={ink} strokeWidth="7"/>{kitchen?<g><rect x="-155" y="-112" width="125" height="100" rx="8" fill={yellow} stroke={ink} strokeWidth="6"/><rect x="-8" y="-112" width="125" height="100" rx="8" fill={yellow} stroke={ink} strokeWidth="6"/><path d="M-160 54 H145 V80 H-160Z" fill={blue} stroke={ink} strokeWidth="6"/><path d="M15 45 Q20 -10 65 12 V45" fill="none" stroke={ink} strokeWidth="6"/></g>:<g><rect x="-153" y="-115" width="92" height="82" fill={sky} stroke={ink} strokeWidth="6"/><path d="M-160 50 Q-160 -10 -105 -10 H30 Q90 -10 90 50 V80 H-160Z" fill={blue} stroke={ink} strokeWidth="7"/><path d="M-110 50 H40" fill="none" stroke={cream} strokeWidth="6"/></g>}</g>;
const Character:React.FC<{x:number;y:number;w:number;h:number;frame:number}>=({x,y,w,h,frame})=><image href={staticFile('reel5/generated/thinking-character.png')} x={x} y={y+5*Math.sin(frame/9)} width={w} height={h} preserveAspectRatio="xMidYMid meet"/>;

export const MemoryStory:React.FC<{kind:Kind;frame:number;fps:number}>=({kind,frame,fps})=>{
 const pop=spring({frame,fps,config:{damping:17,stiffness:180},durationInFrames:12});
 if(kind==='idea') return <>
   <Text y={545} size={61}>قبل ثواني كنتي عارف</Text>
   <Room x={540} y={895}/>
   <g transform={`translate(340 1050) scale(${.7+.3*pop})`}><Character x={-200} y={-300} w={400} h={430} frame={frame}/></g>
   <Thought x={760} y={735} scale={.8}/>
   <path d="M650 785 Q600 815 550 850" stroke={ink} strokeWidth="7" fill="none" strokeDasharray="12 12"/>
   <Text y={1345} size={48}>مثلاً: بغيت كاس د الما</Text>
 </>;
 if(kind==='context') return <>
   <Text y={535} size={58}>ملي كتبدّل المكان...</Text>
   <g transform={`translate(${-35*ramp(frame,0,80)} 0)`}><Room x={270} y={925}/><Room x={810} y={925} kitchen/></g>
   <path d="M475 825 H605 M575 795 L610 825 L575 855" fill="none" stroke={blue} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
   <g transform={`translate(${270+540*ramp(frame,15,75)} 0)`}><circle cy="1210" r="59" fill="#f6b28e" stroke={ink} strokeWidth="7"/><path d="M-66 1360 Q-60 1265 0 1265 Q60 1265 66 1360Z" fill={blue} stroke={ink} strokeWidth="8"/></g>
   <Text x={270} y={1160} size={35}>البلاصة اللولة</Text><Text x={810} y={1160} size={35}>البلاصة الجديدة</Text>
   <Text y={1430} size={47}>حتى السياق كيتبدّل</Text>
 </>;
 if(kind==='memory') return <>
   <Text y={530} size={57}>الفكرة كانت مربوطة</Text><Text y={610} size={57}>بالسياق اللول</Text>
   <Room x={300} y={920}/><Thought x={765} y={865} scale={.95}/>
   <path d="M520 925 C580 850 610 850 630 860" stroke={blue} strokeWidth="10" strokeLinecap="round" strokeDasharray="14 13" fill="none" strokeDashoffset={-frame}/>
   <Character x={300} y={1030} w={460} h={320} frame={frame}/>
   <Text y={1450} size={42}>مثلاً: جيتي تجيب كاس د الما</Text>
 </>;
 return <>
   <Text y={535} size={55}>من بعد ما تبدّل السياق...</Text>
   <Room x={285} y={890} kitchen/><Character x={70} y={985} w={480} h={350} frame={frame}/>
   <Thought x={775} y={890} scale={.88} opacity={.8}/>
   <path d="M505 1040 C550 970 600 970 630 975" stroke={ink} strokeWidth="8" strokeDasharray="10 18" opacity=".45" fill="none"/>
   <g transform={`translate(530 ${1000+8*Math.sin(frame/8)})`}><circle r="65" fill={yellow} stroke={ink} strokeWidth="7"/><text y="33" textAnchor="middle" fontFamily="Cairo" fontWeight="700" fontSize="100" fill={blue}>؟</text></g>
   <Text y={1430} size={42}>مرات كيصعاب استرجاع الفكرة</Text>
 </>;
};
