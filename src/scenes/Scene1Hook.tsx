import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CinematicText } from "../components/CinematicText";
import { Earth } from "../components/Earth";
import { StatusIndicator } from "../components/StatusIndicator";
import { frames, theme } from "../styles/theme";

const stars = Array.from({ length: 130 }, (_, index) => ({
  x: (index * 173.7) % theme.canvas.width,
  y: (index * 257.3) % theme.canvas.height,
  r: 1 + (index % 3),
  opacity: 0.2 + (index % 5) * 0.12,
}));

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const exitOpacity = interpolate(frame, [128, frames.hook], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const failed = frame >= 80;
  const progress = (frame / frames.hook) * 100;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 48%, #122C49 0%, #07111F 48%, #01040A 100%)",
        color: theme.colors.white,
        fontFamily: theme.fontFamily,
        overflow: "hidden",
        opacity: exitOpacity,
      }}
    >
      {stars.map((star) => (
        <div key={`${star.x}-${star.y}`} style={{ position: "absolute", left: star.x, top: star.y, width: star.r, height: star.r, background: "#B9DFFF", borderRadius: "50%", opacity: star.opacity }} />
      ))}
      <div style={{ position: "absolute", top: 205, width: "100%", textAlign: "center", zIndex: 5 }}>
        <CinematicText delay={0} exitAt={116} color={theme.colors.blueBright} fontSize={24} letterSpacing={12} emphasis="cyan" style={{ marginBottom: 28, fontWeight: 600 }}>
          A GLOBAL EXPERIMENT
        </CinematicText>
        <CinematicText delay={7} exitAt={116} fontSize={78} letterSpacing={-3}>WHAT IF THE</CinematicText>
        <CinematicText delay={14} exitAt={116} color={theme.colors.warning} fontSize={94} letterSpacing={-3} emphasis="warning" scaleFrom={1.06} style={{ textShadow: "0 0 35px #FF263855" }}>
          INTERNET DIED?
        </CinematicText>
      </div>
      <Earth shutdownAt={80} />
      <StatusIndicator label={failed ? "NETWORK // OFFLINE" : "GLOBAL NETWORK // ONLINE"} warning={failed} style={{ position: "absolute", top: 1450, left: 100, right: 100 }} />
      <div style={{ position: "absolute", bottom: 145, width: "100%", textAlign: "center", fontSize: 22, letterSpacing: 6, color: theme.colors.blueSoft }}>
        24 HOURS WITHOUT INTERNET
      </div>
      <div style={{ position: "absolute", bottom: 85, left: 100, right: 100, height: 4, background: "#25364B" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: theme.colors.blue }} />
      </div>
    </AbsoluteFill>
  );
};
