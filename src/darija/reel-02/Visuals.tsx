import React from "react";
import {AbsoluteFill,interpolate} from "remotion";

const C={cream:"#FFF8E9",navy:"#102653",blue:"#195CE6",sky:"#BFD9FF",orange:"#F58041",yellow:"#FFD25B",ink:"#091A3D"};
const clamp={extrapolateLeft:"clamp" as const,extrapolateRight:"clamp" as const};
const t=(f:number,a:number,b:number,x:number,y:number)=>interpolate(f,[a,b],[x,y],clamp);
const W=1080,H=1920;

const Background:React.FC<{dark?:boolean;frame:number}> = ({dark=false,frame:f}) => <>
 <rect width={W} height={H} fill={dark?"url(#dark)":"url(#ivory)"}/>
 <circle cx={900+Math.sin(f/70)*18} cy="410" r="315" fill={dark?"#367FFF":"#D5E7FF"} opacity={dark?.12:.68}/>
 <circle cx="60" cy="1490" r="285" fill={dark?"#FB9C53":"#FFD776"} opacity={dark?.08:.19}/>
 <g fill={dark?"#9DC0FF":"#416BA4"} opacity={dark?.15:.12}>{Array.from({length:80},(_,i)=><circle key={i} cx={70+(i%8)*135} cy={510+Math.floor(i/8)*120} r="2"/>)}</g>
 <path d="M70 1598 H1010" stroke={dark?"#91B8FF":"#7297C5"} strokeWidth="2" opacity=".2"/>
</>;
const Defs:React.FC=()=> <defs>
 <linearGradient id="dark" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#102C5F"/><stop offset=".56" stopColor="#0D2046"/><stop offset="1" stopColor="#07142E"/></linearGradient>
 <linearGradient id="ivory" x1="0" x2=".8" y1="0" y2="1"><stop stopColor="#FFF9EC"/><stop offset="1" stopColor="#E9F0F8"/></linearGradient>
 <linearGradient id="skin02" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#E8A676"/><stop offset=".55" stopColor="#C77D5C"/><stop offset="1" stopColor="#9D5B4E"/></linearGradient>
 <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#346ED1"/><stop offset="1" stopColor="#101D49"/></linearGradient>
 <linearGradient id="phone" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#47639A"/><stop offset=".22" stopColor="#16294D"/><stop offset="1" stopColor="#07152E"/></linearGradient>
 <linearGradient id="blueflow" x1="0" x2="1"><stop stopColor="#6CC8FF"/><stop offset="1" stopColor="#1656E2"/></linearGradient>
 <linearGradient id="orangeflow" x1="0" x2="1"><stop stopColor="#FFCB66"/><stop offset="1" stopColor="#ED713B"/></linearGradient>
 <filter id="shadow02" x="-30%" y="-30%" width="160%" height="180%"><feGaussianBlur stdDeviation="22"/></filter>
 <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="3.2" markerHeight="3.2" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill={C.blue}/></marker>
 <marker id="arrow-orange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="3.2" markerHeight="3.2" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill={C.orange}/></marker>
 </defs>;
