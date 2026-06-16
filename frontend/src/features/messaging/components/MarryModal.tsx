"use client";
// Marry the Prospect confirmation modal — ported from prototype/app/messaging.jsx.
import { CSSProperties } from "react";

import { commissionForMonths, Contract } from "@/features/contracts/data/contractModel";
import { crc } from "@/lib/format";
import { Conversation } from "../data/conversations";

const overlayStyle: CSSProperties = {
  position: "fixed", inset: 0, background: "rgba(33,27,18,.42)", backdropFilter: "blur(2px)",
  display: "grid", placeItems: "center", zIndex: 120, padding: 20,
};

interface MarryModalProps {
  match: Conversation;
  contract: Contract;
  onConfirm: () => void;
  onClose: () => void;
}

export function MarryModal({ match, contract, onConfirm, onClose }: MarryModalProps) {
  const commission = commissionForMonths(contract.durationMonths);
  const rows: [string, string][] = [
    ["Presupuesto base", crc(contract.budget)],
    ["Retainer / mes", crc(contract.retainer)],
    ["Duración", contract.durationMonths + " mes(es)"],
    ["Inicio", contract.start || "—"],
    ["Vencimiento", contract.deadline || "—"],
    ["Comisión PymeBoost", commission + "%"],
    ["Ganancia advisor (4m)", contract.advisorResultPct + "% del incremento"],
  ];

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(440px,94vw)", background: "var(--surface)", border: "2px solid var(--ink)", borderRadius: "var(--r-xl)", boxShadow: "7px 8px 0 rgba(33,27,18,.4)", overflow: "hidden" }}>
        <div style={{ background: "var(--accent)", color: "#fff", padding: 22, textAlign: "center", borderBottom: "2px solid var(--ink)" }}>
          <div style={{ fontSize: 40 }}>💍</div>
          <h3 className="display" style={{ fontSize: 30, marginTop: 6 }}>Marry the Prospect</h3>
          <p className="font-mono" style={{ fontSize: 12, opacity: 0.92, marginTop: 4 }}>Formalizar contrato con {match.advisor.name}</p>
        </div>
        <div style={{ padding: 22 }}>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, textAlign: "center" }}>
            Al activar el contrato se inicia el proceso. El advisor recibirá el <b style={{ color: "var(--ink)" }}>{contract.advisorResultPct}% sobre el incremento verificado</b> durante <b style={{ color: "var(--ink)" }}>4 meses</b> si el proceso se implementa exitosamente. Una PYME solo puede tener <b style={{ color: "var(--ink)" }}>un contrato activo</b> a la vez.
          </p>
          <div style={{ margin: "16px 0", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
            {rows.map(([k, v], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 13px", borderTop: i ? "1.5px solid var(--ink)" : "none" }}>
                <span className="font-mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>{k}</span>
                <span className="font-mono" style={{ fontSize: 12.5, fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gap: 9 }}>
            <button onClick={onConfirm} className="font-mono" style={{ width: "100%", padding: "13px", borderRadius: "var(--r-md)", border: "var(--bd) solid var(--ink)", boxShadow: "var(--sh-pop)", cursor: "pointer", fontWeight: 600, fontSize: 15.5, background: "var(--accent)", color: "#fff" }}>
              💍 Aceptar y activar contrato
            </button>
            <button onClick={onClose} className="font-mono" style={{ width: "100%", padding: "11px", borderRadius: "var(--r-md)", border: "var(--bd) solid transparent", cursor: "pointer", fontWeight: 600, fontSize: 14, background: "transparent", color: "var(--ink-soft)" }}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
