import React from 'react';
import {AbsoluteFill, Audio, Composition, interpolate, staticFile, useCurrentFrame, delayRender, continueRender} from 'remotion';

const audio = 'reel3/ElevenLabs_2026-11-21T13_43_33_Badr - Warm Moroccan Darija Narrator_pvc_s43_sim75_v4.mp3';
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

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = (v: number, a: number, b: number) => interpolate(v, [a,b], [0,1], clamp);
const fade = (frame: number, start: number, end: number) => Math.min(ease(frame,start,start+8), 1-ease(frame,end-8,end));
const blue = '#4ad8ff';
const gold = '#ffc45a';

const Brain: React.FC<{x:number; y:number; scale?:number; pulse:number; highlight?:boolean}> = ({x,y,scale=1,pulse,highlight=false}) => <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <ellipse cx="0" cy="10" rx="205" ry="177" fill="#197bff" opacity={0.12 + 0.08*Math.sin(pulse/9)} />
  <path d="M-162 33 C-195 -14 -175 -76 -130 -85 C-140 -143 -78 -166 -45 -139 C-17 -178 38 -172 63 -139 C110 -157 151 -123 146 -83 C190 -68 195 -13 163 17 C172 56 139 94 101 90 C80 128 41 134 11 111 C-18 132 -58 127 -76 101 C-121 116 -156 84 -151 51 Z" fill="#2078dc" stroke="#81dfff" strokeWidth="7" />
  <path d="M0 -145 C-16 -95 18 -76 0 -30 C-20 7 16 31 0 109 M-128 -84 C-92 -86 -72 -61 -83 -32 M-152 20 C-115 3 -83 13 -70 43 M-40 -132 C-66 -103 -60 -77 -38 -65 M57 -124 C37 -102 49 -78 74 -72 M143 -72 C106 -79 92 -49 99 -27 M155 23 C118 4 91 18 83 48 M-67 91 C-45 71 -22 73 -1 88 M19 63 C42 46 64 48 84 70" fill="none" stroke="#a9eaff" strokeWidth="8" strokeLinecap="round" />
  <path d="M75 77 C111 60 151 73 155 102 C156 129 133 143 99 139 C68 137 52 115 58 96 Z" fill={highlight ? gold : '#48a7ea'} stroke="#d0eeff" strokeWidth="5" />
  {highlight && <circle cx="106" cy="105" r={39 + 6*Math.sin(pulse/5)} fill="none" stroke={gold} strokeWidth="5" opacity=".7" />}
</g>;

const Finger: React.FC<{x:number; y:number; flip?:boolean; frame:number}> = ({x,y,flip=false,frame}) => <g transform={`translate(${x} ${y + Math.sin(frame/8)*13}) scale(${flip ? -1 : 1} 1)`}>
  <image href={staticFile('reel3/pointing-hand.png')} x="-330" y="-88" width="350" height="145" preserveAspectRatio="xMidYMid meet" />
</g>;

const Label: React.FC<{x:number;y:number;children:React.ReactNode;accent?:string}> = ({x,y,children,accent=blue}) => <g transform={`translate(${x} ${y})`}>
  <text textAnchor="middle" dominantBaseline="central" fill="white" fontSize="31" fontFamily="Tajawal" fontWeight="700">{children}</text>
  <path d="M-65 35 H65" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity=".8" />
</g>;

const Signal: React.FC<{path:string; frame:number; color?:string; speed?:number}> = ({path,frame,color=gold,speed=75}) => <g><path d={path} fill="none" stroke={color} opacity=".23" strokeWidth="8" strokeLinecap="round"/><path d={path} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray="5 350" pathLength="350" strokeDashoffset={-((frame%speed)/speed)*350} /></g>;

