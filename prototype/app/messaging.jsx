// messaging.jsx — chat, bloqueo de contacto, Negotiate Contract, Marry the Prospect
const { useState: useM, useRef: useMR, useEffect: useME } = React;

// detección de información de contacto externa (la plataforma la bloquea)
const CONTACT_PATTERNS = [
{ re: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i, what: "un correo electrónico" },
{ re: /(?:\+?\d[\s-]?){8,}/, what: "un número telefónico" },
{ re: /(?:wa\.me|whats\s?app|telegram|t\.me|instagram|insta\b|@[a-z0-9_.]{3,}|facebook|tiktok)/i, what: "una red social o contacto externo" },
{ re: /https?:\/\/|www\./i, what: "un enlace externo" }];

function scanContact(text) {
  for (const p of CONTACT_PATTERNS) {if (p.re.test(text)) return p.what;}
  return null;
}

const Field = ({ label, children, hint }) =>
<label style={{ display: "grid", gap: 5 }}>
    <span className="eyebrow">{label}</span>
    {children}
    {hint && <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-faint)" }}>{hint}</span>}
  </label>;

const inputStyle = {
  fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600,
  padding: "9px 11px", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-sm)",
  background: "var(--surface)", color: "var(--ink)", width: "100%", outline: "none"
};

