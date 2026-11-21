import React from "react";
import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { Network } from "./Network";
import { Satellite } from "./Satellite";

const cities = [
  [351, 885], // Los Angeles
  [422, 876], // New York
  [466, 977], // Sao Paulo
  [540, 857], // London
  [590, 892], // Cairo
  [629, 900], // Dubai
  [708, 938], // Singapore
  [764, 884], // Tokyo
  [784, 995], // Sydney
] as const;

const links = [
  [0, 1], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [2, 4], [2, 1],
] as const;

type EarthProps = {
  shutdownAt?: number;
  showSatellite?: boolean;
  showOrbits?: boolean;
  showWarning?: boolean;
};

export const Earth: React.FC<EarthProps> = ({
  shutdownAt = 80,
  showSatellite = true,
  showOrbits = true,
  showWarning = true,
}) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 150], [0.82, 1.08], {
    extrapolateRight: "clamp",
  });
  const networkOpacity = interpolate(
    frame,
    [0, shutdownAt - 5, shutdownAt + 30, shutdownAt + 62],
    [1, 1, 0.5, 0.02],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const warningOpacity = interpolate(
    frame,
    [shutdownAt, shutdownAt + 25, shutdownAt + 45],
    [0, 0.3, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const satelliteAngle = frame * 0.045 - 1.5;
  const satelliteX = 540 + Math.cos(satelliteAngle) * 380;
  const satelliteY = 940 + Math.sin(satelliteAngle) * 155;
  const pulse = 0.7 + Math.sin(frame * 0.2) * 0.3;

  return (
    <svg
      width="1080"
      height="1920"
      viewBox="0 0 1080 1920"
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        <radialGradient id="earth-ocean" cx="34%" cy="28%">
          <stop offset="0%" stopColor="#4A9BC5" />
          <stop offset="45%" stopColor="#17547D" />
          <stop offset="85%" stopColor="#08223D" />
          <stop offset="100%" stopColor="#020B18" />
        </radialGradient>
        <radialGradient id="earth-atmosphere">
          <stop offset="60%" stopColor="#008DFF" stopOpacity="0" />
          <stop offset="82%" stopColor="#008DFF" stopOpacity=".12" />
          <stop offset="95%" stopColor="#22B8FF" stopOpacity=".35" />
          <stop offset="100%" stopColor="#008DFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="earth-shadow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".12" />
          <stop offset="100%" stopColor="#000000" stopOpacity=".8" />
        </linearGradient>
        <clipPath id="earth-clip">
          <circle cx="540" cy="940" r="290" />
        </clipPath>
        <filter id="earth-glow">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <g transform={`translate(540 940) scale(${zoom}) translate(-540 -940)`}>
        <circle cx="540" cy="940" r="400" fill="url(#earth-atmosphere)" />
        {showOrbits ? <>
          <ellipse
            cx="540"
            cy="940"
            rx="385"
            ry="145"
            fill="none"
            stroke="#3ABEFF"
            strokeWidth="2"
            opacity=".45"
            transform="rotate(-18 540 940)"
          />
          <ellipse
            cx="540"
            cy="940"
            rx="400"
            ry="125"
            fill="none"
            stroke="#8ACFFF"
            strokeWidth="1"
            opacity=".2"
            transform="rotate(55 540 940)"
          />
        </> : null}
        <circle cx="540" cy="940" r="290" fill="url(#earth-ocean)" stroke="#65C8FF" strokeWidth="3" />

        <g clipPath="url(#earth-clip)">
          <image href={staticFile("natural-earth-110m-land.svg")} x="250" y="795" width="580" height="290" opacity=".86" />
          <ellipse cx="540" cy="940" rx="120" ry="290" fill="none" stroke="#A9DCFF" opacity=".22" strokeWidth="2" />
          <ellipse cx="540" cy="940" rx="220" ry="290" fill="none" stroke="#A9DCFF" opacity=".17" strokeWidth="2" />
          <path d="M250 940 H830 M285 820 Q540 880 795 820 M285 1060 Q540 1000 795 1060" fill="none" stroke="#A9DCFF" strokeWidth="2" opacity=".2" />
          <path d="M560 630 Q850 760 830 1050 Q800 1250 570 1240 Z" fill="url(#earth-shadow)" opacity=".7" />
          {cities.map(([x, y], index) => <circle key={`${x}-${y}`} cx={x} cy={y} r={2 + (index % 3)} fill="#FFDDA0" opacity=".9" />)}
        </g>

        <Network cities={cities} links={links} opacity={networkOpacity} pulse={pulse} />
        {showSatellite ? <Satellite x={satelliteX} y={satelliteY} rotation={frame * 2} /> : null}
        {showSatellite ? (
          <path d={`M${satelliteX} ${satelliteY} Q540 650 540 940`} stroke="#4DD9FF" strokeWidth="2" fill="none" strokeDasharray="9 12" opacity={networkOpacity * 0.9} />
        ) : null}
        {showWarning ? <>
          <circle cx="540" cy="940" r={315 + Math.sin(frame * 0.22) * 12} fill="none" stroke="#FF405A" strokeWidth="5" opacity={warningOpacity * 0.8} />
          <circle cx="540" cy="940" r="340" fill="none" stroke="#FF405A" strokeWidth="2" opacity={warningOpacity * 0.4} filter="url(#earth-glow)" />
        </> : null}
      </g>
    </svg>
  );
};
