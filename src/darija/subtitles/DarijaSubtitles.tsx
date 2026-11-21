import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {subtitleCues} from "./timing";

/** Keep highlighting at word boundaries, so Arabic letters remain joined. */
const Line: React.FC<{text:string; highlights:readonly string[]}> = ({text, highlights}) => {
  const parts: React.ReactNode[] = [];
  let pos = 0;
  while (pos < text.length) {
    const matches = highlights.map((word) => ({word, index:text.indexOf(word, pos)})).filter((match) => match.index >= 0).sort((a,b) => a.index-b.index);
    const match = matches[0];
    if (!match) { parts.push(text.slice(pos)); break; }
    if (match.index > pos) parts.push(text.slice(pos, match.index));
    parts.push(<span key={`${match.index}-${match.word}`} style={{color:"#FFB269"}}>{match.word}</span>);
    pos = match.index + match.word.length;
  }
  return <>{parts}</>;
};

export const DarijaSubtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const cue = subtitleCues.find((item) => frame >= item.start && frame < item.end);
  if (!cue) return null;
  const local = frame - cue.start;
  const remaining = cue.end - frame;
  const opacity = Math.min(interpolate(local,[0,4],[0,1],{extrapolateRight:"clamp"}),interpolate(remaining,[0,4],[0,1],{extrapolateRight:"clamp"}));
  const rise = interpolate(local,[0,6],[12,0],{extrapolateRight:"clamp"});
  return <AbsoluteFill style={{pointerEvents:"none",justifyContent:"flex-start",alignItems:"center",paddingTop:cue.top ?? 300}}>
    <div dir="rtl" lang="ar" style={{opacity,transform:`translateY(${rise}px)`,maxWidth:880,boxSizing:"border-box",padding:"15px 30px 13px",borderRadius:24,backgroundColor:"rgba(20, 45, 82, 0.94)",boxShadow:"0 5px 18px rgba(12, 37, 74, .16)",color:"#FFF9EC",fontFamily:"Tajawal, sans-serif",fontSize:46,fontWeight:700,lineHeight:1.32,textAlign:"center",unicodeBidi:"plaintext"}}>
      {cue.lines.map((line) => <div key={line} style={{whiteSpace:"nowrap"}}><Line text={line} highlights={cue.highlights}/></div>)}
    </div>
  </AbsoluteFill>;
};
