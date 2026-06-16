"use client";
// Active-contract tracking dashboard — ported from prototype/app/dashboard.jsx
// (PYME view: banner + progress ring + phases + KPIs + deliverables + financials + time).
import { ReactNode, useState } from "react";

import { commissionForMonths } from "@/features/contracts/data/contractModel";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Meter } from "@/shared/components/ui/Meter";
import { crc } from "@/lib/format";
import { Deliverable, Kpi, ProjectMatch, ProjectPhase } from "../data/projectMock";

function timeRemaining(deadline: string) {
  const diff = +new Date(deadline) - Date.now();
  if (diff <= 0) return { past: true, label: "Vencido" };
  const totalDays = Math.floor(diff / 86400000);
  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;
  return months > 0
    ? { past: false, label: `${months} mes${months > 1 ? "es" : ""} y ${days} día${days !== 1 ? "s" : ""}` }
    : { past: false, label: `${totalDays} día${totalDays !== 1 ? "s" : ""}` };
}
const calcProgress = (phases: ProjectPhase[]) =>
  phases.length ? Math.round((phases.filter((p) => p.status === "completed").length / phases.length) * 100) : 0;

export function ContractDashboard({ match, role = "pyme" }: { match: ProjectMatch; role?: "pyme" | "advisor" }) {
  const c = match.contract;
  const title = role === "advisor" ? `Proyecto Activo · ${match.advisor.name}` : "Mi Contrato Activo";
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto" }}>
      <div style={{ marginBottom: 16 }}>
        <div className="eyebrow">Dashboard de seguimiento</div>
        <h2 className="display" style={{ fontSize: 34, lineHeight: 1.1, marginTop: 4 }}>{title}</h2>
      </div>

      <ContractBanner match={match} role={role} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 284px", gap: 20, alignItems: "start" }}>
        {/* main column */}
        <div style={{ display: "grid", gap: 20 }}>
          <Panel>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div className="eyebrow">Plan de acción · fases</div>
              <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>
                {c.phases.filter((p) => p.status === "completed").length}/{c.phases.length} completadas
              </span>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {c.phases.map((phase, i) => <PhaseCard key={phase.id} phase={phase} idx={i} />)}
            </div>
          </Panel>

          <KPISection kpis={c.kpis} />
        </div>

        {/* sidebar */}
        <div style={{ display: "grid", gap: 16 }}>
          <TimePanel start={c.start} deadline={c.deadline} pct={calcProgress(c.phases)} />
          <FinancialsPanel budget={c.budget} retainer={c.retainer} durationMonths={c.durationMonths} advisorResultPct={c.advisorResultPct} />
          <DeliverablesPanel deliverables={c.deliverables} />
          <Panel>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Metas contractuales</div>
            <div style={{ display: "grid", gap: 8 }}>
              {c.metrics.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: "var(--r-sm)", background: "var(--paper)", border: "1.5px solid var(--ink)", gap: 10 }}>
                  <span style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.35, flex: 1 }}>{m.label}</span>
                  <Tag>{m.target}</Tag>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

// ── Progress ring ──────────────────────────────────────────────────────────────
function ProgressRing({ pct, size = 84, stroke = 8 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--paper-2)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dashoffset .7s ease" }} />
      <text x="50%" y="44%" dominantBaseline="middle" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight={700} fontSize={size * 0.22} fill="var(--ink)">{pct}%</text>
      <text x="50%" y="67%" dominantBaseline="middle" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={size * 0.13} fill="var(--ink-soft)">avance</text>
    </svg>
  );
}