// ───────────────────────── Negotiate Contract ─────────────────────────
function NegotiateContract({ match, onClose, onPropose, onMarry, role, readOnly }) {
  const [c, setC] = useM(() => match.contract || standardContract(match.advisor));
  const set = (k, v) => setC((p) => ({ ...p, [k]: v }));
  // Fechas automáticas: inicio = hoy, fin = hoy + meses del contrato (no modificables por el usuario)
  useME(() => {
    const today = new Date();
    const startStr = today.toISOString().slice(0, 10);
    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + c.durationMonths);
    const endStr = endDate.toISOString().slice(0, 10);
    setC((p) => ({ ...p, start: startStr, deadline: endStr }));
  }, [c.durationMonths]);
  const commission = commissionForMonths(c.durationMonths);
  const commissionAmt = Math.round(c.budget * commission / 100);
  const advisorTotal = c.retainer * c.durationMonths;
  const tier = TIERS.find((t) => t.months === c.durationMonths);

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "min(940px, 94vw)", maxHeight: "92vh", overflow: "hidden",
        background: "var(--surface)", border: "2px solid var(--ink)", borderRadius: "var(--r-xl)",
        boxShadow: "7px 8px 0 rgba(33,27,18,.4)", display: "grid", gridTemplateColumns: "1.35fr 1fr",
        animation: "popIn .25s ease"
      }}>
        {/* form */}
        <div style={{ borderRight: "2px solid var(--ink)", display: "flex", flexDirection: "column", maxHeight: "92vh" }}>
          <div style={{ padding: "16px 22px", borderBottom: "var(--bd) solid var(--ink)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--paper)" }}>
            <div>
              <div className="eyebrow">{readOnly ? "Detalles de la propuesta" : "Negotiate Contract"}</div>
              <h3 className="display" style={{ fontSize: 26, lineHeight: 1, marginTop: 3 }}>Contrato con {match.advisor.name.split(" ")[0]}</h3>
            </div>
            <Badge tone="neutral">Plantilla PymeBoost</Badge>
          </div>

          <div style={{ padding: 22, overflowY: "auto", display: "grid", gap: 16, pointerEvents: readOnly ? "none" : "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Presupuesto implementación (₡)">
                <input style={inputStyle} type="number" value={c.budget} onChange={(e) => set("budget", +e.target.value)} />
              </Field>
              <Field label="Retainer mensual advisor (₡)">
                <input style={inputStyle} type="number" value={c.retainer} onChange={(e) => set("retainer", +e.target.value)} />
              </Field>
            </div>

            <Field label="Duración del contrato (gama)">
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {TIERS.map((t) =>
                <button key={t.months} onClick={() => set("durationMonths", t.months)} style={tierBtn(c.durationMonths === t.months)}>
                    {t.label} · {t.months}m · {t.pct}%
                  </button>
                )}
                {[2, 4, 5].includes(c.durationMonths) &&
                <button style={tierBtn(true)}>Personalizada · {c.durationMonths}m · {commission}%</button>
                }
              </div>
              <input type="range" min="1" max="6" value={c.durationMonths} onChange={(e) => set("durationMonths", +e.target.value)} style={{ accentColor: "var(--accent)", marginTop: 4 }} />
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Fecha de inicio" hint="Calculada automáticamente al activar el contrato.">
                <input style={{ ...inputStyle, background: "var(--paper)", color: "var(--ink-soft)", cursor: "default" }} type="date" value={c.start} readOnly />
              </Field>
              <Field label="Fecha límite" hint={`Se calcula: ${c.durationMonths} mes(es) desde la fecha de inicio.`}>
                <input style={{ ...inputStyle, background: "var(--paper)", color: "var(--ink-soft)", cursor: "default" }} type="date" value={c.deadline} readOnly />
              </Field>
            </div>

            <Field label="Objetivo principal (medible)">
              <textarea style={{ ...inputStyle, fontFamily: "'Space Grotesk',sans-serif", minHeight: 56, resize: "vertical" }} value={c.objective} onChange={(e) => set("objective", e.target.value)} />
            </Field>

            <Field label="Ganancia advisor por resultados (%)" hint="% del incremento de ventas o mejora del proceso verificada, pagado durante 4 meses si el proceso se implementa exitosamente.">
              <input style={inputStyle} type="number" value={c.advisorResultPct} onChange={(e) => set("advisorResultPct", +e.target.value)} />
            </Field>

            <div>
              <div className="eyebrow" style={{ marginBottom: 7 }}>Métricas esperadas</div>
              <div style={{ display: "grid", gap: 7 }}>
                {c.metrics.map((m, i) =>
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input style={{ ...inputStyle, flex: 1 }} value={m.label} onChange={(e) => {const n = [...c.metrics];n[i] = { ...m, label: e.target.value };set("metrics", n);}} />
                    <input style={{ ...inputStyle, width: 90, textAlign: "center" }} value={m.target} onChange={(e) => {const n = [...c.metrics];n[i] = { ...m, target: e.target.value };set("metrics", n);}} />
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="eyebrow" style={{ marginBottom: 7, display: "flex", alignItems: "center", gap: 7 }}>
                Plan de acción <Badge tone="accent">✦ generado por IA</Badge>
              </div>
              <ol style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "grid", gap: 7, counterReset: "step" }}>
                {c.plan.map((p, i) =>
                <li key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                    <span className="mono" style={{ flex: "0 0 22px", height: 22, borderRadius: 6, background: "var(--accent)", color: "#fff", border: "1.5px solid var(--ink)", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700, marginTop: 1 }}>{i + 1}</span>
                    <input style={{ ...inputStyle, fontFamily: "'Space Grotesk',sans-serif", flex: 1 }} value={p} onChange={(e) => {const n = [...c.plan];n[i] = e.target.value;set("plan", n);}} />
                    {c.plan.length > 1 &&
                  <button title="Eliminar fase" onClick={() => {const n = c.plan.filter((_, j) => j !== i);set("plan", n);}} style={{ flex: "0 0 22px", height: 22, borderRadius: 6, background: "none", border: "1.5px solid var(--danger)", color: "var(--danger)", cursor: "pointer", fontSize: 15, lineHeight: 1, display: "grid", placeItems: "center", marginTop: 1 }}>×</button>
                  }
                  </li>
                )}
              </ol>
              <button onClick={() => set("plan", [...c.plan, ""])} className="mono" style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, background: "none", border: "1.5px dashed var(--ink-faint)", borderRadius: "var(--r-sm)", color: "var(--ink-soft)", fontSize: 12, fontWeight: 600, padding: "7px 12px", cursor: "pointer", width: "100%" }}>
                + Añadir fase al plan
              </button>
            </div>
          </div>
        </div>

        {/* summary */}
        <div style={{ background: "var(--paper)", display: "flex", flexDirection: "column", maxHeight: "92vh" }}>
          <div style={{ padding: 22, overflowY: "auto", flex: 1 }}>
            <div className="eyebrow">Resumen del acuerdo</div>
            <div style={{ marginTop: 14, display: "grid", gap: 0, border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", overflow: "hidden", background: "var(--surface)" }}>
              {[
              ["Presupuesto base", CRC(c.budget)],
              ["Retainer / mes", CRC(c.retainer)],
              ["Duración", c.durationMonths + (c.durationMonths === 1 ? " mes" : " meses")],
              ["Retainer total", CRC(advisorTotal)]].
              map(([k, v], i) =>
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 13px", borderTop: i ? "1.5px solid var(--ink)" : "none" }}>
                  <span className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>{k}</span>
                  <span className="mono" style={{ fontSize: 12.5, fontWeight: 700 }}>{v}</span>
                </div>
              )}
            </div>

            <div style={{ marginTop: 14, background: "color-mix(in srgb, var(--accent) 12%, #fff)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="eyebrow">Comisión PymeBoost</span>
                <Badge tone="accent" solid>{commission}%</Badge>
              </div>
              <div className="mono" style={{ fontSize: 20, fontWeight: 700, marginTop: 6, color: "var(--accent-deep)" }}>{CRC(commissionAmt)}</div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)" }}>Gama {tier ? tier.label : "Personalizada"} · {commission}% del presupuesto base</div>
            </div>

              <div style={{ marginTop: 12, border: "1.5px dashed var(--ink-faint)", borderRadius: "var(--r-md)", padding: "11px 13px" }}>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Ganancia por resultados</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.45 }}>
                <b style={{ color: "var(--ink)" }}>{c.advisorResultPct}%</b> del incremento en <b style={{ color: "var(--ink)" }}>{c.metrics[0]?.label.toLowerCase()}</b> durante <b style={{ color: "var(--ink)" }}>4 meses</b>, pagado si el proceso se implementa exitosamente.
              </div>
            </div>
          </div>

          <div style={{ padding: 18, borderTop: "var(--bd) solid var(--ink)", display: "grid", gap: 9, background: "var(--surface)" }}>
            {readOnly ?
            <Button tone="ink" full onClick={onClose} icon={<span>←</span>}>Cerrar · usar acciones del encabezado</Button> :
            <React.Fragment>
                <Button tone="accent" full onClick={() => onPropose(c)} icon={<span>↗</span>}>Enviar propuesta</Button>
                <button onClick={onClose} className="mono" style={{ background: "none", border: "none", color: "var(--ink-soft)", fontSize: 12, padding: 4 }}>Seguir negociando en el chat</button>
              </React.Fragment>
            }
          </div>
        </div>
      </div>
    </div>);

}
const tierBtn = (on) => ({
  fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, fontWeight: 600,
  padding: "7px 11px", borderRadius: 999, border: "var(--bd) solid var(--ink)",
  background: on ? "var(--accent)" : "var(--surface)", color: on ? "#fff" : "var(--ink)",
  boxShadow: on ? "var(--sh-pop)" : "none"
});
const overlayStyle = {
  position: "fixed", inset: 0, background: "rgba(33,27,18,.42)", backdropFilter: "blur(2px)",
  display: "grid", placeItems: "center", zIndex: 120, padding: 20
};

