/* Animated branded illustrations, used until real photos are set in data.js. */
const sky = {
  birthday: ["#fdeae3", "#f4d6cb"], wedding: ["#fbf4e6", "#f0e0bd"], conference: ["#eaf0e3", "#cfdcc4"],
  graduation: ["#f8ecd0", "#ecd49a"], celebration: ["#f9dfd5", "#ecd093"],
};
const bits = [[60, 80, "#c9a24d"], [720, 120, "#6f8a64"], [140, 390, "#e8a998"], [660, 430, "#c9a24d"], [300, 50, "#fff"], [520, 90, "#e8a998"], [90, 250, "#6f8a64"], [730, 310, "#fff"]];

function Balloon({ x, y, r, c, d }) {
  return (
    <g className="bob" style={{ animationDelay: `${d}s` }}>
      <path d={`M${x} ${y + r * 1.15} C ${x - 14} ${y + r + 60}, ${x + 14} ${y + r + 110}, ${x} ${y + r + 170}`} stroke="#9a8a62" strokeWidth="2" fill="none" />
      <ellipse cx={x} cy={y} rx={r} ry={r * 1.15} fill={c} />
      <ellipse cx={x - r * 0.35} cy={y - r * 0.4} rx={r * 0.17} ry={r * 0.3} fill="#fff" opacity=".35" />
      <path d={`M${x - 7} ${y + r * 1.15 + 2} l7 10 l7 -10z`} fill={c} />
    </g>
  );
}

function Arch({ s = 1, ox = 0, oy = 0 }) {
  const dots = [];
  for (let a = 0; a <= 180; a += 18) dots.push([400 - 190 * Math.cos((a * Math.PI) / 180), 300 - 190 * Math.sin((a * Math.PI) / 180)]);
  for (let y = 340; y <= 520; y += 60) { dots.push([210, y]); dots.push([590, y]); }
  return (
    <g transform={`translate(${ox} ${oy}) scale(${s})`}>
      <path d="M210 545 V300 A190 190 0 0 1 590 300 V545" stroke="#c9a24d" strokeWidth="12" fill="none" strokeLinecap="round" />
      {dots.map(([x, y], i) => (
        <g key={i} className="bob" style={{ animationDelay: `${(i % 7) * 0.3}s` }}>
          <ellipse cx={x - 16} cy={y + 8} rx="16" ry="7" fill="#6f8a64" transform={`rotate(-25 ${x - 16} ${y + 8})`} />
          <circle cx={x} cy={y} r="19" fill={i % 2 ? "#e8a998" : "#f4d6cb"} />
          <circle cx={x} cy={y} r="7" fill="#c9a24d" />
        </g>
      ))}
    </g>
  );
}

const scenes = {
  birthday: () => (
    <>
      <Balloon x={230} y={200} r={62} c="#e8a998" d={0} />
      <Balloon x={380} y={150} r={74} c="#c9a24d" d={0.6} />
      <Balloon x={540} y={205} r={60} c="#6f8a64" d={1.1} />
      <Balloon x={665} y={160} r={46} c="#ffffff" d={1.6} />
      <rect x="290" y="440" width="220" height="96" rx="10" fill="#fff" />
      <rect x="290" y="440" width="220" height="32" rx="10" fill="#e8a998" />
      <rect x="330" y="384" width="140" height="62" rx="10" fill="#fff" />
      <rect x="330" y="384" width="140" height="24" rx="10" fill="#c9a24d" />
      {[360, 400, 440].map((x, i) => (
        <g key={x}>
          <rect x={x - 4} y="352" width="8" height="34" fill="#6f8a64" />
          <ellipse className="fl" style={{ animationDelay: `${i * 0.15}s` }} cx={x} cy="342" rx="7" ry="12" fill="#ffb938" />
        </g>
      ))}
    </>
  ),
  wedding: () => (
    <>
      <Arch />
      <circle cx="372" cy="470" r="38" stroke="#c9a24d" strokeWidth="9" fill="none" />
      <circle cx="428" cy="470" r="38" stroke="#b58a35" strokeWidth="9" fill="none" />
    </>
  ),
  conference: () => (
    <>
      <rect x="190" y="60" width="420" height="200" rx="12" fill="#2b3a2e" />
      <rect x="205" y="75" width="390" height="170" rx="6" fill="#fff" />
      <rect x="230" y="100" width="190" height="16" rx="4" fill="#c9a24d" />
      <rect x="230" y="128" width="260" height="9" rx="4" fill="#d6d6cc" />
      {[0, 1, 2, 3].map((i) => <rect key={i} className="bob" style={{ animationDelay: `${i * 0.2}s` }} x={250 + i * 70} y={215 - (i + 1) * 20} width="42" height={(i + 1) * 20} fill={i % 2 ? "#6f8a64" : "#e8a998"} />)}
      <rect x="130" y="322" width="540" height="22" rx="4" fill="#8da088" />
      <rect x="372" y="268" width="56" height="56" rx="6" fill="#c9a24d" />
      {[0, 1, 2].map((r) => Array.from({ length: 10 }, (_, c) => <rect key={`${r}${c}`} x={92 + c * 62 + (r % 2) * 20} y={398 + r * 54} width="42" height="36" rx="9" fill={r % 2 ? "#6f8a64" : "#41573f"} />))}
    </>
  ),
  graduation: () => (
    <>
      <path d="M270 290 v72 q130 62 260 0 v-72 l-130 54z" fill="#41573f" />
      <polygon points="400,140 650,240 400,340 150,240" fill="#2b3a2e" />
      <circle cx="400" cy="240" r="9" fill="#c9a24d" />
      <path d="M400 240 L600 258 V380" stroke="#c9a24d" strokeWidth="5" fill="none" />
      <g className="bob"><circle cx="600" cy="392" r="13" fill="#c9a24d" /><rect x="592" y="396" width="16" height="40" rx="6" fill="#b58a35" /></g>
      <rect x="240" y="470" width="320" height="52" rx="26" fill="#fff" />
      <rect x="385" y="470" width="30" height="52" fill="#c9a24d" />
    </>
  ),
  celebration: () => (
    <>
      <Arch s={0.9} ox={40} oy={50} />
      <Balloon x={110} y={250} r={52} c="#e8a998" d={0} />
      <Balloon x={190} y={200} r={44} c="#c9a24d" d={0.7} />
      <Balloon x={690} y={240} r={52} c="#6f8a64" d={1.2} />
      <Balloon x={615} y={190} r={42} c="#ffffff" d={0.4} />
    </>
  ),
};

export default function Art({ kind = "celebration", variant = 0, className = "", label = "" }) {
  const [a, b] = sky[kind] || sky.celebration;
  const Scene = scenes[kind] || scenes.celebration;
  const id = `g-${kind}-${variant}`;
  return (
    <svg className={`art ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label || `${kind} illustration`}
      style={{ filter: variant ? `hue-rotate(${variant * 16}deg)` : undefined }}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
      <rect width="800" height="600" fill={`url(#${id})`} />
      <g transform={variant % 2 ? "translate(800 0) scale(-1 1)" : undefined}><Scene /></g>
      {bits.map(([x, y, c], i) => <rect key={i} className="tw" style={{ animationDelay: `${i * 0.4}s` }} x={x} y={y} width="14" height="7" rx="2" fill={c} transform={`rotate(${i * 35} ${x} ${y})`} />)}
    </svg>
  );
}

export function Photo({ src, kind, alt = "", variant = 0, className = "" }) {
  return src
    ? <img className={className} src={src} alt={alt} loading="lazy" />
    : <Art kind={kind} variant={variant} className={className} label={alt} />;
}
