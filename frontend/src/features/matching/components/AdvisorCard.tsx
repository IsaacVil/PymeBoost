"use client";
// Tinder-style advisor card (Classic variant), ported from prototype/app/matching.jsx.
import { Avatar } from "@/shared/components/ui/Avatar";
import { Stars } from "@/shared/components/ui/Stars";
import { crc } from "@/lib/format";
import { DeckAdvisor, standardPricing } from "../data/advisors";

export function AdvisorCard({ a }: { a: DeckAdvisor }) {
  const pr = standardPricing(a);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <Avatar text={a.monogram} accent={a.accent} size={58} square />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: 20, letterSpacing: "-.02em" }}>{a.name}</h3>
          <div className="font-mono" style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 3, fontWeight: 600 }}>
            {a.role}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
            <Stars value={a.rating} size={13} showNum />
            <span className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-faint)" }}>
              · {a.reviews} reseñas · {a.years} años
            </span>
          </div>
        </div>
      </div>

      {/* Compatibilidad asesor–PYME */}
      <div style={{ marginTop: 13, paddingTop: 12, borderTop: "1.5px dashed var(--ink-faint)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div>
          <div className="eyebrow">Compatibilidad asesor–PYME</div>
          <div className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 3 }}>
            según tu proceso: <b style={{ color: "var(--ink)" }}>{a.process}</b>
          </div>
        </div>
        <Stars value={a.compat} size={18} />
      </div>

      {/* Objetivo IA */}
      <div style={{ marginTop: 12, border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", padding: "10px 12px", background: "color-mix(in srgb, var(--accent) 8%, #fff)" }}>
        <div className="eyebrow" style={{ marginBottom: 5 }}>
          Objetivo <span style={{ color: "var(--accent-deep)" }}>✦ IA</span>
        </div>
        <p style={{ fontSize: 12.5, lineHeight: 1.45, margin: 0 }}>{a.aiObjective}</p>
      </div>

      {/* Métrica de éxito */}
      <div style={{ marginTop: 12, border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1, padding: "9px 12px" }}>
          <div className="eyebrow">Métrica de éxito</div>
          <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{a.successMetric.label}</div>
          <div className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 2 }}>
            {a.successMetric.from} → {a.successMetric.to}
          </div>
        </div>
        <div style={{ width: 90, textAlign: "center", padding: "10px 8px", background: "var(--accent)", color: "#fff", alignSelf: "stretch", display: "grid", placeItems: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 19, lineHeight: 1 }}>{a.successMetric.delta}</div>
        </div>
      </div>

      {/* Ganancia advisor · resultados */}
      <div style={{ marginTop: 12, border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-md)", padding: "10px 12px", background: "color-mix(in srgb, var(--accent) 14%, #fff)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ minWidth: 0 }}>
          <div className="eyebrow">
            Ganancia advisor · resultados <span style={{ color: "var(--accent-deep)" }}>✦ IA</span>
          </div>
          <div className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 3, lineHeight: 1.35 }}>
            {a.advisorGain.basis} · ≈ {crc(a.advisorGain.est)} en {a.advisorGain.months} meses
          </div>
        </div>
        <div style={{ fontWeight: 700, fontSize: 27, color: "var(--accent-deep)", lineHeight: 1, flexShrink: 0 }}>
          {a.advisorGain.pct}%
        </div>
      </div>

      {/* División de precios · plan estándar */}
      <div style={{ marginTop: "auto", paddingTop: 13 }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>División de precios · plan estándar</div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, background: "color-mix(in srgb, var(--accent) 12%, #fff)", border: "1.5px solid var(--ink)", borderRadius: "var(--r-md)", padding: "9px 12px" }}>
            <div className="eyebrow">PymeBoost · 3%</div>
            <div style={{ fontWeight: 700, fontSize: 17, color: "var(--accent-deep)", marginTop: 2 }}>{crc(pr.commissionAmt)}</div>
            <div className="font-mono" style={{ fontSize: 9.5, color: "var(--ink-soft)" }}>de {crc(pr.budget)}</div>
          </div>
          <div style={{ flex: 1, background: "var(--paper)", border: "1.5px solid var(--ink)", borderRadius: "var(--r-md)", padding: "9px 12px" }}>
            <div className="eyebrow">Retainer advisor</div>
            <div style={{ fontWeight: 700, fontSize: 17, marginTop: 2 }}>
              {crc(pr.retainer)}
              <span className="font-mono" style={{ fontSize: 10, fontWeight: 600 }}> /mes</span>
            </div>
            <div className="font-mono" style={{ fontSize: 9.5, color: "var(--ink-soft)" }}>fijo bajo · upside por resultados</div>
          </div>
        </div>
      </div>
    </div>
  );
}
