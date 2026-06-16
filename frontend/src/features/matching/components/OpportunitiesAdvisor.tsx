"use client";
// Advisor "Oportunidades" view — ported from prototype/app/app.jsx (OpportunitiesAdvisor).
import { useRouter } from "next/navigation";

import { Avatar } from "@/shared/components/ui/Avatar";
import { CompatDots } from "@/shared/components/ui/CompatDots";
import { OPPORTUNITIES } from "../data/opportunities";

export function OpportunitiesAdvisor() {
  const router = useRouter();
  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <div className="eyebrow">Generadas por PymeBoost</div>
        <h2 className="display" style={{ fontSize: 32, lineHeight: 1, marginTop: 4 }}>Oportunidades para vos</h2>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 6, maxWidth: 560 }}>
          No buscás proyectos: el motor de IA te conecta con PYMEs según tu experiencia. Abrí un chat para
          presentar tu propuesta.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
        {OPPORTUNITIES.map((o) => (
          <div key={o.id} style={{ background: "var(--surface)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-card)", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <Avatar text={o.monogram} accent={o.accent} size={46} square />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: 15.5 }}>{o.pymeName}</h4>
                <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>{o.industry}</div>
              </div>
              <Tag tone={o.status === "Negociando" ? "warning" : "accent"}>{o.status}</Tag>
            </div>
            <div style={{ background: "var(--paper)", border: "1.5px solid var(--ink)", borderRadius: "var(--r-md)", padding: "10px 12px" }}>
              <div className="eyebrow" style={{ marginBottom: 3 }}>Necesidad</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{o.need}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <CompatDots value={o.compat} label="Match" />
              <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>{o.when}</span>
            </div>
            <button
              onClick={() => router.push("/messaging")}
              className="font-mono"
              style={{ width: "100%", padding: "9px", borderRadius: "var(--r-md)", border: "var(--bd) solid var(--ink)", boxShadow: "var(--sh-pop)", background: "var(--accent)", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
            >
              ✉ Abrir chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tag({ children, tone }: { children: React.ReactNode; tone: "accent" | "warning" }) {
  const bg = tone === "warning" ? "color-mix(in srgb, var(--warning) 16%, #fff)" : "color-mix(in srgb, var(--accent) 14%, #fff)";
  const fg = tone === "warning" ? "var(--warning)" : "var(--accent-deep)";
  return (
    <span className="font-mono" style={{ flexShrink: 0, fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", borderRadius: 999, padding: "2px 9px", border: "1.5px solid var(--ink)", background: bg, color: fg }}>
      {children}
    </span>
  );
}
