// auth.jsx — auth forms + landing page informativa de PymeBoost
const { useState: useAu } = React;

// ── Estilos de inputs ─────────────────────────────────────────────────────────
const authInput = {
  fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600,
  padding: "9px 11px", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-sm)",
  background: "var(--surface)", color: "var(--ink)", width: "100%", outline: "none"
};
function AField({ label, optional, hint, children }) {
  return (
    <label style={{ display: "grid", gap: 5, minWidth: 0 }}>
      <span className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {label}
        {optional && <span style={{ color: "var(--ink-faint)", fontWeight: 600, textTransform: "none", letterSpacing: 0 }}>· opcional</span>}
      </span>
      {children}
      {hint && <span className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", lineHeight: 1.35 }}>{hint}</span>}
    </label>);

}
const AInput = (p) => <input {...p} style={{ ...authInput, ...(p.style || {}) }} />;
const ATextarea = (p) => <textarea {...p} style={{ ...authInput, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, resize: "vertical", ...(p.style || {}) }} />;

function ASectionTitle({ n, title, desc }) {
  return (
    <div style={{ display: "flex", gap: 11, alignItems: "flex-start", marginTop: 4 }}>
      <span className="mono" style={{ flex: "0 0 24px", height: 24, borderRadius: 7, background: "var(--ink)", color: "var(--paper)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700 }}>{n}</span>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
        {desc && <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 2, lineHeight: 1.4 }}>{desc}</div>}
      </div>
    </div>);

}
function FakeUpload({ label, accept, note }) {
  const [name, setName] = useAu(null);
  const id = "up_" + label.replace(/\s/g, "");
  return (
    <div>
      <label htmlFor={id} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", border: "var(--bd) dashed var(--ink)", borderRadius: "var(--r-md)", padding: "12px 14px", background: name ? "color-mix(in srgb, var(--success) 10%, #fff)" : "var(--paper)" }}>
        <span style={{ fontSize: 22 }}>{name ? "📎" : "⬆"}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name || label}</div>
          <div className="mono" style={{ fontSize: 10, color: "var(--ink-soft)", marginTop: 2 }}>{name ? "Archivo listo · " + accept : "Arrastrá o hacé clic · " + accept}</div>
        </div>
      </label>
      <input id={id} type="file" accept={accept} style={{ display: "none" }} onChange={(e) => setName(e.target.files[0]?.name || null)} />
      {note && <div className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", marginTop: 6, lineHeight: 1.4, display: "flex", gap: 6 }}><span style={{ color: "var(--accent-deep)" }}>✦</span><span>{note}</span></div>}
    </div>);

}
function PaymentFields({ membership }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", lineHeight: 1.45, background: "var(--paper)", border: "1.5px solid var(--ink-faint)", borderRadius: "var(--r-sm)", padding: "8px 11px" }}>
        Se usa para la <b style={{ color: "var(--ink)" }}>membresía {membership}</b> y, en caso de PYME, las comisiones de los contratos cerrados dentro de PymeBoost.
      </div>
      <AField label="Número de tarjeta"><AInput placeholder="4242 4242 4242 4242" inputMode="numeric" /></AField>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.3fr", gap: 10 }}>
        <AField label="Vence"><AInput placeholder="MM/AA" /></AField>
        <AField label="CVC"><AInput placeholder="123" /></AField>
        <AField label="Nombre en tarjeta"><AInput placeholder="Como aparece" /></AField>
      </div>
      <AField label="Información de facturación"><AInput placeholder="Dirección / razón social / ID fiscal" /></AField>
    </div>);

}

// ── Registro PYME ─────────────────────────────────────────────────────────────
function RegisterPyme() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <ASectionTitle n="1" title="Datos de la empresa" desc="Verificados contra la lista oficial del MEIC de Costa Rica." />
      <div style={{ display: "grid", gap: 12 }}>
        <AField label="Nombre completo de la empresa"><AInput placeholder="Hilo & Aguja S.A." /></AField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <AField label="Correo empresarial"><AInput placeholder="hola@empresa.cr" type="email" /></AField>
          <AField label="Número telefónico"><AInput placeholder="+506 0000 0000" /></AField>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <AField label="Cédula jurídica"><AInput placeholder="3-101-000000" /></AField>
          <AField label="Ubicación física" optional><AInput placeholder="San José, CR" /></AField>
        </div>
      </div>
      <ASectionTitle n="2" title="Verificación MEIC" desc="Validación documental automática con IA." />
      <FakeUpload label="Subir cédula jurídica (PDF)" accept="PDF"
      note="PymeBoost escanea el documento, confirma que la cédula coincida con los registros del MEIC y valida su autenticidad y vigencia." />
      <ASectionTitle n="3" title="Método de pago" />
      <PaymentFields membership="PymeBoost · $25/mes" />
      <ASectionTitle n="4" title="Contexto empresarial" desc="Descripción libre · máx. 500 palabras. Alimenta el matching inteligente." />
      <AField label="Contá sobre tu empresa" hint="A qué se dedica · industria · problemas actuales · procesos a optimizar · objetivos · necesidades específicas.">
        <ATextarea rows={5} placeholder="Boutique de ropa con tienda física y catálogo en línea. La conversión de las campañas de pauta es baja y el costo por venta sube cada mes…" />
      </AField>
    </div>);

}

