// matching.jsx — deck de matching estilo Tinder + 3 variantes de tarjeta
const { useState: useS, useRef: useR, useEffect: useE, useCallback } = React;

// ───────────────────────── Card variants ─────────────────────────
function CardClassic({ a }){
  const pr = standardPricing(a);
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
        <Avatar text={a.monogram} accent={a.accent} size={58} square />
        <div style={{ flex:1, minWidth:0 }}>
          <h3 style={{ fontSize:20, letterSpacing:"-.02em" }}>{a.name}</h3>
          <div className="mono" style={{ fontSize:11.5, color:"var(--ink-soft)", marginTop:3, fontWeight:600 }}>{a.role}</div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:6 }}>
            <Stars value={a.rating} size={13} showNum />
            <span className="mono" style={{ fontSize:10.5, color:"var(--ink-faint)" }}>· {a.reviews} reseñas · {a.years} años</span>
          </div>
        </div>
      </div>

      {/* 1 · Compatibilidad asesor–PYME (estrellas, por proceso) */}
      <div style={{ marginTop:13, paddingTop:12, borderTop:"1.5px dashed var(--ink-faint)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
        <div>
          <div className="eyebrow">Compatibilidad asesor–PYME</div>
          <div className="mono" style={{ fontSize:10.5, color:"var(--ink-soft)", marginTop:3 }}>según tu proceso: <b style={{ color:"var(--ink)" }}>{a.process}</b></div>
        </div>
        <Stars value={a.compat} size={18} />
      </div>

      {/* 2 · Objetivo IA */}
      <div style={{ marginTop:12, border:"var(--bd) solid var(--ink)", borderRadius:"var(--r-md)", padding:"10px 12px", background:"color-mix(in srgb, var(--accent) 8%, #fff)" }}>
        <div className="eyebrow" style={{ marginBottom:5 }}>Objetivo <span style={{ color:"var(--accent-deep)" }}>✦ IA</span></div>
        <p style={{ fontSize:12.5, lineHeight:1.45, margin:0 }}>{a.aiObjective}</p>
      </div>

      {/* 3 · Métrica de éxito */}
      <div style={{ marginTop:12, border:"var(--bd) solid var(--ink)", borderRadius:"var(--r-md)", overflow:"hidden", display:"flex", alignItems:"center" }}>
        <div style={{ flex:1, padding:"9px 12px" }}>
          <div className="eyebrow">Métrica de éxito</div>
          <div style={{ fontSize:13, fontWeight:700, marginTop:2 }}>{a.successMetric.label}</div>
          <div className="mono" style={{ fontSize:10.5, color:"var(--ink-soft)", marginTop:2 }}>{a.successMetric.from} → {a.successMetric.to}</div>
        </div>
        <div style={{ width:90, textAlign:"center", padding:"10px 8px", background:"var(--accent)", color:"#fff", alignSelf:"stretch", display:"grid", placeItems:"center" }}>
          <div style={{ fontWeight:700, fontSize:19, lineHeight:1 }}>{a.successMetric.delta}</div>
        </div>
      </div>

      {/* 4 · Ganancia advisor por resultados (estimada por IA) */}
      <div style={{ marginTop:12, border:"var(--bd) solid var(--ink)", borderRadius:"var(--r-md)", padding:"10px 12px", background:"color-mix(in srgb, var(--accent) 14%, #fff)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
        <div style={{ minWidth:0 }}>
          <div className="eyebrow">Ganancia advisor · resultados <span style={{ color:"var(--accent-deep)" }}>✦ IA</span></div>
          <div className="mono" style={{ fontSize:10.5, color:"var(--ink-soft)", marginTop:3, lineHeight:1.35 }}>{a.advisorGain.basis} · ≈ {CRC(a.advisorGain.est)} en {a.advisorGain.months} meses</div>
        </div>
        <div style={{ fontWeight:700, fontSize:27, color:"var(--accent-deep)", lineHeight:1, flexShrink:0 }}>{a.advisorGain.pct}%</div>
      </div>

      {/* 5 · División de precios · plan estándar */}
      <div style={{ marginTop:"auto", paddingTop:13 }}>
        <div className="eyebrow" style={{ marginBottom:6 }}>División de precios · plan estándar</div>
        <div style={{ display:"flex", gap:10 }}>
          <div style={{ flex:1, background:"color-mix(in srgb, var(--accent) 12%, #fff)", border:"1.5px solid var(--ink)", borderRadius:"var(--r-md)", padding:"9px 12px" }}>
            <div className="eyebrow">PymeBoost · 3%</div>
            <div style={{ fontWeight:700, fontSize:17, color:"var(--accent-deep)", marginTop:2 }}>{CRC(pr.commissionAmt)}</div>
            <div className="mono" style={{ fontSize:9.5, color:"var(--ink-soft)" }}>de {CRC(pr.budget)}</div>
          </div>
          <div style={{ flex:1, background:"var(--paper)", border:"1.5px solid var(--ink)", borderRadius:"var(--r-md)", padding:"9px 12px" }}>
            <div className="eyebrow">Retainer advisor</div>
            <div style={{ fontWeight:700, fontSize:17, marginTop:2 }}>{CRC(pr.retainer)}<span className="mono" style={{ fontSize:10, fontWeight:600 }}> /mes</span></div>
            <div className="mono" style={{ fontSize:9.5, color:"var(--ink-soft)" }}>fijo bajo · upside por resultados</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardData({ a }){
  const pr = standardPricing(a);
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div style={{ minWidth:0 }}>
          <div className="eyebrow">{a.industry}</div>
          <h3 style={{ fontSize:21, marginTop:4 }}>{a.name}</h3>
          <div className="mono" style={{ fontSize:11.5, color:"var(--ink-soft)", fontWeight:600, marginTop:2 }}>{a.role}</div>
        </div>
        <div style={{ textAlign:"center", background:"var(--accent)", color:"#fff", border:"var(--bd) solid var(--ink)", borderRadius:"var(--r-md)", padding:"6px 12px", boxShadow:"var(--sh-pop)", flexShrink:0 }}>
          <div style={{ fontSize:28, fontWeight:700, lineHeight:1 }}>{a.compat}<span style={{ fontSize:14, opacity:.8 }}>/5</span></div>
          <div className="mono" style={{ fontSize:8.5, textTransform:"uppercase", letterSpacing:".1em", marginTop:2 }}>Match</div>
        </div>
      </div>

      {/* 1 · Compatibilidad asesor–PYME (estrellas, por proceso) */}
      <div style={{ marginTop:12, display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, border:"1.5px solid var(--ink)", borderRadius:"var(--r-md)", padding:"8px 12px", background:"var(--paper)" }}>
        <div style={{ minWidth:0 }}>
          <div className="eyebrow">Compat. asesor–PYME</div>
          <div className="mono" style={{ fontSize:10, color:"var(--ink-soft)", marginTop:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.process}</div>
        </div>
        <Stars value={a.compat} size={16} />
      </div>

      {/* 2 · Objetivo IA */}
      <div style={{ marginTop:12 }}>
        <div className="eyebrow" style={{ marginBottom:4 }}>Objetivo <span style={{ color:"var(--accent-deep)" }}>✦ IA</span></div>
        <p style={{ fontSize:12.5, lineHeight:1.45, margin:0, color:"var(--ink-soft)" }}>{a.aiObjective}</p>
      </div>

      {/* 3 · Métrica de éxito */}
      <div style={{ marginTop:13, border:"1.5px solid var(--ink)", borderRadius:"var(--r-md)", overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center" }}>
          <div style={{ flex:1, padding:"9px 12px" }}>
            <div className="eyebrow">Métrica de éxito</div>
            <div style={{ fontSize:13, fontWeight:700, marginTop:2 }}>{a.successMetric.label}</div>
          </div>
          <div className="mono" style={{ textAlign:"right", padding:"9px 12px", borderLeft:"1.5px dashed var(--ink)" }}>
            <div style={{ fontSize:11, color:"var(--ink-soft)" }}>{a.successMetric.from} → {a.successMetric.to}</div>
            <div style={{ fontSize:16, fontWeight:700, color:"var(--accent-deep)" }}>{a.successMetric.delta}</div>
          </div>
        </div>
        <div style={{ borderTop:"1.5px solid var(--ink)", padding:"8px 12px" }}>
          <Meter label={a.uplift.metric} value={a.upliftBars[0][1]} />
        </div>
      </div>

      {/* 4 · Ganancia advisor por resultados (estimada por IA) */}
      <div style={{ marginTop:13, border:"1.5px solid var(--ink)", borderRadius:"var(--r-md)", padding:"9px 12px", background:"color-mix(in srgb, var(--accent) 14%, #fff)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
        <div style={{ minWidth:0 }}>
          <div className="eyebrow">Ganancia advisor · resultados <span style={{ color:"var(--accent-deep)" }}>✦ IA</span></div>
          <div className="mono" style={{ fontSize:10, color:"var(--ink-soft)", marginTop:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.advisorGain.basis} · ≈ {CRC(a.advisorGain.est)} / {a.advisorGain.months}m</div>
        </div>
        <div style={{ fontWeight:700, fontSize:25, color:"var(--accent-deep)", flexShrink:0 }}>{a.advisorGain.pct}%</div>
      </div>

      {/* 5 · División de precios · plan estándar */}
      <div style={{ marginTop:"auto", paddingTop:13 }}>
        <div className="eyebrow" style={{ marginBottom:6 }}>División de precios · plan estándar</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", border:"1.5px solid var(--ink)", borderRadius:"var(--r-md)", overflow:"hidden", fontFamily:"'JetBrains Mono', monospace" }}>
          {[
            ["PymeBoost · 3%", CRC(pr.commissionAmt), "var(--paper)"],
            ["Retainer / mes", CRC(pr.retainer), "var(--surface)"],
            ["Presupuesto base", CRC(pr.budget), "var(--surface)"],
            ["Modelo", "Results-driven", "var(--paper)"],
          ].map(([k,v,bg],i)=>(
            <div key={k} style={{ padding:"8px 11px", borderTop: i>1?"1.5px solid var(--ink)":"none", borderLeft: i%2?"1.5px solid var(--ink)":"none", background:bg }}>
              <div style={{ fontSize:9, textTransform:"uppercase", letterSpacing:".08em", color:"var(--ink-soft)" }}>{k}</div>
              <div style={{ fontSize:13, fontWeight:700, marginTop:2 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardEditorial({ a }){
  const A = { bg:"var(--accent)", deep:"var(--accent-deep)" }; // acento global (igual que "Boost")
  const pr = standardPricing(a);
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", margin:-20, overflow:"hidden" }}>
      {/* Masthead */}
      <div style={{ background:A.bg, color:"#fff", padding:"15px 20px 13px", borderBottom:"var(--bd) solid var(--ink)", position:"relative" }}>
        <div className="mono" style={{ fontSize:10, textTransform:"uppercase", letterSpacing:".14em", opacity:.9 }}>{a.industry}</div>
        <div className="display" style={{ fontSize:31, lineHeight:1, marginTop:6, paddingRight:54 }}>{a.name}</div>
        <div className="mono" style={{ fontSize:11.5, fontWeight:600, marginTop:6, opacity:.95 }}>{a.role}</div>
        <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:7 }}>
          <Stars value={a.rating} size={12} />
          <span className="mono" style={{ fontSize:10, opacity:.9 }}>{a.rating.toFixed(1)} · {a.reviews} reseñas · {a.years} años</span>
        </div>
        <div style={{ position:"absolute", right:16, top:14, background:"#fff", color:"var(--ink)", border:"var(--bd) solid var(--ink)", borderRadius:999, width:44, height:44, display:"grid", placeItems:"center", boxShadow:"var(--sh-pop)" }}>
          <div style={{ textAlign:"center", lineHeight:1 }}>
            <div style={{ fontWeight:700, fontSize:17 }}>{a.compat}</div>
            <div className="mono" style={{ fontSize:7, letterSpacing:".05em" }}>MATCH</div>
          </div>
        </div>
      </div>

      <div style={{ padding:"13px 20px 16px", display:"flex", flexDirection:"column", flex:1, gap:10, overflow:"hidden" }}>
        {/* 1 · Compatibilidad asesor–PYME (estrellas, por proceso) */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, flexShrink:0 }}>
          <div>
            <div className="eyebrow">Compatibilidad asesor–PYME</div>
            <div className="mono" style={{ fontSize:10.5, color:"var(--ink-soft)", marginTop:3, maxWidth:200, lineHeight:1.35 }}>
              según tu proceso: <b style={{ color:"var(--ink)" }}>{a.process}</b>
            </div>
          </div>
          <Stars value={a.compat} size={19} />
        </div>

        {/* 2 · Objetivo generado por IA */}
        <div style={{ border:"var(--bd) solid var(--ink)", borderRadius:"var(--r-md)", padding:"10px 12px", background:"color-mix(in srgb, var(--accent) 8%, #fff)", flexShrink:0 }}>
          <div className="eyebrow" style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5 }}>
            Objetivo <span style={{ color:A.deep }}>✦ IA</span>
          </div>
          <p style={{ fontSize:12.5, lineHeight:1.45, margin:0, color:"var(--ink)" }}>{a.aiObjective}</p>
        </div>

        {/* 3 · Métrica de éxito */}
        <div style={{ border:"var(--bd) solid var(--ink)", borderRadius:"var(--r-md)", overflow:"hidden", display:"flex", alignItems:"center", flexShrink:0 }}>
          <div style={{ flex:1, padding:"8px 12px" }}>
            <div className="eyebrow">Métrica de éxito</div>
            <div style={{ fontSize:12.5, fontWeight:700, marginTop:2 }}>{a.successMetric.label}</div>
            <div className="mono" style={{ fontSize:10, color:"var(--ink-soft)", marginTop:1 }}>{a.successMetric.from} <span style={{ color:A.deep }}>→</span> {a.successMetric.to}</div>
          </div>
          <div style={{ width:78, textAlign:"center", padding:"8px", background:A.bg, color:"#fff", alignSelf:"stretch", display:"grid", placeItems:"center" }}>
            <div>
              <div className="display" style={{ fontSize:21, lineHeight:1 }}>{a.successMetric.delta}</div>
              <div className="mono" style={{ fontSize:7.5, letterSpacing:".06em", marginTop:2, opacity:.9 }}>META</div>
            </div>
          </div>
        </div>

        {/* 4 · Ganancia del advisor por resultados (estimada por IA) */}
        <div style={{ border:"var(--bd) solid var(--ink)", borderRadius:"var(--r-md)", padding:"10px 12px", background:"color-mix(in srgb, var(--accent) 14%, #fff)", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
            <div className="eyebrow" style={{ display:"flex", alignItems:"center", gap:6 }}>Ganancia advisor · resultados <span style={{ color:A.deep }}>✦ IA</span></div>
            <div className="display" style={{ fontSize:27, color:A.deep, lineHeight:1 }}>{a.advisorGain.pct}%</div>
          </div>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:10, marginTop:5 }}>
            <div className="mono" style={{ fontSize:10, color:"var(--ink-soft)", lineHeight:1.35, maxWidth:172 }}>{a.advisorGain.basis}</div>
            <div style={{ textAlign:"right", flexShrink:0 }}>
              <div className="mono" style={{ fontWeight:700, fontSize:14, color:"var(--ink)" }}>≈ {CRC(a.advisorGain.est)}</div>
              <div className="mono" style={{ fontSize:8.5, color:"var(--ink-faint)" }}>estimado a {a.advisorGain.months} meses</div>
            </div>
          </div>
        </div>

        {/* 5 · División de precios · plan estándar */}
        <div style={{ marginTop:"auto", flexShrink:0 }}>
          <div className="eyebrow" style={{ marginBottom:6 }}>División de precios · plan estándar</div>
          <div style={{ display:"flex", border:"var(--bd) solid var(--ink)", borderRadius:"var(--r-md)", overflow:"hidden" }}>
            <div style={{ flex:1, padding:"8px 12px" }}>
              <div className="mono" style={{ fontSize:9, textTransform:"uppercase", letterSpacing:".07em", color:"var(--ink-soft)" }}>PymeBoost · 3%</div>
              <div className="display" style={{ fontSize:18, color:A.deep, lineHeight:1.1, marginTop:2 }}>{CRC(pr.commissionAmt)}</div>
              <div className="mono" style={{ fontSize:8.5, color:"var(--ink-faint)" }}>de {CRC(pr.budget)} presupuesto</div>
            </div>
            <div style={{ width:0, borderLeft:"1.5px dashed var(--ink)" }} />
            <div style={{ flex:1, padding:"8px 12px", background:"var(--paper)" }}>
              <div className="mono" style={{ fontSize:9, textTransform:"uppercase", letterSpacing:".07em", color:"var(--ink-soft)" }}>Retainer advisor</div>
              <div className="display" style={{ fontSize:18, lineHeight:1.1, marginTop:2 }}>{CRC(pr.retainer)}<span className="mono" style={{ fontSize:10, fontWeight:600 }}> /mes</span></div>
              <div className="mono" style={{ fontSize:8.5, color:"var(--ink-faint)" }}>fijo bajo · upside por resultados</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvisorCard({ a, variant }){
  if(variant==="data") return <CardData a={a} />;
  if(variant==="editorial") return <CardEditorial a={a} />;
  return <CardClassic a={a} />;
}

// ───────────────────────── Swipe deck ─────────────────────────
function SwipeDeck({ advisors, variant, onDecision }){
  const [idx, setIdx] = useS(0);
  const [drag, setDrag] = useS({ x:0, y:0, active:false });
  const [flyOut, setFlyOut] = useS(null); // {dir}
  const startRef = useR(null);
  const THRESH = 120;

  const current = advisors[idx];
  const next1 = advisors[idx+1];
  const next2 = advisors[idx+2];

  useE(()=>{ // reset on deck change
    setIdx(0); setDrag({x:0,y:0,active:false}); setFlyOut(null);
  }, [advisors]);

  const decide = useCallback((dir)=>{
    if(flyOut) return;
    setFlyOut({ dir });
    const adv = advisors[idx];
    setTimeout(()=>{
      onDecision && onDecision(dir, adv);
      setIdx(i=>i+1);
      setDrag({x:0,y:0,active:false});
      setFlyOut(null);
    }, 280);
  }, [flyOut, idx, advisors, onDecision]);

  const onDown = (e)=>{
    if(flyOut) return;
    startRef.current = { x:e.clientX, y:e.clientY };
    setDrag(d=>({ ...d, active:true }));
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e)=>{
    if(!startRef.current) return;
    setDrag({ x:e.clientX-startRef.current.x, y:e.clientY-startRef.current.y, active:true });
  };
  const onUp = ()=>{
    if(!startRef.current) return;
    const { x } = drag;
    startRef.current = null;
    if(x > THRESH) decide("right");
    else if(x < -THRESH) decide("left");
    else setDrag({x:0,y:0,active:false});
  };

  // empty state
  if(!current){
    return (
      <div style={{ width:382, maxWidth:"100%", margin:"0 auto" }}>
        <Panel style={{ textAlign:"center", padding:"48px 28px" }}>
          <div style={{ fontSize:42 }}>🗂️</div>
          <h3 style={{ fontSize:20, marginTop:10 }}>No hay más advisors por hoy</h3>
          <p style={{ color:"var(--ink-soft)", fontSize:13.5, marginTop:8 }}>
            El motor de IA está buscando nuevas coincidencias según el contexto de tu PYME.
            Revisá tus matches en <b>Mensajes</b> mientras tanto.
          </p>
          <div style={{ marginTop:18, display:"flex", justifyContent:"center" }}>
            <Button tone="ink" variant="outline" size="sm" onClick={()=>setIdx(0)}>↻ Reiniciar deck (demo)</Button>
          </div>
        </Panel>
      </div>
    );
  }

  const rot = (flyOut ? (flyOut.dir==="right"?1:-1)*22 : drag.x*0.05);
  const tx = flyOut ? (flyOut.dir==="right"?1:-1)*700 : drag.x;
  const ty = flyOut ? -40 : drag.y;
  const approveOp = Math.max(0, Math.min(1, (flyOut?.dir==="right"?1:drag.x)/THRESH));
  const rejectOp  = Math.max(0, Math.min(1, (flyOut?.dir==="left"?1:-drag.x)/THRESH));

  const cardShell = (extra={}) => ({
    position:"absolute", inset:0, background:"var(--surface)",
    border:"var(--bd) solid var(--ink)", borderRadius:"var(--r-xl)",
    boxShadow:"var(--sh-card)", padding:20, overflow:"hidden", ...extra,
  });

  return (
    <div style={{ width:382, maxWidth:"100%", margin:"0 auto" }}>
      <div style={{ position:"relative", height:652 }}>
        {/* stack behind */}
        {next2 && <div style={cardShell({ transform:"translateY(22px) scale(.92)", opacity:.55, zIndex:1, boxShadow:"var(--sh)" })} aria-hidden />}
        {next1 && <div style={cardShell({ transform:"translateY(11px) scale(.96)", opacity:.85, zIndex:2 })} aria-hidden>
          <AdvisorCard a={next1} variant={variant} />
        </div>}

        {/* top card */}
        <div
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
          style={cardShell({
            zIndex:3, cursor: drag.active ? "grabbing" : "grab", touchAction:"none",
            transform:`translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
            transition: (drag.active && !flyOut) ? "none" : "transform .3s cubic-bezier(.2,.7,.2,1)",
          })}
        >
          <AdvisorCard a={current} variant={variant} />

          {/* stamps */}
          <div style={{ position:"absolute", top:22, left:20, transform:"rotate(-14deg)", opacity:approveOp, pointerEvents:"none" }}>
            <div className="mono" style={{ border:"3px solid var(--success)", color:"var(--success)", padding:"4px 12px", borderRadius:8, fontWeight:700, fontSize:20, letterSpacing:".05em", background:"rgba(255,255,255,.6)" }}>APPROVED</div>
          </div>
          <div style={{ position:"absolute", top:22, right:20, transform:"rotate(14deg)", opacity:rejectOp, pointerEvents:"none" }}>
            <div className="mono" style={{ border:"3px solid var(--danger)", color:"var(--danger)", padding:"4px 12px", borderRadius:8, fontWeight:700, fontSize:20, letterSpacing:".05em", background:"rgba(255,255,255,.6)" }}>REJECTED</div>
          </div>
        </div>
      </div>

      {/* controls */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, marginTop:20 }}>
        <RoundBtn label="Reject" color="var(--danger)" big onClick={()=>decide("left")}>✕</RoundBtn>
        <div className="mono" style={{ fontSize:11, color:"var(--ink-soft)", textAlign:"center", minWidth:84 }}>
          <div style={{ fontWeight:700, fontSize:13, color:"var(--ink)" }}>{idx+1} / {advisors.length}</div>
          <div>en el deck</div>
        </div>
        <RoundBtn label="Approve" color="var(--success)" big onClick={()=>decide("right")}>♥</RoundBtn>
      </div>
      <div className="mono" style={{ textAlign:"center", fontSize:11, color:"var(--ink-faint)", marginTop:12 }}>
        Arrastrá la tarjeta · → Swipe Approved · ← Swipe Rejected
      </div>
    </div>
  );
}

function RoundBtn({ children, color, onClick, big, label }){
  const sz = big ? 60 : 46;
  return (
    <button title={label} onClick={onClick} style={{
      width:sz, height:sz, borderRadius:"50%", border:"var(--bd) solid var(--ink)",
      background:"var(--surface)", color, fontSize:big?24:18, fontWeight:700,
      boxShadow:"var(--sh-pop)", display:"grid", placeItems:"center",
      transition:"transform .08s ease, box-shadow .08s ease",
    }}
      onMouseDown={e=>{ e.currentTarget.style.transform="translate(2px,2px)"; e.currentTarget.style.boxShadow="0 0 0"; }}
      onMouseUp={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="var(--sh-pop)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="var(--sh-pop)"; }}>
      {children}
    </button>
  );
}

Object.assign(window, { SwipeDeck, AdvisorCard });
