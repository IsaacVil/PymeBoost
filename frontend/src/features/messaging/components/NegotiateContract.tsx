"use client";
// Negotiate Contract modal — ported from prototype/app/messaging.jsx.
import { CSSProperties, ReactNode, useEffect, useState } from "react";

import { commissionForMonths, Contract, standardContract, TIERS } from "@/features/contracts/data/contractModel";
import { crc } from "@/lib/format";
import { Conversation } from "../data/conversations";

const overlayStyle: CSSProperties = {
  position: "fixed", inset: 0, background: "rgba(33,27,18,.42)", backdropFilter: "blur(2px)",
  display: "grid", placeItems: "center", zIndex: 120, padding: 20,
};

const inputStyle: CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, padding: "9px 11px",
  border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-sm)", background: "var(--surface)",
  color: "var(--ink)", width: "100%", outline: "none",
};

const tierBtn = (on: boolean): CSSProperties => ({
  fontFamily: "var(--font-mono)", fontSize: 11.5, fontWeight: 600, padding: "7px 11px",
  borderRadius: 999, border: "var(--bd) solid var(--ink)", cursor: "pointer",
  background: on ? "var(--accent)" : "var(--surface)", color: on ? "#fff" : "var(--ink)",
  boxShadow: on ? "var(--sh-pop)" : "none",
});

interface NegotiateContractProps {
  match: Conversation;
  readOnly?: boolean;
  onClose: () => void;
  onPropose?: (c: Contract) => void;
}