const Bar:React.FC<{frame:number;count?:number;x?:number;y?:number;gap?:number;scale?:number;color?:string}> = ({frame:f,count=30,x=0,y=0,gap=16,scale=1,color="#80B9FF"}) => <g transform={`translate(${x} ${y}) scale(${scale})`}>{Array.from({length:count},(_,i)=>{const envelope=.30+.70*Math.abs(Math.sin(i*.53+f*.075));const h=12+envelope*(26+45*Math.abs(Math.sin(i*1.73)));return <rect key={i} x={i*gap} y={-h/2} width="7" height={h} rx="3.5" fill={color} opacity={.5+.5*Math.abs(Math.sin(f*.04+i*.3))}/>})}</g>;
const Header:React.FC<{dark?:boolean}> = ({dark=false})=><g><text x="1008" y="120" textAnchor="start" direction="rtl" fill={dark?"#F8F5EA":C.blue} fontSize="42" fontFamily="Reel02Tajawal" fontWeight="700">واش عارف؟ <tspan fill={C.orange}>✳</tspan></text><path d="M70 152H1010" stroke={dark?"#A4BCE4":"#A5BCD9"} opacity=".28" strokeWidth="2"/></g>;
const Badge:React.FC<{x:number;y:number;children:React.ReactNode;fill?:string}> = ({x,y,children,fill=C.blue}) => <g transform={`translate(${x} ${y})`}><rect x="-115" y="-37" width="230" height="74" rx="37" fill={fill}/><text textAnchor="middle" y="15" direction="rtl" fill="#fff" fontSize="39" fontFamily="Reel02Tajawal" fontWeight="700">{children}</text></g>;

// A diagrammatic profile, not an anatomical cross-section. The inner-ear
// landmark is schematic; air and internal vibration paths share that endpoint.
const Profile:React.FC<{frame:number;ghost?:boolean}> = ({frame:f,ghost=false}) => <g transform={`translate(0 ${Math.sin(f/42)*3})`}>
 <path d="M195 660 Q204 602 210 537 C142 515 101 462 99 386 C95 253 156 159 254 151 C347 143 410 202 411 286 Q416 311 427 328 L445 352 Q452 363 441 369 L429 374 Q423 379 426 387 Q429 394 420 401 Q434 407 423 416 L421 443 Q417 484 376 497 L343 507 Q333 582 348 660Z" fill={ghost?"#D6E4FF":"url(#skin02)"} stroke={ghost?"#9AB9EE":"#784E4D"} strokeWidth="5" strokeLinejoin="round"/>
 <path d="M101 360 C89 242 149 151 251 150 C344 140 409 198 411 286 Q397 259 379 255 Q346 251 318 225 Q266 253 197 235 Q148 266 101 360Z" fill={ghost?"#A7C4F0":"#172846"}/>
 <path d="M122 243 Q157 170 235 166 M257 164 Q324 153 376 207" fill="none" stroke={ghost?"#D8E8FF":"#3B5074"} strokeWidth="11" strokeLinecap="round" opacity=".75"/>
 <path d="M345 323 Q365 314 381 323" stroke="#674143" strokeWidth="7" fill="none" strokeLinecap="round"/><ellipse cx="367" cy="338" rx="6" ry="8" fill="#172946"/>
 <path d="M420 423 Q402 432 387 424" fill="none" stroke="#8C4B41" strokeWidth="6" strokeLinecap="round"/>
 <path d="M172 318 C130 298 123 350 143 385 C156 407 180 407 188 388" fill="#B96D53" stroke="#965742" strokeWidth="5"/>
 <path d="M157 343 Q181 329 179 364 Q165 355 161 374" fill="none" stroke="#8F5143" strokeWidth="5" strokeLinecap="round"/>
 <circle cx="179" cy="364" r="11" fill="#FFF8E9" opacity=".8"/>
 <path d="M195 620 Q266 649 347 620 L350 660 H195Z" fill="#194EAA" opacity=".9"/>
 </g>;

