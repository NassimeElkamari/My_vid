import React from 'react';
import {AbsoluteFill,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';

export type MoreSceneKind='jolt'|'surprise'|'transition'|'contraction'|'signal'|'fall'|'question'|'uncertain'|'factorIntro'|'safe'|'sleep'|'closer'|'end';
const Y='#FFD60A'; const B='#5AC8FA'; const R='#1E40FF'; const D='#111827'; const C='#FFF5D8';
const Label:React.FC<{children:React.ReactNode;y:number;size?:number;fill?:string}>=({children,y,size=65,fill=D})=><text x="540" y={y} textAnchor="middle" dominantBaseline="middle" direction="rtl" fontFamily="Cairo" fontWeight="700" fontSize={size} fill={fill}>{children}</text>;
const Bolt:React.FC<{x:number;y:number;angle?:number;scale?:number}>=({x,y,angle=0,scale=1})=><path d="M0 0 L-44 95 H-8 L-38 175 L62 64 H20 L45 0Z" transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`} fill={Y} stroke={D} strokeWidth="7" strokeLinejoin="round"/>;
const Rays:React.FC<{frame:number;x:number;y:number;color?:string}>=({frame,x,y,color=Y})=><g transform={`translate(${x} ${y}) rotate(${Math.sin(frame/14)*5})`} stroke={color} strokeWidth="14" strokeLinecap="round">{Array.from({length:12},(_,i)=><path key={i} d="M0 -240 V-285" transform={`rotate(${i*30})`}/>)}</g>;
const Dots:React.FC<{frame:number;color?:string}>=({frame,color=D})=><g fill={color} opacity=".18">{Array.from({length:72},(_,i)=><circle key={i} cx={55+(i%9)*32} cy={510+Math.floor(i/9)*32+8*Math.sin(frame/30)} r="4"/>)}</g>;
const Card:React.FC<{children:React.ReactNode;frame:number;fps:number}>=({children,frame,fps})=>{
 const scale=spring({frame,fps,config:{damping:14,stiffness:180},durationInFrames:12});
 return <g transform={`translate(540 950) scale(${scale})`}><rect x="-390" y="-290" width="780" height="580" rx="70" fill={C} stroke={D} strokeWidth="10"/>{children}</g>;
};
const Cloud:React.FC<{x:number;y:number;scale?:number}>=({x,y,scale=1})=><path transform={`translate(${x} ${y}) scale(${scale})`} d="M-110 35 Q-125-25 -70-38 Q-50-100 15-65 Q75-80 90-25 Q135 0 105 40 H-85 Q-115 40-110 35Z" fill="white" stroke={D} strokeWidth="7"/>;

export const MoreScene:React.FC<{kind:MoreSceneKind}> = ({kind})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const float=Math.sin(frame/12)*12;
 const pop=spring({frame,fps,config:{damping:13,stiffness:180},durationInFrames:12});
 const startle=kind==='jolt'&&frame<18?Math.sin(frame*2.3)*13*(1-frame/18):0;
 return <AbsoluteFill style={{background:kind==='question'?R:kind==='safe'?C:kind==='sleep'?'#B5DDFA':kind==='jolt'?Y:kind==='fall'?B:kind==='end'?Y:C}}>
  <svg viewBox="0 0 1080 1920" width="1080" height="1920">
   <Dots frame={frame} color={kind==='question'?C:D}/>
   {kind==='jolt'&&<g transform={`translate(${startle} 0)`}>
    <path d="M540 565 L605 760 L805 660 L700 850 L925 900 L710 980 L820 1180 L605 1060 L540 1300 L470 1060 L250 1180 L365 980 L155 900 L370 850 L250 665 L475 760Z" fill={C} stroke={D} strokeWidth="12"/>
    <g transform={`translate(540 910) scale(${pop})`}><Bolt x={0} y={-165} scale={2}/></g><Label y={1380} size={76}>نفضة مفاجئة!</Label>
   </g>}
   {kind==='surprise'&&<>
    <circle cx="540" cy="930" r="430" fill={Y}/><Rays frame={frame} x={540} y={900} color={R}/>
    <image href={staticFile('reel4/generated/startled.png')} x="95" y={540+float} width="890" height="800" preserveAspectRatio="xMidYMid meet"/>
    <Label y={1390} size={62}>آش وقع ليا؟</Label>
   </>}
   {kind==='transition'&&<>
    <circle cx="540" cy="950" r="400" fill={B}/><g transform={`translate(540 ${950+float}) rotate(${6*Math.sin(frame/17)})`}>
     <circle cy="-190" r="125" fill="#fac3a7" stroke={D} strokeWidth="10"/><path d="M-170 220 Q-165 -25 0 -25 Q165 -25 170 220Z" fill={R} stroke={D} strokeWidth="10"/><path d="M-65 -190 Q-40 -170 -15 -190 M15 -190 Q40 -170 65 -190" fill="none" stroke={D} strokeWidth="9" strokeLinecap="round"/>
    </g><text x="720" y="690" fontFamily="Cairo" fontWeight="700" fontSize="100" fill={R}>Z</text><text x="790" y="590" fontFamily="Cairo" fontWeight="700" fontSize="70" fill={R}>z</text><Label y={1410} size={55}>الجسم كيبدا يرتاح</Label>
   </>}
   {kind==='contraction'&&<>
    <Card frame={frame} fps={fps}><g transform={`translate(0 ${float})`}><path d="M-255 90 Q-210 20 -145 40 L-75 70 Q-45 -30 45 -40 L105 -25 L80 45 Q185 65 230 125 L205 190 H-250Z" fill="#f39f76" stroke={D} strokeWidth="10" strokeLinejoin="round"/><path d="M-45 90 Q30 10 105 45 M25 90 Q90 65 150 110" fill="none" stroke={D} strokeWidth="8"/><Bolt x={0} y={-180} scale={.9}/></g></Card><Label y={1430} size={62}>تقلّصة مفاجئة</Label>
   </>}
   {kind==='signal'&&<>
    <rect x="75" y="610" width="930" height="650" rx="70" fill={B} stroke={D} strokeWidth="9"/>
    <g transform={`translate(540 930) scale(${.9+.08*Math.sin(frame/16)})`}><image href={staticFile('reel4/generated/brain-muscle.png')} x="-430" y="-300" width="860" height="600" preserveAspectRatio="xMidYMid meet"/></g>
    <circle cx={interpolate((frame%70),[0,69],[275,795])} cy={1130-80*Math.sin((frame%70)/69*Math.PI)} r="18" fill={Y} stroke={D} strokeWidth="5"/><Label y={1420} size={55}>حركة لا إرادية</Label>
   </>}
   {kind==='fall'&&<>
    <rect width="1080" height="1920" fill={B}/><Cloud x={180} y={700+float} scale={1.1}/><Cloud x={900} y={1150-float} scale={1.3}/>
    <g transform={`translate(540 ${940+30*Math.sin(frame/10)}) rotate(${12*Math.sin(frame/11)})`}><circle cy="-210" r="110" fill="#f6b18b" stroke={D} strokeWidth="10"/><path d="M-125 -75 Q0 -150 125 -75 L90 145 H-90Z" fill={R} stroke={D} strokeWidth="10"/><path d="M-100 -50 L-220 70 M100 -50 L220 70 M-70 145 L-150 280 M70 145 L150 280" stroke={D} strokeWidth="34" strokeLinecap="round"/><path d="M-55 -225 Q0 -265 55 -225" fill="none" stroke={D} strokeWidth="8"/></g><Label y={1430} size={65}>بحال كتطيح!</Label>
   </>}
   {kind==='question'&&<>
    <Rays frame={frame} x={540} y={925} color={Y}/><g transform={`translate(540 920) scale(${pop})`}><circle r="290" fill={Y} stroke={D} strokeWidth="12"/><text y="105" textAnchor="middle" fontFamily="Cairo" fontWeight="700" fontSize="420" fill={D}>؟</text></g><Label y={1390} size={72} fill={C}>ولكن علاش؟</Label>
   </>}
   {kind==='uncertain'&&<>
    <Card frame={frame} fps={fps}><circle r="155" fill={B} stroke={D} strokeWidth="10"/><path d="M-80 -20 Q-90 -110 -15 -110 Q0 -155 50 -100 Q120 -110 105 -45 Q140 20 75 70 Q20 120 -25 70 Q-100 85 -80 -20Z" fill="#F49793" stroke={D} strokeWidth="9"/><path d="M-15 -110 Q-40 -50 0 -25 Q-25 15 0 75" fill="none" stroke={D} strokeWidth="8"/><text x="200" y="-150" textAnchor="middle" fill={R} fontFamily="Cairo" fontSize="125" fontWeight="700">؟</text></Card><Label y={1430} size={49}>السبب الدقيق مازال غير معروف</Label>
   </>}
   {kind==='factorIntro'&&<><g transform={`translate(540 930) rotate(${Math.sin(frame/14)*5})`}><circle r="300" fill={Y} stroke={D} strokeWidth="10"/><path d="M-150 130 L0 -175 L150 130Z" fill={C} stroke={D} strokeWidth="10"/><path d="M0 -80 V30 M0 75 V80" stroke={D} strokeWidth="18" strokeLinecap="round"/></g><Label y={1400} size={64}>عوامل كتزيد الاحتمال</Label></>}
   {kind==='safe'&&<><g transform={`translate(540 945) scale(${pop})`}><path d="M0 -300 L245 -205 V5 Q220 230 0 330 Q-220 230 -245 5 V-205Z" fill={B} stroke={D} strokeWidth="12"/><path d="M-110 5 L-25 90 L130 -95" fill="none" stroke={C} strokeWidth="35" strokeLinecap="round" strokeLinejoin="round"/></g><Label y={1430} size={60}>غالباً ما فيها حتى خطر</Label></>}
   {kind==='sleep'&&<>
    <circle cx="845" cy="650" r="100" fill={Y} stroke={D} strokeWidth="8"/><circle cx="885" cy="610" r="80" fill="#B5DDFA"/>
    <g transform={`translate(0 ${float})`}><path d="M170 1120 H900 V1400 H170Z" fill={R} stroke={D} strokeWidth="10"/><rect x="210" y="1000" width="660" height="150" rx="55" fill={C} stroke={D} strokeWidth="10"/><circle cx="360" cy="990" r="100" fill="#fac3a7" stroke={D} strokeWidth="9"/><path d="M280 980 Q350 890 430 980" fill={D}/><path d="M450 1020 Q620 930 860 1040 V1280 H440Z" fill={Y} stroke={D} strokeWidth="10"/></g><Label y={1410} size={55}>المرة الجاية ما تخافش</Label>
   </>}
   {kind==='closer'&&<><circle cx="540" cy="930" r="340" fill={B} stroke={D} strokeWidth="10"/><g transform={`translate(540 ${930+float})`}><path d="M-180 -60 Q-165 -180 -70 -155 Q0 -220 70 -155 Q165 -180 180 -60 Q220 40 130 105 Q70 165 0 115 Q-75 165 -135 105 Q-220 40 -180 -60Z" fill="#F49793" stroke={D} strokeWidth="10"/><path d="M0 -150 Q-25 -80 0 -30 Q-25 25 0 115 M-150 -60 Q-80 -80 -60 -20 M150 -60 Q80 -80 60 -20" fill="none" stroke={D} strokeWidth="8"/></g><Label y={1420} size={56}>جسمك كينتاقل للنعاس</Label></>}
   {kind==='end'&&<><Rays frame={frame} x={540} y={920} color={C}/><g transform={`translate(540 920) scale(${pop})`}><circle r="305" fill={C} stroke={D} strokeWidth="10"/><text textAnchor="middle" y="30" fontFamily="Cairo" fontWeight="700" fontSize="96" fill={D} direction="rtl">واش عارف؟</text><text textAnchor="middle" y="150" fontFamily="Cairo" fontWeight="700" fontSize="85" fill={R}>✳</text></g></>}
  </svg>
 </AbsoluteFill>;
};