export function NegotiateContract({ match, readOnly = false, onClose, onPropose }: NegotiateContractProps) {
  const [c, setC] = useState<Contract>(() => match.contract ?? standardContract());
  const set = <K extends keyof Contract>(k: K, v: Contract[K]) => setC((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    const today = new Date();
    const end = new Date(today);
    end.setMonth(end.getMonth() + c.durationMonths);
    setC((p) => ({ ...p, start: today.toISOString().slice(0, 10), deadline: end.toISOString().slice(0, 10) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c.durationMonths]);

  const commission = commissionForMonths(c.durationMonths);
  const commissionAmt = Math.round((c.budget * commission) / 100);
  const advisorTotal = c.retainer * c.durationMonths;
  const tier = TIERS.find((t) => t.months === c.durationMonths);

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(940px, 94vw)", maxHeight: "92vh", overflow: "hidden", background: "var(--surface)", border: "2px solid var(--ink)", borderRadius: "var(--r-xl)", boxShadow: "7px 8px 0 rgba(33,27,18,.4)", display: "grid", gridTemplateColumns: "1.35fr 1fr" }}
      >
        {/* form */}
        <div style={{ borderRight: "2px solid var(--ink)", display: "flex", flexDirection: "column", maxHeight: "92vh" }}>
          <div style={{ padding: "16px 22px", borderBottom: "var(--bd) solid var(--ink)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--paper)" }}>
            <div>
              <div className="eyebrow">{readOnly ? "Detalles de la propuesta" : "Negotiate Contract"}</div>
              <h3 className="display" style={{ fontSize: 26, lineHeight: 1, marginTop: 3 }}>Contrato con {match.advisor.name.split(" ")[0]}</h3>
            </div>
            <span className="font-mono" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", border: "1.5px solid var(--ink)", borderRadius: 999, padding: "3px 9px", background: "var(--paper-2)" }}>Plantilla PymeBoost</span>
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
                {TIERS.map((t) => (
                  <button key={t.months} onClick={() => set("durationMonths", t.months)} style={tierBtn(c.durationMonths === t.months)}>
                    {t.label} · {t.months}m · {t.pct}%
                  </button>
                ))}
                {[2, 4, 5].includes(c.durationMonths) && <button style={tierBtn(true)}>Personalizada · {c.durationMonths}m · {commission}%</button>}
              </div>
              <input type="range" min={1} max={6} value={c.durationMonths} onChange={(e) => set("durationMonths", +e.target.value)} style={{ accentColor: "var(--accent)", marginTop: 4 }} />
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Fecha de inicio" hint="Calculada automáticamente al activar el contrato.">
                <input style={{ ...inputStyle, background: "var(--paper)", color: "var(--ink-soft)" }} type="date" value={c.start} readOnly />
              </Field>
              <Field label="Fecha límite" hint={`${c.durationMonths} mes(es) desde la fecha de inicio.`}>
                <input style={{ ...inputStyle, background: "var(--paper)", color: "var(--ink-soft)" }} type="date" value={c.deadline} readOnly />
              </Field>
            </div>

            <Field label="Objetivo principal (medible)">
              <textarea style={{ ...inputStyle, fontFamily: "var(--font-sans)", minHeight: 56, resize: "vertical" }} value={c.objective} onChange={(e) => set("objective", e.target.value)} />
            </Field>

            <Field label="Ganancia advisor por resultados (%)" hint="% del incremento verificado, pagado durante 4 meses si el proceso se implementa exitosamente.">
              <input style={inputStyle} type="number" value={c.advisorResultPct} onChange={(e) => set("advisorResultPct", +e.target.value)} />
            </Field>

            <div>
              <div className="eyebrow" style={{ marginBottom: 7 }}>Métricas esperadas</div>
              <div style={{ display: "grid", gap: 7 }}>
                {c.metrics.map((mt, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input style={{ ...inputStyle, flex: 1 }} value={mt.label} onChange={(e) => { const n = [...c.metrics]; n[i] = { ...mt, label: e.target.value }; set("metrics", n); }} />
                    <input style={{ ...inputStyle, width: 90, textAlign: "center" }} value={mt.target} onChange={(e) => { const n = [...c.metrics]; n[i] = { ...mt, target: e.target.value }; set("metrics", n); }} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="eyebrow" style={{ marginBottom: 7, display: "flex", alignItems: "center", gap: 7 }}>
                Plan de acción <span className="font-mono" style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--accent-deep)" }}>✦ generado por IA</span>
              </div>
              <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 7 }}>
                {c.plan.map((p, i) => (
                  <li key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                    <span className="font-mono" style={{ flex: "0 0 22px", height: 22, borderRadius: 6, background: "var(--accent)", color: "#fff", border: "1.5px solid var(--ink)", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700, marginTop: 1 }}>{i + 1}</span>
                    <input style={{ ...inputStyle, fontFamily: "var(--font-sans)", flex: 1 }} value={p} onChange={(e) => { const n = [...c.plan]; n[i] = e.target.value; set("plan", n); }} />
                    {c.plan.length > 1 && (
                      <button title="Eliminar fase" onClick={() => set("plan", c.plan.filter((_, j) => j !== i))} style={{ flex: "0 0 22px", height: 22, borderRadius: 6, background: "none", border: "1.5px solid var(--danger)", color: "var(--danger)", cursor: "pointer", fontSize: 15, lineHeight: 1, display: "grid", placeItems: "center", marginTop: 1 }}>×</button>
                    )}
                  </li>
                ))}
              </ol>
              <button onClick={() => set("plan", [...c.plan, ""])} className="font-mono" style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, background: "none", border: "1.5px dashed var(--ink-faint)", borderRadius: "var(--r-sm)", color: "var(--ink-soft)", fontSize: 12, fontWeight: 600, padding: "7px 12px", cursor: "pointer", width: "100%" }}>
                + Añadir fase al plan
              </button>
            </div>
          </div>
        </div>

        {/* summary */}
        <div style={{ background: "var(--paper)", display: "flex", flexDirection: "column", maxHeight: "92vh" }}>
          <div style={{ padding: 22, overflowY: "auto", flex: 1 }}>
            <div className="eyebrow">Resumen del acuerdo</div>
            <div style={{ marginTop: 14, border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", overflow: "hidden", background: "var(--surface)" }}>
              {([["Presupuesto base", crc(c.budget)], ["Retainer / mes", crc(c.retainer)], ["Duración", c.durationMonths + (c.durationMonths === 1 ? " mes" : " meses")], ["Retainer total", crc(advisorTotal)]] as [string, string][]).map(([k, v], i) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 13px", borderTop: i ? "1.5px solid var(--ink)" : "none" }}>
                  <span className="font-mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>{k}</span>
                  <span className="font-mono" style={{ fontSize: 12.5, fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 14, background: "color-mix(in srgb, var(--accent) 12%, #fff)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="eyebrow">Comisión PymeBoost</span>
                <span className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "var(--accent)", borderRadius: 999, padding: "2px 9px" }}>{commission}%</span>
              </div>
              <div className="font-mono" style={{ fontSize: 20, fontWeight: 700, marginTop: 6, color: "var(--accent-deep)" }}>{crc(commissionAmt)}</div>
              <div className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-soft)" }}>Gama {tier ? tier.label : "Personalizada"} · {commission}% del presupuesto base</div>
            </div>

            <div style={{ marginTop: 12, border: "1.5px dashed var(--ink-faint)", borderRadius: "var(--r-md)", padding: "11px 13px" }}>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Ganancia por resultados</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.45 }}>
                <b style={{ color: "var(--ink)" }}>{c.advisorResultPct}%</b> del incremento en <b style={{ color: "var(--ink)" }}>{c.metrics[0]?.label.toLowerCase()}</b> durante <b style={{ color: "var(--ink)" }}>4 meses</b>, pagado si el proceso se implementa exitosamente.
              </div>
            </div>
          </div>

          <div style={{ padding: 18, borderTop: "var(--bd) solid var(--ink)", display: "grid", gap: 9, background: "var(--surface)" }}>
            {readOnly ? (
              <ModalBtn onClick={onClose} tone="ink">← Cerrar</ModalBtn>
            ) : (
              <>
                <ModalBtn onClick={() => onPropose?.(c)} tone="accent">↗ Enviar propuesta</ModalBtn>
                <button onClick={onClose} className="font-mono" style={{ background: "none", border: "none", color: "var(--ink-soft)", fontSize: 12, padding: 4, cursor: "pointer" }}>Seguir negociando en el chat</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 5 }}>
      <span className="eyebrow">{label}</span>
      {children}
      {hint && <span className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-faint)" }}>{hint}</span>}
    </label>
  );
}

function ModalBtn({ children, onClick, tone }: { children: ReactNode; onClick: () => void; tone: "accent" | "ink" }) {
  return (
    <button
      onClick={onClick}
      className="font-mono"
      style={{ width: "100%", padding: "12px", borderRadius: "var(--r-md)", border: "var(--bd) solid var(--ink)", boxShadow: "var(--sh-pop)", cursor: "pointer", fontWeight: 600, fontSize: 14, background: tone === "accent" ? "var(--accent)" : "var(--ink)", color: "#fff" }}
    >
      {children}
    </button>
  );
}
