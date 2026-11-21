import React from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  Img,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const FPS = 30;
const DURATION = 7 * FPS;
const SOURCE_WIDTH = 1672;
const SOURCE_HEIGHT = 941;
const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};
const mix = (frame: number, range: number[], values: number[]) =>
  interpolate(frame, range, values, clamp);
const smooth = (value: number) => value * value * (3 - 2 * value);

// These layers share the reference image's coordinate system so that the rain
// remains registered to the panes during the camera move.
const Weather: React.FC<{frame: number; flash: number}> = ({frame, flash}) => (
  <svg viewBox={`0 0 ${SOURCE_WIDTH} ${SOURCE_HEIGHT}`} style={{position: "absolute", inset: 0, width: "100%", height: "100%"}}>
    <defs>
      <clipPath id="opening-v2-window">
        <path d="M789 0 H851 V595 H718 Z M924 95 L1435 0 V590 H924 Z" />
      </clipPath>
      <radialGradient id="opening-v2-glow" cx="78%" cy="20%" r="72%">
        <stop offset="0" stopColor="#F5F9FF" stopOpacity=".95" />
        <stop offset=".28" stopColor="#BBD7FF" stopOpacity=".55" />
        <stop offset="1" stopColor="#A9C7FF" stopOpacity="0" />
      </radialGradient>
    </defs>
    <g clipPath="url(#opening-v2-window)" opacity=".37">
      {Array.from({length: 70}, (_, i) => {
        const x = 710 + (i * 79) % 780;
        const y = ((i * 117 + frame * (5 + i % 3)) % 710) - 60;
        return <path key={i} d={`M${x} ${y} l-7 ${21 + i % 12}`} fill="none" stroke="#C6E6FF" strokeWidth={i % 4 === 0 ? 1.6 : .8} strokeLinecap="round" opacity={.35 + (i % 4) * .14}/>;
      })}
    </g>
    <rect width={SOURCE_WIDTH} height={SOURCE_HEIGHT} fill="url(#opening-v2-glow)" opacity={flash * .65} style={{mixBlendMode: "screen"}} />
  </svg>
);

const OpeningV2: React.FC = () => {
  const frame = useCurrentFrame();
  const [fontHandle] = React.useState(() => delayRender("Loading opening Arabic font"));
  React.useEffect(() => {
    const font = new FontFace("Wach3arefOpeningTajawal", `url(${staticFile("fonts/darija/Tajawal-Bold.ttf")})`, {weight: "700"});
    font.load().then((loaded) => {
      document.fonts.add(loaded);
      continueRender(fontHandle);
    }).catch((error: unknown) => {
      console.error(error);
      continueRender(fontHandle);
    });
  }, [fontHandle]);

  const firstPush = smooth(mix(frame, [0, 60], [0, 1]));
  const finalPush = smooth(mix(frame, [150, 209], [0, 1]));
  const scale = 2.09 + firstPush * .035 + finalPush * .055;
  // Move the vertical crop across the original wide composition towards the strike.
  const left = -1550 - firstPush * 230 - finalPush * 60;
  const top = -25 - firstPush * 10 - finalPush * 20;
  const flash = mix(frame, [0, 67, 69, 71, 74, 77, 81, 86, 94], [0, 0, .24, .94, .23, .68, .17, .05, 0]);
  const titleOpacity = mix(frame, [150, 166], [0, 1]);
  const titleY = mix(frame, [150, 174], [35, 0]);

  return (
    <AbsoluteFill style={{background: "#0F2139", overflow: "hidden"}}>
      <div style={{position: "absolute", width: SOURCE_WIDTH * scale, height: SOURCE_HEIGHT * scale, left, top}}>
        <Img src={staticFile("wach3aref/lightning/references/scene1-living-room.png")} style={{display: "block", width: "100%", height: "100%"}} />
        <Weather frame={frame} flash={flash} />
      </div>
      <AbsoluteFill style={{pointerEvents: "none", background: `rgba(225, 237, 255, ${flash * .3})`, mixBlendMode: "screen"}} />
      <AbsoluteFill style={{pointerEvents: "none", background: "linear-gradient(to bottom, rgba(8,20,42,.10), transparent 28%, transparent 58%, rgba(8,20,42,.72) 100%)"}} />
      <div dir="rtl" style={{position: "absolute", left: 76, right: 76, bottom: 195, opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: "center", color: "#FFF9ED", fontFamily: "Wach3arefOpeningTajawal, sans-serif", fontSize: 77, lineHeight: 1.42, fontWeight: 700, textShadow: "0 4px 24px rgba(7,18,38,.8)"}}>
        علاش كنشوفو <span style={{color: "#FFD04A"}}>البرق</span><br />قبل ما نسمعو الرعد؟
      </div>
      <Audio src={staticFile("audio/darija/lightning-thunder.mp3")} />
    </AbsoluteFill>
  );
};

export const OpeningV2Composition: React.FC = () => (
  <Composition id="Wach3arefLightningOpeningV2" component={OpeningV2} width={1080} height={1920} fps={FPS} durationInFrames={DURATION} />
);
