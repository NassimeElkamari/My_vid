import React from 'react';
import {AbsoluteFill, Audio, Composition, continueRender, delayRender, interpolate, staticFile, useCurrentFrame} from 'remotion';

const audio = 'reel3/ElevenLabs_2026-11-21T13_43_33_Badr - Warm Moroccan Darija Narrator_pvc_s43_sim75_v4.mp3';
const art = {
  laughing: 'reel3/Image ChatGPT 21 nov. 2026, 13_31_34-1.png',
  science: 'reel3/Image ChatGPT 21 nov. 2026, 13_31_35-2.png',
  comparison: 'reel3/Image ChatGPT 21 nov. 2026, 13_31_36-3.png',
  hand: 'reel3/illustrated-hand.png',
};
const cues = [
  [0, 3.1, 'علاش ملي شي واحد كيدغدغك', 'كتبقى كتضحك وما كتقدرش تحبس؟'],
  [3.1, 6.65, 'ولكن ملي كتجرب تدغدغ راسك...', 'ما كتحسش بنفس الإحساس؟'],
  [6.65, 11.7, 'الجواب مخبي فالطريقة', 'اللي كيخدم بها المخ ديالنا!'],
  [11.7, 15.8, 'شوف، ملي كتدغدغ راسك،', 'المخ ديالك عارف شنو غادي تدير'],
  [15.8, 18.45, 'حيث هو اللي عطى الأمر', 'ليدك باش تحرك'],
  [18.45, 21.3, 'وكاين واحد الجزء فالمخ', 'سميتو الْمُخَيخ'],
  [21.3, 24.7, 'كيساعد يتوقع الإحساس', 'اللي غادي ينتج على هاد الحركة'],
  [24.7, 26.75, 'وكيخفف استجابة المخ ليه', ''],
  [26.75, 29.25, 'ولكن ملي شي واحد آخر', 'كيدغدغك، الوضع كيختلف!'],
  [29.25, 32.4, 'اللمسة كتجيك بشكل أقل توقّعاً،', ''],
  [32.4, 35.0, 'وما كتكونش نتا', 'اللي متحكم فيها'],
  [35.0, 38.1, 'وهاد المفاجأة كتخلي', 'الإحساس أقوى'],
  [38.1, 40.9, 'وكتقدر تخليك تضحك', 'وتتحرك بلا ما تحس!'],
  [40.9, 43, 'يعني السر ماشي غير فالجلد...', ''],
  [43, 46.76, 'السر حتى فالمخ اللي كيتوقع', 'اللمسات قبل ما تحس بيها!'],
] as const;

const clamp = {extrapolateLeft:'clamp' as const, extrapolateRight:'clamp' as const};
const mix = (f:number,a:number,b:number) => interpolate(f,[a,b],[0,1],clamp);
const opacity = (f:number,a:number,b:number) => Math.min(mix(f,a,a+9),1-mix(f,b-9,b));
const cyan = '#58dfff';
const orange = '#ffae4c';

const Pulse:React.FC<{frame:number;color:string;count?:number}> = ({frame,color,count=5}) => <g>{Array.from({length:count},(_,i)=>{
  const progress=((frame+i*20)%100)/100;
  return <circle key={i} cx="0" cy="0" r={35+progress*270} fill="none" stroke={color} strokeWidth={6-3*progress} opacity={(1-progress)*.7}/>;
})}</g>;

const Nerves:React.FC<{frame:number;color:string}> = ({frame,color}) => <g>
  {Array.from({length:21},(_,i)=>{
    const x=(i-10)*120;
    const drift=Math.sin(i*12.7)*210;
    const path=`M ${540+x*1.8} 2050 C ${540+x+drift} 1420 ${540+x*.5-drift} 950 ${540+x*.2} -120`;
    const phase=((frame*1.8+i*19)%400);
    return <g key={i}><path d={path} fill="none" stroke={color} strokeWidth={i%3===0?7:3} opacity=".16"/><path d={path} fill="none" stroke={color} strokeWidth={i%3===0?12:6} opacity=".85" pathLength="400" strokeDasharray="3 397" strokeDashoffset={-phase}/></g>;
  })}
  {Array.from({length:40},(_,i)=>{
    const x=(i*173)%1080;
    const y=((i*127-frame*(1+(i%4)))%2040+2040)%2040;
    return <circle key={i} cx={x} cy={y} r={2+i%4} fill={color} opacity={.2+(i%4)*.1}/>;
  })}