// ── Contract banner ──────────────────────────────────────────────────────────────
function ContractBanner({ match, role }: { match: ProjectMatch; role: "pyme" | "advisor" }) {
  const c = match.contract;
  const pct = calcProgress(c.phases);
  const tr = timeRemaining(c.deadline);
  const completed = c.phases.filter((p) => p.status === "completed").length;
  return (
    <div style={{ background: "var(--surface)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-xl)", boxShadow: "var(--sh-card)", overflow: "hidden", marginBottom: 20 }}>
      <div style={{ height: 5, background: "var(--accent)" }} />
      <div style={{ padding: "18px 22px", display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flex: "1 1 180px", minWidth: 0 }}>
          <Avatar text={match.advisor.monogram} accent={match.advisor.accent} size={52} square />
          <div style={{ minWidth: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 2 }}>{role === "advisor" ? "PYME" : "Advisor"}</div>
            <h3 style={{ fontSize: 18, lineHeight: 1.15 }}>{match.advisor.name}</h3>
            <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>{match.advisor.role}</div>
          </div>
        </div>
        <div style={{ width: 1, height: 56, background: "rgba(33,27,18,.12)" }} />
        <ProgressRing pct={pct} />
        <div style={{ width: 1, height: 56, background: "rgba(33,27,18,.12)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,auto)", gap: "10px 28px", flex: "2 1 260px" }}>
          <Stat label="Estado"><Tag solid>Activo</Tag></Stat>
          <Stat label="Duración"><b style={{ fontSize: 14 }}>{c.durationMonths} meses</b></Stat>
          <Stat label="Fases"><b style={{ fontSize: 14 }}>{completed}/{c.phases.length} completadas</b></Stat>
          <Stat label="Inicio"><span className="font-mono" style={{ fontSize: 12, fontWeight: 600 }}>{c.start}</span></Stat>
          <Stat label="Vencimiento"><span className="font-mono" style={{ fontSize: 12, fontWeight: 600 }}>{c.deadline}</span></Stat>
          <Stat label="Tiempo restante"><span className="font-mono" style={{ fontSize: 12, fontWeight: 700, color: tr.past ? "var(--danger)" : "var(--ink)" }}>{tr.label}</span></Stat>
        </div>
      </div>
      <div style={{ padding: "11px 22px", borderTop: "1.5px dashed var(--ink-faint)", background: "var(--paper)", display: "flex", gap: 10, alignItems: "baseline" }}>
        <span className="eyebrow" style={{ flexShrink: 0 }}>Objetivo</span>
        <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.45 }}>{c.objective}</p>
      </div>
    </div>
  );
}

