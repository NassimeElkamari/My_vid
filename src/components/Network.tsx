import React from "react";

type NetworkProps = {
  cities: readonly (readonly [number, number])[];
  links: readonly (readonly [number, number])[];
  opacity: number;
  pulse: number;
};

export const Network: React.FC<NetworkProps> = ({
  cities,
  links,
  opacity,
  pulse,
}) => {
  return (
    <g opacity={opacity}>
      {links.map(([from, to]) => (
        <line
          key={`${from}-${to}`}
          x1={cities[from][0]}
          y1={cities[from][1]}
          x2={cities[to][0]}
          y2={cities[to][1]}
          stroke="#5AD9FF"
          strokeWidth="3"
          opacity={pulse}
        />
      ))}
      {cities.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={12 + pulse * 6} fill="#00BFFF" opacity=".18" />
          <circle cx={x} cy={y} r="5" fill="#A5EDFF" />
        </g>
      ))}
    </g>
  );
};