const Scene: React.FC<{kind:number;frame:number}> = ({kind,frame}) => {
  if (kind === 0) {
    const showOther = ease(frame, 8, 24);
    const showSelf = ease(frame, 91, 107);
    const showQuestion = ease(frame, 202, 216);
    const zoom = 1 + .06 * ease(frame, 30, 85);
    return <>
      <text x="540" y="465" textAnchor="middle" fill="white" fontSize="76" fontWeight="700" opacity={1-showQuestion}>علاش الدغدغة؟</text>
      <g opacity={1-showQuestion} transform={`translate(540 1000) scale(${zoom}) translate(-540 -1000)`}>
        <g opacity={showOther} transform={`translate(${(1-showOther)*100} 0)`}>
          <rect x="560" y="600" width="440" height="680" rx="45" fill="#123466" stroke="#ffc45a" strokeWidth="3"/>
          <Label x={780} y={685} accent={gold}>شي واحد آخر</Label>
          <Brain x={780} y={900} scale={0.73} pulse={frame} highlight />
          <Finger x={815} y={1100} flip frame={frame}/>
          {[0,1,2].map(i => <circle key={i} cx="780" cy="1100" r={30+((frame+i*16)%48)*2} fill="none" stroke={gold} strokeWidth="4" opacity={.65*(1-((frame+i*16)%48)/48)}/>)}
          <text x="780" y="1220" textAnchor="middle" fill={gold} fontSize="43" fontWeight="700">مفاجئة!</text>
        </g>
        <g opacity={showSelf} transform={`translate(${-(1-showSelf)*100} 0)`}>
          <rect x="80" y="600" width="440" height="680" rx="45" fill="#123466" stroke="#337fda" strokeWidth="3"/>
          <Label x={300} y={685}>أنا كندغدغ راسي</Label>
          <Brain x={300} y={900} scale={0.73} pulse={frame}/>
          <Finger x={335} y={1100} frame={frame}/>
          <text x="300" y="1220" textAnchor="middle" fill={blue} fontSize="43" fontWeight="700">متوقّعة</text>
        </g>
      </g>
      <g opacity={showQuestion} transform={`translate(540 920) scale(${.8+.2*showQuestion}) translate(-540 -920)`}>
        <text x="540" y="545" textAnchor="middle" fill="white" fontSize="62" fontWeight="700">الجواب فالمخ!</text>
        <Brain x={540} y={920} scale={1.55} pulse={frame} highlight />
        <Signal path="M 140 1260 C 260 1130 330 1090 385 1020" frame={frame} color={blue}/>
        <Signal path="M 940 1260 C 820 1130 750 1090 695 1020" frame={frame+20}/>
        <text x="540" y="1390" textAnchor="middle" fill={gold} fontSize="52" fontWeight="700">المخ كيتوقّع الإحساس</text>
      </g>
    </>;
  }
  if (kind === 1) return <>
    <Label x={540} y={510}>من الجلد حتى للمخ</Label>
    <Brain x={540} y={745} scale={1.05} pulse={frame} highlight />
    <Signal path="M 535 1455 C 410 1300 700 1240 540 1010" frame={frame} />
    <g transform="translate(140 1380)"><path d="M0 90 Q200 25 400 90 T800 90 L800 240 L0 240Z" fill="#c46670"/><path d="M0 90 Q200 25 400 90 T800 90" fill="none" stroke="#ffc3a3" strokeWidth="30"/><path d="M400 220 C400 160 380 122 350 103 M400 220 C400 160 425 125 448 108 M400 220 V123" stroke={gold} strokeWidth="10" fill="none" strokeLinecap="round"/></g>
    <Finger x={585} y={1378} frame={frame}/>
    <Label x={540} y={1690} accent={gold}>مستقبلات اللمس · الأعصاب</Label>
  </>;
  if (kind === 2) return <>
    <Label x={540} y={505}>المخ كيعطي الأمر</Label>
    <Brain x={540} y={790} scale={1.05} pulse={frame} highlight />
    <Label x={800} y={1020} accent={gold}>المُخَيخ</Label>
    <Signal path="M 380 930 C 140 1020 150 1250 360 1365" frame={frame} color={blue}/>
    <Signal path="M 700 1360 C 925 1245 920 1030 705 930" frame={frame+30} color={gold}/>
    <Finger x={580} y={1370} frame={frame}/><circle cx="580" cy="1370" r={40+8*Math.sin(frame/7)} fill="none" stroke={gold} strokeWidth="5"/>
    <text x="220" y="1160" fill={blue} fontSize="35" fontWeight="700" textAnchor="middle">أمر الحركة</text><text x="850" y="1160" fill={gold} fontSize="35" fontWeight="700" textAnchor="middle">توقّع اللمسة</text>
  </>;
  if (kind === 3) return <>
    <Label x={540} y={520}>شنو كيوقع للإحساس؟</Label>
    <Brain x={540} y={780} scale={1.05} pulse={frame} highlight />
    <Signal path="M 540 1420 C 450 1220 450 1100 510 1010" frame={frame}/>
    <Finger x={580} y={1430} frame={frame}/>
    <text x="292" y="1142" fill="white" fontSize="31" textAnchor="middle">توقّع اللمسة</text>
    <text x="788" y="1142" fill="white" fontSize="31" textAnchor="middle">اللمسة الفعلية</text>
    <text x="540" y="1640" fill={blue} fontSize="48" textAnchor="middle" fontWeight="700">إحساس متوقّع ← استجابة أخف</text>
  </>;
  if (kind === 4) return <>
    <Label x={540} y={520} accent={gold}>ملي شي واحد آخر كيدغدغك</Label>
    <Brain x={540} y={780} scale={1.05 + .22*ease(frame,145,200) - .22*ease(frame,270,320)} pulse={frame} highlight />
    <Signal path="M 540 1430 C 410 1280 665 1150 540 1000" frame={frame} speed={42}/>
    <Finger x={585} y={1435} flip frame={frame}/>
    {[0,1,2].map(i=><circle key={i} cx="540" cy="1435" r={40+((frame+i*18)%54)*2} fill="none" stroke={gold} strokeWidth="5" opacity={1-((frame+i*18)%54)/54}/>)}
    <g opacity={fade(frame,0,145)}><text x="540" y="1620" fill={gold} fontSize="49" textAnchor="middle" fontWeight="700">لمسة أقل توقّعاً</text></g>
    <g opacity={fade(frame,145,285)}><text x="540" y="1620" fill={gold} fontSize="49" textAnchor="middle" fontWeight="700">المفاجأة كتقوّي الإحساس</text></g>
    <g opacity={ease(frame,285,300)}><text x="540" y="1620" fill={gold} fontSize="49" textAnchor="middle" fontWeight="700">وقدّاش كتجيك مفاجئة!</text></g>
  </>;
  return <>
    <Brain x={540} y={930} scale={1.35} pulse={frame} highlight />
    <Signal path="M 210 1310 C 275 1200 350 1150 440 1080" frame={frame}/><Signal path="M 870 1310 C 805 1200 730 1150 640 1080" frame={frame+30} color={blue}/>
    <text x="540" y="600" textAnchor="middle" fontSize="59" fontWeight="700" fill="white">السر حتى فالمخ!</text>
    <text x="540" y="1370" textAnchor="middle" fontSize="45" fontWeight="700" fill={gold}>كيتوقّع اللمسات قبل ما تحس بيها</text>
    <text x="540" y="1530" textAnchor="middle" fontSize="57" fontWeight="700" fill="white">واش عارف؟ <tspan fill={gold}>✳</tspan></text>
  </>;
};