// ───────────────────────── Marry confirm ─────────────────────────
function MarryModal({ match, contract, onConfirm, onClose }) {
  const commission = commissionForMonths(contract.durationMonths);
  return (
    <div onClick={onClose} style={overlayStyle}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(440px,94vw)", background: "var(--surface)", border: "2px solid var(--ink)", borderRadius: "var(--r-xl)", boxShadow: "7px 8px 0 rgba(33,27,18,.4)", overflow: "hidden", animation: "popIn .25s ease" }}>
        <div style={{ background: "var(--accent)", color: "#fff", padding: "22px", textAlign: "center", borderBottom: "2px solid var(--ink)" }}>
          <div style={{ fontSize: 40 }}>💍</div>
          <h3 className="display" style={{ fontSize: 30, marginTop: 6 }}>Marry the Prospect</h3>
          <p className="mono" style={{ fontSize: 12, opacity: .92, marginTop: 4 }}>Formalizar contrato con {match.advisor.name}</p>
        </div>
        <div style={{ padding: 22 }}>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, textAlign: "center" }}>
            Al activar el contrato se inicia el proceso. El advisor recibirá el <b style={{ color: "var(--ink)" }}>{contract.advisorResultPct}% sobre el incremento verificado</b> durante <b style={{ color: "var(--ink)" }}>4 meses</b> si el proceso se implementa exitosamente. Una PYME solo puede tener <b style={{ color: "var(--ink)" }}>un contrato activo</b> a la vez.
          </p>
          <div style={{ margin: "16px 0", display: "grid", gap: 0, border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
            {[
            ["Presupuesto base", CRC(contract.budget)],
            ["Retainer / mes", CRC(contract.retainer)],
            ["Duración", contract.durationMonths + " mes(es)"],
            ["Inicio", contract.start || "—"],
            ["Vencimiento", contract.deadline || "—"],
            ["Comisión PymeBoost", commission + "%"],
            ["Ganancia advisor (4m)", contract.advisorResultPct + "% del incremento"]].
            map(([k, v], i) =>
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 13px", borderTop: i ? "1.5px solid var(--ink)" : "none" }}>
                <span className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>{k}</span>
                <span className="mono" style={{ fontSize: 12.5, fontWeight: 700 }}>{v}</span>
              </div>
            )}
          </div>
          <div style={{ display: "grid", gap: 9 }}>
            <Button tone="accent" full size="lg" onClick={onConfirm} icon={<span>💍</span>}>Aceptar y activar contrato</Button>
            <Button variant="ghost" tone="ink" full onClick={onClose}>Cancelar</Button>
          </div>
        </div>
      </div>
    </div>);

}

