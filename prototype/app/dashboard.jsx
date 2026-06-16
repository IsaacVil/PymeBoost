// dashboard.jsx — Dashboard de seguimiento de contratos
const { useState: useDB } = React;

// ── Helpers ────────────────────────────────────────────────────────────────────
function timeRemaining(deadline) {
  const diff = new Date(deadline) - new Date();
  if (diff <= 0) return { past: true, label: "Vencido" };
  const totalDays = Math.floor(diff / 86400000);
  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;
  return months > 0
    ? { past: false, label: `${months} mes${months > 1 ? "es" : ""} y ${days} día${days !== 1 ? "s" : ""}` }
    : { past: false, label: `${totalDays} día${totalDays !== 1 ? "s" : ""}` };
}
function calcProgress(phases) {
  if (!phases?.length) return 0;
  return Math.round(phases.filter(p => p.status === "completed").length / phases.length * 100);
}
const STATUS_CFG = {
  active:    { label: "Activo",        tone: "success", strip: "var(--accent)" },
  cancelled: { label: "Cancelado",     tone: "danger",  strip: "var(--danger)" },
  to_rate:   { label: "Por Calificar", tone: "warning", strip: "var(--warning)" },
  completed: { label: "Completado",    tone: "neutral", strip: "var(--success)" },
};

// ── Progress Ring ──────────────────────────────────────────────────────────────
function ProgressRing({ pct, size = 84, stroke = 8 }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--paper-2)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--accent)" strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: "stroke-dashoffset .7s ease" }} />
      <text x="50%" y="44%" dominantBaseline="middle" textAnchor="middle"
        fontFamily="'JetBrains Mono',monospace" fontWeight="700" fontSize={size * 0.22} fill="var(--ink)">{pct}%</text>
      <text x="50%" y="67%" dominantBaseline="middle" textAnchor="middle"
        fontFamily="'JetBrains Mono',monospace" fontSize={size * 0.13} fill="var(--ink-soft)">avance</text>
    </svg>
  );
}

// ── Contract Banner ────────────────────────────────────────────────────────────
function ContractBanner({ match, role }) {
  const c = match.contract;
  const pct = calcProgress(c.phases);
  const tr = timeRemaining(c.deadline);
  const sc = STATUS_CFG[c.contractStatus] || STATUS_CFG.active;
  const isAdv = role === "advisor";
  const completedPh = (c.phases || []).filter(p => p.status === "completed").length;
  const totalPh = (c.phases || []).length;
  return (
    <div style={{ background: "var(--surface)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-xl)", boxShadow: "var(--sh-card)", overflow: "hidden", marginBottom: 20 }}>
      <div style={{ height: 5, background: sc.strip }} />
      <div style={{ padding: "18px 22px", display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flex: "1 1 180px", minWidth: 0 }}>
          <Avatar text={match.advisor.monogram} accent={match.advisor.accent || "primary"} size={52} square />
          <div style={{ minWidth: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 2 }}>{isAdv ? "PYME" : "Advisor"}</div>
            <h3 style={{ fontSize: 18, lineHeight: 1.15 }}>{match.advisor.name}</h3>
            <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>{match.advisor.role}</div>
          </div>
        </div>
        <div style={{ width: 1, height: 56, background: "rgba(33,27,18,.12)", flexShrink: 0 }} />
        <ProgressRing pct={pct} />
        <div style={{ width: 1, height: 56, background: "rgba(33,27,18,.12)", flexShrink: 0 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,auto)", gap: "10px 28px", flex: "2 1 260px" }}>
          <div><div className="eyebrow" style={{ marginBottom: 3 }}>Estado</div><Badge tone={sc.tone} solid>{sc.label}</Badge></div>
          <div><div className="eyebrow" style={{ marginBottom: 3 }}>Duración</div><div style={{ fontWeight: 700, fontSize: 14 }}>{c.durationMonths} mes{c.durationMonths > 1 ? "es" : ""}</div></div>
          <div><div className="eyebrow" style={{ marginBottom: 3 }}>Fases</div><div style={{ fontWeight: 700, fontSize: 14 }}>{completedPh}/{totalPh} completadas</div></div>
          <div><div className="eyebrow" style={{ marginBottom: 3 }}>Inicio</div><div className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{c.start}</div></div>
          <div><div className="eyebrow" style={{ marginBottom: 3 }}>Vencimiento</div><div className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{c.deadline}</div></div>
          <div><div className="eyebrow" style={{ marginBottom: 3 }}>Tiempo restante</div><div className="mono" style={{ fontSize: 12, fontWeight: 700, color: tr.past ? "var(--danger)" : "var(--ink)" }}>{tr.label}</div></div>
        </div>
      </div>
      <div style={{ padding: "11px 22px", borderTop: "1.5px dashed var(--ink-faint)", background: "var(--paper)", display: "flex", gap: 10, alignItems: "baseline" }}>
        <span className="eyebrow" style={{ flexShrink: 0 }}>Objetivo</span>
        <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.45 }}>{c.objective}</p>
      </div>
    </div>
  );
}