// ── Registro Advisor ──────────────────────────────────────────────────────────
const USE_CASE_BLOCKS = [
["Company Information", "Empresa · industria · tamaño · empleados"],
["Contexto y Problema", "Situación inicial · problema · objetivos medibles"],
["Solución Implementada", "Acciones · procesos optimizados · tecnologías"],
["Métricas y Resultados", "Ventas · revenue · tiempo · costos · conversión"],
["Impacto del Negocio", "% crecimiento · KPI's · tiempo a resultados"]];

function RegisterAdvisor() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <ASectionTitle n="1" title="Datos personales" desc="Registro rápido. La IA enriquece tu perfil después." />
      <div style={{ display: "grid", gap: 12 }}>
        <AField label="Nombre completo"><AInput placeholder="Mariana Solís" /></AField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <AField label="Correo electrónico"><AInput placeholder="mariana@correo.com" type="email" /></AField>
          <AField label="Número telefónico"><AInput placeholder="+506 0000 0000" /></AField>
        </div>
        <AField label="Perfil de LinkedIn"><AInput placeholder="linkedin.com/in/…" /></AField>
        <AField label="Documento de identidad" hint="Cédula o pasaporte."><AInput placeholder="0-0000-0000" /></AField>
      </div>
      <ASectionTitle n="2" title="Enriquecimiento con IA" desc="LinkedIn + CV → experiencia, industrias, certificaciones y especialización." />
      <div style={{ display: "grid", gap: 12 }}>
        <FakeUpload label="Subir CV (PDF)" accept="PDF" note="La IA extrae años de experiencia, industrias, certificaciones y áreas de especialización." />
        <FakeUpload label="Subir casos de éxito" accept="PDF · PPT · DOCX" note="Mejoran tu perfil inicial. La IA normaliza el documento a la plantilla de Use Cases." />
        <div style={{ border: "1.5px solid var(--ink)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
          <div className="eyebrow" style={{ padding: "8px 12px", background: "var(--paper)", borderBottom: "1.5px solid var(--ink)" }}>Plantilla de Use Cases</div>
          {USE_CASE_BLOCKS.map(([t, d], i) =>
          <div key={t} style={{ padding: "8px 12px", borderTop: i ? "1.5px solid rgba(33,27,18,.1)" : "none", display: "flex", gap: 10, alignItems: "baseline" }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, flex: "0 0 150px" }}>{t}</span>
              <span className="mono" style={{ fontSize: 10, color: "var(--ink-soft)" }}>{d}</span>
            </div>
          )}
        </div>
      </div>
      <ASectionTitle n="3" title="Método de pago" />
      <PaymentFields membership="Advisor Pro · $15/mes" />
    </div>);

}

