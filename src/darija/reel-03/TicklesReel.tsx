import React from 'react';
import {AbsoluteFill, Audio, Composition, Img, interpolate, staticFile, useCurrentFrame, delayRender, continueRender} from 'remotion';

const audio = 'reel3/ElevenLabs_2026-11-21T13_43_33_Badr - Warm Moroccan Darija Narrator_pvc_s43_sim75_v4.mp3';
const images = [
  'reel3/Image ChatGPT 21 nov. 2026, 13_31_36-3.png',
  'reel3/Image ChatGPT 21 nov. 2026, 13_31_35-2.png',
  'reel3/Image ChatGPT 21 nov. 2026, 13_31_34-1.png',
];
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
const fade = (frame: number, start: number, end: number) => Math.min(interpolate(frame,[start,start+12],[0,1],clamp),interpolate(frame,[end-12,end],[1,0],clamp));

export const TicklesReel: React.FC = () => {
  const frame = useCurrentFrame();
  const [fontHandle] = React.useState(() => delayRender('Loading Tajawal'));
  React.useEffect(() => {
    const face = new FontFace('Tajawal', `url(${staticFile('fonts/darija/Tajawal-Bold.ttf')})`, {weight: '700'});
    face.load().then((font) => {document.fonts.add(font); continueRender(fontHandle);}).catch((error: unknown) => {console.error(error); continueRender(fontHandle);});
  }, [fontHandle]);
  const segments = [
    {image: 0, start: 0, end: 360},
    {image: 1, start: 348, end: 560},
    {image: 0, start: 548, end: 807},
    {image: 2, start: 795, end: 1055},
    {image: 1, start: 1043, end: 1235},
    {image: 0, start: 1223, end: 1403},
  ];
  const subtitle = cues.find(([start, end]) => frame >= start*30 && frame < end*30);
  return <AbsoluteFill style={{backgroundColor:'#071d45', overflow:'hidden', fontFamily:'Tajawal, sans-serif'}}>
    {segments.map((segment, index) => {
      const local = frame-segment.start;
      if (local < 0 || frame >= segment.end) return null;
      const opacity = index === 0 ? 1 : interpolate(local,[0,12],[0,1],clamp);
      const scale = 1.04 + Math.max(0,local) * 0.00023;
      return <AbsoluteFill key={segment.start} style={{opacity, transform:`scale(${scale})`, transformOrigin:index === 2 ? '60% 45%' : '50% 55%'}}>
        <Img src={staticFile(images[segment.image])} style={{width:'100%',height:'100%',objectFit:'cover'}} />
      </AbsoluteFill>;
    })}
    {frame >= 348 && frame < 560 && <AbsoluteFill style={{pointerEvents:'none',opacity:fade(frame,348,560)}}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute'}}>
        <circle cx="585" cy="1315" r={12 + 8*Math.sin(frame/5)} fill="#fff3ad" opacity=".85" />
        <circle cx={585 + 185*((frame%70)/70)} cy={1315 - 705*((frame%70)/70)} r="12" fill="#ffbf43" style={{filter:'drop-shadow(0 0 16px #ffae00)'}} />
      </svg>
    </AbsoluteFill>}
    {frame >= 560 && frame < 800 && <div dir="rtl" style={{position:'absolute',top:245,right:100,background:'rgba(5,28,69,.88)',border:'2px solid #2bbdff',borderRadius:22,color:'#fff',padding:'12px 28px',fontSize:42,opacity:fade(frame,560,800)}}>المُخَيخ <span style={{color:'#ffb94f'}}>●</span> التوقّع</div>}
    <div style={{position:'absolute',top:85,right:90,color:'#fff',fontSize:31,textShadow:'0 2px 10px #001b50'}} dir="rtl">واش عارف؟ <span style={{color:'#ffb83f'}}>✳</span></div>
    {subtitle && <div dir="rtl" lang="ar" style={{position:'absolute',top:340,left:85,right:85,display:'flex',justifyContent:'center',textAlign:'center',pointerEvents:'none'}}>
      <div style={{background:'rgba(5,25,62,.93)',boxShadow:'0 8px 25px #03143066',borderRadius:24,padding:'16px 27px',fontWeight:700,fontSize:47,lineHeight:1.38,color:'#fff',maxWidth:910,opacity:fade(frame,subtitle[0]*30,subtitle[1]*30)}}>
        <div>{subtitle[2]}</div>{subtitle[3] && <div style={{color:'#ffc077'}}>{subtitle[3]}</div>}
      </div>
    </div>}
    <Audio src={staticFile(audio)} />
  </AbsoluteFill>;
};

export const TicklesComposition: React.FC = () => <Composition id="Wach3arefTicklesReel" component={TicklesReel} durationInFrames={1403} fps={30} width={1080} height={1920} />;
