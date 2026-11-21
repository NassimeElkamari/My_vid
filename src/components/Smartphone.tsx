import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../styles/theme";

export const Smartphone: React.FC = () => {
  const frame = useCurrentFrame();
  const failure = interpolate(frame, [48, 90, 120], [0, 0.35, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const signalScale = interpolate(frame, [35, 92], [1, 0.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phoneY = interpolate(frame, [0, 25], [80, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 225,
        top: 475,
        width: 630,
        height: 990,
        borderRadius: 76,
        padding: 18,
        background: "linear-gradient(145deg, #BAC8D4, #263847 16%, #0A111A 82%)",
        boxShadow: "0 40px 90px #00000088, 0 0 65px #008DFF30",
        transform: `translateY(${phoneY}px) rotate(${Math.sin(frame * 0.03) * 1.2}deg)`,
      }}
    >
      <div
        style={{
          height: "100%",
          borderRadius: 61,
          overflow: "hidden",
          background: `linear-gradient(180deg, #0A2840 0%, #071520 55%, ${failure > 0.7 ? "#260B14" : "#06111A"} 100%)`,
          border: "2px solid #3E5C72",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 230, top: 21, width: 130, height: 28, background: "#02060A", borderRadius: 20 }} />
        <div style={{ position: "absolute", top: 78, left: 48, right: 48, display: "flex", justifyContent: "space-between", color: theme.colors.blueSoft, fontSize: 24, fontWeight: 700 }}>
          <span>9:41</span><span style={{ color: failure > 0.6 ? theme.colors.warning : theme.colors.blueBright }}>5G {failure > 0.55 ? "×" : "●"}</span>
        </div>
        <div style={{ position: "absolute", top: 185, width: "100%", textAlign: "center", color: theme.colors.white, fontSize: 31, fontWeight: 800 }}>Messages</div>
        <div style={{ position: "absolute", top: 260, left: 48, right: 48, padding: 25, borderRadius: 24, background: "#164B70", color: theme.colors.white, fontSize: 28, lineHeight: 1.3 }}>
          Are you seeing this too?
        </div>
        <div style={{ position: "absolute", top: 388, right: 48, width: 350, padding: 25, borderRadius: 24, background: failure > 0.6 ? "#4A1822" : "#126995", color: theme.colors.white, fontSize: 28, lineHeight: 1.3 }}>
          No internet anywhere.
        </div>
        <div style={{ position: "absolute", top: 535, left: 48, right: 48, padding: 25, borderRadius: 24, background: "#111E29", border: `2px solid ${failure > 0.55 ? theme.colors.warningDeep : "#3A5B6E"}`, color: failure > 0.55 ? "#FFB5BF" : "#8DC5E4", fontSize: 25, textAlign: "center", opacity: interpolate(frame, [65, 85], [0, 1], { extrapolateRight: "clamp" }) }}>
          {failure > 0.6 ? "Not delivered · Try again" : "Sending…"}
        </div>
        <div style={{ position: "absolute", top: 690, width: "100%", textAlign: "center", color: theme.colors.blueBright, fontSize: 26, letterSpacing: 4, transform: `scale(${signalScale})`, opacity: Math.max(signalScale, 0) }}>
          ◢ ◢ ◢  WI-FI
        </div>
        <div style={{ position: "absolute", bottom: 86, left: 70, right: 70, height: 9, borderRadius: 8, background: failure > 0.6 ? theme.colors.warningDeep : theme.colors.blue, boxShadow: `0 0 20px ${failure > 0.6 ? theme.colors.warningDeep : theme.colors.blue}` }} />
      </div>
    </div>
  );
};
