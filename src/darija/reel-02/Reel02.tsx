import React from "react";
import {AbsoluteFill,Audio,Composition,Sequence,continueRender,delayRender,interpolate,staticFile,useCurrentFrame} from "remotion";
import {SceneCanvas} from "./Visuals";
import {Reel02Subtitles} from "./Subtitles";
import {reel02Timing} from "./timing";

const clamp={extrapolateLeft:"clamp" as const,extrapolateRight:"clamp" as const};
const cues=[{from:151,gain:.014},{from:379,gain:.012},{from:1007,gain:.014}];
const Reel02Audio:React.FC=()=> <>
 <Audio src={staticFile("audio/darija/wach3aref-reel-02-voice-master.wav")}/>
 <Audio src={staticFile("audio/darija/audio-test/little-bells-diego-nava.mp3")} volume={frame=>.0316*Math.min(interpolate(frame,[0,45],[0,1],clamp),interpolate(frame,[1547,1607],[1,0],clamp))}/>
 {cues.map(c=><Sequence key={c.from} from={c.from} durationInFrames={29}><Audio src={staticFile("audio/sfx/global-coordination-impact.wav")} trimBefore={11} volume={f=>c.gain*Math.min(interpolate(f,[0,2],[0,1],clamp),interpolate(f,[22,29],[1,0],clamp))}/></Sequence>)}
</>;
const Reel02:React.FC=()=> {
 const frame=useCurrentFrame();const [handle]=React.useState(()=>delayRender("Loading Reel 02 Arabic font"));
 React.useEffect(()=>{const face=new FontFace("Reel02Tajawal",`url(${staticFile("fonts/darija/Tajawal-Bold.ttf")})`,{weight:"700"});face.load().then(loaded=>{document.fonts.add(loaded);continueRender(handle)}).catch((error:unknown)=>{console.error(error);continueRender(handle)});},[handle]);
 return <AbsoluteFill style={{overflow:"hidden"}}>
  {reel02Timing.sceneStarts.slice(0,-1).map((start,i)=>{const end=reel02Timing.sceneStarts[i+1];const fade=reel02Timing.fadeFrames;if(frame<start-(i?fade:0)||frame>=end+(i<5?fade:0))return null;const opacity=i?interpolate(frame,[start-fade,start+fade],[0,1],clamp):1;return <AbsoluteFill key={start} style={{opacity}}><SceneCanvas index={i} frame={Math.max(0,frame-start)}/></AbsoluteFill>})}
  <Reel02Audio/><Reel02Subtitles/>
 </AbsoluteFill>;
};
export const Reel02Composition:React.FC=()=> <Composition id="Wach3arefVoiceIdentityReel02" component={Reel02} durationInFrames={reel02Timing.duration} fps={reel02Timing.fps} width={1080} height={1920}/>;
