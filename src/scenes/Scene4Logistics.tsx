import React from "react";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { CinematicText } from "../components/CinematicText";
import { StatusIndicator } from "../components/StatusIndicator";
import { theme } from "../styles/theme";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const flights = [
  ["NX 204", "LIS", "08:40"],
  ["SA 118", "CDG", "09:05"],
  ["WT 031", "JFK", "09:25"],
  ["PR 744", "DXB", "09:50"],
] as const;

const hubs = [
  [264, 760], [366, 980], [528, 725], [523, 875], [732, 795], [844, 1012], [431, 774], [646, 987],
] as const;

const routes = [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 7], [6, 7], [1, 6], [3, 5]] as const;

const FlightRow: React.FC<{ flight: (typeof flights)[number]; index: number; frame: number }> = ({ flight, index, frame }) => {
  const unavailableAt = 47 + index * 13;
  const state = interpolate(frame, [unavailableAt - 12, unavailableAt + 8], [0, 1], clamp);
  const delayed = frame >= unavailableAt - 12;
  const label = state > 0.72 ? "UNAVAILABLE" : delayed ? "DELAYED" : "BOARDING";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "150px 110px 120px 1fr", alignItems: "center", height: 94, borderBottom: "1px solid #82CCEF22", color: theme.colors.blueSoft, fontSize: 25, fontWeight: 700, letterSpacing: 2, opacity: 1 - state * 0.18 }}>
      <span>{flight[0]}</span><span>{flight[1]}</span><span>{flight[2]}</span>
      <span style={{ color: delayed ? theme.colors.warning : theme.colors.blueBright, fontSize: 20, textAlign: "right", letterSpacing: 2 }}>{label}</span>
    </div>
  );
};

