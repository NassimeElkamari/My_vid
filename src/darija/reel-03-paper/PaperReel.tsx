import React from 'react';
import {AbsoluteFill,Audio,Composition,continueRender,delayRender,interpolate,staticFile,useCurrentFrame} from 'remotion';

const voice = 'reel3/ElevenLabs_2026-11-21T13_43_33_Badr - Warm Moroccan Darija Narrator_pvc_s43_sim75_v4.mp3';
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

const limits={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ramp=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],limits);
const ink='#183b3a';
const coral='#df654e';
const cream='#f8edcf';
const yellow='#eebf61';
const teal='#4d867b';
const assets={brain:'reel3-paper/brain.png',touch:'reel3-paper/touch.png',skin:'reel3-paper/skin.png'};

const Asset:React.FC<{src:string;x:number;y:number;w:number;h:number;angle?:number;scale?:number;opacity?:number}>=({src,x,y,w,h,angle=0,scale=1,opacity=1})=><g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`} opacity={opacity}><image href={staticFile(src)} x={-w/2} y={-h/2} width={w} height={h} preserveAspectRatio="xMidYMid meet" /></g>;
const Title:React.FC<{text:string;x?:number;y:number;size?:number;color?:string}>=({text,x=540,y,size=70,color=ink})=><text x={x} y={y} fill={color} textAnchor="middle" fontSize={size} fontWeight="700" direction="rtl">{text}</text>;
const Ring:React.FC<{x:number;y:number;frame:number;color:string}>=({x,y,frame,color})=><g transform={`translate(${x} ${y})`}>{[0,1,2].map(i=>{const t=((frame+i*25)%75)/75;return <circle key={i} r={25+t*170} fill="none" stroke={color} strokeWidth={5*(1-t)+1} opacity={.7*(1-t)} />;})}</g>;
const Scribble:React.FC<{frame:number;color:string;path:string}>=({frame,color,path})=><g><path d={path} fill="none" stroke={color} opacity=".24" strokeWidth="8" strokeLinecap="round"/><path d={path} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" pathLength="100" strokeDasharray={`${ramp(frame,0,55)*100} 100`}/></g>;
const Strokes:React.FC<{x:number;y:number;frame:number;color:string}>=({x,y,frame,color})=><g transform={`translate(${x} ${y}) rotate(${Math.sin(frame/12)*8})`}>{[0,1,2,3,4,5,6,7].map(i=><path key={i} d="M0 -85 L0 -135" transform={`rotate(${i*45})`} stroke={color} strokeWidth="14" strokeLinecap="round" opacity={.6+.4*Math.sin((frame+i*4)/11)**2}/>)}</g>;

const Scene:React.FC<{index:number;frame:number}>=({index,frame})=>{
  const progress=ramp(frame,0,110);
  if(index===0)return <>
    <rect width="1080" height="1920" fill={cream}/><circle cx="820" cy="820" r="380" fill="#b8d1b6"/><circle cx="170" cy="1340" r="250" fill="#eab595"/>
    <Title text="علاش الدغدغة؟" y={535} size={93}/>
    <Asset src={assets.touch} x={540+40*Math.sin(frame/28)} y={1080} w={1140} h={850} angle={-8+progress*7} scale={1+progress*.1}/>
    <Ring x={500} y={1110} frame={frame} color={coral}/><Strokes x={800} y={730} frame={frame} color={coral}/>
    <Title text="واحد آخر..." x={760} y={1540} size={54} color={coral}/>
  </>;
  if(index===1)return <>
    <rect width="1080" height="1920" fill="#dfe5c9"/><path d="M0 930 Q320 680 550 830 T1080 770 V1920 H0Z" fill="#5b9985"/>
    <Title text="ولكن راسك؟" y={530} size={100}/>
    <Asset src={assets.touch} x={560} y={1010} w={1160} h={780} angle={6*Math.sin(frame/30)} scale={1.04+progress*.09}/>
    <Ring x={460} y={1100} frame={frame} color={cream}/><Title text="الإحساس مختلف" y={1580} size={54} color={cream}/>
  </>;
  if(index===2)return <>
    <rect width="1080" height="1920" fill="#e6b78a"/><circle cx="540" cy="1040" r="470" fill="#f6e6c7"/>
    <Title text="الجواب فالمخ" y={535} size={98}/>
    <Asset src={assets.brain} x={540} y={1035} w={1130} h={800} angle={-4+8*progress} scale={.86+.16*progress}/>
    <Strokes x={845} y={820} frame={frame} color={coral}/><Strokes x={235} y={1200} frame={frame+12} color={teal}/>
  </>;
  if(index===3)return <>
    <rect width="1080" height="1920" fill="#f3e8c9"/><path d="M0 720 Q480 500 1080 760 V1150 Q500 980 0 1250Z" fill="#c5d5b6"/>
    <Title text="أمر من المخ" y={500} size={72}/>
    <Asset src={assets.brain} x={540} y={820} w={750} h={500} angle={-4} scale={.9+.1*progress}/>
    <Scribble path="M520 1020 C810 1040 840 1220 650 1330" frame={frame} color={coral}/>
    <Asset src={assets.touch} x={525} y={1450} w={800} h={540} angle={-3+3*progress}/>
    <circle cx="650" cy="1320" r="26" fill={coral}/>
  </>;
  if(index===4)return <>
    <rect width="1080" height="1920" fill="#bcd4b7"/><circle cx="545" cy="1025" r="460" fill="#f4e7c9"/>
    <Title text="الْمُخَيخ" y={520} size={91}/><Title text="كيتوقّع اللمسة" y={610} size={49} color={coral}/>
    <Asset src={assets.brain} x={540} y={1040} w={1150} h={780} angle={-2} scale={1+progress*.08}/>
    <Ring x={790} y={1195} frame={frame} color={coral}/><Scribble path="M785 1160 C960 1200 920 1420 730 1435" frame={frame} color={coral}/>
  </>;
  if(index===5)return <>
    <rect width="1080" height="1920" fill="#f3e5c5"/><Title text="الإحساس كيتخفّف" y={515} size={73}/>
    <Asset src={assets.skin} x={540} y={1060} w={1160} h={850} scale={1+progress*.14}/>
    <Ring x={470} y={1000} frame={frame} color={coral}/>
    <path d="M195 1500 H885" stroke={ink} strokeWidth="12" strokeLinecap="round" opacity=".2"/><path d={`M195 1500 H${195+690*(1-.7*progress)}`} stroke={teal} strokeWidth="12" strokeLinecap="round"/>
    <Title text="متوقّع، ماشي منعدم" y={1600} size={45} color={teal}/>
  </>;
  if(index===6)return <>
    <rect width="1080" height="1920" fill="#d96a51"/><circle cx="540" cy="1020" r="480" fill="#f3dfb7"/>
    <Title text="شي واحد آخر؟" y={520} size={84} color={cream}/>
    <Asset src={assets.touch} x={800-250*progress} y={1050} w={1100} h={760} angle={-10+progress*7}/>
    <Ring x={465} y={1090} frame={frame} color={coral}/><Strokes x={750} y={850} frame={frame} color={coral}/>
    <Title text="المفاجأة!" y={1590} size={79} color={cream}/>
  </>;
  if(index===7)return <>
    <rect width="1080" height="1920" fill="#f4e8ca"/><path d="M0 1180 Q440 950 1080 1110 V1920 H0Z" fill="#e8b396"/>
    <Title text="إشارة أقل توقّعاً" y={510} size={73}/>
    <Asset src={assets.skin} x={540} y={1240} w={1020} h={680} scale={1+progress*.08}/>
    <Asset src={assets.brain} x={540} y={780} w={800} h={500} angle={4} />
    <Scribble path="M540 1300 C220 1200 320 950 485 925" frame={frame} color={coral}/>
    <Ring x={490} y={945} frame={frame} color={coral}/>
  </>;
  if(index===8)return <>
    <rect width="1080" height="1920" fill="#b6d0b5"/><Title text="نفس اللمسة؟" y={525} size={84}/>
    <g transform="translate(0 0)"><circle cx="280" cy="1000" r="245" fill={cream}/><circle cx="800" cy="1000" r="245" fill="#e3b08f"/>
    <Asset src={assets.touch} x={280} y={1000} w={530} h={400} angle={-8}/><Asset src={assets.touch} x={800} y={1000} w={530} h={400} angle={8}/>
    <Ring x={800} y={1030} frame={frame} color={coral}/></g>
    <Title text="متوقّعة" x={280} y={1390} size={48}/><Title text="مفاجئة" x={800} y={1390} size={48} color={coral}/>
  </>;
  return <>
    <rect width="1080" height="1920" fill={cream}/><circle cx="540" cy="990" r="470" fill="#b8d2b6"/>
    <Title text="السر حتى فالمخ!" y={520} size={79}/>
    <Asset src={assets.brain} x={540} y={1010} w={1050} h={740} angle={-4+progress*8} scale={1+progress*.05}/>
    <Strokes x={190} y={850} frame={frame} color={coral}/><Strokes x={870} y={1200} frame={frame+12} color={yellow}/>
    <Title text="واش عارف؟ ✳" y={1585} size={80}/>
  </>;
};

export const PaperReel:React.FC=()=>{
  const frame=useCurrentFrame();
  const [fontHandle]=React.useState(()=>delayRender('Loading Tajawal'));
  React.useEffect(()=>{const face=new FontFace('Tajawal',`url(${staticFile('fonts/darija/Tajawal-Bold.ttf')})`,{weight:'700'});face.load().then(font=>{document.fonts.add(font);continueRender(fontHandle);}).catch((error:unknown)=>{console.error(error);continueRender(fontHandle);});},[fontHandle]);
  const scenes=[{start:0,end:105},{start:95,end:205},{start:195,end:350},{start:340,end:510},{start:500,end:655},{start:645,end:810},{start:800,end:950},{start:940,end:1110},{start:1100,end:1260},{start:1250,end:1403}];
  const subtitle=cues.find(([start,end])=>frame>=start*30&&frame<end*30);
  return <AbsoluteFill style={{background:cream,overflow:'hidden',fontFamily:'Tajawal,sans-serif'}}>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute'}}>{scenes.map((scene,index)=>frame>=scene.start&&frame<scene.end?<g key={scene.start} opacity={index===0?1:ramp(frame,scene.start,scene.start+10)}><Scene index={index} frame={frame-scene.start}/></g>:null)}</svg>
    <div dir="rtl" style={{position:'absolute',top:82,right:85,fontWeight:700,fontSize:32,color:ink}}>واش عارف؟ <span style={{color:coral}}>✳</span></div>
    {subtitle&&<div dir="rtl" lang="ar" style={{position:'absolute',top:210,left:80,right:80,display:'flex',justifyContent:'center',textAlign:'center',opacity:Math.min(ramp(frame,subtitle[0]*30,subtitle[0]*30+7),1-ramp(frame,subtitle[1]*30-7,subtitle[1]*30))}}><div style={{background:ink,borderRadius:18,padding:'13px 25px',fontWeight:700,fontSize:43,lineHeight:1.4,color:cream,maxWidth:920}}><div>{subtitle[2]}</div>{subtitle[3]&&<div style={{color:'#ffc584'}}>{subtitle[3]}</div>}</div></div>}
    <Audio src={staticFile(voice)}/>
  </AbsoluteFill>;
};
export const PaperComposition:React.FC=()=> <Composition id="Wach3arefTicklesPaper" component={PaperReel} durationInFrames={1403} fps={30} width={1080} height={1920}/>;