// ── Login form ────────────────────────────────────────────────────────────────
function LoginForm({ onLogin, goRegister }) {
  const [role, setRole] = useAu("pyme");
  const submit = (e) => {e.preventDefault();onLogin(role);};
  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
      <div>
        <div className="eyebrow" style={{ marginBottom: 7 }}>Ingresar como</div>
        <div style={{ display: "flex", gap: 8 }}>
          {[["pyme", "PYME"], ["advisor", "Advisor"]].map(([id, l]) =>
          <button key={id} type="button" onClick={() => setRole(id)} style={{
            flex: 1, padding: "9px", borderRadius: "var(--r-sm)", cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 12.5,
            border: "var(--bd) solid var(--ink)",
            background: role === id ? "var(--accent)" : "var(--surface)", color: role === id ? "#fff" : "var(--ink)",
            boxShadow: role === id ? "var(--sh-pop)" : "none"
          }}>{l}</button>
          )}
        </div>
      </div>
      <AField label="Correo electrónico"><AInput placeholder="tucorreo@empresa.cr" type="email" /></AField>
      <AField label="Contraseña"><AInput placeholder="••••••••" type="password" /></AField>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
          <input type="checkbox" style={{ accentColor: "var(--accent)", width: 15, height: 15 }} />
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>Recordarme</span>
        </label>
        <a href="#" onClick={(e) => e.preventDefault()} className="mono" style={{ fontSize: 11, color: "var(--accent-deep)", fontWeight: 600 }}>¿Olvidaste tu contraseña?</a>
      </div>
      <Button tone="accent" size="lg" full onClick={submit} icon={<span>→</span>}>Iniciar sesión</Button>
      <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-soft)", textAlign: "center" }}>
        ¿No tenés cuenta? <a href="#" onClick={(e) => {e.preventDefault();goRegister();}} style={{ color: "var(--accent-deep)", fontWeight: 700 }}>Crear cuenta</a>
      </div>
    </form>);

}

// ── Landing: Feature cards ─────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc }) {
  return (
    <div style={{ background: "var(--surface)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-xl)", boxShadow: "var(--sh-card)", padding: 24, display: "grid", gap: 12 }}>
      <div style={{ width: 42, height: 42, borderRadius: "var(--r-md)", background: "var(--ink)", color: "var(--paper)", display: "grid", placeItems: "center", fontSize: 18, border: "var(--bd) solid var(--ink)", boxShadow: "var(--sh-pop)", backgroundColor: "rgb(0, 0, 0)" }}>{icon}</div>
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.55, margin: 0 }}>{desc}</p>
      </div>
    </div>);

}

function LandingFeatures() {
  const features = [
  { icon: "✦", title: "IA de Recomendación", desc: "Agentes de IA analizan tu empresa e industria para sugerir advisors adecuados, procesos de optimización, planes de acción y métricas de seguimiento." },
  { icon: "✓", title: "Verificación MEIC", desc: "Validamos las empresas usando la lista oficial del MEIC de Costa Rica. Los asesores pasan verificación de identidad, currículum y certificaciones." },
  { icon: "★", title: "Sistema de Reputación", desc: "Ratings y reseñas verificadas de 1 a 5 estrellas post-contrato. Calidad garantizada por resultados reales." },
  { icon: "◆", title: "Contratos Estructurados", desc: "Contratos digitales con presupuesto de implementación, retainer mensual, plan de acción de IA y comisiones transparentes por duración." },
  { icon: "✉", title: "Chat Interno Seguro", desc: "Toda la comunicación ocurre dentro de la plataforma. Sin intercambio de contactos externos. PymeBoost monitorea cada conversación." },
  { icon: "▣", title: "Seguimiento Continuo", desc: "Dashboard con fases completadas, métricas de rendimiento, cronograma, historial de pagos y reportes exportables en PDF y Excel." }];

  return (
    <section style={{ padding: "72px 48px", background: "var(--surface)", borderTop: "var(--bd) solid var(--ink)", color: "rgb(0, 0, 0)", backgroundColor: "rgb(250, 245, 236)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow">Características</div>
          <h2 className="display" style={{ fontSize: "clamp(28px,3.8vw,44px)", marginTop: 8, lineHeight: 1.1 }}>Todo lo que tu PYME necesita para crecer</h2>
          <p style={{ fontSize: 15, color: "var(--ink-soft)", marginTop: 12, maxWidth: 480, marginInline: "auto" }}>Un ecosistema completo con IA, verificación y seguimiento continuo.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {features.map((f) => <FeatureCard key={f.title} {...f} />)}
        </div>
      </div>
    </section>);

}

// ── Landing: Proceso ──────────────────────────────────────────────────────────
function StepCard({ n, title, desc }) {
  return (
    <div style={{ background: "var(--surface)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-xl)", boxShadow: "var(--sh-card)", padding: 24, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 10, right: 16, fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 52, color: "rgba(33,27,18,.05)", lineHeight: 1, userSelect: "none" }}>{n}</div>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--accent)", color: "#fff", border: "var(--bd) solid var(--ink)", boxShadow: "var(--sh-pop)", display: "grid", placeItems: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 14, marginBottom: 14 }}>{n}</div>
      <h3 style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, margin: 0 }}>{desc}</p>
    </div>);

}