const Face:React.FC<{frame:number;ghost?:boolean;react?:boolean}> = ({frame:f,ghost=false,react=false}) => <g transform={`rotate(${react?-4+Math.sin(f/28)*1.5:Math.sin(f/42)*1.5} 210 260)`}>
 <path d="M54 585 Q60 505 126 478 L293 478 Q362 505 367 585Z" fill={ghost?"#75A4F2":"#1956C5"}/>
 <path d="M157 447 L155 506 Q211 548 267 503 L264 447" fill={ghost?"#C9DDFF":"#B26B52"}/>
 <ellipse cx="210" cy="270" rx="142" ry="181" fill={ghost?"#C9DEFF":"url(#skin02)"}/>
 <path d="M69 253 Q44 136 110 96 Q154 49 214 70 Q280 45 330 102 Q362 137 349 245 Q328 210 317 182 Q276 197 239 165 Q188 204 131 175 Q110 220 69 253Z" fill={ghost?"#8EB4E8":"#152441"}/>
 <path d="M95 141 Q140 85 190 105 M226 99 Q278 89 313 135" stroke={ghost?"#E4F1FF":"#405575"} strokeWidth="12" fill="none" strokeLinecap="round"/>
 <path d={`M125 ${react?252:259} Q154 ${react?231:247} 179 ${react?254:258} M238 ${react?251:258} Q263 ${react?231:247} 290 ${react?253:258}`} fill="none" stroke="#593D43" strokeWidth="8" strokeLinecap="round"/>
 <ellipse cx="154" cy="278" rx={react?10:8} ry={react?14:10} fill="#1B2945"/><ellipse cx="265" cy="278" rx={react?10:8} ry={react?14:10} fill="#1B2945"/>
 <path d="M207 279 Q197 315 211 321" fill="none" stroke="#965A4B" strokeWidth="7" strokeLinecap="round"/>
 {react?<ellipse cx="211" cy="370" rx="18" ry="14" fill="#8E4C44"/>:<path d="M176 368 Q211 384 246 365" fill="none" stroke="#874C42" strokeWidth="7" strokeLinecap="round"/>}
 </g>;
const Phone:React.FC<{frame:number;mode?:"record"|"play"|"capture"}> = ({frame:f,mode="record"}) => <g>
 <rect x="-18" y="20" width="452" height="838" rx="68" fill="#030D23" opacity=".3" filter="url(#shadow02)"/>
 <rect width="416" height="818" rx="66" fill="url(#phone)" stroke="#6C86B4" strokeWidth="5"/>
 <rect x="18" y="18" width="380" height="782" rx="51" fill="#EAF2FF"/>
 <rect x="140" y="29" width="136" height="20" rx="10" fill="#132349"/>
 <circle cx="64" cy="92" r="12" fill={mode==="record"?C.orange:C.blue}/>
 <rect x="91" y="84" width="128" height="15" rx="7" fill="#A4BADD"/>
 <rect x="38" y="150" width="340" height="390" rx="27" fill="#D6E6FF"/>
 <circle cx="208" cy="295" r="104" fill="#BFD6F8"/>
 <g transform="translate(109 192) scale(.48)"><Face frame={f} react={mode!=="record"}/></g>
 <path d="M68 585H348" stroke="#B9CBE9" strokeWidth="4"/>
 <Bar frame={f} x={67} y={650} count={22} gap={13} scale={1} color={C.blue}/>
 <circle cx="208" cy="742" r="36" fill={mode==="record"?C.orange:C.blue}/>
 {mode==="record"?<circle cx="208" cy="742" r="10" fill="#FFF"/>:<path d="M199 725 L225 742 L199 759Z" fill="#FFF"/>}
 </g>;
const curve=(p:number,a:number,b:number,c:number,d:number)=>Math.pow(1-p,3)*a+3*Math.pow(1-p,2)*p*b+3*(1-p)*p*p*c+p*p*p*d;
const AirPath:React.FC<{frame:number;opacity?:number}> = ({frame:f,opacity=1}) => <g opacity={opacity}>
 <path d="M416 411 C 650 420 650 65 195 145 C 55 170 70 300 185 360" fill="none" stroke="#75BBFF" strokeWidth="24" opacity=".18"/><path d="M416 411 C 650 420 650 65 195 145 C 55 170 70 300 185 360" fill="none" stroke="url(#blueflow)" strokeWidth="7" strokeDasharray="18 16" strokeDashoffset={-f*2.5} markerEnd="url(#arrow-blue)"/>
 {[0,1,2].map(i=>{const p=((f/95+i/3)%1+1)%1;const q=p<.5?p*2:(p-.5)*2;const x=p<.5?curve(q,416,650,650,195):curve(q,195,55,70,185);const y=p<.5?curve(q,411,420,65,145):curve(q,145,170,300,360);return <circle key={i} cx={x} cy={y} r="12" fill="#fff" stroke={C.blue} strokeWidth="5"/>})}
 {[0,1,2].map(i=>{const p=((f-i*16)%52+52)%52;return <circle key={i} cx="421" cy="410" r={12+p*.9} fill="none" stroke={C.blue} strokeWidth="4" opacity={(1-p/52)*.6}/>})}
 </g>;
