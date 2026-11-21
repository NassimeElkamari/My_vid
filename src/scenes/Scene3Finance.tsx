import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CinematicText } from "../components/CinematicText";
import { StatusIndicator } from "../components/StatusIndicator";
import { theme } from "../styles/theme";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const MarketLine: React.FC<{
  label: string;
  value: string;
  delay: number;
  frame: number;
}> = ({ label, value, delay, frame }) => {
  const stopped = interpolate(frame, [220 + delay, 250 + delay], [0, 1], clamp);
  const flicker = Math.sin(frame * 0.48 + delay) * (1 - stopped);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #7FCAEF25", color: stopped > 0.55 ? "#AEBECB" : theme.colors.blueSoft, fontSize: 20, fontWeight: 700, letterSpacing: 2 }}>
      <span>{label}</span>
      <span style={{ color: stopped > 0.55 ? theme.colors.warning : theme.colors.blueBright }}>{stopped > 0.55 ? "STALE" : value}{flicker > 0.35 ? " ." : ""}</span>
    </div>
  );
};

export const Scene3Finance: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = interpolate(frame, [0, 14], [0, 1], clamp);
  const paymentOpacity = interpolate(frame, [0, 8, 74, 90], [0, 1, 1, 0], clamp);
  const bankOpacity = interpolate(frame, [90, 102, 165, 180], [0, 1, 1, 0], clamp);
  const marketOpacity = interpolate(frame, [180, 196], [0, 1], clamp);

  const cardX = interpolate(frame, [8, 42, 58], [920, 568, 535], clamp);
  const cardY = interpolate(frame, [8, 42, 58], [505, 670, 690], clamp);
  const cardRotate = interpolate(frame, [8, 42, 58], [18, -8, 0], clamp);
  const scanOpacity = interpolate(frame, [35, 46, 58, 68], [0, 1, 1, 0], clamp);
  const failureOpacity = interpolate(frame, [58, 73], [0, 1], clamp);

  const transferProgress = interpolate(frame, [108, 146, 155], [0, 78, 78], clamp);
  const transferFailed = frame >= 148;
  const bankSpin = frame * 11;

  const liveChartProgress = interpolate(frame, [186, 245], [0, 1], clamp);
  const frozen = interpolate(frame, [235, 274], [0, 1], clamp);
  const chartOffset = -Math.min(frame - 181, 52) * 8;
  const finalWarningOpacity = interpolate(frame, [260, 280], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 44%, #123D5A 0%, #07111F 49%, #01040A 100%)",
        color: theme.colors.white,
        fontFamily: theme.fontFamily,
        overflow: "hidden",
        opacity: entrance,
      }}
    >
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#5ACBFF0C 1px, transparent 1px), linear-gradient(90deg, #5ACBFF0C 1px, transparent 1px)", backgroundSize: "80px 80px", opacity: 0.8 }} />

      {/* Shot A: a generic contactless terminal, a processing scan, then a declined transaction. */}
      <div style={{ position: "absolute", inset: 0, opacity: paymentOpacity }}>
        <div style={{ position: "absolute", top: 160, left: 78, right: 78 }}>
          <CinematicText delay={8} exitAt={68} color={theme.colors.blueBright} fontSize={23} letterSpacing={10} emphasis="cyan" style={{ fontWeight: 700 }}>
            HYPOTHETICAL // HOUR 06
          </CinematicText>
          <CinematicText delay={15} exitAt={68} fontSize={66} letterSpacing={-2} scaleFrom={1.05} style={{ marginTop: 18, lineHeight: 1 }}>
            ACCESSING MONEY<br />GETS HARDER.
          </CinematicText>
        </div>

        <div style={{ position: "absolute", left: 145, top: 630, width: 790, height: 610, borderRadius: 54, background: "linear-gradient(145deg, #3F6175, #111E2A 18%, #07101A 85%)", border: "2px solid #6CB8E6", boxShadow: "0 35px 80px #000000AA, 0 0 42px #1BA4E844" }}>
          <div style={{ position: "absolute", left: 70, top: 68, width: 650, height: 280, borderRadius: 28, background: "linear-gradient(145deg, #0B2E46, #06121C)", border: `2px solid ${failureOpacity > 0.5 ? theme.colors.warningDeep : "#2B7FA9"}`, boxShadow: `inset 0 0 36px ${failureOpacity > 0.5 ? "#FF405A22" : "#24C9FF18"}` }}>
            <div style={{ position: "absolute", top: 55, width: "100%", textAlign: "center", color: failureOpacity > 0.5 ? theme.colors.warning : theme.colors.blueBright, fontSize: 26, fontWeight: 800, letterSpacing: 6 }}>
              {failureOpacity > 0.5 ? "DECLINED" : "PROCESSING"}
            </div>
            <div style={{ position: "absolute", top: 122, left: 285, width: 82, height: 82, borderRadius: "50%", border: `6px solid ${failureOpacity > 0.5 ? theme.colors.warningDeep : theme.colors.blue}`, opacity: 0.8, transform: `rotate(${frame * 12}deg)`, borderTopColor: "transparent" }} />
          </div>
          <div style={{ position: "absolute", bottom: 88, left: 284, color: theme.colors.blueSoft, fontSize: 26, letterSpacing: 5, fontWeight: 700 }}>TAP TO PAY</div>
          <svg width="320" height="180" viewBox="0 0 320 180" style={{ position: "absolute", bottom: 42, right: 42, opacity: scanOpacity }}>
            {[0, 1, 2].map((ring) => <path key={ring} d={`M${58 + ring * 27} 125 Q${160} 26 ${262 - ring * 27} 125`} fill="none" stroke={theme.colors.blueBright} strokeWidth="7" opacity={0.9 - ring * 0.2} />)}
          </svg>
        </div>

        <div style={{ position: "absolute", left: cardX, top: cardY, width: 365, height: 225, borderRadius: 28, background: "linear-gradient(135deg, #2587BA, #10314D 58%, #091A2B)", border: "2px solid #95E1FF", boxShadow: "0 20px 45px #00000088, 0 0 28px #24C9FF55", transform: `rotate(${cardRotate}deg)`, zIndex: 4 }}>
          <div style={{ position: "absolute", left: 38, top: 38, width: 58, height: 43, borderRadius: 8, background: "#E6C57D" }} />
          <div style={{ position: "absolute", bottom: 42, left: 38, color: theme.colors.white, fontSize: 22, fontWeight: 800, letterSpacing: 4 }}>NORTH / 01</div>
          <div style={{ position: "absolute", bottom: 44, right: 32, color: theme.colors.blueBright, fontSize: 36, fontWeight: 900 }}>)))</div>
        </div>

        <div style={{ position: "absolute", top: 1330, left: 100, right: 100, opacity: failureOpacity, transform: `translateY(${interpolate(frame, [58, 76], [28, 0], clamp)}px)` }}>
          <StatusIndicator label="TRANSACTION FAILED" warning />
          <div style={{ marginTop: 20, color: "#FFB1BC", textAlign: "center", fontSize: 20, letterSpacing: 3 }}>NETWORK AUTHORIZATION UNAVAILABLE</div>
        </div>
      </div>

      {/* Shot B: generic banking transfer interface, delayed rather than cancelled. */}
      <div style={{ position: "absolute", inset: 0, opacity: bankOpacity }}>
        <div style={{ position: "absolute", top: 155, left: 78, right: 78 }}>
          <CinematicText delay={99} exitAt={158} color={theme.colors.blueBright} fontSize={23} letterSpacing={10} emphasis="cyan" style={{ fontWeight: 700 }}>BANKING // CONNECTION CHECK</CinematicText>
          <CinematicText delay={106} exitAt={158} fontSize={65} letterSpacing={-2} scaleFrom={1.05} style={{ marginTop: 18, lineHeight: 1 }}>A TRANSFER<br />CAN'T CONFIRM.</CinematicText>
        </div>
        <div style={{ position: "absolute", top: 515, left: 96, right: 96, minHeight: 920, padding: 42, borderRadius: 42, background: "linear-gradient(160deg, #0D2B41, #07121D 66%)", border: "2px solid #3B87AF", boxShadow: "0 26px 70px #00000099" }}>
          <div style={{ color: theme.colors.blueSoft, fontSize: 22, fontWeight: 700, letterSpacing: 4 }}>TRANSFER FUNDS</div>
          <div style={{ marginTop: 48, padding: 26, borderRadius: 20, background: "#0A1B29", border: "1px solid #5ACBFF35" }}>
            <div style={{ color: "#90B6CA", fontSize: 18, letterSpacing: 3 }}>TO</div><div style={{ marginTop: 12, fontSize: 31, fontWeight: 800 }}>SAVINGS ACCOUNT</div>
          </div>
          <div style={{ marginTop: 24, padding: 26, borderRadius: 20, background: "#0A1B29", border: "1px solid #5ACBFF35" }}>
            <div style={{ color: "#90B6CA", fontSize: 18, letterSpacing: 3 }}>AMOUNT</div><div style={{ marginTop: 12, fontSize: 48, fontWeight: 900 }}>$ 2,400.00</div>
          </div>
          <div style={{ position: "relative", marginTop: 80, height: 13, borderRadius: 9, background: "#213849", overflow: "hidden" }}><div style={{ height: "100%", width: `${transferProgress}%`, background: transferFailed ? theme.colors.warningDeep : theme.colors.blue, boxShadow: `0 0 20px ${transferFailed ? theme.colors.warningDeep : theme.colors.blue}` }} /></div>
          <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 24, color: transferFailed ? theme.colors.warning : theme.colors.blueBright, fontSize: 27, fontWeight: 800, letterSpacing: 2 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: `5px solid ${transferFailed ? theme.colors.warningDeep : theme.colors.blue}`, borderTopColor: "transparent", transform: `rotate(${bankSpin}deg)` }} />
            {transferFailed ? "TRANSFER DELAYED" : "SECURELY CONNECTING"}
          </div>
          <div style={{ marginTop: 24, color: transferFailed ? "#FFB1BC" : theme.colors.blueSoft, fontSize: 19, letterSpacing: 2 }}>{transferFailed ? "CONFIRMATION PENDING NETWORK RECOVERY" : "VERIFYING AUTHORIZATION..."}</div>
        </div>
      </div>

      {/* Shot C: data does not collapse; updates and network links visibly freeze. */}
      <div style={{ position: "absolute", inset: 0, opacity: marketOpacity }}>
        <div style={{ position: "absolute", top: 135, left: 78, right: 78, zIndex: 3 }}>
          <CinematicText delay={185} color={theme.colors.blueBright} fontSize={23} letterSpacing={9} emphasis="cyan" style={{ fontWeight: 700 }}>MARKET DATA // LIVE FEED</CinematicText>
          <CinematicText delay={193} fontSize={64} letterSpacing={-2} scaleFrom={1.05} style={{ marginTop: 18, lineHeight: 1 }}>REAL-TIME DATA<br />STARTS TO FREEZE.</CinematicText>
        </div>
        <div style={{ position: "absolute", top: 500, left: 68, right: 68, height: 705, padding: 36, borderRadius: 36, background: "linear-gradient(160deg, #0B2336, #05101A)", border: `2px solid ${frozen > 0.55 ? "#8B3948" : "#3184B0"}`, boxShadow: `0 0 65px ${frozen > 0.55 ? "#FF405A22" : "#24C9FF18"}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: theme.colors.blueSoft, fontSize: 19, letterSpacing: 3 }}><span>GLOBAL INDEX</span><span style={{ color: frozen > 0.55 ? theme.colors.warning : theme.colors.blueBright }}>{frozen > 0.55 ? "FEED PAUSED" : "UPDATING"}</span></div>
          <svg width="900" height="450" viewBox="0 0 900 450" style={{ marginTop: 35, overflow: "visible" }}>
            {[0, 1, 2, 3, 4].map((line) => <line key={line} x1="0" x2="900" y1={55 + line * 75} y2={55 + line * 75} stroke="#82CCEF22" strokeWidth="2" />)}
            {[0, 1, 2, 3, 4, 5].map((line) => <line key={line} y1="0" y2="430" x1={line * 170} x2={line * 170} stroke="#82CCEF16" strokeWidth="2" />)}
            <polyline points="0,115 85,138 156,95 245,172 326,143 408,222 502,179 586,262 670,217 762,290 900,249" fill="none" stroke="#24C9FF" strokeWidth="8" strokeLinejoin="round" strokeDasharray="1100" strokeDashoffset={1100 * (1 - liveChartProgress)} />
            <polyline points="0,190 85,210 156,155 245,250 326,205 408,276 502,235 586,330 670,288 762,359 900,312" fill="none" stroke="#FF5266" strokeWidth="4" opacity={frozen * 0.95} strokeDasharray="12 14" transform={`translate(${chartOffset} 0)`} />
            {[156, 408, 670, 762].map((x, index) => <circle key={x} cx={x} cy={[95, 222, 217, 290][index]} r={10} fill={theme.colors.blueBright} opacity={1 - frozen * 0.7} />)}
          </svg>
          <div style={{ height: 2, background: "#5ACBFF25", marginTop: 16 }} />
          <div style={{ marginTop: 23, display: "flex", gap: 18, justifyContent: "space-between" }}>
            <span style={{ color: theme.colors.blueSoft, fontSize: 19, letterSpacing: 3 }}>PACKETS</span>
            {[0, 1, 2, 3, 4, 5].map((packet) => <span key={packet} style={{ width: 52, height: 10, borderRadius: 8, background: frozen > 0.5 && packet > 2 ? "#42202A" : theme.colors.blue, opacity: frozen > 0.5 && packet > 2 ? 0.45 : 0.85 }} />)}
          </div>
        </div>
        <div style={{ position: "absolute", top: 1275, left: 100, right: 100 }}>
          <MarketLine label="NORTH AMERICA" value="SYNC" delay={0} frame={frame} />
          <MarketLine label="EUROPE" value="SYNC" delay={8} frame={frame} />
          <MarketLine label="ASIA PACIFIC" value="SYNC" delay={16} frame={frame} />
        </div>
        <div style={{ position: "absolute", left: 100, right: 100, bottom: 130, opacity: finalWarningOpacity }}>
          <StatusIndicator label="FINANCIAL NETWORKS // DISRUPTED" warning />
          <div style={{ marginTop: 18, color: "#FFB1BC", fontSize: 18, letterSpacing: 3, textAlign: "center" }}>UPDATES AND CONFIRMATIONS MAY BE DELAYED</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
