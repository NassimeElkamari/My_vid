import React from "react";
import { useCurrentFrame } from "remotion";
import { theme } from "../styles/theme";

type StatusIndicatorProps = {
  label: string;
  warning?: boolean;
  style?: React.CSSProperties;
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  label,
  warning = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const color = warning ? theme.colors.warningDeep : "#00CFFF";
  const warningPulse = warning ? 1 + Math.sin(frame * 0.18) * 0.012 : 1;
  const warningGlow = warning ? 0.4 + Math.sin(frame * 0.18) * 0.1 : 1;

  return (
    <div
      style={{
        padding: 28,
        border: `2px solid ${color}`,
        borderRadius: 12,
        background: theme.colors.panel,
        textAlign: "center",
        boxShadow: `0 0 ${warning ? 34 : 30}px ${warning ? `rgba(255, 64, 90, ${warningGlow})` : "#00CFFF33"}`,
        transform: `scale(${warningPulse})`,
        ...style,
      }}
    >
      <div
        style={{
          color: warning ? theme.colors.warning : "#62DFFF",
          fontSize: 25,
          fontWeight: 800,
          letterSpacing: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
};
