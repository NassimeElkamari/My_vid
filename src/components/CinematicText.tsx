import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../styles/theme";

type CinematicTextProps = {
  children: React.ReactNode;
  delay?: number;
  color?: string;
  fontSize: number;
  letterSpacing?: number;
  exitAt?: number;
  exitDuration?: number;
  scaleFrom?: number;
  emphasis?: "cyan" | "warning";
  style?: React.CSSProperties;
};

export const CinematicText: React.FC<CinematicTextProps> = ({
  children,
  delay = 0,
  color = theme.colors.white,
  fontSize,
  letterSpacing = 0,
  exitAt,
  exitDuration = 12,
  scaleFrom = 1.035,
  emphasis,
  style,
}) => {
  const frame = useCurrentFrame();
  const entranceOpacity = interpolate(frame, [delay, delay + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [delay, delay + 18], [28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [delay, delay + 18], [scaleFrom, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = exitAt === undefined ? 1 : interpolate(frame, [exitAt, exitAt + exitDuration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitTranslate = exitAt === undefined ? 0 : interpolate(frame, [exitAt, exitAt + exitDuration], [0, -12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glow = emphasis === "cyan"
    ? "0 0 24px #24C9FF66"
    : emphasis === "warning"
      ? "0 0 28px #FF405A66"
      : undefined;

  return (
    <div
      style={{
        color,
        fontSize,
        fontWeight: 900,
        letterSpacing,
        opacity: entranceOpacity * exitOpacity,
        transform: `translateY(${translateY + exitTranslate}px) scale(${scale})`,
        textShadow: glow,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