export const TicklesReel: React.FC = () => {
  const frame = useCurrentFrame();
  const [fontHandle] = React.useState(() => delayRender('Loading Tajawal'));
  React.useEffect(() => {
    const face = new FontFace('Tajawal', `url(${staticFile('fonts/darija/Tajawal-Bold.ttf')})`, {weight:'700'});
    face.load().then(font => {document.fonts.add(font); continueRender(fontHandle);}).catch((error:unknown) => {console.error(error); continueRender(fontHandle);});
  }, [fontHandle]);
  const scenes = [{start:0,end:350},{start:340,end:560},{start:550,end:735},{start:725,end:810},{start:800,end:1225},{start:1215,end:1403}];
  const subtitle = cues.find(([start,end]) => frame >= start*30 && frame < end*30);
  return <AbsoluteFill style={{background:'radial-gradient(circle at 50% 43%, #123e78 0%, #071c43 72%)', overflow:'hidden', fontFamily:'Tajawal, sans-serif'}}>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute'}}>
      <defs><pattern id="dots" width="90" height="90" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2" fill="#56baff" opacity=".22"/></pattern></defs><rect width="1080" height="1920" fill="url(#dots)"/>
      {scenes.map((scene,index) => frame >= scene.start && frame < scene.end ? <g key={scene.start} opacity={index === 0 ? 1 : ease(frame,scene.start,scene.start+10)}><g transform={`translate(540 1030) scale(${1 + .035 * Math.sin((frame-scene.start)/65)}) translate(-540 -1030)`}><Scene kind={index} frame={frame-scene.start}/></g></g> : null)}
    </svg>
    <div dir="rtl" style={{position:'absolute',top:85,right:90,color:'#e4f6ff',fontSize:31}}>واش عارف؟ <span style={{color:gold}}>✳</span></div>
    {subtitle && <div dir="rtl" lang="ar" style={{position:'absolute',top:210,left:75,right:75,display:'flex',justifyContent:'center',textAlign:'center'}}><div style={{background:'rgba(4,19,47,.93)',border:'1px solid #3465a5',borderRadius:22,padding:'13px 24px',fontWeight:700,fontSize:43,lineHeight:1.38,color:'#fff',maxWidth:930,opacity:fade(frame,subtitle[0]*30,subtitle[1]*30)}}><div>{subtitle[2]}</div>{subtitle[3] && <div style={{color:'#ffc077'}}>{subtitle[3]}</div>}</div></div>}
    <Audio src={staticFile(audio)} />
  </AbsoluteFill>;
};
export const TicklesComposition: React.FC = () => <Composition id="Wach3arefTicklesReel" component={TicklesReel} durationInFrames={1403} fps={30} width={1080} height={1920} />;