function LandingProcess() {
  const steps = [
  { n: "01", title: "Registrá tu empresa", desc: "Validamos tu negocio mediante la lista oficial del MEIC de Costa Rica." },
  { n: "02", title: "Definí tus necesidades", desc: "La IA de PymeBoost analiza tu industria, objetivos y procesos a optimizar." },
  { n: "03", title: "Recibí recomendaciones", desc: "PymeBoost sugiere los advisors más adecuados según tu presupuesto y contexto." },
  { n: "04", title: "Firmá el contrato", desc: "La IA genera un plan de acción de 5+ pasos que ambas partes pueden personalizar." },
  { n: "05", title: "Implementá y crecé", desc: "El advisor trabaja con seguimiento continuo. PymeBoost supervisa el cumplimiento." },
  { n: "06", title: "Calificá la experiencia", desc: "Al finalizar, las PYMEs califican al advisor con estrellas y comentarios." }];

  return (
    <section style={{ padding: "72px 48px", background: "var(--paper)", borderTop: "var(--bd) solid var(--ink)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow">Proceso</div>
          <h2 className="display" style={{ fontSize: "clamp(28px,3.8vw,44px)", marginTop: 8, lineHeight: 1.1 }}>¿Cómo funciona?</h2>
          <p style={{ fontSize: 15, color: "var(--ink-soft)", marginTop: 12, maxWidth: 500, marginInline: "auto" }}>De la necesidad al resultado en 6 pasos con IA y seguimiento real.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {steps.map((s) => <StepCard key={s.n} {...s} />)}
        </div>
      </div>
    </section>);

}

// ── Landing: Precios ──────────────────────────────────────────────────────────
function PlanCheck({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13.5, lineHeight: 1.4 }}>
      <span style={{ color: "var(--success)", flexShrink: 0, marginTop: 1 }}>✓</span>
      <span style={{ color: "var(--ink-soft)" }}>{children}</span>
    </div>);

}

