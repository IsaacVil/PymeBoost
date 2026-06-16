"use client";
// PymeBoost informational landing sections — ported from prototype/app/auth.jsx
// (LandingFeatures, LandingProcess, LandingPricing, LandingCTA + footer).
import { ReactNode } from "react";

// ── Características ────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: "✦", title: "IA de Recomendación", desc: "Agentes de IA analizan tu empresa e industria para sugerir advisors adecuados, procesos de optimización, planes de acción y métricas de seguimiento." },
  { icon: "✓", title: "Verificación MEIC", desc: "Validamos las empresas usando la lista oficial del MEIC de Costa Rica. Los asesores pasan verificación de identidad, currículum y certificaciones." },
  { icon: "★", title: "Sistema de Reputación", desc: "Ratings y reseñas verificadas de 1 a 5 estrellas post-contrato. Calidad garantizada por resultados reales." },
  { icon: "◆", title: "Contratos Estructurados", desc: "Contratos digitales con presupuesto de implementación, retainer mensual, plan de acción de IA y comisiones transparentes por duración." },
  { icon: "✉", title: "Chat Interno Seguro", desc: "Toda la comunicación ocurre dentro de la plataforma. Sin intercambio de contactos externos. PymeBoost monitorea cada conversación." },
  { icon: "▣", title: "Seguimiento Continuo", desc: "Dashboard con fases completadas, métricas de rendimiento, cronograma, historial de pagos y reportes exportables en PDF y Excel." },
];

