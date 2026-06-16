// components.jsx — primitivas de UI Retro
const { useState: useStateC, useRef: useRefC, useEffect: useEffectC } = React;

const ACCENT_VAR = {
  primary: { bg:"var(--primary)", deep:"var(--primary-deep)" },
  secondary: { bg:"var(--secondary)", deep:"var(--secondary-deep)" },
  success: { bg:"var(--success)", deep:"#0F7A37" },
  warning: { bg:"var(--warning)", deep:"#B25E04" },
  danger:  { bg:"var(--danger)",  deep:"#B11717" },
};

// ── Button ────────────────────────────────────────────────────────────────
function Button({ children, variant="solid", tone="accent", size="md", full, icon, onClick, disabled, style, title }){
  const tones = {
    accent:  { bg:"var(--accent)", deep:"var(--accent-deep)", fg:"#fff" },
    ink:     { bg:"var(--ink)", deep:"#000", fg:"#fff" },
    success: { bg:"var(--success)", deep:"#0F7A37", fg:"#fff" },
    danger:  { bg:"var(--danger)", deep:"#B11717", fg:"#fff" },
  };
  const tn = tones[tone] || tones.accent;
  const pad = size==="sm" ? "7px 12px" : size==="lg" ? "13px 22px" : "10px 18px";
  const fs  = size==="sm" ? 12.5 : size==="lg" ? 15.5 : 14;

  const base = {
    display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
    fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:fs,
    letterSpacing:".02em", padding:pad, borderRadius:"var(--r-md)",
    border:"var(--bd) solid var(--ink)", width: full ? "100%" : "auto",
    transition:"transform .08s ease, box-shadow .08s ease, background .15s ease",
    userSelect:"none", whiteSpace:"nowrap",
  };
  const variants = {
    solid:   { background:tn.bg, color:tn.fg, boxShadow:"var(--sh-pop)" },
    outline: { background:"var(--surface)", color:"var(--ink)", boxShadow:"var(--sh-pop)" },
    ghost:   { background:"transparent", color:"var(--ink)", border:"var(--bd) solid transparent", boxShadow:"none" },
  };
  const dis = disabled ? { opacity:.45, pointerEvents:"none", boxShadow:"none" } : {};
  return (
    <button title={title} onClick={onClick} disabled={disabled}
      style={{ ...base, ...variants[variant], ...dis, ...style }}
      onMouseDown={e=>{ if(variant!=="ghost"){ e.currentTarget.style.transform="translate(2px,2px)"; e.currentTarget.style.boxShadow="0 0 0 var(--ink)"; } }}
      onMouseUp={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=variants[variant].boxShadow||"none"; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=variants[variant].boxShadow||"none"; }}>
      {icon}{children}
    </button>
  );
}

// ── Badge / pill ──────────────────────────────────────────────────────────
function Badge({ children, tone, solid, style }){
  const map = {
    success:["#E7F6EC","var(--success)","#0F7A37"],
    warning:["#FBEFD9","var(--warning)","#9A5104"],
    danger:["#FBE3E3","var(--danger)","#9D1414"],
    accent:["color-mix(in srgb, var(--accent) 14%, #fff)","var(--accent)","var(--accent-deep)"],
    neutral:["var(--paper-2)","var(--ink)","var(--ink)"],
  };
  const [bg,bd,fg] = map[tone] || map.neutral;
  return (
    <span className="mono" style={{
      display:"inline-flex", alignItems:"center", gap:5,
      background: solid ? bd : bg, color: solid ? "#fff" : fg,
      border:`1.5px solid ${solid ? bd : bd}`,
      padding:"3px 9px", borderRadius:999, fontSize:11, fontWeight:600,
      textTransform:"uppercase", letterSpacing:".08em", ...style,
    }}>{children}</span>
  );
}

// ── Avatar monogram ─────────────────────────────────────────────────────────
function Avatar({ text, accent="primary", size=46, square }){
  const a = ACCENT_VAR[accent] || ACCENT_VAR.primary;
  return (
    <div style={{
      width:size, height:size, flex:`0 0 ${size}px`,
      borderRadius: square ? "var(--r-md)" : "50%",
      background:a.bg, color:"#fff",
      border:"var(--bd) solid var(--ink)", boxShadow:"var(--sh-pop)",
      display:"grid", placeItems:"center",
      fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
      fontSize:size*0.38, letterSpacing:"-.02em",
    }}>{text}</div>
  );
}

