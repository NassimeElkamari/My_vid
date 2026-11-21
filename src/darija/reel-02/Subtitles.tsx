import React from "react";
import {AbsoluteFill,interpolate,useCurrentFrame} from "remotion";
import {cues} from "./timing";
const clamp={extrapolateLeft:"clamp" as const,extrapolateRight:"clamp" as const};
export const Reel02Subtitles:React.FC = () => {
 const frame=useCurrentFrame(); const cue=cues.find(c=>frame>=c.start && frame<c.end); if(!cue)return null;
 const opacity=Math.min(interpolate(frame-cue.start,[0,4],[0,1],clamp),interpolate(cue.end-frame,[0,4],[0,1],clamp));
 const y=interpolate(frame-cue.start,[0,6],[10,0],clamp);
 return <AbsoluteFill style={{pointerEvents:"none",alignItems:"center",justifyContent:"flex-start",paddingTop:245}}>
  <div dir="rtl" lang="ar" style={{opacity,transform:`translateY(${y}px)`,textAlign:"center",color:"#FFF9EB",fontFamily:"Reel02Tajawal, sans-serif",fontWeight:700,fontSize:52,lineHeight:1.33,background:"rgba(7,26,63,.92)",boxShadow:"0 12px 28px #07193728",borderRadius:22,padding:"14px 28px 12px",maxWidth:880,boxSizing:"border-box",unicodeBidi:"plaintext"}}>
   {cue.lines.map(line=>{const word=cue.highlight;const index=word?line.indexOf(word):-1;return <div key={line} style={{whiteSpace:"nowrap"}}>{index<0?line:<>{line.slice(0,index)}<span style={{color:"#FFB16E"}}>{word}</span>{line.slice(index+(word?.length??0))}</>}</div>})}
  </div>
 </AbsoluteFill>
};