export function LandingFeatures() {
  return (
    <section style={{ padding: "72px 48px", background: "var(--surface)", borderTop: "var(--bd) solid var(--ink)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionHead eyebrow="Características" title="Todo lo que tu PYME necesita para crecer" desc="Un ecosistema completo con IA, verificación y seguimiento continuo." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ background: "var(--surface)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-xl)", boxShadow: "var(--sh-card)", padding: 24, display: "grid", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: "var(--r-md)", background: "var(--ink)", color: "var(--paper)", display: "grid", placeItems: "center", fontSize: 18, border: "var(--bd) solid var(--ink)", boxShadow: "var(--sh-pop)" }}>{f.icon}</div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.55, margin: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Proceso ───────────────────────────────────────────────────────────────────
const STEPS = [
  { n: "01", title: "Registrá tu empresa", desc: "Validamos tu negocio mediante la lista oficial del MEIC de Costa Rica." },
  { n: "02", title: "Definí tus necesidades", desc: "La IA de PymeBoost analiza tu industria, objetivos y procesos a optimizar." },
  { n: "03", title: "Recibí recomendaciones", desc: "PymeBoost sugiere los advisors más adecuados según tu presupuesto y contexto." },
  { n: "04", title: "Firmá el contrato", desc: "La IA genera un plan de acción de 5+ pasos que ambas partes pueden personalizar." },
  { n: "05", title: "Implementá y crecé", desc: "El advisor trabaja con seguimiento continuo. PymeBoost supervisa el cumplimiento." },
  { n: "06", title: "Calificá la experiencia", desc: "Al finalizar, las PYMEs califican al advisor con estrellas y comentarios." },
];

export function LandingProcess() {
  return (
    <section style={{ padding: "72px 48px", background: "var(--paper)", borderTop: "var(--bd) solid var(--ink)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionHead eyebrow="Proceso" title="¿Cómo funciona?" desc="De la necesidad al resultado en 6 pasos con IA y seguimiento real." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {STEPS.map((s) => (
            <div key={s.n} style={{ background: "var(--surface)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-xl)", boxShadow: "var(--sh-card)", padding: 24, position: "relative", overflow: "hidden" }}>
              <div className="font-mono" style={{ position: "absolute", top: 10, right: 16, fontWeight: 800, fontSize: 52, color: "rgba(33,27,18,.05)", lineHeight: 1, userSelect: "none" }}>{s.n}</div>
              <div className="font-mono" style={{ width: 36, height: 36, borderRadius: 10, background: "var(--accent)", color: "#fff", border: "var(--bd) solid var(--ink)", boxShadow: "var(--sh-pop)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14, marginBottom: 14 }}>{s.n}</div>
              <h3 style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Precios ───────────────────────────────────────────────────────────────────
const TIERS = [
  { label: "Estándar", pct: "3%", months: "1 mes" },
  { label: "Media", pct: "5%", months: "3 meses" },
  { label: "Alta", pct: "7%", months: "6 meses" },
  { label: "Personalizada", pct: "3%+", months: "Flexible" },
];
const PYME_FEATURES = [
  "Perfil verificado MEIC", "Búsqueda y contacto con advisors", "Recomendaciones por IA",
  "Contratos con plan de acción IA", "Dashboard de seguimiento", "Reportes PDF y Excel",
  "Chat interno seguro", "+ comisión según duración (3-7%)",
];
const ADV_FEATURES = [
  "Verificación de identidad y currículum", "Perfil profesional en la plataforma",
  "Ser recomendado por IA a PYMEs", "Gestión de contratos y pagos",
  "Sistema de reputación y reseñas", "Retainer mensual garantizado",
  "Chat interno seguro", "Dashboard de proyectos activos",
];

export function LandingPricing({ onSignup }: { onSignup: (role: "pyme" | "advisor") => void }) {
  return (
    <section style={{ padding: "72px 48px", background: "var(--surface)", borderTop: "var(--bd) solid var(--ink)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <SectionHead eyebrow="Precios" title="Modelo transparente y flexible" desc="Membresías accesibles + comisiones por resultados reales." />

        <div style={{ marginBottom: 36 }}>
          <div className="eyebrow" style={{ textAlign: "center", marginBottom: 14 }}>Comisiones por duración del contrato</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {TIERS.map((t) => (
              <div key={t.label} style={{ border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-lg)", padding: "16px 14px", textAlign: "center", background: "var(--paper)", boxShadow: "var(--sh-card)" }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>{t.label}</div>
                <div className="font-mono" style={{ fontSize: 30, fontWeight: 800, color: "var(--accent-deep)", lineHeight: 1 }}>{t.pct}</div>
                <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 6 }}>{t.months}</div>
              </div>
            ))}
          </div>
          <div className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-faint)", textAlign: "center", marginTop: 10 }}>
            Contratos personalizados: inician en 3% + 1% por cada mes adicional
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <PlanCard
            highlighted header="PARA PYMES" price="$25" features={PYME_FEATURES}
            cta="→ Empezar como PYME" onClick={() => onSignup("pyme")}
          />
          <PlanCard
            header="PARA ADVISORS" price="$15" features={ADV_FEATURES}
            cta="→ Registrarme como Advisor" onClick={() => onSignup("advisor")}
          />
        </div>
      </div>
    </section>
  );
}

function PlanCard({ highlighted, header, price, features, cta, onClick }: {
  highlighted?: boolean; header: string; price: string; features: string[]; cta: string; onClick: () => void;
}) {
  return (
    <div style={{ background: "var(--surface)", border: highlighted ? "2px solid var(--accent)" : "var(--bd) solid var(--ink)", borderRadius: "var(--r-xl)", boxShadow: "var(--sh-card)", overflow: "hidden" }}>
      <div className="font-mono" style={{ background: highlighted ? "var(--accent)" : "var(--paper)", color: highlighted ? "#fff" : "var(--ink-soft)", borderBottom: highlighted ? "none" : "var(--bd) solid var(--ink)", textAlign: "center", padding: 5, fontSize: 11, fontWeight: 700, letterSpacing: ".08em" }}>{header}</div>
      <div style={{ padding: "28px 28px 24px" }}>
        <div style={{ marginBottom: 20 }}>
          <span className="display" style={{ fontSize: 48, lineHeight: 1 }}>{price}</span>
          <span className="font-mono" style={{ fontSize: 14, color: "var(--ink-soft)" }}>/mes</span>
          <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4 }}>Membresía mensual</div>
        </div>
        <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
          {features.map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13.5, lineHeight: 1.4 }}>
              <span style={{ color: "var(--success)", flexShrink: 0, marginTop: 1 }}>✓</span>
              <span style={{ color: "var(--ink-soft)" }}>{f}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onClick}
          className="font-mono"
          style={{
            width: "100%", padding: "13px", borderRadius: "var(--r-md)", cursor: "pointer", fontWeight: 600, fontSize: 15.5,
            border: "var(--bd) solid var(--ink)", boxShadow: "var(--sh-pop)",
            background: highlighted ? "var(--accent)" : "var(--surface)", color: highlighted ? "#fff" : "var(--ink)",
          }}
        >
          {cta}
        </button>
      </div>
    </div>
  );
}

// ── CTA + footer ────────────────────────────────────────────────────────────────
const BADGES = ["✓ Verificado por MEIC", "✦ IA integrada", "🔒 Comunicación segura", "+285 usuarios activos"];

export function LandingCTA({ onSignup }: { onSignup: (role: "pyme" | "advisor") => void }) {
  return (
    <>
      <section style={{ padding: "72px 48px", background: "var(--ink)", color: "var(--paper)", borderTop: "var(--bd) solid var(--ink)", backgroundImage: "radial-gradient(rgba(250,245,236,.06) 1px, transparent 1.4px)", backgroundSize: "22px 22px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "clamp(26px,4vw,44px)", lineHeight: 1.12 }}>
            El ecosistema de confianza para las PYMEs costarricenses
          </h2>
          <p style={{ fontSize: 15, color: "rgba(250,245,236,.7)", marginTop: 16, lineHeight: 1.55, maxWidth: 520, marginInline: "auto" }}>
            Verificación oficial, IA integrada, contratos transparentes y resultados medibles.
          </p>
          <div style={{ marginTop: 32 }}>
            <button
              onClick={() => onSignup("pyme")}
              className="font-mono"
              style={{ padding: "13px 22px", borderRadius: "var(--r-md)", cursor: "pointer", fontWeight: 600, fontSize: 15.5, border: "var(--bd) solid var(--ink)", boxShadow: "var(--sh-pop)", background: "var(--accent)", color: "#fff" }}
            >
              → Iniciar como PYME — Primer mes gratis
            </button>
          </div>
          <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {BADGES.map((b) => (
              <span key={b} className="font-mono" style={{ fontSize: 12, color: "rgba(250,245,236,.55)", fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>
      <footer style={{ background: "var(--ink)", borderTop: "1.5px solid rgba(250,245,236,.1)", padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 28, height: 28, borderRadius: "var(--r-sm)", background: "var(--paper)", display: "grid", placeItems: "center" }}>
            <span className="display" style={{ fontSize: 18, lineHeight: 1, color: "var(--ink)", marginTop: 2 }}>P</span>
          </div>
          <span className="display" style={{ fontSize: 20, color: "var(--paper)" }}>Pyme<span style={{ color: "var(--accent)" }}>Boost</span></span>
        </div>
        <span className="font-mono" style={{ fontSize: 11, color: "rgba(250,245,236,.38)" }}>© 2026 PymeBoost · Costa Rica · Todos los derechos reservados</span>
      </footer>
    </>
  );
}

function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="display" style={{ fontSize: "clamp(28px,3.8vw,44px)", marginTop: 8, lineHeight: 1.1 }}>{title}</h2>
      <p style={{ fontSize: 15, color: "var(--ink-soft)", marginTop: 12, maxWidth: 500, marginInline: "auto" }}>{desc}</p>
    </div>
  );
}

export type SignupHandler = (role: "pyme" | "advisor") => void;
export type LandingChildren = ReactNode;
