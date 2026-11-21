import React from "react";

export const colors = {cream:"#FFF8E9", ink:"#17345E", blue:"#1859DB", deep:"#234A85", sky:"#AAC9EC", yellow:"#FFCE42", orange:"#F4874A", skin:"#C9825E"};
const c = colors;

/** One character, drawn once and reused in every shot. Local coordinate system is 260 × 480. */
export const Character: React.FC<{frame:number; pose?:"seated"|"look"|"walk"|"timer"}> = ({frame:f,pose="look"}) => {
  const walk=pose==="walk"?Math.sin(f/5)*16:0;
  const arm=pose==="timer"?-35+Math.sin(f/12)*4:pose==="look"?-12:8+Math.sin(f/24)*4;
  const head=pose==="look"?-9:pose==="walk"?4:Math.sin(f/35)*2;
  return <g>
    <ellipse cx="130" cy="464" rx="92" ry="13" fill="#18396A" opacity=".16"/>
    <g transform={`translate(0 ${Math.sin(f/18)*2})`}>
      <path d={`M105 300 Q95 368 ${88+walk} 434 L125 435 Q141 365 143 310`} fill="#273D69"/>
      <path d={`M145 299 Q157 370 ${166-walk} 434 L202 434 Q201 365 185 290`} fill="#1A315C"/>
      <path d={`M${83+walk} 425 q-8 8 -20 20 q-4 12 12 14 h48 l3-25Z`} fill="#203452"/>
      <path d={`M${161-walk} 425 q-3 11 -9 22 q-3 12 11 12 h55 q10-5 0-14 l-20-13Z`} fill="#203452"/>
      <path d="M85 176 Q50 195 56 268 L68 315 Q126 337 191 311 L204 227 Q200 188 172 176Z" fill={c.blue}/>
      <path d="M74 198 Q85 182 105 181 L117 301 Q89 309 71 299Z" fill="#3075E8" opacity=".55"/>
      <path d="M78 202 Q57 208 44 257 L53 286 Q63 296 73 285 L94 241" fill="#1852C0"/>
      <g transform={`rotate(${arm} 178 207)`}><path d="M176 192 Q197 191 209 211 L230 270 Q232 283 220 288 Q207 291 201 276 L179 239" fill="#286DE0"/><path d="M221 278 q14-3 18 9 l-3 19 q-7 12-17 2 l-9-18Z" fill={c.skin}/></g>
      <path d="M100 176 L103 150 L157 150 L162 177 Q133 205 100 176Z" fill="#B66D4E"/>
      <g transform={`rotate(${head} 130 115)`}>
        <ellipse cx="68" cy="112" rx="7" ry="11" fill={c.skin}/><ellipse cx="194" cy="112" rx="7" ry="11" fill={c.skin}/>
        <ellipse cx="131" cy="106" rx="64" ry="76" fill={c.skin}/>
        <path d="M68 100 Q53 58 80 33 Q96 13 122 22 Q150 4 175 27 Q198 39 192 93 L183 83 Q175 76 177 59 Q157 67 146 55 Q126 70 102 59 Q91 80 75 80Z" fill="#202E43"/>
        <path d="M80 52 Q97 29 121 34 M136 29 Q160 24 176 42" stroke="#35465C" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M92 101 q12-8 23-1 M145 100 q12-7 23 0" fill="none" stroke="#593D37" strokeWidth="5" strokeLinecap="round"/>
        <ellipse cx={106+(pose==="look"?6:0)} cy="112" rx="4" ry="6" fill="#24344B"/><ellipse cx={158+(pose==="look"?6:0)} cy="112" rx="4" ry="6" fill="#24344B"/>
        <path d="M132 110 q-3 14 4 16 M115 143 Q132 152 148 141" fill="none" stroke="#824A3E" strokeWidth="4" strokeLinecap="round"/>
        <path d="M78 130 Q78 174 115 182 Q156 193 183 151 Q171 165 150 165 Q125 176 104 158Z" fill="#273448" opacity=".18"/>
      </g>
      {pose==="seated" && <g><path d="M75 300 Q45 333 19 334 L13 370 Q69 380 121 342" fill="#304A79"/><path d="M147 305 Q169 327 212 333 L214 369 Q156 379 123 348" fill="#233D6D"/></g>}
    </g>
  </g>;
};

