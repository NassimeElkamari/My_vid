import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CinematicText } from "../components/CinematicText";
import { Smartphone } from "../components/Smartphone";
import { StatusIndicator } from "../components/StatusIndicator";
import { frames, theme } from "../styles/theme";

const appLabels = ["MAPS", "BANK", "MAIL", "SOCIAL"];

export const Scene2FirstHour: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exit = interpolate(frame, [frames.firstHour - 18, frames.firstHour], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const failure = interpolate(frame, [52, 125], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 43%, #103B59 0%, #07111F 48%, #01040A 100%)", color: theme.colors.white, fontFamily: theme.fontFamily, overflow: "hidden", opacity: entrance * exit }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#3ABEFF11 1px, transparent 1px), linear-gradient(90deg, #3ABEFF11 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "linear-gradient(to bottom, transparent, black 20%, black 70%, transparent)" }} />
      <div style={{ position: "absolute", top: 170, left: 78, right: 78 }}>
        <CinematicText delay={8} exitAt={182} color={theme.colors.blueBright} fontSize={23} letterSpacing={10} emphasis="cyan" style={{ fontWeight: 700 }}>
          HYPOTHETICAL // HOUR 01
        </CinematicText>
        <CinematicText delay={15} exitAt={182} fontSize={72} letterSpacing={-2} scaleFrom={1.05} style={{ marginTop: 20, lineHeight: 0.98 }}>
          EVERY SCREEN<br />GOES QUIET.
        </CinematicText>
      </div>
      <Smartphone />
      <div style={{ position: "absolute", top: 1510, left: 90, right: 90, display: "flex", justifyContent: "space-between", gap: 14 }}>
        {appLabels.map((label, index) => {
          const appFailure = interpolate(frame, [78 + index * 11, 120 + index * 11], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return <div key={label} style={{ width: 190, padding: "20px 8px", borderRadius: 16, border: `2px solid ${appFailure > 0.5 ? theme.colors.warningDeep : "#2C7FA8"}`, textAlign: "center", fontSize: 17, fontWeight: 800, letterSpacing: 1, color: appFailure > 0.5 ? "#FFAFBA" : "#9DDCFF", background: "#081824C9", opacity: 1 - appFailure * 0.25 }}>{label}<div style={{ color: appFailure > 0.5 ? theme.colors.warning : theme.colors.blue, fontSize: 24, marginTop: 7 }}>{appFailure > 0.5 ? "×" : "●"}</div></div>;
        })}
      </div>
      <StatusIndicator label={failure > 0.7 ? "CONNECTION LOST // RETRYING" : "MESSAGES // SENDING"} warning={failure > 0.7} style={{ position: "absolute", top: 1695, left: 100, right: 100 }} />
      <div style={{ position: "absolute", bottom: 92, width: "100%", textAlign: "center", color: theme.colors.blueSoft, fontSize: 20, letterSpacing: 4, opacity: 0.65 + failure * 0.35 }}>
        DIGITAL COMMUNICATION IS DISRUPTED
      </div>
    </AbsoluteFill>
  );
};