const BonePath:React.FC<{frame:number;opacity?:number}> = ({frame:f,opacity=1}) => <g opacity={opacity}>
 <path d="M416 411 C 330 468 258 443 185 360" fill="none" stroke="#FFAF76" strokeWidth="32" opacity=".24"/><path d="M416 411 C 330 468 258 443 185 360" fill="none" stroke="url(#orangeflow)" strokeWidth="9" strokeDasharray="14 11" strokeDashoffset={-f*2.5} markerEnd="url(#arrow-orange)"/>
 {[0,1,2].map(i=>{const p=((f/67+i/3)%1+1)%1;return <circle key={i} cx={curve(p,416,330,258,185)} cy={curve(p,411,468,443,360)} r="11" fill="#fff4d5" stroke={C.orange} strokeWidth="4"/>})}
 <circle cx="180" cy="361" r={20+5*Math.sin(f/9)} fill="none" stroke={C.orange} strokeWidth="5" opacity=".8"/>
 </g>;
const ProfileDiagram:React.FC<{frame:number;airOpacity?:number;boneOpacity?:number}> = ({frame,airOpacity=1,boneOpacity=0}) => <g>
 <path d="M35 755 Q47 662 196 602 Q250 608 310 602 Q455 650 500 755Z" fill="#194EAA"/>
 <path d="M61 748 Q95 669 192 640" fill="none" stroke="#3976D8" strokeWidth="6" opacity=".6" strokeLinecap="round"/>
 <g transform="translate(60 135) scale(.72)"><Profile frame={frame}/><AirPath frame={frame} opacity={airOpacity}/><BonePath frame={frame} opacity={boneOpacity}/></g>
 </g>;

