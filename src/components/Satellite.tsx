import React from "react";

type SatelliteProps = {
  x: number;
  y: number;
  rotation: number;
};

export const Satellite: React.FC<SatelliteProps> = ({ x, y, rotation }) => {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      <rect x="-28" y="-13" width="56" height="26" rx="5" fill="#D8E6F4" />
      <rect
        x="-75"
        y="-19"
        width="43"
        height="38"
        fill="#1476B5"
        stroke="#75CFFF"
        strokeWidth="2"
      />
      <rect
        x="32"
        y="-19"
        width="43"
        height="38"
        fill="#1476B5"
        stroke="#75CFFF"
        strokeWidth="2"
      />
      <path d="M-75 0 H-32 M32 0 H75" stroke="#A9DFFF" strokeWidth="2" />
      <circle r="7" fill="#FFFFFF" />
      <path d="M0 14 L-12 38 M0 14 L12 38" stroke="#D8E6F4" strokeWidth="3" />
    </g>
  );
};