function LandingPricing({ onSignup }) {
  const tiers = [
  { label: "Estándar", pct: "3%", months: "1 mes" },
  { label: "Media", pct: "5%", months: "3 meses" },
  { label: "Alta", pct: "7%", months: "6 meses" },
  { label: "Personalizada", pct: "3%+", months: "Flexible" }];

  const pymeFeatures = [
  "Perfil verificado MEIC", "Búsqueda y contacto con advisors", "Recomendaciones por IA",
  "Contratos con plan de acción IA", "Dashboard de seguimiento", "Reportes PDF y Excel",
  "Chat interno seguro", "+ comisión según duración (3-7%)"];

  const advFeatures = [
  "Verificación de identidad y currículum", "Perfil profesional en la plataforma",
  "Ser recomendado por IA a PYMEs", "Gestión de contratos y pagos",
  "Sistema de reputación y reseñas", "Retainer mensual garantizado",
  "Chat interno seguro", "Dashboard de proyectos activos"];

  return (
    <section style={{ padding: "72px 48px", background: "var(--surface)", borderTop: "var(--bd) solid var(--ink)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow">Precios</div>
          <h2 className="display" style={{ fontSize: "clamp(28px,3.8vw,44px)", marginTop: 8, lineHeight: 1.1 }}>Modelo transparente y flexible</h2>
          <p style={{ fontSize: 15, color: "var(--ink-soft)", marginTop: 12, maxWidth: 440, marginInline: "auto" }}>Membresías accesibles + comisiones por resultados reales.</p>
        </div>

        {/* Commission tiers */}
        <div style={{ marginBottom: 36 }}>
          <div className="eyebrow" style={{ textAlign: "center", marginBottom: 14 }}>Comisiones por duración del contrato</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {tiers.map((t) =>
            <div key={t.label} style={{ border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-lg)", padding: "16px 14px", textAlign: "center", background: "var(--paper)", boxShadow: "var(--sh-card)" }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>{t.label}</div>
                <div className="mono" style={{ fontSize: 30, fontWeight: 800, color: "var(--accent-deep)", lineHeight: 1 }}>{t.pct}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 6 }}>{t.months}</div>
              </div>
            )}
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-faint)", textAlign: "center", marginTop: 10 }}>
            Contratos personalizados: inician en 3% + 1% por cada mes adicional
          </div>
        </div>

        {/* Plan cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {/* PYME */}
          <div style={{ background: "var(--surface)", border: "2px solid var(--accent)", borderRadius: "var(--r-xl)", boxShadow: "var(--sh-card)", overflow: "hidden", position: "relative" }}>
            <div style={{ background: "var(--accent)", color: "#fff", textAlign: "center", padding: "5px", fontSize: 11, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, letterSpacing: ".08em" }}>PARA PYMES</div>
            <div style={{ padding: "28px 28px 24px" }}>
              <div style={{ marginBottom: 20 }}>
                <span className="display" style={{ fontSize: 48, lineHeight: 1 }}>$25</span>
                <span className="mono" style={{ fontSize: 14, color: "var(--ink-soft)" }}>/mes</span>
                <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4 }}>Membresía mensual</div>
              </div>
              <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
                {pymeFeatures.map((f) => <PlanCheck key={f}>{f}</PlanCheck>)}
              </div>
              <Button tone="accent" full size="lg" onClick={() => onSignup("pyme")} icon={<span>→</span>}>Empezar como PYME</Button>
            </div>
          </div>

          {/* Advisor */}
          <div style={{ background: "var(--surface)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-xl)", boxShadow: "var(--sh-card)", overflow: "hidden" }}>
            <div style={{ background: "var(--paper)", borderBottom: "var(--bd) solid var(--ink)", textAlign: "center", padding: "5px", fontSize: 11, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, letterSpacing: ".08em", color: "var(--ink-soft)" }}>PARA ADVISORS</div>
            <div style={{ padding: "28px 28px 24px" }}>
              <div style={{ marginBottom: 20 }}>
                <span className="display" style={{ fontSize: 48, lineHeight: 1 }}>$15</span>
                <span className="mono" style={{ fontSize: 14, color: "var(--ink-soft)" }}>/mes</span>
                <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4 }}>Membresía mensual</div>
              </div>
              <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
                {advFeatures.map((f) => <PlanCheck key={f}>{f}</PlanCheck>)}
              </div>
              <Button variant="outline" tone="ink" full size="lg" onClick={() => onSignup("advisor")} icon={<span>→</span>}>Registrarme como Advisor</Button>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ── Landing: CTA + Footer ─────────────────────────────────────────────────────