</g>;

const Brain:React.FC<{frame:number;highlight?:boolean}> = ({frame,highlight=false}) => <g>
  <ellipse cx="540" cy="905" rx="295" ry="255" fill="#197cff" opacity={.13+.04*Math.sin(frame/9)}/>
  <path d="M310 960 C260 900 282 792 347 780 C340 687 428 653 475 696 C512 637 587 641 620 692 C692 659 753 710 746 770 C811 794 819 875 768 920 C785 975 742 1027 683 1024 C651 1086 594 1092 548 1061 C499 1097 439 1082 413 1049 C352 1074 297 1025 310 960Z" fill="url(#brain)" stroke="#80e3ff" strokeWidth="8"/>
  <path d="M534 683 C512 758 555 786 532 855 C503 906 557 947 534 1054 M352 781 C403 776 438 811 421 850 M312 925 C367 903 413 919 428 964 M475 696 C444 736 457 772 490 793 M620 698 C587 729 606 769 641 778 M746 780 C692 764 671 808 682 839 M764 920 C714 897 676 926 666 963 M415 1047 C458 1007 489 1022 533 1045 M551 998 C589 966 626 973 660 1005" stroke="#aaeaff" strokeWidth="12" fill="none" strokeLinecap="round" opacity=".85"/>
  <path d="M641 1009 C684 975 748 987 758 1029 C768 1069 723 1097 675 1085 C632 1076 612 1044 641 1009 Z" fill={highlight?orange:'#459fe3'} stroke="#b7f3ff" strokeWidth="7"/>
  {highlight && <g transform="translate(697 1035)"><Pulse frame={frame} color={orange} count={3}/></g>}
</g>;