export const StormCloud: React.FC<{frame:number; discharge?:boolean}> = ({frame:f,discharge=true}) => <g>
  <ellipse cx="512" cy="420" rx="350" ry="120" fill="#6387B3" opacity=".24"/>
  <g transform={`translate(${Math.sin(f/35)*12} ${Math.sin(f/29)*5})`}>
    <path d="M157 450 Q99 437 115 381 Q130 336 192 335 Q204 249 290 253 Q332 190 409 219 Q476 158 553 209 Q629 182 671 242 Q761 215 795 299 Q872 297 893 355 Q913 425 850 451Z" fill="#446E9F"/>
    <path d="M153 399 Q176 354 232 358 Q255 289 324 302 Q367 244 431 271 Q500 226 558 273 Q637 250 676 315 Q752 295 791 359 Q858 348 875 399 Q861 434 813 443 H194 Q164 438 153 399Z" fill="#658DB9"/>
    <path d="M224 343 Q250 305 302 309 M377 271 Q410 249 449 267 M600 284 Q633 278 658 306" fill="none" stroke="#9AB9DA" strokeWidth="8" opacity=".7" strokeLinecap="round"/>
    {discharge && <><path d="M435 300 l-35 43 36-1-23 51 57-59-36 1 24-35" fill={c.yellow} opacity={.45+.55*Math.abs(Math.sin(f/8))}/><path d="M580 330 l-25 31 27-2-15 34 40-42-27 1 17-22" fill="#D8EBFF" opacity={.35+.6*Math.abs(Math.sin(f/11))}/></>}
  </g>
</g>;
export const Lightning: React.FC<{opacity?:number}> = ({opacity=1}) => <g opacity={opacity}><path d="M520 425 L445 615 L502 604 L459 824 L607 564 L542 581 L588 425Z" fill="#FFFBE0" stroke={c.yellow} strokeWidth="16" strokeLinejoin="round"/><path d="M520 425 L445 615 L502 604 L459 824 L607 564 L542 581 L588 425Z" fill="none" stroke="#FFDE58" strokeWidth="35" opacity=".25"/></g>;
export const Rain: React.FC<{frame:number; count?:number}> = ({frame:f,count=50}) => <g opacity=".55">{Array.from({length:count},(_,i)=>{const x=(i*137)%1080;const y=(i*173+f*19)%1100;return <path key={i} d={`M${x} ${y} l-13 35`} stroke="#E8F6FF" strokeWidth={i%3===0?5:3} strokeLinecap="round"/>})}</g>;
export const Landscape: React.FC<{frame:number}> = ({frame:f}) => <g>
  <rect width="1080" height="1920" fill="#B9D4EE"/><circle cx="850" cy="205" r="145" fill="#FBE8A6" opacity=".5"/>
  <g transform={`translate(${Math.sin(f/55)*5} 0)`}><path d="M0 870 Q150 740 310 835 Q470 700 650 819 Q850 690 1080 810 V1200 H0Z" fill="#91B8D5"/><path d="M0 960 Q220 840 420 920 Q660 800 1080 930 V1250 H0Z" fill="#6F9BC0"/>
  <g fill="#6489B0"><path d="M58 822 h120 v190 H58z M207 780 h155 v230 H207z M378 854 h102 v160 H378z M759 800 h115 v220 H759z M894 846 h112 v180 H894z"/></g>
  <g fill="#D6E2DD" opacity=".8">{Array.from({length:18},(_,i)=><rect key={i} x={75+(i%6)*152} y={865+Math.floor(i/6)*43} width="18" height="21" rx="3"/>)}</g></g>
  <path d="M0 1090 Q230 1010 480 1060 T1080 1040 V1920 H0Z" fill="#B6C5A3"/><path d="M0 1150 Q280 1090 560 1140 T1080 1110 V1920 H0Z" fill="#D7C69A"/>
</g>;

