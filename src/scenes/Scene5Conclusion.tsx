import React from "react";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Earth } from "../components/Earth";
import { CinematicText } from "../components/CinematicText";
import { theme } from "../styles/theme";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const stars = Array.from({ length: 92 }, (_, index) => ({
  x: (index * 197.3) % theme.canvas.width,
  y: (index * 131.7) % theme.canvas.height,
  radius: 1 + (index % 3),
  opacity: 0.16 + (index % 4) * 0.08,
}));

const hubs = [
  [264, 760], [366, 980], [528, 725], [523, 875], [732, 795], [844, 1012], [431, 774], [646, 987],
] as const;

const routes = [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 7], [6, 7], [1, 6], [3, 5]] as const;

export const Scene5Conclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const finalFade = interpolate(frame, [0, 284, 300], [1, 1, 0], clamp);
  const mapOpacity = interpolate(frame, [0, 66, 96], [1, 0.72, 0], clamp);
  const mapScale = interpolate(frame, [0, 92], [1, 0.72], clamp);
  const routeOpacity = interpolate(frame, [0, 45, 82], [0.85, 0.28, 0], clamp);
  const earthOpacity = interpolate(frame, [54, 98, 232, 282], [0, 1, 1, 0.18], clamp);
  const earthScale = interpolate(frame, [78, 220], [1.16, 0.72], clamp);
  const earthY = interpolate(frame, [78, 220], [0, 48], clamp);
  const statementOpacity = interpolate(frame, [208, 224], [0, 1], clamp);
  const questionOpacity = interpolate(frame, [230, 246], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 46%, #0B263B 0%, #040B14 48%, #010308 100%)",
        color: theme.colors.white,
        fontFamily: theme.fontFamily,
        overflow: "hidden",
        opacity: finalFade,
      }}
    >
      {stars.map((star) => <div key={`${star.x}-${star.y}`} style={{ position: "absolute", left: star.x, top: star.y, width: star.radius, height: star.radius, borderRadius: "50%", background: "#B9DFFF", opacity: star.opacity }} />)}

      {/* The logistics map from Scene 4 quietly loses its shared links before becoming Earth. */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, opacity: mapOpacity }}>
        <g transform={`translate(540 835) scale(${mapScale}) translate(-540 -835)`}>
          <image href={staticFile("natural-earth-110m-land.svg")} x="70" y="600" width="940" height="470" opacity=".7" />
          {routes.map(([from, to], index) => {
            const loss = interpolate(frame, [index * 5, 38 + index * 5], [0, 1], clamp);
            const [x1, y1] = hubs[from];
            const [x2, y2] = hubs[to];
            return <path key={`${from}-${to}`} d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - 90} ${x2} ${y2}`} fill="none" stroke="#37C9FF" strokeWidth="4" strokeDasharray="10 14" opacity={routeOpacity * (1 - loss)} />;
          })}
          {hubs.map(([x, y], index) => {
            const loss = interpolate(frame, [15 + index * 5, 52 + index * 5], [0, 1], clamp);
            return <g key={`${x}-${y}`} opacity={1 - loss}><circle cx={x} cy={y} r={24 + Math.sin(frame * 0.16 + index) * 4} fill="#24C9FF" opacity=".13" /><circle cx={x} cy={y} r="8" fill="#C5F2FF" /></g>;
          })}
          <rect x="65" y="592" width="950" height="485" rx="42" fill="none" stroke="#FF405A" strokeWidth="3" opacity={interpolate(frame, [0, 80], [0.5, 0], clamp)} />
        </g>
      </svg>

      {/* Reuses the geographic Earth, but removes satellite, warning and orbital decoration. */}
      <div style={{ position: "absolute", inset: 0, opacity: earthOpacity, transform: `translateY(${earthY}px) scale(${earthScale})` }}>
        <Earth shutdownAt={112} showSatellite={false} showOrbits={false} showWarning={false} />
      </div>

      <div style={{ position: "absolute", top: 425, left: 76, right: 76, textAlign: "center", opacity: statementOpacity }}>
        <CinematicText delay={208} fontSize={60} letterSpacing={-2} scaleFrom={1.05} style={{ lineHeight: 1.02, textShadow: "0 8px 36px #00000099" }}>
          WE BUILT A WORLD THAT<br />NEVER STOPS CONNECTING.
        </CinematicText>
      </div>
      <div style={{ position: "absolute", top: 1035, left: 88, right: 88, textAlign: "center", opacity: questionOpacity }}>
        <CinematicText delay={230} color={theme.colors.blueBright} fontSize={42} letterSpacing={1} emphasis="cyan" scaleFrom={1.06} style={{ lineHeight: 1.08, textShadow: "0 8px 36px #00000099" }}>
          WHAT HAPPENS WHEN IT DOES?
        </CinematicText>
      </div>
    </AbsoluteFill>
  );
};