// ── Phase card (collapsible) ───────────────────────────────────────────────────
function PhaseCard({ phase, idx }: { phase: ProjectPhase; idx: number }) {
  const [open, setOpen] = useState(phase.status === "active");
  const done = phase.objectives.filter((o) => o.done).length;
  const stepBg = { completed: "var(--success)", active: "var(--accent)", pending: "var(--ink-faint)" }[phase.status];
  const statusLabel = { completed: "Completada", active: "Activa", pending: "Pendiente" }[phase.status];
  return (
    <div style={{ border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: phase.status === "active" ? "var(--sh-pop)" : "none" }}>
      <button onClick={() => setOpen((v) => !v)} style={{ width: "100%", textAlign: "left", border: "none", cursor: "pointer", padding: "13px 16px", background: phase.status === "active" ? "color-mix(in srgb, var(--accent) 6%, var(--surface))" : "var(--surface)", display: "flex", alignItems: "center", gap: 12, borderBottom: open ? "var(--bd) solid var(--ink)" : "none" }}>
        <div className="font-mono" style={{ width: 32, height: 32, borderRadius: 8, border: "var(--bd) solid var(--ink)", background: stepBg, color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
          {phase.status === "completed" ? "✓" : idx + 1}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{phase.name}</span>
            <Tag solid={phase.status !== "pending"}>{statusLabel}</Tag>
          </div>
          <div className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 3 }}>
            {done}/{phase.objectives.length} objetivos · {phase.report ? "✓ Reporte enviado" : "Reporte pendiente"}
          </div>
        </div>
        <span style={{ color: "var(--ink-soft)", fontSize: 14, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s ease" }}>▾</span>
      </button>
      {open && (
        <div style={{ background: "var(--paper)", padding: "14px 16px", display: "grid", gap: 14 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>{phase.status === "completed" ? "Objetivos cumplidos" : "Objetivos de la fase"}</div>
            <div style={{ display: "grid", gap: 7 }}>
              {phase.objectives.map((obj, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: "var(--r-sm)", background: obj.done ? "color-mix(in srgb, var(--success) 8%, #fff)" : "var(--surface)", border: `1.5px solid ${obj.done ? "var(--success)" : "var(--ink)"}` }}>
                  <span style={{ fontSize: 16, color: obj.done ? "var(--success)" : "var(--ink-faint)", flexShrink: 0 }}>{obj.done ? "✓" : "○"}</span>
                  <span style={{ fontSize: 13, flex: 1, color: obj.done ? "var(--ink)" : "var(--ink-soft)" }}>{obj.label}</span>
                </div>
              ))}
            </div>
          </div>
          {phase.report ? (
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Reporte oficial</div>
              <div style={{ background: "var(--surface)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
                <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="font-mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em" }}>REPORTE DEL ADVISOR</span>
                  <span className="font-mono" style={{ fontSize: 10, opacity: 0.7 }}>{phase.report.submittedAt}</span>
                </div>
                <div style={{ padding: "13px 14px", display: "grid", gap: 12 }}>
                  <ReportField label="Acciones realizadas" text={phase.report.description} />
                  {phase.report.results && <ReportField label="Resultados obtenidos" text={phase.report.results} />}
                  {phase.report.observations && <ReportField label="Observaciones" text={phase.report.observations} />}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: "8px 12px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1.5px dashed var(--ink-faint)" }}>
              <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                {phase.status === "pending" ? "Fase aún no iniciada." : "El advisor aún no envió el reporte de esta fase."}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Panels ───────────────────────────────────────────────────────────────────────
function KPISection({ kpis }: { kpis: Kpi[] }) {
  return (
    <Panel>
      <div className="eyebrow" style={{ marginBottom: 12 }}>Métricas de rendimiento (KPIs)</div>
      <div style={{ border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 110px 140px", background: "var(--ink)", padding: "9px 14px" }}>
          {["Métrica", "Antes", "Después"].map((h) => (
            <span key={h} className="font-mono" style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--paper)" }}>{h}</span>
          ))}
        </div>
        {kpis.map((k, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 110px 140px", padding: "10px 14px", borderTop: i ? "1.5px solid var(--ink)" : "none", alignItems: "center" }}>
            <span style={{ fontSize: 13.5, fontWeight: 600 }}>{k.label}</span>
            <span className="font-mono" style={{ fontSize: 13, color: "var(--ink-soft)" }}>{k.before}</span>
            <span className="font-mono" style={{ fontSize: 14, fontWeight: 700, color: k.positive !== false ? "var(--success)" : "var(--danger)" }}>
              {k.after}{k.after !== "—" ? (k.positive !== false ? " ▲" : " ▼") : ""}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function FinancialsPanel({ budget, retainer, durationMonths, advisorResultPct }: { budget: number; retainer: number; durationMonths: number; advisorResultPct: number }) {
  const commission = commissionForMonths(durationMonths);
  const commissionAmt = Math.round((budget * commission) / 100);
  const retainerTotal = retainer * durationMonths;
  const rows: [string, string, string][] = [
    ["Comisión PymeBoost", commission + "%", crc(commissionAmt)],
    ["Retainer del advisor", durationMonths + "m", crc(retainerTotal)],
    ["Ganancia advisor (resultados)", advisorResultPct + "%", "del incremento verificado"],
  ];
  return (
    <Panel>
      <div className="eyebrow" style={{ marginBottom: 10 }}>Distribución financiera</div>
      <div style={{ border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
        {rows.map(([label, tag, value], i) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderTop: i ? "1.5px solid var(--ink)" : "none", gap: 10 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{label}</div>
              <div className="font-mono" style={{ fontSize: 10, color: "var(--ink-soft)", marginTop: 1 }}>{value}</div>
            </div>
            <Tag solid>{tag}</Tag>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function DeliverablesPanel({ deliverables }: { deliverables: Deliverable[] }) {
  const done = deliverables.filter((d) => d.done).length;
  return (
    <Panel>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div className="eyebrow">Cumplimiento de entregables</div>
        <Tag>{done}/{deliverables.length}</Tag>
      </div>
      <div style={{ display: "grid", gap: 7 }}>
        {deliverables.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: "var(--r-sm)", background: d.done ? "color-mix(in srgb, var(--success) 8%, #fff)" : "var(--paper)", border: `1.5px solid ${d.done ? "var(--success)" : "rgba(33,27,18,.18)"}` }}>
            <span style={{ fontSize: 14, color: d.done ? "var(--success)" : "var(--ink-faint)", flexShrink: 0 }}>{d.done ? "✓" : "○"}</span>
            <span style={{ fontSize: 12.5, flex: 1, lineHeight: 1.35, color: d.done ? "var(--ink)" : "var(--ink-soft)" }}>{d.label}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function TimePanel({ start, deadline, pct }: { start: string; deadline: string; pct: number }) {
  const tr = timeRemaining(deadline);
  return (
    <Panel>
      <div className="eyebrow" style={{ marginBottom: 10 }}>Tiempo restante</div>
      <div style={{ textAlign: "center", padding: "4px 0 12px" }}>
        <div className="font-mono" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.2, color: tr.past ? "var(--danger)" : "var(--ink)" }}>{tr.label}</div>
        <div className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 5 }}>{start} → {deadline}</div>
      </div>
      <Meter label="Avance del proyecto" value={pct} />
    </Panel>
  );
}

// ── Small helpers ──────────────────────────────────────────────────────────────
function Panel({ children }: { children: ReactNode }) {
  return <div style={{ background: "var(--surface)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-card)", padding: 16 }}>{children}</div>;
}
function Stat({ label, children }: { label: string; children: ReactNode }) {
  return <div><div className="eyebrow" style={{ marginBottom: 3 }}>{label}</div>{children}</div>;
}
function Tag({ children, solid }: { children: ReactNode; solid?: boolean }) {
  return (
    <span className="font-mono" style={{ display: "inline-flex", alignItems: "center", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", borderRadius: 999, padding: "2px 9px", border: "1.5px solid var(--ink)", background: solid ? "var(--accent)" : "var(--paper-2)", color: solid ? "#fff" : "var(--ink)" }}>{children}</span>
  );
}
function ReportField({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 3 }}>{label}</div>
      <p style={{ margin: 0, fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}