export const Room: React.FC<{frame:number; children?:React.ReactNode; flash?:number; windowScale?:number}> = ({frame:f,children,flash=0,windowScale=1}) => <g>
  <defs><linearGradient id="wall" x2="0" y2="1"><stop stopColor="#FFF7E7"/><stop offset="1" stopColor="#EBDAC2"/></linearGradient><linearGradient id="sofa" x2="0" y2="1"><stop stopColor="#72A3C9"/><stop offset="1" stopColor="#4378A6"/></linearGradient><clipPath id="windowClip"><rect x="485" y="290" width="480" height="650" rx="16"/></clipPath></defs>
  <rect width="1080" height="1920" fill="url(#wall)"/><path d="M0 1330 H1080 V1920 H0Z" fill="#DDBE97"/><path d="M0 1330 H1080" stroke="#C8A683" strokeWidth="18"/>
  <g opacity=".35" stroke="#CFAE89" strokeWidth="3"><path d="M0 1520 H1080 M0 1720 H1080 M210 1330 L70 1920 M620 1330 L710 1920"/></g>
  <rect x="445" y="250" width="560" height="735" rx="25" fill="#B39478" opacity=".25"/>
  <g clipPath="url(#windowClip)"><g transform={`translate(${485+240*(1-windowScale)} ${290+325*(1-windowScale)}) scale(${.445*windowScale} ${.6*windowScale})`}><Landscape frame={f}/><StormCloud frame={f}/><Lightning opacity={flash}/><Rain frame={f}/></g></g>
  <rect x="477" y="282" width="496" height="666" rx="20" fill="none" stroke="#F7E7CF" strokeWidth="25"/><path d="M725 290 V938 M488 612 H963" stroke="#FAECD8" strokeWidth="17"/>
  <path d={`M448 244 Q${410+Math.sin(f/22)*8} 430 444 950 L500 950 Q470 600 510 250Z`} fill="#EAAE75"/><path d={`M1000 244 Q${1040+Math.sin(f/26)*8} 500 1007 950 L949 950 Q984 570 947 250Z`} fill="#D89160"/><path d="M425 242 H1020" stroke="#9E7058" strokeWidth="14" strokeLinecap="round"/>
  <rect x="55" y="465" width="238" height="330" rx="12" fill="#B6896B"/><rect x="67" y="477" width="214" height="306" fill="#FDF0D6"/><path d="M90 718 Q155 630 250 693 M100 700 L146 615 L200 686" fill="none" stroke="#7DA9BC" strokeWidth="12"/><circle cx="222" cy="550" r="30" fill="#F9C95C"/>
  <ellipse cx="535" cy="1575" rx="475" ry="115" fill="#F3D5A8"/><ellipse cx="535" cy="1575" rx="395" ry="75" fill="#FAE6C6" opacity=".8"/>
  <g><path d="M90 1270 Q85 1070 190 1068 H602 Q696 1078 697 1270 V1430 H90Z" fill="#3F739F"/><rect x="116" y="1100" width="235" height="230" rx="45" fill="url(#sofa)"/><rect x="354" y="1100" width="310" height="230" rx="45" fill="url(#sofa)"/><path d="M83 1280 Q81 1225 132 1225 Q182 1225 182 1290 V1380 H618 V1290 Q620 1226 670 1226 Q713 1226 713 1280 V1418 Q713 1450 680 1450 H115 Q83 1450 83 1418Z" fill="#5B8FB9"/><path d="M150 1450 v55 M650 1450 v55" stroke="#7B5D4C" strokeWidth="20"/><path d="M202 1160 l100 8 -8 122 -100-8Z" fill="#F3C85B"/><path d="M490 1160 l102-15 17 125 -102 16Z" fill="#E9B08A"/></g>
  {children}
  <g><ellipse cx="744" cy="1578" rx="170" ry="37" fill="#84694F" opacity=".18"/><path d="M625 1470 H864 L835 1600 H650Z" fill="#B37D58"/><ellipse cx="744" cy="1467" rx="150" ry="35" fill="#D9A879"/><ellipse cx="755" cy="1452" rx="38" ry="12" fill="#B97950"/><path d="M736 1410 h38 l-5 40 h-28Z" fill="#F4F0E4"/><path d="M775 1416 q23 0 16 19 q-4 9-19 7" fill="none" stroke="#F4F0E4" strokeWidth="7"/></g>
  <g><path d="M920 1455 h95 l-12 100 h-70Z" fill="#D58E61"/><path d="M968 1455 Q968 1350 920 1280 M970 1455 Q982 1330 1038 1272 M972 1408 Q951 1334 980 1275" stroke="#58866C" strokeWidth="9" fill="none"/><g fill="#759E76"><ellipse cx="915" cy="1280" rx="25" ry="54" transform="rotate(-35 915 1280)"/><ellipse cx="1037" cy="1275" rx="25" ry="55" transform="rotate(30 1037 1275)"/><ellipse cx="981" cy="1273" rx="24" ry="58"/></g></g>
  <rect width="1080" height="1920" fill="#FFFBE0" opacity={flash*.27} pointerEvents="none"/>
</g>;