// ── Stars rating ─────────────────────────────────────────────────────────────
function Stars({ value, size=14, showNum }){
  const full = Math.round(value);
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4 }}>
      <span style={{ display:"inline-flex", gap:1, color:"var(--warning)", fontSize:size, lineHeight:1 }}>
        {[1,2,3,4,5].map(i=>(
          <span key={i} style={{ color: i<=full ? "var(--warning)" : "var(--ink-faint)" }}>★</span>
        ))}
      </span>
      {showNum && <span className="mono" style={{ fontSize:size-1, fontWeight:600 }}>{value.toFixed(1)}</span>}
    </span>
  );
}

// ── Compat dots (1..5) ───────────────────────────────────────────────────────
function CompatDots({ value, label="Compatibilidad" }){
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      {label && <span className="eyebrow">{label}</span>}
      <span style={{ display:"inline-flex", gap:4 }}>
        {[1,2,3,4,5].map(i=>(
          <span key={i} style={{
            width:11, height:11, borderRadius:3, transform:"rotate(45deg)",
            border:"1.5px solid var(--ink)",
            background: i<=value ? "var(--accent)" : "transparent",
          }}/>
        ))}
      </span>
    </div>
  );
}

// ── Meter bar ────────────────────────────────────────────────────────────────
function Meter({ label, value, tone="accent" }){
  const color = tone==="accent" ? "var(--accent)" : ACCENT_VAR[tone]?.bg || "var(--accent)";
  return (
    <div style={{ display:"grid", gap:4 }}>
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <span className="mono" style={{ fontSize:11, color:"var(--ink-soft)", fontWeight:600 }}>{label}</span>
        <span className="mono" style={{ fontSize:11, fontWeight:700 }}>{value}%</span>
      </div>
      <div style={{ height:9, background:"var(--paper-2)", border:"1.5px solid var(--ink)", borderRadius:999, overflow:"hidden" }}>
        <div style={{ width:`${value}%`, height:"100%", background:color, borderRight:"1.5px solid var(--ink)" }}/>
      </div>
    </div>
  );
}

// ── Card surface ──────────────────────────────────────────────────────────────
function Panel({ children, style, pad=20 }){
  return (
    <div style={{
      background:"var(--surface)", border:"var(--bd) solid var(--ink)",
      borderRadius:"var(--r-lg)", boxShadow:"var(--sh-card)", padding:pad, ...style,
    }}>{children}</div>
  );
}

// ── Logo wordmark (Macondo accent) ─────────────────────────────────────────────
function Logo({ size=28, mark=true }){
  return (
    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
      {mark && (
        <div style={{
          width:size+6, height:size+6, borderRadius:"var(--r-sm)",
          background:"var(--ink)", color:"var(--paper)",
          display:"grid", placeItems:"center", boxShadow:"var(--sh-pop)",
          border:"var(--bd) solid var(--ink)",
        }}>
          <span className="display" style={{ fontSize:size*0.78, lineHeight:1, marginTop:size*0.06 }}>P</span>
        </div>
      )}
      <span className="display" style={{ fontSize:size, lineHeight:1, letterSpacing:".01em" }}>
        Pyme<span style={{ color:"var(--accent)" }}>Boost</span>
      </span>
    </div>
  );
}

// ── Toast host ──────────────────────────────────────────────────────────────────
function Toast({ toast }){
  if(!toast) return null;
  const tone = toast.tone || "ink";
  const bg = tone==="success" ? "var(--success)" : tone==="danger" ? "var(--danger)" : "var(--ink)";
  return (
    <div style={{
      position:"fixed", bottom:26, left:"50%", transform:"translateX(-50%)", zIndex:200,
      background:bg, color:"#fff", border:"2px solid var(--ink)", boxShadow:"4px 5px 0 rgba(33,27,18,.5)",
      borderRadius:"var(--r-md)", padding:"12px 20px", display:"flex", alignItems:"center", gap:10,
      animation:"toastIn .25s ease", maxWidth:440,
    }}>
      {toast.icon && <span style={{ fontSize:18 }}>{toast.icon}</span>}
      <span className="mono" style={{ fontSize:13, fontWeight:600 }}>{toast.text}</span>
    </div>
  );
}

Object.assign(window, { Button, Badge, Avatar, Stars, CompatDots, Meter, Panel, Logo, Toast, ACCENT_VAR });