// ───────────────────────── Chat view ─────────────────────────
function ChatView({ match, role, onUpdate, pushToast, onUnmatch }) {
  const [text, setText] = useM("");
  const [showContract, setShowContract] = useM(false);
  const [marry, setMarry] = useM(null);
  const [confirmUnmatch, setConfirmUnmatch] = useM(false);
  const [viewProposal, setViewProposal] = useM(null);
  const scrollRef = useMR(null);
  const me = "me"; // el emisor actual siempre es "me"; el par es "them"

  useME(() => {const el = scrollRef.current;if (el) el.scrollTop = el.scrollHeight;}, [match.messages, match.id]);

  const addMsg = (msg) => onUpdate({ ...match, messages: [...match.messages, msg] });

  const send = () => {
    const t = text.trim();if (!t) return;
    const bad = scanContact(t);
    if (bad) {
      addMsg({ from: "system", kind: "blocked", text: `Mensaje bloqueado: parece contener ${bad}. Toda la comunicación debe ocurrir dentro de PymeBoost.`, t: now() });
      setText("");pushToast({ text: "Contacto externo bloqueado", tone: "danger", icon: "🚫" });
      return;
    }
    addMsg({ from: me, text: t, t: now() });
    setText("");
    // respuesta simulada del advisor (solo en rol PYME)
    if (role === "pyme") {
      setTimeout(() => onUpdate((m) => ({ ...m, messages: [...m.messages, { from: "them", text: pickReply(t), t: now() }] })), 900);
    }
  };

  const propose = (c) => {
    onUpdate({ ...match, contract: c, status: "Negociando", messages: [...match.messages, { from: me, kind: "proposal", contract: c, t: now() }] });
    setShowContract(false);
    pushToast({ text: "Propuesta de contrato enviada", tone: "success", icon: "📄" });
    if (role === "pyme") {
      setTimeout(() => onUpdate((m) => ({
        ...m, status: "Propuesta aceptada",
        messages: [...m.messages,
          { from: "them", text: "Revisé la propuesta. Los términos me cierran bien. La acepto.", t: now() },
          { from: "system", kind: "advisor-decision", decision: "accepted", t: now() },
        ]
      })), 1500);
    }
  };

  const doMarry = (c) => {setShowContract(false);setMarry(c || match.contract || standardContract(match.advisor));};
  const confirmMarry = () => {
    const c = window.enrichContract ? window.enrichContract(marry) : marry;
    onUpdate({ ...match, contract: c, status: "Contrato activo", married: true,
      messages: [...match.messages, { from: "system", kind: "married", contract: c, t: now() }] });
    setMarry(null);
    pushToast({ text: `¡Contrato activo con ${match.advisor.name.split(" ")[0]}! 💍`, tone: "success", icon: "💍" });
  };

  // ── Advisor: puede negociar (contraofertar) y aceptar o rechazar la propuesta de la PYME ──
  // (NO puede “Marry the Prospect” / formalizar; eso es exclusivo de la PYME)
  const pendingIdx = role === "advisor" ?
  match.messages.findIndex((m) => m.kind === "proposal" && m.from === "them" && !m.decided) :
  -1;
  const acceptProposal = (idx) => {
    onUpdate((m) => ({ ...m, status: "Propuesta aceptada", contract: m.messages[idx]?.contract || m.contract,
      messages: m.messages.map((msg, i) => i === idx ? { ...msg, decided: "accepted" } : msg).
      concat({ from: "system", kind: "advisor-decision", decision: "accepted", t: now() }) }));
    pushToast({ text: "Propuesta aceptada · la PYME ya puede formalizar", tone: "success", icon: "✓" });
  };
  const rejectProposal = (idx) => {
    onUpdate((m) => ({ ...m, status: "Propuesta rechazada",
      messages: m.messages.map((msg, i) => i === idx ? { ...msg, decided: "rejected" } : msg).
      concat({ from: "system", kind: "advisor-decision", decision: "rejected", t: now() }) }));
    pushToast({ text: "Propuesta rechazada", tone: "danger", icon: "✕" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface)" }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", borderBottom: "var(--bd) solid var(--ink)", background: "var(--paper)" }}>
        <Avatar text={match.advisor.monogram} accent={match.advisor.accent} size={40} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            <h4 style={{ fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>{match.advisor.name}</h4>
            {match.married ?
            <Badge tone="success" solid style={{ flexShrink: 0 }}>● Activo</Badge> :
            <Badge tone={match.status === "Negociando" ? "warning" : "accent"} style={{ flexShrink: 0 }}>{match.status}</Badge>}
          </div>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{match.advisor.role}</div>
        </div>
        {!match.married && role === "pyme" &&
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <Button variant="outline" tone="ink" size="sm" onClick={() => setShowContract(true)} icon={<span>📄</span>}>Negotiate</Button>
            <Button variant="outline" tone="danger" size="sm" onClick={() => setConfirmUnmatch(true)} icon={<span>✕</span>}>Unmatch</Button>
          </div>
        }
        {!match.married && role === "advisor" && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <Button variant="outline" tone="ink" size="sm" onClick={() => setShowContract(true)} icon={<span>📄</span>}>Negotiate</Button>
            <Button variant="outline" tone="danger" size="sm" onClick={() => setConfirmUnmatch(true)} icon={<span>✕</span>}>Unmatch</Button>
          </div>)
        }
      </div>

      {/* contract banner */}
      <div style={{ padding: "8px 18px", borderBottom: "1.5px dashed var(--ink-faint)", background: "color-mix(in srgb, var(--accent) 7%, #fff)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 13 }}>🔒</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>
          Chat protegido — no se permite compartir correos, teléfonos ni redes. PymeBoost los bloquea automáticamente.
        </span>
      </div>

      {/* messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "18px", display: "flex", flexDirection: "column", gap: 10, background: "var(--paper)" }}>
        {match.messages.map((m, i) => <MessageBubble key={i} m={m} idx={i} mine={m.from === me} role={role} onAccept={acceptProposal} onReject={rejectProposal} onViewDetails={(c) => setViewProposal(c)} />)}
      </div>

      {/* Barra de acción para advisor cuando hay propuesta pendiente */}
      {!match.married && role === "advisor" && pendingIdx >= 0 && (
        <div style={{ padding:"12px 18px", borderTop:"var(--bd) solid var(--ink)", background:"color-mix(in srgb, var(--accent) 6%, var(--surface))", display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ flex:1, minWidth:140 }}>
            <div style={{ fontSize:13.5, fontWeight:700 }}>Propuesta de contrato recibida</div>
            <div className="mono" style={{ fontSize:11, color:"var(--ink-soft)", marginTop:2 }}>Revisá los términos y decidí.</div>
          </div>
          <Button tone="success" size="sm" onClick={() => acceptProposal(pendingIdx)} icon={<span>✓</span>}>Aceptar</Button>
          <Button variant="outline" tone="ink" size="sm" onClick={() => setShowContract(true)}>Re-negociar</Button>
          <Button variant="outline" tone="danger" size="sm" onClick={() => rejectProposal(pendingIdx)} icon={<span>✕</span>}>Rechazar</Button>
        </div>
      )}

      {/* Marry CTA — aparece cuando el advisor aceptó, solo para PYME */}
      {!match.married && match.status === "Propuesta aceptada" && role === "pyme" && (
        <div style={{ padding:"12px 18px", borderTop:"var(--bd) solid var(--ink)", background:"color-mix(in srgb, var(--success) 8%, var(--surface))", display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ flex:1, minWidth:160 }}>
            <div style={{ fontSize:13.5, fontWeight:700 }}>El advisor aceptó la propuesta</div>
            <div className="mono" style={{ fontSize:11, color:"var(--ink-soft)", marginTop:2 }}>Podés formalizar el contrato y activar el proyecto.</div>
          </div>
          <Button tone="accent" size="sm" onClick={() => doMarry()} icon={<span>💍</span>}>Marry the Prospect</Button>
          <Button variant="outline" tone="ink" size="sm" onClick={() => setShowContract(true)}>Re-negociar</Button>
          <Button variant="outline" tone="danger" size="sm" onClick={() => { onUpdate(m=>({...m, status:"Propuesta rechazada", messages:[...m.messages,{from:"system",kind:"advisor-decision",decision:"rejected",t:now()}]})); pushToast({text:"Propuesta rechazada",tone:"danger",icon:"✕"}); }}>Rechazar</Button>
        </div>
      )}

      {/* input */}
      {match.married ?
      <div style={{ padding: "14px 18px", borderTop: "var(--bd) solid var(--ink)", textAlign: "center", background: "var(--paper)" }}>
          <span className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>Contrato activo · seguimiento disponible en el dashboard del proyecto.</span>
        </div> :

      <div style={{ padding: "12px 16px", borderTop: "var(--bd) solid var(--ink)", display: "flex", gap: 10, alignItems: "center", background: "var(--surface)" }}>
          <input
          value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") send();}}
          placeholder="Escribí un mensaje…"
          style={{ ...inputStyle, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, flex: 1, borderRadius: 999, padding: "11px 16px" }} />
        
          <Button tone="accent" onClick={send} icon={<span>➤</span>}>Enviar</Button>
        </div>
      }

      {showContract && <NegotiateContract match={match} role={role} onClose={() => setShowContract(false)} onPropose={propose} onMarry={doMarry} />}
      {viewProposal && <NegotiateContract match={{ ...match, contract: viewProposal }} role={role} readOnly onClose={() => setViewProposal(null)} onPropose={() => {}} onMarry={() => {}} />}
      {marry && <MarryModal match={match} contract={marry} onConfirm={confirmMarry} onClose={() => setMarry(null)} />}

      {confirmUnmatch && (
        <div onClick={() => setConfirmUnmatch(false)} style={{ position:"fixed", inset:0, background:"rgba(33,27,18,.45)", backdropFilter:"blur(2px)", display:"grid", placeItems:"center", zIndex:140, padding:20 }}>
          <div onClick={e => e.stopPropagation()} style={{ width:"min(380px,94vw)", background:"var(--surface)", border:"2px solid var(--ink)", borderRadius:"var(--r-xl)", boxShadow:"7px 8px 0 rgba(33,27,18,.4)", overflow:"hidden", animation:"popIn .25s ease" }}>
            <div style={{ background:"var(--danger)", color:"#fff", padding:"18px 20px", textAlign:"center", borderBottom:"2px solid var(--ink)" }}>
              <div style={{ fontSize:30 }}>✕</div>
              <h3 className="display" style={{ fontSize:24, marginTop:4 }}>Unmatch</h3>
              <p className="mono" style={{ fontSize:11, opacity:.9, marginTop:4 }}>Eliminar match con {match.advisor.name.split(" ")[0]}</p>
            </div>
            <div style={{ padding:22 }}>
              <p style={{ fontSize:13, color:"var(--ink-soft)", textAlign:"center", lineHeight:1.5 }}>Si no llegaron a un acuerdo podés eliminar este match. Esta acción <b style={{ color:"var(--ink)" }}>no se puede deshacer</b>.</p>
              <div style={{ display:"grid", gap:9, marginTop:18 }}>
                <Button tone="danger" full onClick={() => { setConfirmUnmatch(false); onUnmatch && onUnmatch(match.id); }} icon={<span>✕</span>}>Confirmar Unmatch</Button>
                <Button variant="ghost" tone="ink" full onClick={() => setConfirmUnmatch(false)}>Cancelar</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>);

}

function MessageBubble({ m, mine, role, idx, onAccept, onReject, onViewDetails }) {
  if (m.from === "system" && m.kind === "blocked") {
    return (
      <div style={{ alignSelf: "center", maxWidth: "82%", background: "#FBE3E3", border: "1.5px solid var(--danger)", borderRadius: "var(--r-md)", padding: "9px 13px", display: "flex", gap: 8, alignItems: "flex-start" }}>
        <span style={{ fontSize: 15 }}>🚫</span>
        <span className="mono" style={{ fontSize: 11.5, color: "#9D1414", lineHeight: 1.4, fontWeight: 600 }}>{m.text}</span>
      </div>);

  }
  if (m.from === "system" && m.kind === "married") {
    return (
      <div style={{ alignSelf: "center", maxWidth: "90%", background: "var(--surface)", border: "2px solid var(--success)", borderRadius: "var(--r-md)", padding: "14px 16px", textAlign: "center", boxShadow: "var(--sh-card)" }}>
        <div style={{ fontSize: 24 }}>💍</div>
        <div className="display" style={{ fontSize: 21, marginTop: 2 }}>¡Married the Prospect!</div>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 4 }}>Contrato formalizado · {CRC(m.contract.budget)} · {m.contract.durationMonths} mes(es) · comisión {commissionForMonths(m.contract.durationMonths)}%</div>
      </div>);

  }
  if (m.from === "system" && m.kind === "advisor-decision") {
    const ok = m.decision === "accepted";
    return (
      <div style={{ alignSelf: "center", maxWidth: "88%", background: "var(--surface)", border: `2px solid ${ok ? "var(--success)" : "var(--danger)"}`, borderRadius: "var(--r-md)", padding: "10px 14px", textAlign: "center", boxShadow: "var(--sh-pop)" }}>
        <div className="mono" style={{ fontSize: 11.5, fontWeight: 700, color: ok ? "#0F7A37" : "#9D1414", textTransform: "uppercase", letterSpacing: ".06em" }}>
          {ok ? "✓ Propuesta aceptada por el advisor" : "✕ Propuesta rechazada por el advisor"}
        </div>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 3 }}>
          {ok ? "La PYME puede formalizar el contrato con Marry the Prospect." : "La PYME puede ajustar y reenviar una nueva propuesta."}
        </div>
      </div>);

  }
  if (m.kind === "proposal") {
    const c = m.contract;
    const canDecide = !m.decided;
    const canViewDetails = true;
    return (
      <div style={{ alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "78%" }}>
        <div style={{ background: "var(--surface)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", boxShadow: "var(--sh-pop)", overflow: "hidden" }}>
          <div style={{ background: "var(--accent)", color: "#fff", padding: "7px 12px", display: "flex", alignItems: "center", gap: 7 }}>
            <span>📄</span><span className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>Propuesta de contrato</span>
          </div>
          <div style={{ padding: "11px 13px", display: "grid", gap: 5 }}>
            {[["Presupuesto", CRC(c.budget)], ["Retainer/mes", CRC(c.retainer)], ["Duración", c.durationMonths + "m"], ["Comisión", commissionForMonths(c.durationMonths) + "%"]].map(([k, v]) =>
            <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 18 }}>
                <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{k}</span>
                <span className="mono" style={{ fontSize: 11.5, fontWeight: 700 }}>{v}</span>
              </div>
            )}
          </div>
          {canViewDetails &&
          <div style={{ display: "flex", gap: 8, padding: "0 13px 12px" }}>
              <Button variant="outline" tone="ink" size="sm" full onClick={() => onViewDetails && onViewDetails(c)}>Ver detalles</Button>
            </div>
          }
          {m.decided &&
          <div style={{ padding: "0 13px 11px" }}>
              <Badge tone={m.decided === "accepted" ? "success" : "danger"} solid>{m.decided === "accepted" ? "✓ Aceptada" : "✕ Rechazada"}</Badge>
            </div>
          }
        </div>
        <div className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", marginTop: 3, textAlign: mine ? "right" : "left" }}>{m.t}</div>
      </div>);

  }
  return (
    <div style={{ alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "76%" }}>
      <div style={{
        background: mine ? "var(--accent)" : "var(--surface)", color: mine ? "#fff" : "var(--ink)",
        border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-lg)",
        borderBottomRightRadius: mine ? 4 : "var(--r-lg)", borderBottomLeftRadius: mine ? "var(--r-lg)" : 4,
        padding: "9px 13px", fontSize: 13.5, lineHeight: 1.45, boxShadow: "var(--sh-pop)"
      }}>{m.text}</div>
      <div className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", marginTop: 3, textAlign: mine ? "right" : "left" }}>{m.t}</div>
    </div>);

}

function now() {return new Date().toLocaleTimeString("es-CR", { hour: "2-digit", minute: "2-digit" });}
function pickReply(t) {
  const r = [
  "Perfecto, lo tomo en cuenta. ¿Querés que armemos el plan por fases en el contrato?",
  "De acuerdo. Puedo arrancar la auditoría esta semana si formalizamos.",
  "Buenísimo. Mi enfoque sería separar público nuevo de recurrente desde el día uno.",
  "Eso encaja con lo que vi en Aurora Denim. Podemos fijar la métrica de conversión como meta principal."];

  return r[Math.floor(Math.random() * r.length)];
}

Object.assign(window, { ChatView, NegotiateContract, scanContact });