export const SceneCanvas:React.FC<{index:number;frame:number}> = ({index,frame:f}) => {
 const dark=index===0 || index===4 || index===5;
 return <AbsoluteFill style={{background:dark?C.ink:C.cream}}><svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position:"absolute",inset:0}}><Defs/><Background dark={dark} frame={f}/><Header dark={dark}/>
 {index===0 && <>
   <circle cx="295" cy="1060" r="370" fill="#204477" opacity=".65"/><circle cx="295" cy="1060" r={370+Math.sin(f/20)*8} fill="none" stroke="#6FA5FD" strokeWidth="3" opacity=".3"/>
   <g transform={`translate(25 ${760+Math.sin(f/33)*8}) scale(1.16)`}><Face frame={f} react={f>80}/></g>
   <g transform={`translate(${600-t(f,0,160,0,25)} ${650+Math.sin(f/28)*7}) rotate(5 208 410) scale(.87)`}><Phone frame={f} mode={f<70?"record":"play"}/></g>
   <g opacity={t(f,75,100,0,.8)}><path d="M542 1050 Q600 1015 635 1040 M529 1120 Q594 1087 633 1100" fill="none" stroke={C.orange} strokeWidth="9" strokeLinecap="round"/><text x="500" y="905" fill={C.yellow} fontSize="130" fontWeight="700" fontFamily="Arial">?</text></g>
   <Bar frame={f} x={115} y={1530} count={53} gap={16} color="#76ADFF"/>
 </>}
 {index===1 && <>
   <circle cx="540" cy="1030" r="370" fill="#DDEBFF"/><circle cx="540" cy="1030" r="322" fill="none" stroke="#ABC6F5" strokeWidth="3" strokeDasharray="5 15"/>
   <path d="M540 632 V1435" stroke="#83A9E6" strokeWidth="5" opacity=".65"/>
   <g opacity=".45" transform={`translate(${t(f,0,180,378,350)} 795) scale(.82)`}><Face frame={f} ghost/></g>
   <g transform={`translate(${t(f,0,180,255,230)} 755) scale(.95)`}><Face frame={f} react/></g>
   {[0,1,2].map(i=><path key={i} d={`M${715+i*35} ${920-i*28} Q${785+i*48} 1030 ${715+i*35} ${1140+i*28}`} fill="none" stroke={i===1?C.orange:C.blue} strokeWidth="8" strokeLinecap="round" opacity={.24+.5*Math.abs(Math.sin(f/18-i))}/>)}
   <text x="830" y="780" fontSize="152" fontFamily="Arial" fontWeight="700" fill={C.orange} opacity={t(f,20,45,0,.9)}>?</text>
 </>}
 {(index===2||index===3) && <>
   <circle cx="540" cy="1020" r="427" fill="#E0EDFF"/><circle cx="540" cy="1020" r="375" fill="none" stroke="#8FB3EE" strokeWidth="3" strokeDasharray="6 14"/>
   <g opacity={index===3?1-t(f,195,230,0,1):1}>
   <g transform={`translate(${225+(index===3?t(f,0,240,0,-30):0)} ${640+Math.sin(f/40)*3}) scale(${1.14+(index===3?t(f,0,240,0,.05):0)})`}><ProfileDiagram frame={f} airOpacity={index===3 ? .45+.55*t(f,180,240,0,1) : 1} boneOpacity={index===3?t(f,20,55,0,1):0}/></g>
   <Badge x={index===2?540:345} y={1430}>الهواء</Badge>
   {index===3&&<g opacity={t(f,15,45,0,1)}><Badge x={750} y={1430} fill={C.orange}>داخل الراس</Badge><path d="M540 1477 V1520 M345 1468 Q345 1520 540 1520 Q750 1520 750 1468" fill="none" stroke="#7D9CC8" strokeWidth="4"/><circle cx="540" cy="1520" r={16+3*Math.sin(f/9)} fill={C.yellow}/></g>}
   </g>
   {index===3&&<g opacity={t(f,195,230,0,1)}>
     <circle cx="205" cy="1030" r={110+3*Math.sin(f/18)} fill="#D1E4FF"/><circle cx="875" cy="1030" r={110+3*Math.sin(f/18+1)} fill="#FFE4CF"/>
     <g transform={`translate(333 ${770+Math.sin(f/35)*4}) scale(.91)`}><Face frame={f}/></g>
     <path d="M286 1030 C335 1030 355 1015 405 1040" fill="none" stroke={C.blue} strokeWidth="9" strokeDasharray="16 12" strokeDashoffset={-f*2} markerEnd="url(#arrow-blue)"/>
     <path d="M794 1030 C745 1030 725 1015 675 1040" fill="none" stroke={C.orange} strokeWidth="9" strokeDasharray="16 12" strokeDashoffset={-f*2} markerEnd="url(#arrow-orange)"/>
     {[0,1,2].map(i=><g key={i}><circle cx="205" cy="1030" r={26+i*22+3*Math.sin(f/12-i)} fill="none" stroke={C.blue} strokeWidth="5" opacity={.7-i*.15}/><circle cx="875" cy="1030" r={26+i*22+3*Math.sin(f/12-i)} fill="none" stroke={C.orange} strokeWidth="5" opacity={.7-i*.15}/></g>)}
     {[0,1,2].map(i=>{const p=((f/55+i/3)%1+1)%1;return <g key={i}><circle cx={286+105*p} cy={1030+10*p} r="8" fill={C.blue}/><circle cx={794-105*p} cy={1030+10*p} r="8" fill={C.orange}/></g>})}
     <path d="M205 1140 Q205 1365 410 1365 M875 1140 Q875 1365 670 1365" fill="none" stroke="#9DBAE3" strokeWidth="4" strokeDasharray="8 10"/>
     <circle cx="540" cy="1365" r="29" fill="#fff" stroke="#B4CBEA" strokeWidth="3"/><path d="M527 1365h26 M540 1352v26" stroke={C.orange} strokeWidth="5" strokeLinecap="round"/>
     <Badge x={205} y={1430}>الهواء</Badge><Badge x={875} y={1430} fill={C.orange}>داخل الراس</Badge>
   </g>}
 </>}
 {index===4 && <>
   <circle cx="470" cy="1035" r="375" fill="#1E4178" opacity=".55"/>
   <g transform="translate(100 790) scale(.82)"><ProfileDiagram frame={f} boneOpacity={1}/></g>
   <path d="M395 1143 Q535 1050 690 1040" fill="none" stroke="#8CC5FF" strokeWidth="9" strokeDasharray="18 12" strokeDashoffset={-f*2}/>
   {[0,1,2].map(i=>{const p=((f/65+i/3)%1+1)%1;return <circle key={i} cx={(1-p)*(1-p)*395+2*(1-p)*p*535+p*p*690} cy={(1-p)*(1-p)*1143+2*(1-p)*p*1050+p*p*1040} r="10" fill="#DDF2FF" stroke={C.blue} strokeWidth="4"/>})}
   <g transform={`translate(645 ${760+Math.sin(f/34)*5}) scale(.64)`}><Phone frame={f} mode="capture"/></g>
   <g opacity={t(f,20,55,0,1)} transform="translate(710 1410)"><rect width="240" height="76" rx="38" fill="#2265DF"/><text x="120" y="51" textAnchor="middle" direction="rtl" fill="#fff" fontFamily="Reel02Tajawal" fontWeight="700" fontSize="38">الهواء</text></g>
 </>}
 {index===5 && <>
   <circle cx="540" cy="1030" r="370" fill="#214378" opacity=".5"/>
   <g transform="translate(90 715)"><rect width="410" height="635" rx="44" fill="#F5F8FF"/><rect x="25" y="25" width="360" height="465" rx="30" fill="#DAE9FF"/><g transform="translate(100 70) scale(.53)"><Face frame={f}/></g><Bar frame={f} x={50} y={550} count={18} gap={17} color={C.blue}/><path d="M60 610H184" stroke={C.blue} strokeWidth="9" strokeLinecap="round"/><path d="M205 610H345" stroke={C.orange} strokeWidth="9" strokeLinecap="round"/></g>
   <g transform="translate(580 715)"><rect width="410" height="635" rx="44" fill="#EAF2FF"/><rect x="25" y="25" width="360" height="465" rx="30" fill="#CBDDFB"/><g transform="translate(100 70) scale(.53)"><Face frame={f} ghost/></g><Bar frame={f+15} x={50} y={550} count={18} gap={17} color={C.blue}/><path d="M60 610H345" stroke={C.blue} strokeWidth="9" strokeLinecap="round"/></g>
   <circle cx="540" cy="1030" r="43" fill={C.orange}/><path d="M519 1030H561 M549 1018L562 1030 549 1042" stroke="#fff" fill="none" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
   <g opacity={t(f,190,245,0,1)}><rect x="300" y="1460" width="480" height="103" rx="52" fill="#FFF8E9"/><text x="540" y="1530" textAnchor="middle" direction="rtl" fill={C.blue} fontFamily="Reel02Tajawal" fontWeight="700" fontSize="57">واش عارف؟</text></g>
 </>}
 </svg></AbsoluteFill>
};