// ── Report Field ───────────────────────────────────────────────────────────────
function ReportField({ label, text }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 3 }}>{label}</div>
      <p style={{ margin: 0, fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

// ── Phase Card ─────────────────────────────────────────────────────────────────
function PhaseCard({ phase, idx, role, onOpenReport }) {
  const [open, setOpen] = useDB(phase.status === "active");
  const doneCt = phase.objectives?.filter(o => o.done).length || 0;
  const totalCt = phase.objectives?.length || 0;
  const stepColor = { completed: "var(--success)", active: "var(--accent)", pending: "var(--ink-faint)" };
  const stepBg = stepColor[phase.status] || stepColor.pending;
  const statusTone = { completed: "success", active: "accent", pending: "neutral" };
  const statusLabel = { completed: "Completada", active: "Activa", pending: "Pendiente" };
  return (
    <div style={{ border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: phase.status === "active" ? "var(--sh-pop)" : "none" }}>
      <button onClick={() => setOpen(v => !v)} style={{ width: "100%", textAlign: "left", border: "none", cursor: "pointer", padding: "13px 16px", background: phase.status === "active" ? "color-mix(in srgb, var(--accent) 6%, var(--surface))" : "var(--surface)", display: "flex", alignItems: "center", gap: 12, borderBottom: open ? "var(--bd) solid var(--ink)" : "none" }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, border: "var(--bd) solid var(--ink)", background: stepBg, color: "#fff", display: "grid", placeItems: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
          {phase.status === "completed" ? "✓" : idx + 1}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{phase.name}</span>
            <Badge tone={statusTone[phase.status] || "neutral"} solid={phase.status !== "pending"}>{statusLabel[phase.status] || "Pendiente"}</Badge>
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 3 }}>
            {doneCt}/{totalCt} objetivos · {phase.report ? "✓ Reporte enviado" : "Reporte pendiente"}
          </div>
        </div>
        <span style={{ color: "var(--ink-soft)", fontSize: 14, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s ease", flexShrink: 0 }}>▾</span>
      </button>
      {open && (
        <div style={{ background: "var(--paper)", padding: "14px 16px", display: "grid", gap: 14 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>{phase.status === "completed" ? "Objetivos cumplidos" : "Objetivos de la fase"}</div>
            <div style={{ display: "grid", gap: 7 }}>
              {phase.objectives?.map((obj, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: "var(--r-sm)", background: obj.done ? "color-mix(in srgb, var(--success) 8%, #fff)" : "var(--surface)", border: "1.5px solid " + (obj.done ? "var(--success)" : "var(--ink)") }}>
                  <span style={{ fontSize: 16, color: obj.done ? "var(--success)" : "var(--ink-faint)", flexShrink: 0 }}>{obj.done ? "✓" : "○"}</span>
                  <span style={{ fontSize: 13, flex: 1, color: obj.done ? "var(--ink)" : "var(--ink-soft)" }}>{obj.label}</span>
                  {obj.done && <Badge tone="success" solid>Cumplido</Badge>}
                </div>
              ))}
            </div>
          </div>
          {phase.report ? (
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Reporte Oficial</div>
              <div style={{ background: "var(--surface)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
                <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em" }}>REPORTE DEL ADVISOR</span>
                  <span className="mono" style={{ fontSize: 10, opacity: .7 }}>{phase.report.submittedAt}</span>
                </div>
                <div style={{ padding: "13px 14px", display: "grid", gap: 12 }}>
                  <ReportField label="Acciones realizadas" text={phase.report.description} />
                  {phase.report.results && <ReportField label="Resultados obtenidos" text={phase.report.results} />}
                  {phase.report.observations && <ReportField label="Observaciones" text={phase.report.observations} />}
                </div>
              </div>
            </div>
          ) : (
            role === "advisor" && phase.status === "active" ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "color-mix(in srgb, var(--warning) 10%, #fff)", border: "1.5px dashed var(--warning)", borderRadius: "var(--r-md)", padding: "12px 14px" }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>📋</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Reporte pendiente</div>
                  <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2, lineHeight: 1.4 }}>Completá el reporte oficial de esta fase.</div>
                </div>
                <Button tone="accent" size="sm" onClick={() => onOpenReport(phase)} icon={<span>📋</span>}>Subir reporte</Button>
              </div>
            ) : (
              <div style={{ padding: "8px 12px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1.5px dashed var(--ink-faint)" }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                  {phase.status === "pending" ? "Fase aún no iniciada." : "El advisor aún no envió el reporte de esta fase."}
                </span>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

// ── Report Modal ───────────────────────────────────────────────────────────────
function ReportModal({ phase, onClose, onSubmit }) {
  const [status, setStatus] = useDB("active");
  const [description, setDescription] = useDB("");
  const [objectives, setObjectives] = useDB(phase.objectives?.map(o => ({ ...o })) || []);
  const [results, setResults] = useDB("");
  const [observations, setObservations] = useDB("");
  const wordCount = str => str.trim() ? str.trim().split(/\s+/).length : 0;
  const taStyle = { width: "100%", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, padding: "9px 11px", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-sm)", background: "var(--surface)", color: "var(--ink)", resize: "vertical", outline: "none" };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(33,27,18,.45)", backdropFilter: "blur(2px)", display: "grid", placeItems: "center", zIndex: 140, padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "min(680px, 96vw)", maxHeight: "90vh", display: "flex", flexDirection: "column", background: "var(--surface)", border: "2px solid var(--ink)", borderRadius: "var(--r-xl)", boxShadow: "7px 8px 0 rgba(33,27,18,.4)", overflow: "hidden", animation: "popIn .25s ease" }}>
        <div style={{ padding: "16px 20px", borderBottom: "var(--bd) solid var(--ink)", background: "var(--paper)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div><div className="eyebrow">Subir Reporte de Fase</div><h3 className="display" style={{ fontSize: 26, marginTop: 2 }}>{phase.name}</h3></div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "var(--ink-soft)", padding: "4px 8px", lineHeight: 1 }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "grid", gap: 16 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Estado de la fase</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[["active","Activa"],["completed","Completada"]].map(([s,l]) => (
                <button key={s} onClick={() => setStatus(s)} style={{ padding:"7px 16px", borderRadius:999, border:"var(--bd) solid var(--ink)", cursor:"pointer", background:status===s?"var(--accent)":"var(--surface)", color:status===s?"#fff":"var(--ink)", fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:600, boxShadow:status===s?"var(--sh-pop)":"none" }}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span className="eyebrow">Descripción de acciones *</span>
              <span className="mono" style={{ fontSize:10, color:wordCount(description)>200?"var(--danger)":"var(--ink-faint)" }}>{wordCount(description)}/200 palabras</span>
            </div>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describí las acciones realizadas en esta fase…" rows={4} style={{ ...taStyle }} />
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Objetivos cumplidos</div>
            <div style={{ display: "grid", gap: 7 }}>
              {objectives.map((obj, i) => (
                <label key={i} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", padding:"9px 12px", borderRadius:"var(--r-sm)", border:"1.5px solid "+(obj.done?"var(--success)":"var(--ink)"), background:obj.done?"color-mix(in srgb, var(--success) 8%, #fff)":"var(--surface)" }}>
                  <input type="checkbox" checked={obj.done} onChange={e => { const n=[...objectives]; n[i]={...n[i],done:e.target.checked}; setObjectives(n); }} style={{ accentColor:"var(--accent)", width:15, height:15, flexShrink:0 }} />
                  <span style={{ fontSize:13, flex:1 }}>{obj.label}</span>
                  {obj.done && <Badge tone="success" solid>✓</Badge>}
                </label>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display:"flex", gap:6, alignItems:"baseline", marginBottom:5 }}>
              <span className="eyebrow">Resultados obtenidos</span>
              <span style={{ fontSize:10.5, color:"var(--ink-faint)" }}>(opcional)</span>
            </div>
            <textarea value={results} onChange={e => setResults(e.target.value)} placeholder="Métricas o resultados concretos…" rows={3} style={{ ...taStyle }} />
          </div>
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span className="eyebrow">Observaciones adicionales</span>
              <span className="mono" style={{ fontSize:10, color:wordCount(observations)>200?"var(--danger)":"var(--ink-faint)" }}>{wordCount(observations)}/200 palabras</span>
            </div>
            <textarea value={observations} onChange={e => setObservations(e.target.value)} placeholder="Obstáculos o notas relevantes…" rows={3} style={{ ...taStyle }} />
          </div>
          <div style={{ background:"color-mix(in srgb, var(--accent) 7%, #fff)", border:"1.5px dashed var(--accent)", borderRadius:"var(--r-md)", padding:"12px 14px", display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:20, flexShrink:0 }}>📎</span>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:13 }}>¿Tenés un reporte en PDF u otro formato?</div>
              <div style={{ fontSize:11.5, color:"var(--ink-soft)", marginTop:1 }}>Subilo y PymeBoost lo procesará con IA para completar la plantilla automáticamente.</div>
            </div>
            <Button variant="outline" tone="ink" size="sm" icon={<span>↑</span>}>Subir archivo</Button>
          </div>
        </div>
        <div style={{ padding:"14px 20px", borderTop:"var(--bd) solid var(--ink)", display:"flex", gap:9, flexShrink:0, background:"var(--surface)" }}>
          <Button tone="accent" full onClick={() => { if(!description.trim()) return; onSubmit({ submitted:true, description, objectives, results, observations, status, submittedAt:new Date().toLocaleDateString("es-CR",{day:"numeric",month:"short",year:"numeric"}) }); }} disabled={!description.trim()} icon={<span>✓</span>}>Enviar reporte</Button>
          <Button variant="ghost" tone="ink" onClick={onClose}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
}

// ── KPI Section ────────────────────────────────────────────────────────────────
function KPISection({ kpis }) {
  if (!kpis?.length) return null;
  return (
    <Panel pad={16}>
      <div className="eyebrow" style={{ marginBottom: 12 }}>Métricas de rendimiento (KPIs)</div>
      <div style={{ border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 110px 140px", background: "var(--ink)", padding: "9px 14px" }}>
          {["Métrica","Antes","Después"].map(h => <span key={h} className="mono" style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", color:"var(--paper)" }}>{h}</span>)}
        </div>
        {kpis.map((k, i) => (
          <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 110px 140px", padding:"10px 14px", borderTop:i?"1.5px solid var(--ink)":"none", alignItems:"center" }}>
            <span style={{ fontSize:13.5, fontWeight:600 }}>{k.label}</span>
            <span className="mono" style={{ fontSize:13, color:"var(--ink-soft)" }}>{k.before}</span>
            <span className="mono" style={{ fontSize:14, fontWeight:700, color:k.positive!==false?"var(--success)":"var(--danger)" }}>
              {k.after}{k.after!=="—"?(k.positive!==false?" ▲":" ▼"):""}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ── Sales Baseline Panel ───────────────────────────────────────────────────────
function SalesBaselinePanel({ salesBaseline }) {
  if (!salesBaseline?.items?.length) return null;
  return (
    <Panel pad={16}>
      <div className="eyebrow" style={{ marginBottom: 12 }}>Baseline de ventas y ganancia del advisor</div>
      <div style={{ border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
        {salesBaseline.items.map((item, i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px", borderTop:i?"1.5px solid var(--ink)":"none", gap:12 }}>
            <span style={{ fontSize:13, color:"var(--ink-soft)", flex:1 }}>{item.label}</span>
            <span className="mono" style={{ fontSize:14, fontWeight:700 }}>{item.value}</span>
            {item.delta && <Badge tone={item.positive!==false?"success":"danger"} solid>{item.delta}</Badge>}
          </div>
        ))}
      </div>
      {salesBaseline.note && (
        <div className="mono" style={{ fontSize:10.5, color:"var(--ink-faint)", marginTop:8, lineHeight:1.4 }}>✦ {salesBaseline.note}</div>
      )}
    </Panel>
  );
}

// ── Financials Panel ───────────────────────────────────────────────────────────
function FinancialsPanel({ contract }) {
  const commission = commissionForMonths(contract.durationMonths);
  const commissionAmt = Math.round((contract.budget || 0) * commission / 100);
  const retainerTotal = (contract.retainer || 0) * (contract.durationMonths || 1);
  const rows = [
    ["Comisión PymeBoost", commission + "%", CRC(commissionAmt), "accent"],
    ["Retainer del advisor", contract.durationMonths + "m", CRC(retainerTotal), "neutral"],
    ["Ganancia advisor (resultados)", (contract.advisorResultPct || 5) + "%", "del incremento verificado", "success"],
  ];
  return (
    <Panel pad={16}>
      <div className="eyebrow" style={{ marginBottom: 10 }}>Distribución financiera</div>
      <div style={{ display:"grid", gap:0, border:"var(--bd) solid var(--ink)", borderRadius:"var(--r-md)", overflow:"hidden" }}>
        {rows.map(([label, tag, value, tone], i) => (
          <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 12px", borderTop:i?"1.5px solid var(--ink)":"none", gap:10 }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:12.5, fontWeight:600 }}>{label}</div>
              <div className="mono" style={{ fontSize:10, color:"var(--ink-soft)", marginTop:1 }}>{value}</div>
            </div>
            <Badge tone={tone} solid>{tag}</Badge>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ── Star Rating ────────────────────────────────────────────────────────────────
function StarRating({ value, onChange, size = 32 }) {
  const [hover, setHover] = useDB(0);
  return (
    <div style={{ display:"flex", gap:2 }}>
      {[1,2,3,4,5].map(n => (
        <button key={n} onClick={() => onChange && onChange(n)}
          onMouseEnter={() => onChange && setHover(n)} onMouseLeave={() => setHover(0)}
          style={{ background:"none", border:"none", cursor:onChange?"pointer":"default", fontSize:size, lineHeight:1, color:n<=(hover||value)?"var(--warning)":"var(--ink-faint)", transition:"color .1s", padding:"0 1px" }}>★</button>
      ))}
    </div>
  );
}

// ── Rating Panel ───────────────────────────────────────────────────────────────
function RatingPanel({ match, onSubmitRating }) {
  const existingRating = match.contract?.rating;
  const [stars, setStars] = useDB(existingRating?.stars || 0);
  const [comment, setComment] = useDB(existingRating?.comment || "");
  const [submitted, setSubmitted] = useDB(!!existingRating);
  const wc = comment.trim() ? comment.trim().split(/\s+/).length : 0;
  const labels = ["","Muy malo","Malo","Regular","Bueno","Excelente"];

  if (submitted) {
    return (
      <Panel pad={16} style={{ border:"2px solid var(--success)", background:"color-mix(in srgb, var(--success) 5%, var(--surface))" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <div className="eyebrow">Tu calificación del advisor</div>
          <Badge tone="success" solid>✓ Enviada</Badge>
        </div>
        <StarRating value={stars} size={24} />
        <div className="mono" style={{ fontSize:11, color:"var(--ink-soft)", marginTop:4 }}>{labels[stars]}</div>
        {comment && <p style={{ margin:"10px 0 0", fontSize:13, color:"var(--ink-soft)", lineHeight:1.5 }}>{comment}</p>}
      </Panel>
    );
  }

  return (
    <Panel pad={16} style={{ border:"2px solid var(--warning)", background:"color-mix(in srgb, var(--warning) 5%, var(--surface))" }}>
      <div className="eyebrow" style={{ marginBottom:10 }}>Calificá al advisor · {match.advisor.name.split(" ")[0]}</div>
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:13, color:"var(--ink-soft)", marginBottom:8 }}>¿Cómo evaluás el trabajo realizado?</div>
        <StarRating value={stars} onChange={setStars} size={38} />
        {stars > 0 && <div className="mono" style={{ fontSize:11.5, color:"var(--ink-soft)", marginTop:4, fontWeight:600 }}>{labels[stars]}</div>}
      </div>
      <div style={{ marginBottom:14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
          <span className="eyebrow">Comentario</span>
          <span className="mono" style={{ fontSize:10, color:wc>500?"var(--danger)":"var(--ink-faint)" }}>{wc}/500 palabras</span>
        </div>
        <textarea value={comment} onChange={e => setComment(e.target.value)} rows={4}
          placeholder="Contá tu experiencia: ¿qué resultados obtuviste? ¿Lo recomendarías?"
          style={{ width:"100%", fontFamily:"'Space Grotesk',sans-serif", fontSize:13, padding:"9px 11px", border:"var(--bd) solid var(--ink)", borderRadius:"var(--r-sm)", background:"var(--surface)", color:"var(--ink)", resize:"vertical", outline:"none" }} />
      </div>
      <Button tone="accent" full disabled={stars===0} onClick={() => { onSubmitRating && onSubmitRating({stars,comment}); setSubmitted(true); }} icon={<span>★</span>}>Enviar calificación</Button>
    </Panel>
  );
}

// ── Deliverables Panel ─────────────────────────────────────────────────────────
function DeliverablesPanel({ deliverables }) {
  if (!deliverables?.length) return null;
  const doneCount = deliverables.filter(d => d.done).length;
  return (
    <Panel pad={16}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <div className="eyebrow">Cumplimiento de entregables</div>
        <Badge tone={doneCount===deliverables.length?"success":"warning"}>{doneCount}/{deliverables.length}</Badge>
      </div>
      <div style={{ display:"grid", gap:7 }}>
        {deliverables.map((d,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:9, padding:"8px 10px", borderRadius:"var(--r-sm)", background:d.done?"color-mix(in srgb, var(--success) 8%, #fff)":"var(--paper)", border:"1.5px solid "+(d.done?"var(--success)":"rgba(33,27,18,.18)") }}>
            <span style={{ fontSize:14, color:d.done?"var(--success)":"var(--ink-faint)", flexShrink:0 }}>{d.done?"✓":"○"}</span>
            <span style={{ fontSize:12.5, flex:1, lineHeight:1.35, color:d.done?"var(--ink)":"var(--ink-soft)" }}>{d.label}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ── Time Panel ─────────────────────────────────────────────────────────────────
function TimePanel({ contract }) {
  const tr = timeRemaining(contract.deadline);
  const pct = calcProgress(contract.phases);
  return (
    <Panel pad={16}>
      <div className="eyebrow" style={{ marginBottom:10 }}>Tiempo restante</div>
      <div style={{ textAlign:"center", padding:"4px 0 12px" }}>
        <div className="mono" style={{ fontSize:24, fontWeight:700, lineHeight:1.2, color:tr.past?"var(--danger)":"var(--ink)" }}>{tr.label}</div>
        <div className="mono" style={{ fontSize:10.5, color:"var(--ink-soft)", marginTop:5 }}>{contract.start} → {contract.deadline}</div>
      </div>
      <Meter label="Avance del proyecto" value={pct} />
    </Panel>
  );
}

// ── Contract Dashboard ─────────────────────────────────────────────────────────
function ContractDashboard({ match, role, onUpdate, pushToast }) {
  const [reportPhase, setReportPhase] = useDB(null);
  const c = match.contract;
  if (!c) return null;
  const phases = c.phases || [];
  const status = c.contractStatus || "active";

  const handleSubmitReport = (reportData) => {
    const target = reportPhase;
    const newPhases = phases.map(p => p.id !== target.id ? p : { ...p, report:reportData, status:reportData.status==="completed"?"completed":"active" });
    onUpdate(m => ({ ...m, contract: { ...m.contract, phases:newPhases } }));
    setReportPhase(null);
    pushToast({ text:"Reporte enviado correctamente", tone:"success", icon:"✓" });
  };

  const handleSubmitRating = (rating) => {
    onUpdate(m => ({ ...m, contract: { ...m.contract, rating, contractStatus:"completed" } }));
    pushToast({ text:"Calificación enviada — ¡gracias por tu feedback!", tone:"success", icon:"★" });
  };

  const titleMap = { active:role==="pyme"?"Mi Contrato Activo":"Proyecto · "+match.advisor.name, to_rate:role==="pyme"?"Contrato por Calificar":"Proyecto Completado · "+match.advisor.name, completed:"Contrato Completado · "+match.advisor.name, cancelled:"Contrato Cancelado · "+match.advisor.name };

  return (
    <div style={{ height:"100%", overflowY:"auto", padding:"24px 28px" }}>
      <div style={{ maxWidth:1060, margin:"0 auto" }}>

        <div style={{ marginBottom:16 }}>
          <div className="eyebrow">Dashboard de seguimiento</div>
          <h2 className="display" style={{ fontSize:34, lineHeight:1.1, marginTop:4 }}>{titleMap[status] || titleMap.active}</h2>
        </div>

        {/* Status banners */}
        {status === "cancelled" && (
          <div style={{ padding:"12px 16px", background:"color-mix(in srgb, var(--danger) 8%, #fff)", border:"2px solid var(--danger)", borderRadius:"var(--r-lg)", marginBottom:16, display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ fontSize:18 }}>✕</span>
            <div><b>Contrato cancelado</b><span style={{ color:"var(--ink-soft)", fontSize:13 }}> — el proceso fue interrumpido antes de completarse.</span></div>
          </div>
        )}
        {status === "to_rate" && role === "pyme" && (
          <div style={{ padding:"12px 16px", background:"color-mix(in srgb, var(--warning) 8%, #fff)", border:"2px solid var(--warning)", borderRadius:"var(--r-lg)", marginBottom:16, display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ fontSize:18 }}>★</span>
            <div><b>Contrato finalizado</b><span style={{ color:"var(--ink-soft)", fontSize:13 }}> — calificá al advisor para completar el proceso.</span></div>
          </div>
        )}
        {status === "completed" && (
          <div style={{ padding:"12px 16px", background:"color-mix(in srgb, var(--success) 8%, #fff)", border:"2px solid var(--success)", borderRadius:"var(--r-lg)", marginBottom:16, display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ fontSize:18 }}>✓</span>
            <div><b>Contrato completado satisfactoriamente</b><span style={{ color:"var(--ink-soft)", fontSize:13 }}>{c.rating ? ` — calificación: ${c.rating.stars}/5 estrellas` : ""}</span></div>
          </div>
        )}

        <ContractBanner match={match} role={role} />

        <div style={{ display:"grid", gridTemplateColumns:"1fr 284px", gap:20, alignItems:"start" }}>

          {/* Main column */}
          <div style={{ display:"grid", gap:20 }}>
            {/* Rating panel — PYME only when to_rate */}
            {status === "to_rate" && role === "pyme" && (
              <RatingPanel match={match} onSubmitRating={handleSubmitRating} />
            )}
            {/* Completed rating display — PYME */}
            {status === "completed" && role === "pyme" && c.rating && (
              <RatingPanel match={match} onSubmitRating={null} />
            )}
            {/* Advisor: awaiting rating notice */}
            {status === "to_rate" && role === "advisor" && (
              <Panel pad={16} style={{ border:"2px solid var(--warning)", background:"color-mix(in srgb, var(--warning) 5%, var(--surface))" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontSize:24 }}>⏳</span>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14 }}>Esperando calificación</div>
                    <div style={{ fontSize:13, color:"var(--ink-soft)", marginTop:2 }}>La PYME está evaluando el proyecto. Recibirás la calificación pronto.</div>
                  </div>
                </div>
              </Panel>
            )}

            {/* Phases */}
            <Panel pad={16}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <div className="eyebrow">Plan de acción · fases</div>
                <span className="mono" style={{ fontSize:11, color:"var(--ink-soft)" }}>{phases.filter(p=>p.status==="completed").length}/{phases.length} completadas</span>
              </div>
              {phases.length > 0 ? (
                <div style={{ display:"grid", gap:10 }}>
                  {phases.map((phase, i) => <PhaseCard key={phase.id} phase={phase} idx={i} role={role} onOpenReport={setReportPhase} />)}
                </div>
              ) : (
                <div style={{ padding:"20px", textAlign:"center", border:"1.5px dashed var(--ink-faint)", borderRadius:"var(--r-md)" }}>
                  <div className="mono" style={{ fontSize:12, color:"var(--ink-soft)" }}>{role==="advisor"?"Configurá las fases del plan de acción para empezar el seguimiento.":"El advisor configurará las fases del proyecto en breve."}</div>
                </div>
              )}
            </Panel>

            <SalesBaselinePanel salesBaseline={c.salesBaseline} />
            <KPISection kpis={c.kpis} />
          </div>

          {/* Sidebar */}
          <div style={{ display:"grid", gap:16 }}>
            <TimePanel contract={c} />
            <FinancialsPanel contract={c} />
            <DeliverablesPanel deliverables={c.deliverables} />
            {c.metrics?.length > 0 && (
              <Panel pad={16}>
                <div className="eyebrow" style={{ marginBottom:10 }}>Metas contractuales</div>
                <div style={{ display:"grid", gap:8 }}>
                  {c.metrics.map((m,i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 10px", borderRadius:"var(--r-sm)", background:"var(--paper)", border:"1.5px solid var(--ink)", gap:10 }}>
                      <span style={{ fontSize:12.5, color:"var(--ink-soft)", lineHeight:1.35, flex:1 }}>{m.label}</span>
                      <Badge tone="accent" solid>{m.target}</Badge>
                    </div>
                  ))}
                </div>
              </Panel>
            )}
            {role === "advisor" && phases.length > 0 && phases.every(p => p.status === "completed") && status === "active" && (
              <Panel pad={16} style={{ background:"color-mix(in srgb, var(--success) 8%, #fff)", border:"2px solid var(--success)" }}>
                <div style={{ fontSize:24, marginBottom:8 }}>🎯</div>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>¡Todas las fases completadas!</div>
                <div style={{ fontSize:12.5, color:"var(--ink-soft)", marginBottom:12, lineHeight:1.4 }}>Entregá el reporte final para cerrar el contrato.</div>
                <Button tone="success" full size="sm" icon={<span>📄</span>}>Entregar reporte final</Button>
              </Panel>
            )}
          </div>
        </div>
      </div>
      {reportPhase && <ReportModal phase={reportPhase} onClose={() => setReportPhase(null)} onSubmit={handleSubmitReport} />}
    </div>
  );
}

// ── Dashboard View ─────────────────────────────────────────────────────────────
function DashboardView({ matches, role, onUpdate, pushToast }) {
  const marriedMatches = matches.filter(m => m.married && m.contract);
  const [selectedId, setSelectedId] = useDB(() => marriedMatches[0]?.id || null);
  const selected = marriedMatches.find(m => m.id === selectedId) || marriedMatches[0] || null;

  if (marriedMatches.length === 0) {
    return (
      <div style={{ display:"grid", placeItems:"center", height:"100%", padding:40 }}>
        <div style={{ textAlign:"center", maxWidth:360 }}>
          <div style={{ fontSize:48, marginBottom:12 }}>📊</div>
          <h3 style={{ fontSize:22 }}>Sin contratos</h3>
          <p style={{ color:"var(--ink-soft)", fontSize:14, marginTop:8, lineHeight:1.55 }}>
            {role==="pyme"?"Formalizá un contrato con Marry the Prospect para ver el seguimiento aquí.":"Tus contratos activos aparecerán aquí. Podés gestionar hasta 3 proyectos en paralelo."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
      {/* Selector */}
      {marriedMatches.length > 1 && (
        <div style={{ padding:"10px 20px", borderBottom:"var(--bd) solid var(--ink)", background:"var(--paper)", display:"flex", gap:10, alignItems:"center", overflowX:"auto", flexShrink:0 }}>
          <span className="eyebrow" style={{ flexShrink:0 }}>{role==="pyme"?"Contratos":"Activos"}</span>
          <div style={{ display:"flex", gap:8 }}>
            {marriedMatches.map(m => {
              const sc = STATUS_CFG[m.contract?.contractStatus||"active"];
              const on = m.id === selected?.id;
              return (
                <button key={m.id} onClick={() => setSelectedId(m.id)} style={{ display:"flex", alignItems:"center", gap:9, padding:"7px 14px", borderRadius:999, cursor:"pointer", flexShrink:0, border:"var(--bd) solid var(--ink)", background:on?"var(--accent)":"var(--surface)", color:on?"#fff":"var(--ink)", boxShadow:on?"var(--sh-pop)":"none", fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:600 }}>
                  <Avatar text={m.advisor.monogram} accent={on?"primary":(m.advisor.accent||"primary")} size={22} />
                  {m.advisor.name.split(" ")[0]}
                  <Badge tone={sc.tone} solid={on}>{sc.label}</Badge>
                </button>
              );
            })}
            {role === "advisor" && marriedMatches.filter(m=>(m.contract?.contractStatus||"active")==="active").length < 3 && (
              <span className="mono" style={{ display:"flex", alignItems:"center", padding:"7px 4px", fontSize:11, color:"var(--ink-faint)", flexShrink:0 }}>
                · {3 - marriedMatches.filter(m=>(m.contract?.contractStatus||"active")==="active").length} cupos activos disponibles
              </span>
            )}
          </div>
        </div>
      )}
      <div style={{ flex:1, overflow:"hidden" }}>
        {selected
          ? <ContractDashboard match={selected} role={role} onUpdate={updater => onUpdate(selected.id, updater)} pushToast={pushToast} />
          : <div style={{ display:"grid", placeItems:"center", height:"100%" }}><span className="mono" style={{ color:"var(--ink-soft)" }}>Seleccioná un contrato</span></div>
        }
      </div>
    </div>
  );
}

Object.assign(window, { DashboardView });