function LandingCTA({ onSignup }) {
  const badges = ["✓ Verificado por MEIC", "✦ IA integrada", "🔒 Comunicación segura", "+285 usuarios activos"];
  return (
    <>
      <section style={{ padding: "72px 48px", background: "var(--ink)", color: "var(--paper)", borderTop: "var(--bd) solid var(--ink)", backgroundImage: "radial-gradient(rgba(250,245,236,.06) 1px, transparent 1.4px)", backgroundSize: "22px 22px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "clamp(26px,4vw,44px)", lineHeight: 1.12 }}>El ecosistema de confianza para las PYMEs costarricenses</h2>
          <p style={{ fontSize: 15, color: "rgba(250,245,236,.7)", marginTop: 16, lineHeight: 1.55, maxWidth: 520, marginInline: "auto" }}>
            Verificación oficial, IA integrada, contratos transparentes y resultados medibles.
          </p>
          <div style={{ marginTop: 32 }}>
            <Button tone="accent" size="lg" onClick={() => onSignup("pyme")} icon={<span>→</span>}>
              Iniciar como PYME — Primer mes gratis
            </Button>
          </div>
          <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {badges.map((b) =>
            <span key={b} className="mono" style={{ fontSize: 12, color: "rgba(250,245,236,.55)", fontWeight: 600 }}>{b}</span>
            )}
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
        <span className="mono" style={{ fontSize: 11, color: "rgba(250,245,236,.38)" }}>© 2026 PymeBoost · Costa Rica · Todos los derechos reservados</span>
      </footer>
    </>);

}

// ── Auth Screen (principal) ───────────────────────────────────────────────────
function AuthScreen({ onLogin, pushToast }) {
  const [tab, setTab] = useAu("login");
  const [regType, setRegType] = useAu("pyme");
  const isLogin = tab === "login";

  const fakeRegister = () => {
    pushToast && pushToast({ text: "Cuenta creada · entrando como demo…", tone: "success", icon: "✦" });
    setTimeout(() => onLogin(regType), 700);
  };

  const handleSignupCTA = (role) => {setRegType(role);setTab("register");document.getElementById("auth-form-top")?.scrollIntoView({ behavior: "smooth" });};

  return (
    <div id="auth-form-top" style={{ position: "fixed", inset: 0, overflowY: "auto", background: "var(--paper)", zIndex: 50, backgroundImage: "radial-gradient(rgba(33,27,18,.05) 1px, transparent 1.4px)", backgroundSize: "22px 22px" }}>

      {/* ── Above fold: Auth ── */}
      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* Brand panel */}
        <aside style={{ flex: "0 0 40%", maxWidth: 480, background: "var(--ink)", color: "var(--paper)", borderRight: "var(--bd) solid var(--ink)", padding: "40px 40px", display: "flex", flexDirection: "column", backgroundImage: "radial-gradient(rgba(250,245,236,.07) 1px, transparent 1.4px)", backgroundSize: "22px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 34, height: 34, borderRadius: "var(--r-sm)", background: "var(--paper)", color: "var(--ink)", display: "grid", placeItems: "center", border: "var(--bd) solid var(--ink)" }}>
              <span className="display" style={{ fontSize: 22, lineHeight: 1, marginTop: 2 }}>P</span>
            </div>
            <span className="display" style={{ fontSize: 26 }}>Pyme<span style={{ color: "var(--accent)" }}>Boost</span></span>
          </div>

          <div style={{ marginTop: "auto" }}>
            <h1 className="display" style={{ fontSize: "clamp(30px,3.4vw,44px)", lineHeight: 1.12 }}>
              Asesoría<br />orientada a<br /><span style={{ color: "var(--accent)" }}>resultados.</span>
            </h1>
            <p style={{ fontSize: 14, color: "rgba(250,245,236,.72)", marginTop: 18, maxWidth: 330, lineHeight: 1.55 }}>
              Conectamos PYMES verificadas con advisors de alto rendimiento bajo contratos transparentes y seguimiento real del impacto.
            </p>
            <div style={{ marginTop: 26, display: "grid", gap: 13 }}>
              {[
              ["✓", "PYMES verificadas con la lista oficial del MEIC"],
              ["✦", "Advisors validados por IA desde LinkedIn y casos de éxito"],
              ["◆", "Matching inteligente según tu proceso a optimizar"]].
              map(([ic, t]) =>
              <div key={t} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--accent)", fontSize: 14, flex: "0 0 18px" }}>{ic}</span>
                  <span style={{ fontSize: 13, color: "rgba(250,245,236,.85)", lineHeight: 1.4 }}>{t}</span>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 8 }}>
            <div className="mono" style={{ fontSize: 10.5, color: "rgba(250,245,236,.45)" }}>Membresía PYME $25/mes · Advisor $15/mes</div>
            <div className="mono" style={{ fontSize: 11, color: "rgba(250,245,236,.3)", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ animation: "none" }}>↓</span> Descubrí más sobre PymeBoost
            </div>
          </div>
        </aside>

        {/* Auth form */}
        <main style={{ flex: 1, minWidth: 0, padding: "40px 28px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
          <div style={{ width: "100%", maxWidth: 520 }}>
            {/* Tab switcher */}
            <div style={{ display: "flex", gap: 0, border: "var(--bd) solid var(--ink)", borderRadius: 999, padding: 4, background: "var(--surface)", boxShadow: "var(--sh-pop)", width: "fit-content" }}>
              {[["login", "Iniciar sesión"], ["register", "Crear cuenta"]].map(([id, l]) =>
              <button key={id} onClick={() => setTab(id)} style={{
                padding: "8px 18px", borderRadius: 999, border: "none", cursor: "pointer",
                fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 12.5,
                background: tab === id ? "var(--accent)" : "transparent", color: tab === id ? "#fff" : "var(--ink-soft)"
              }}>{l}</button>
              )}
            </div>

            <div style={{ marginTop: 22 }}>
              <h2 className="display" style={{ fontSize: 30, lineHeight: 1.05 }}>
                {isLogin ? "Bienvenido de vuelta" : "Creá tu cuenta"}
              </h2>
              <p className="mono" style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 6 }}>
                {isLogin ?
                "Ingresá para acceder a matching, mensajería y dashboards." :
                "Todos los campos son ilustrativos en esta demostración."}
              </p>
            </div>

            <div style={{ marginTop: 22 }}>
              {isLogin ?
              <LoginForm onLogin={onLogin} goRegister={() => setTab("register")} /> :

              <div style={{ display: "grid", gap: 20 }}>
                  <div>
                    <div className="eyebrow" style={{ marginBottom: 8 }}>Tipo de cuenta</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {[["pyme", "Soy una PYME", "Encontrá advisors y cerrá contratos"], ["advisor", "Soy un Advisor", "Recibí oportunidades por IA"]].map(([id, t, d]) =>
                    <button key={id} onClick={() => setRegType(id)} style={{
                      textAlign: "left", padding: "12px 14px", borderRadius: "var(--r-md)", cursor: "pointer",
                      border: "var(--bd) solid var(--ink)",
                      background: regType === id ? "color-mix(in srgb, var(--accent) 14%, #fff)" : "var(--surface)",
                      boxShadow: regType === id ? "var(--sh-pop)" : "none"
                    }}>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{t}</div>
                          <div className="mono" style={{ fontSize: 10, color: "var(--ink-soft)", marginTop: 3, lineHeight: 1.35 }}>{d}</div>
                        </button>
                    )}
                    </div>
                  </div>

                  {regType === "pyme" ? <RegisterPyme /> : <RegisterAdvisor />}

                  <div style={{ display: "grid", gap: 9, marginTop: 4 }}>
                    <Button tone="accent" size="lg" full onClick={fakeRegister} icon={<span>✦</span>}>Registrarse</Button>
                    <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", textAlign: "center" }}>
                      ¿Ya tenés cuenta? <a href="#" onClick={(e) => {e.preventDefault();setTab("login");}} style={{ color: "var(--accent-deep)", fontWeight: 700 }}>Iniciá sesión</a>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </main>
      </div>

      {/* ── Landing sections ── */}
      <LandingFeatures />
      <LandingProcess />
      <LandingPricing onSignup={handleSignupCTA} />
      <LandingCTA onSignup={handleSignupCTA} />
    </div>);

}

Object.assign(window, { AuthScreen });