export const Scene4Logistics: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneEntrance = interpolate(frame, [0, 12], [0.45, 1], clamp);
  const airportOpacity = interpolate(frame, [0, 8, 104, 120], [0, 1, 1, 0], clamp);
  const shippingOpacity = interpolate(frame, [120, 134, 224, 240], [0, 1, 1, 0], clamp);
  const networkOpacity = interpolate(frame, [240, 254], [0, 1], clamp);

  const boardTilt = Math.sin(frame * 0.025) * 1.2;
  const notificationOpacity = interpolate(frame, [75, 93], [0, 1], clamp);
  const shipX = interpolate(frame, [130, 225], [-130, 180], clamp);
  const cargoProgress = interpolate(frame, [132, 194], [0, 1], clamp);
  const trackingLoss = interpolate(frame, [183, 223], [0, 1], clamp);
  const routePulse = 0.55 + Math.sin(frame * 0.22) * 0.3;
  const connectionLoss = interpolate(frame, [282, 347], [0, 1], clamp);
  const mapScale = interpolate(frame, [240, 389], [0.94, 1.06], clamp);
  const finalWarning = interpolate(frame, [345, 368], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 42%, #133D59 0%, #07111F 50%, #01040A 100%)",
        color: theme.colors.white,
        fontFamily: theme.fontFamily,
        overflow: "hidden",
        opacity: sceneEntrance,
      }}
    >
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#57C9FF0B 1px, transparent 1px), linear-gradient(90deg, #57C9FF0B 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

      {/* Shot A: departure data loses its passenger-facing connection, not air-traffic control. */}
      <div style={{ position: "absolute", inset: 0, opacity: airportOpacity }}>
        <div style={{ position: "absolute", top: 145, left: 78, right: 78 }}>
          <CinematicText delay={31} exitAt={96} color={theme.colors.blueBright} fontSize={23} letterSpacing={10} emphasis="cyan" style={{ fontWeight: 700 }}>HYPOTHETICAL // HOUR 12</CinematicText>
          <CinematicText delay={38} exitAt={96} fontSize={66} letterSpacing={-2} scaleFrom={1.05} style={{ marginTop: 18, lineHeight: 1 }}>MOVEMENT CONTINUES.<br />COORDINATION SLOWS.</CinematicText>
        </div>
        <div style={{ position: "absolute", top: 515, left: 62, right: 62, padding: 34, borderRadius: 32, background: "linear-gradient(145deg, #163B4F, #07121C 26%, #03080E)", border: "2px solid #4FA8D3", boxShadow: "0 32px 78px #000000A8, 0 0 44px #24C9FF22", transform: `perspective(1100px) rotateX(2deg) rotateZ(${boardTilt}deg)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: theme.colors.blueBright, fontSize: 21, letterSpacing: 5, fontWeight: 800, paddingBottom: 25, borderBottom: "2px solid #55C7F044" }}><span>DEPARTURES</span><span>LOCAL TIME 09:14</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "150px 110px 120px 1fr", height: 66, alignItems: "center", color: "#7194A9", fontSize: 17, letterSpacing: 3 }}><span>FLIGHT</span><span>TO</span><span>TIME</span><span style={{ textAlign: "right" }}>STATUS</span></div>
          {flights.map((flight, index) => <FlightRow key={flight[0]} flight={flight} index={index} frame={frame} />)}
          <div style={{ marginTop: 24, height: 10, background: "#0B1D28", borderRadius: 8, overflow: "hidden" }}><div style={{ width: `${interpolate(frame, [0, 84], [18, 92], clamp)}%`, height: "100%", background: notificationOpacity > 0.5 ? theme.colors.warningDeep : theme.colors.blue }} /></div>
        </div>
        <div style={{ position: "absolute", top: 1265, left: 118, right: 118, padding: 28, opacity: notificationOpacity, transform: `translateY(${interpolate(frame, [75, 93], [30, 0], clamp)}px)`, borderRadius: 20, background: "#220E16E8", border: `2px solid ${theme.colors.warningDeep}`, boxShadow: "0 0 35px #FF405A44" }}>
          <div style={{ color: theme.colors.warning, fontSize: 25, letterSpacing: 4, fontWeight: 900 }}>PASSENGER ALERT</div>
          <div style={{ marginTop: 14, color: "#FFB5BF", fontSize: 21, letterSpacing: 2 }}>NOTIFICATION SERVICE COULD NOT DELIVER UPDATE</div>
        </div>
        <div style={{ position: "absolute", bottom: 140, left: 100, right: 100, opacity: notificationOpacity }}><StatusIndicator label="FLIGHT INFORMATION // UNAVAILABLE" warning /></div>
      </div>

      {/* Shot B: a stylized cargo vessel moves while its digital trace fades. */}
      <div style={{ position: "absolute", inset: 0, opacity: shippingOpacity }}>
        <div style={{ position: "absolute", top: 150, left: 78, right: 78, zIndex: 3 }}>
          <CinematicText delay={129} exitAt={214} color={theme.colors.blueBright} fontSize={23} letterSpacing={10} emphasis="cyan" style={{ fontWeight: 700 }}>LOGISTICS // TRACKING SIGNAL</CinematicText>
          <CinematicText delay={136} exitAt={214} fontSize={65} letterSpacing={-2} scaleFrom={1.05} style={{ marginTop: 18, lineHeight: 1 }}>THE CARGO MOVES.<br />THE TRACE DISAPPEARS.</CinematicText>
        </div>
        <div style={{ position: "absolute", top: 490, left: 0, right: 0, height: 740, overflow: "hidden", background: "linear-gradient(180deg, #0C3048 0%, #082236 44%, #04111C 45%, #061621 100%)", borderTop: "2px solid #4BB5E055", borderBottom: "2px solid #4BB5E033" }}>
          {[0, 1, 2, 3, 4].map((wave) => <div key={wave} style={{ position: "absolute", top: 352 + wave * 55, left: -80, width: 1250, height: 60, borderTop: `2px solid ${wave > 2 ? "#1E587544" : "#55C5F066"}`, borderRadius: "50%", transform: `translateX(${Math.sin(frame * 0.045 + wave) * 42}px)` }} />)}
          <div style={{ position: "absolute", left: shipX, top: 290, width: 785, height: 260, filter: "drop-shadow(0 30px 25px #00000088)" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 740, height: 126, clipPath: "polygon(0 0, 100% 0, 87% 100%, 15% 100%)", background: "linear-gradient(180deg, #2B596D, #102938 75%, #07131E)" }} />
            {[0, 1, 2, 3, 4].map((container) => <div key={container} style={{ position: "absolute", left: 105 + container * 104, top: container % 2 === 0 ? 30 : 70, width: 94, height: 68, border: "2px solid #74CDF2", background: container % 2 === 0 ? "#176792" : "#1C4660", boxShadow: "inset 0 0 16px #7BE0FF22" }} />)}
            <div style={{ position: "absolute", right: 42, top: 98, width: 110, height: 60, background: "#D4E7ED", borderRadius: "6px 8px 0 0" }} />
          </div>
          <svg width="1080" height="740" viewBox="0 0 1080 740" style={{ position: "absolute", inset: 0, opacity: 1 - trackingLoss }}>
            <path d="M70 220 C300 90 570 130 960 240" fill="none" stroke="#24C9FF" strokeWidth="4" strokeDasharray="12 16" opacity={routePulse} />
            {[0, 1, 2, 3].map((node) => <circle key={node} cx={120 + node * 250} cy={[207, 132, 155, 228][node]} r={12 + routePulse * 5} fill="#24C9FF" opacity=".7" />)}
            <circle cx={interpolate(cargoProgress, [0, 1], [120, 870], clamp)} cy={interpolate(cargoProgress, [0, 1], [207, 220], clamp)} r="12" fill="#F6FBFF" />
          </svg>
        </div>
        <div style={{ position: "absolute", top: 1275, left: 92, right: 92, padding: 30, borderRadius: 20, background: "#071521E8", border: `2px solid ${trackingLoss > 0.55 ? theme.colors.warningDeep : "#3184B0"}`, boxShadow: `0 0 32px ${trackingLoss > 0.55 ? "#FF405A33" : "#24C9FF22"}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 3, color: theme.colors.blueSoft }}><span>CONTAINER 07-ALPHA</span><span style={{ color: trackingLoss > 0.55 ? theme.colors.warning : theme.colors.blueBright }}>{trackingLoss > 0.55 ? "SIGNAL LOST" : "ROUTE LOCKED"}</span></div>
          <div style={{ marginTop: 23, height: 8, borderRadius: 8, background: "#203B4C", overflow: "hidden" }}><div style={{ width: `${100 - trackingLoss * 100}%`, height: "100%", background: theme.colors.blue }} /></div>
        </div>
        <div style={{ position: "absolute", bottom: 140, left: 100, right: 100, opacity: trackingLoss }}><StatusIndicator label="CARGO TRACKING // UNKNOWN" warning /></div>
      </div>

      {/* Shot C: transport hubs remain geographically present while coordination links disappear. */}
      <div style={{ position: "absolute", inset: 0, opacity: networkOpacity }}>
        <div style={{ position: "absolute", top: 135, left: 78, right: 78, zIndex: 3 }}>
          <CinematicText delay={248} color={theme.colors.blueBright} fontSize={23} letterSpacing={9} emphasis="cyan" style={{ fontWeight: 700 }}>GLOBAL TRANSPORT // NETWORK VIEW</CinematicText>
          <CinematicText delay={256} fontSize={64} letterSpacing={-2} scaleFrom={1.05} style={{ marginTop: 18, lineHeight: 1 }}>THE WORLD MOVES.<br />THE LINKS FADE.</CinematicText>
        </div>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, transform: `scale(${mapScale})` }}>
          <defs><filter id="logistics-map-glow"><feGaussianBlur stdDeviation="9" /></filter></defs>
          <image
            href={staticFile("natural-earth-110m-land.svg")}
            x="70"
            y="600"
            width="940"
            height="470"
            opacity=".78"
          />
          {routes.map(([from, to], index) => {
            const loss = interpolate(connectionLoss, [index * 0.08, 0.42 + index * 0.07], [0, 1], clamp);
            const [x1, y1] = hubs[from];
            const [x2, y2] = hubs[to];
            return <g key={`${from}-${to}`} opacity={1 - loss}><path d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - 90} ${x2} ${y2}`} fill="none" stroke="#37C9FF" strokeWidth="4" strokeDasharray="10 14" opacity={0.8} /><circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2 - 42} r="7" fill="#D5F4FF" filter="url(#logistics-map-glow)" /></g>;
          })}
          {hubs.map(([x, y], index) => {
            const hubLoss = interpolate(connectionLoss, [0.12 + index * 0.06, 0.62 + index * 0.04], [0, 1], clamp);
            return <g key={`${x}-${y}`} opacity={1 - hubLoss * 0.5}><circle cx={x} cy={y} r={25 + Math.sin(frame * 0.15 + index) * 5} fill="#24C9FF" opacity=".14" /><circle cx={x} cy={y} r="8" fill={hubLoss > 0.6 ? theme.colors.warning : "#B4EEFF"} /></g>;
          })}
          <rect x="65" y="592" width="950" height="485" rx="42" fill="none" stroke={theme.colors.warningDeep} strokeWidth="3" opacity={connectionLoss * 0.65} />
        </svg>
        <div style={{ position: "absolute", top: 1328, left: 92, right: 92, display: "flex", justifyContent: "space-between", color: theme.colors.blueSoft, fontSize: 18, letterSpacing: 3 }}><span>HUBS ONLINE</span><span style={{ color: connectionLoss > 0.6 ? theme.colors.warning : theme.colors.blueBright }}>{Math.round(100 - connectionLoss * 68)}% VISIBILITY</span></div>
        <div style={{ position: "absolute", left: 100, right: 100, bottom: 130, opacity: finalWarning }}><StatusIndicator label="GLOBAL COORDINATION // DISRUPTED" warning /><div style={{ marginTop: 18, color: "#FFB1BC", fontSize: 18, letterSpacing: 3, textAlign: "center" }}>TRANSPORT CONTINUES WITH REDUCED SHARED VISIBILITY</div></div>
      </div>
    </AbsoluteFill>
  );
};
