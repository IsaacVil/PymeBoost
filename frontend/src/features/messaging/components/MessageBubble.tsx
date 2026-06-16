"use client";
// Chat message bubble — ported from prototype/app/messaging.jsx.
// Handles plain text, system messages (blocked / married / advisor-decision) and
// embedded contract proposals.
import { commissionForMonths, Contract } from "@/features/contracts/data/contractModel";
import { crc } from "@/lib/format";
import { Message } from "../data/conversations";

interface MessageBubbleProps {
  m: Message;
  mine: boolean;
  onViewDetails?: (c: Contract) => void;
}

export function MessageBubble({ m, mine, onViewDetails }: MessageBubbleProps) {
  if (m.from === "system" && m.kind === "blocked") {
    return (
      <div style={{ alignSelf: "center", maxWidth: "82%", background: "#FBE3E3", border: "1.5px solid var(--danger)", borderRadius: "var(--r-md)", padding: "9px 13px", display: "flex", gap: 8, alignItems: "flex-start" }}>
        <span style={{ fontSize: 15 }}>🚫</span>
        <span className="font-mono" style={{ fontSize: 11.5, color: "#9D1414", lineHeight: 1.4, fontWeight: 600 }}>{m.text}</span>
      </div>
    );
  }

  if (m.from === "system" && m.kind === "married" && m.contract) {
    return (
      <div style={{ alignSelf: "center", maxWidth: "90%", background: "var(--surface)", border: "2px solid var(--success)", borderRadius: "var(--r-md)", padding: "14px 16px", textAlign: "center", boxShadow: "var(--sh-card)" }}>
        <div style={{ fontSize: 24 }}>💍</div>
        <div className="display" style={{ fontSize: 21, marginTop: 2 }}>¡Married the Prospect!</div>
        <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 4 }}>
          Contrato formalizado · {crc(m.contract.budget)} · {m.contract.durationMonths} mes(es) · comisión {commissionForMonths(m.contract.durationMonths)}%
        </div>
      </div>
    );
  }

  if (m.from === "system" && m.kind === "advisor-decision") {
    const ok = m.decision === "accepted";
    return (
      <div style={{ alignSelf: "center", maxWidth: "88%", background: "var(--surface)", border: `2px solid ${ok ? "var(--success)" : "var(--danger)"}`, borderRadius: "var(--r-md)", padding: "10px 14px", textAlign: "center", boxShadow: "var(--sh-pop)" }}>
        <div className="font-mono" style={{ fontSize: 11.5, fontWeight: 700, color: ok ? "#0F7A37" : "#9D1414", textTransform: "uppercase", letterSpacing: ".06em" }}>
          {ok ? "✓ Propuesta aceptada por el advisor" : "✕ Propuesta rechazada por el advisor"}
        </div>
        <div className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 3 }}>
          {ok ? "La PYME puede formalizar el contrato con Marry the Prospect." : "La PYME puede ajustar y reenviar una nueva propuesta."}
        </div>
      </div>
    );
  }

  if (m.kind === "proposal" && m.contract) {
    const c = m.contract;
    return (
      <div style={{ alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "78%" }}>
        <div style={{ background: "var(--surface)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", boxShadow: "var(--sh-pop)", overflow: "hidden" }}>
          <div style={{ background: "var(--accent)", color: "#fff", padding: "7px 12px", display: "flex", alignItems: "center", gap: 7 }}>
            <span>📄</span>
            <span className="font-mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>Propuesta de contrato</span>
          </div>
          <div style={{ padding: "11px 13px", display: "grid", gap: 5 }}>
            {([["Presupuesto", crc(c.budget)], ["Retainer/mes", crc(c.retainer)], ["Duración", c.durationMonths + "m"], ["Comisión", commissionForMonths(c.durationMonths) + "%"]] as [string, string][]).map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 18 }}>
                <span className="font-mono" style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{k}</span>
                <span className="font-mono" style={{ fontSize: 11.5, fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "0 13px 12px" }}>
            <button
              onClick={() => onViewDetails?.(c)}
              className="font-mono"
              style={{ width: "100%", padding: "7px", borderRadius: "var(--r-sm)", border: "var(--bd) solid var(--ink)", boxShadow: "var(--sh-pop)", background: "var(--surface)", color: "var(--ink)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              Ver detalles
            </button>
          </div>
          {m.decided && (
            <div style={{ padding: "0 13px 11px" }}>
              <span className="font-mono" style={{ display: "inline-block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", borderRadius: 999, padding: "3px 9px", color: "#fff", background: m.decided === "accepted" ? "var(--success)" : "var(--danger)" }}>
                {m.decided === "accepted" ? "✓ Aceptada" : "✕ Rechazada"}
              </span>
            </div>
          )}
        </div>
        <div className="font-mono" style={{ fontSize: 10, color: "var(--ink-faint)", marginTop: 3, textAlign: mine ? "right" : "left" }}>{m.t}</div>
      </div>
    );
  }

  // plain text
  return (
    <div style={{ alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "76%" }}>
      <div style={{
        background: mine ? "var(--accent)" : "var(--surface)", color: mine ? "#fff" : "var(--ink)",
        border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-lg)",
        borderBottomRightRadius: mine ? 4 : "var(--r-lg)", borderBottomLeftRadius: mine ? "var(--r-lg)" : 4,
        padding: "9px 13px", fontSize: 13.5, lineHeight: 1.45, boxShadow: "var(--sh-pop)",
      }}>
        {m.text}
      </div>
      <div className="font-mono" style={{ fontSize: 10, color: "var(--ink-faint)", marginTop: 3, textAlign: mine ? "right" : "left" }}>{m.t}</div>
    </div>
  );
}