const Hand:React.FC<{x:number;y:number;scale?:number;flip?:boolean;angle?:number;opacity?:number}> = ({x,y,scale=1,flip=false,angle=0,opacity:alpha=1}) => <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${flip?-scale:scale} ${scale})`} opacity={alpha}><image href={staticFile(art.hand)} x="-385" y="-105" width="410" height="205" preserveAspectRatio="xMidYMid meet"/></g>;

const Art:React.FC<{src:string;x:number;y:number;width:number;height:number;opacity?:number}> = ({src,x,y,width,height,opacity:alpha=1}) => <image href={staticFile(src)} x={x} y={y} width={width} height={height} preserveAspectRatio="xMidYMid slice" opacity={alpha}/>;

const Story:React.FC<{scene:number;frame:number}> = ({scene,frame}) => {
  if (scene===0) {
    const travel=mix(frame,0,140);
    const other=mix(frame,48,65);
    const reveal=mix(frame,138,155);
    return <>
      <rect width="1080" height="1920" fill="#eee4d2"/>
      <g transform={`translate(${-300*travel} ${-260*travel}) scale(${1.28+.35*travel})`}><Art src={art.laughing} x={0} y={0} width={1080} height={1920}/></g>
      <rect width="1080" height="1920" fill="url(#shade)" opacity=".45"/>
      <g transform="translate(790 1280)"><Pulse frame={frame} color={orange} count={3}/></g>
      <Hand x={810+(1-other)*390} y={1270} flip scale={1.55} angle={-15}/>
      <g opacity={reveal} transform={`translate(540 570) scale(${.85+.15*reveal}) translate(-540 -570)`}>
        <text x="540" y="550" textAnchor="middle" fill="white" fontSize="91" fontWeight="700" direction="rtl" paintOrder="stroke" stroke="#081c3e" strokeWidth="10">علاش ما نقدرش</text>
        <text x="540" y="665" textAnchor="middle" fill={orange} fontSize="100" fontWeight="700" direction="rtl" paintOrder="stroke" stroke="#081c3e" strokeWidth="10">ندغدغ راسي؟</text>
      </g>
    </>;
  }
  if(scene===1) {
    const dive=mix(frame,0,135);
    return <>
      <rect width="1080" height="1920" fill="url(#skinbg)"/>
      <g transform={`translate(0 ${-400*dive}) scale(${1+.25*dive})`}>
        <path d="M-100 550 Q170 470 390 540 T850 510 T1200 560 V1050 H-100Z" fill="#f7bea3"/>
        <path d="M-100 550 Q170 470 390 540 T850 510 T1200 560" stroke="#ffe5ce" strokeWidth="42" fill="none"/>
        <path d="M-100 930 Q200 850 420 930 T880 920 T1200 950 V1420 H-100Z" fill="#d5747b"/>
        <path d="M-100 1350 Q200 1280 420 1350 T880 1360 T1200 1330 V2200 H-100Z" fill="#ac5c74"/>
        {[0,1,2,3,4].map(i=><g key={i} transform={`translate(${145+i*200} 1270)`}><path d="M0 550 C-20 390 20 260 0 70 M0 220 Q-50 160 -80 110 M0 175 Q55 135 75 70 M0 115 Q-25 80 -30 30" fill="none" stroke="#ffbf58" strokeWidth="12" strokeLinecap="round"/><circle cy="70" r="18" fill="#fff3b2"/><circle cx="-80" cy="110" r="13" fill="#ffe598"/><circle cx="75" cy="70" r="13" fill="#ffe598"/></g>)}
        <Hand x={580} y={490+18*Math.sin(frame/10)} scale={1.8} angle={15}/>
        <g transform="translate(540 590)"><Pulse frame={frame} color="#fff5bc" count={3}/></g>
      </g>
      <g opacity={mix(frame,115,145)}><Nerves frame={frame} color={orange}/></g>
    </>;
  }
  if(scene===2) return <>
    <rect width="1080" height="1920" fill="url(#deep)"/><Nerves frame={frame*2} color={cyan}/>
    <g transform={`translate(540 970) scale(${.3+mix(frame,50,200)*1.05}) translate(-540 -970)`} opacity={mix(frame,18,45)}><Brain frame={frame} highlight/></g>
    <text x="540" y="1370" textAnchor="middle" fill="white" fontSize="61" fontWeight="700" direction="rtl" opacity={mix(frame,95,120)}>المُخَيخ</text>
  </>;
  if(scene===3) {
    const movement=mix(frame,35,90);
    return <>
      <rect width="1080" height="1920" fill="url(#deep)"/><Nerves frame={frame} color={cyan}/>
      <g transform="translate(-100 -180) scale(1.08)"><Brain frame={frame} highlight/></g>
      <path d="M540 930 C230 1020 220 1190 390 1365" stroke={cyan} fill="none" strokeWidth="7" strokeDasharray="14 14" opacity=".7"/>
      <path d="M540 930 C850 1010 870 1180 715 1365" stroke="#ffd391" fill="none" strokeWidth="7" strokeDasharray="14 14" opacity=".5"/>
      <Hand x={460+120*movement} y={1370} scale={1.25} opacity={.25} />
      <Hand x={460+120*mix(frame,60,120)} y={1370} scale={1.25}/>
      <g transform="translate(590 1370)"><Pulse frame={frame} color={cyan} count={2}/></g>
      <text x="540" y="1580" textAnchor="middle" fill={cyan} fontSize="48" fontWeight="700" direction="rtl">توقّع اللمسة</text>
    </>;
  }
  if(scene===4) {
    const hit=mix(frame,25,43);
    const returnToFace=mix(frame,225,250);
    return <>
      <rect width="1080" height="1920" fill="url(#deep)"/>
      <g opacity={1-returnToFace}><Nerves frame={frame*2.4} color={orange}/><g transform="translate(540 1070)"><Pulse frame={frame*1.7} color={orange}/></g><Hand x={720+(1-hit)*500} y={1280} scale={1.8} flip angle={-12}/>
      <g opacity={mix(frame,50,80)} transform="translate(0 -170)"><Brain frame={frame} highlight/></g></g>
      <g opacity={returnToFace} transform={`translate(${-180*returnToFace} ${-220*returnToFace}) scale(${1.1+.2*returnToFace})`}><Art src={art.laughing} x={0} y={0} width={1080} height={1920}/></g>
      <g opacity={returnToFace} transform="translate(745 1320)"><Pulse frame={frame} color={orange} count={3}/></g>
    </>;
  }
  if(scene===5) return <>
    <rect width="1080" height="1920" fill="#0b2854"/>
    <Art src={art.comparison} x={0} y={340} width={1080} height={1300}/>
    <path d="M540 390 C500 790 580 1090 540 1600" fill="none" stroke={cyan} strokeWidth="8"/>
    <g transform="translate(270 1020)"><Pulse frame={frame} color={cyan} count={2}/></g><g transform="translate(810 1020)"><Pulse frame={frame*1.5} color={orange} count={3}/></g>
    <text x="260" y="1580" textAnchor="middle" fill={cyan} fontSize="43" fontWeight="700">متوقّعة</text><text x="820" y="1580" textAnchor="middle" fill={orange} fontSize="43" fontWeight="700">أقل توقّعاً</text>
  </>;
  return <>
    <rect width="1080" height="1920" fill="url(#deep)"/>
    <g opacity=".2"><Art src={art.science} x={0} y={0} width={1080} height={1920}/></g><Nerves frame={frame} color={cyan}/>
    <g transform={`translate(540 930) scale(${.9+.1*mix(frame,0,120)}) translate(-540 -930)`}><Brain frame={frame} highlight/></g>
    <text x="540" y="1390" textAnchor="middle" fill="white" fontSize="70" fontWeight="700" direction="rtl">السر حتى فالمخ!</text>
    <text x="540" y="1560" textAnchor="middle" fill={orange} fontSize="57" fontWeight="700" direction="rtl">واش عارف؟ ✳</text>
  </>;
};

export const TicklesReel:React.FC = () => {
  const frame=useCurrentFrame();
  const [fontHandle]=React.useState(()=>delayRender('Loading Tajawal'));
  React.useEffect(()=>{
    const face=new FontFace('Tajawal',`url(${staticFile('fonts/darija/Tajawal-Bold.ttf')})`,{weight:'700'});
    face.load().then(font=>{document.fonts.add(font);continueRender(fontHandle);}).catch((error:unknown)=>{console.error(error);continueRender(fontHandle);});
  },[fontHandle]);
  const scenes=[{start:0,end:270},{start:260,end:470},{start:460,end:640},{start:630,end:810},{start:800,end:1120},{start:1110,end:1240},{start:1230,end:1403}];
  const subtitle=cues.find(([start,end])=>frame>=start*30 && frame<end*30);
  return <AbsoluteFill style={{background:'#071a3b',fontFamily:'Tajawal, sans-serif',overflow:'hidden'}}>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute'}}>
      <defs>
        <radialGradient id="deep"><stop stopColor="#164c88"/><stop offset="1" stopColor="#06142e"/></radialGradient>
        <linearGradient id="brain" x2="1" y2="1"><stop stopColor="#64d3ff"/><stop offset=".5" stopColor="#167ad6"/><stop offset="1" stopColor="#0b3876"/></linearGradient>
        <linearGradient id="skinbg" x2="0" y2="1"><stop stopColor="#fff0df"/><stop offset=".45" stopColor="#e59f93"/><stop offset="1" stopColor="#713d68"/></linearGradient>
        <linearGradient id="shade" x2="0" y2="1"><stop stopColor="#05152e"/><stop offset=".5" stopColor="#102e5a" stopOpacity="0"/><stop offset="1" stopColor="#031226"/></linearGradient>
      </defs>
      {scenes.map((scene,index)=>frame>=scene.start && frame<scene.end?<g key={scene.start} opacity={index===0?1:mix(frame,scene.start,scene.start+10)}><Story scene={index} frame={frame-scene.start}/></g>:null)}
    </svg>
    <div dir="rtl" style={{position:'absolute',top:82,right:85,color:'#fff',fontWeight:700,fontSize:30,textShadow:'0 2px 12px #031329'}}>واش عارف؟ <span style={{color:orange}}>✳</span></div>
    {subtitle && <div dir="rtl" lang="ar" style={{position:'absolute',top:200,left:80,right:80,display:'flex',justifyContent:'center',textAlign:'center',opacity:opacity(frame,subtitle[0]*30,subtitle[1]*30)}}><div style={{background:'rgba(4,19,47,.83)',borderRadius:22,padding:'13px 25px',fontWeight:700,fontSize:43,lineHeight:1.4,color:'#fff',maxWidth:920}}><div>{subtitle[2]}</div>{subtitle[3] && <div style={{color:'#ffc077'}}>{subtitle[3]}</div>}</div></div>}
    <Audio src={staticFile(audio)}/>
  </AbsoluteFill>;
};
export const TicklesComposition:React.FC = () => <Composition id="Wach3arefTicklesReel" component={TicklesReel} durationInFrames={1403} fps={30} width={1080} height={1920}/>;
