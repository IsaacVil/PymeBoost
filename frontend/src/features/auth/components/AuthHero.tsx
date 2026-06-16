"use client";
// Above-the-fold auth split-screen — ported from prototype/app/auth.jsx (AuthScreen).
// Login and register are wired to the real backend via useAuth.
import { zodResolver } from "@hookform/resolvers/zod";
import { CSSProperties, forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "../hooks/useAuth";
import {
  LoginInput,
  RegisterAdvisorInput,
  RegisterSmeInput,
  loginSchema,
  registerAdvisorSchema,
  registerSmeSchema,
} from "../validators/authValidator";

type Tab = "login" | "register";
type Role = "pyme" | "advisor";

interface AuthHeroProps {
  tab: Tab;
  setTab: (t: Tab) => void;
  regType: Role;
  setRegType: (r: Role) => void;
}

export function AuthHero({ tab, setTab, regType, setRegType }: AuthHeroProps) {
  const isLogin = tab === "login";
  return (
    <div id="auth-top" style={{ display: "flex", minHeight: "100vh" }}>
      <BrandPanel />
      <main style={{ flex: 1, minWidth: 0, padding: "40px 28px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <div style={{ width: "100%", maxWidth: 520 }}>
          {/* Tab switcher */}
          <div style={{ display: "flex", border: "var(--bd) solid var(--ink)", borderRadius: 999, padding: 4, background: "var(--surface)", boxShadow: "var(--sh-pop)", width: "fit-content" }}>
            {([["login", "Iniciar sesión"], ["register", "Crear cuenta"]] as [Tab, string][]).map(([id, l]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="font-mono"
                style={{ padding: "8px 18px", borderRadius: 999, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12.5, background: tab === id ? "var(--accent)" : "transparent", color: tab === id ? "#fff" : "var(--ink-soft)" }}
              >
                {l}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 22 }}>
            <h2 className="display" style={{ fontSize: 30, lineHeight: 1.05 }}>
              {isLogin ? "Bienvenido de vuelta" : "Creá tu cuenta"}
            </h2>
            <p className="font-mono" style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 6 }}>
              {isLogin
                ? "Ingresá para acceder a matching, mensajería y dashboards."
                : "Completá los datos para crear tu cuenta en PymeBoost."}
            </p>
          </div>

          <div style={{ marginTop: 22 }}>
            {isLogin ? (
              <LoginPanel goRegister={() => setTab("register")} />
            ) : (
              <RegisterPanel regType={regType} setRegType={setRegType} goLogin={() => setTab("login")} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Brand panel (left) ─────────────────────────────────────────────────────────
function BrandPanel() {
  const bullets: [string, string][] = [
    ["✓", "PYMES verificadas con la lista oficial del MEIC"],
    ["✦", "Advisors validados por IA desde LinkedIn y casos de éxito"],
    ["◆", "Matching inteligente según tu proceso a optimizar"],
  ];
  return (
    <aside style={{ flex: "0 0 40%", maxWidth: 480, background: "var(--ink)", color: "var(--paper)", padding: 40, display: "flex", flexDirection: "column", backgroundImage: "radial-gradient(rgba(250,245,236,.07) 1px, transparent 1.4px)", backgroundSize: "22px 22px" }}>
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
          {bullets.map(([ic, t]) => (
            <div key={t} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
              <span style={{ color: "var(--accent)", fontSize: 14, flex: "0 0 18px" }}>{ic}</span>
              <span style={{ fontSize: 13, color: "rgba(250,245,236,.85)", lineHeight: 1.4 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 8 }}>
        <div className="font-mono" style={{ fontSize: 10.5, color: "rgba(250,245,236,.45)" }}>Membresía PYME $25/mes · Advisor $15/mes</div>
        <div className="font-mono" style={{ fontSize: 11, color: "rgba(250,245,236,.3)" }}>↓ Descubrí más sobre PymeBoost</div>
      </div>
    </aside>
  );
}

// ── Login ────────────────────────────────────────────────────────────────────
function LoginPanel({ goRegister }: { goRegister: () => void }) {
  const { login, isLoggingIn, loginError } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  return (
    <form onSubmit={handleSubmit((d) => login(d))} style={{ display: "grid", gap: 16 }} noValidate>
      <AField label="Correo electrónico" error={errors.email?.message}>
        <AInput type="email" placeholder="tucorreo@empresa.cr" autoComplete="email" {...register("email")} />
      </AField>
      <AField label="Contraseña" error={errors.password?.message}>
        <AInput type="password" placeholder="••••••••" autoComplete="current-password" {...register("password")} />
      </AField>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
          <input type="checkbox" style={{ accentColor: "var(--accent)", width: 15, height: 15 }} />
          <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>Recordarme</span>
        </label>
        <a href="#" onClick={(e) => e.preventDefault()} className="font-mono" style={{ fontSize: 11, color: "var(--accent-deep)", fontWeight: 600 }}>¿Olvidaste tu contraseña?</a>
      </div>
      {loginError && <p style={{ fontSize: 13, color: "var(--danger)" }}>{loginError.message}</p>}
      <SubmitBtn loading={isLoggingIn}>→ Iniciar sesión</SubmitBtn>
      <div className="font-mono" style={{ fontSize: 11.5, color: "var(--ink-soft)", textAlign: "center" }}>
        ¿No tenés cuenta?{" "}
        <a href="#" onClick={(e) => { e.preventDefault(); goRegister(); }} style={{ color: "var(--accent-deep)", fontWeight: 700 }}>Crear cuenta</a>
      </div>

      {/* Demo credentials helper */}
      <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.5, background: "var(--paper)", border: "1.5px solid var(--ink-faint)", borderRadius: "var(--r-sm)", padding: "9px 11px" }}>
        <div className="eyebrow" style={{ marginBottom: 4 }}>Cuenta demo</div>
        <div>correo: <b style={{ color: "var(--ink)" }}>maria@cafedelvalle.cr</b></div>
        <div>contraseña: <b style={{ color: "var(--ink)" }}>DemoPass123!</b></div>
      </div>
    </form>
  );
}

// ── Register ──────────────────────────────────────────────────────────────────
function RegisterPanel({ regType, setRegType, goLogin }: { regType: Role; setRegType: (r: Role) => void; goLogin: () => void }) {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Tipo de cuenta</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {([["pyme", "Soy una PYME", "Encontrá advisors y cerrá contratos"], ["advisor", "Soy un Advisor", "Recibí oportunidades por IA"]] as [Role, string, string][]).map(([id, t, d]) => (
            <button
              key={id}
              onClick={() => setRegType(id)}
              style={{ textAlign: "left", padding: "12px 14px", borderRadius: "var(--r-md)", cursor: "pointer", border: "var(--bd) solid var(--ink)", background: regType === id ? "color-mix(in srgb, var(--accent) 14%, #fff)" : "var(--surface)", boxShadow: regType === id ? "var(--sh-pop)" : "none" }}
            >
              <div style={{ fontSize: 14, fontWeight: 700 }}>{t}</div>
              <div className="font-mono" style={{ fontSize: 10, color: "var(--ink-soft)", marginTop: 3, lineHeight: 1.35 }}>{d}</div>
            </button>
          ))}
        </div>
      </div>

      {regType === "pyme" ? <PymeRegister /> : <AdvisorRegister />}

      <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)", textAlign: "center" }}>
        ¿Ya tenés cuenta?{" "}
        <a href="#" onClick={(e) => { e.preventDefault(); goLogin(); }} style={{ color: "var(--accent-deep)", fontWeight: 700 }}>Iniciá sesión</a>
      </div>
    </div>
  );
}

function PymeRegister() {
  const { registerPyme, isRegisteringPyme, registerPymeError } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSmeInput>({ resolver: zodResolver(registerSmeSchema) });

  return (
    <form onSubmit={handleSubmit((d) => registerPyme(d))} style={{ display: "grid", gap: 18 }} noValidate>
      <SectionTitle n="1" title="Datos de la empresa" desc="Verificados contra la lista oficial del MEIC de Costa Rica." />
      <div style={{ display: "grid", gap: 12 }}>
        <AField label="Nombre completo de la empresa" error={errors.company_name?.message}>
          <AInput placeholder="Hilo & Aguja S.A." {...register("company_name")} />
        </AField>
        <AField label="Nombre del responsable" error={errors.owner_name?.message}>
          <AInput placeholder="María Rodríguez" {...register("owner_name")} />
        </AField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <AField label="Correo empresarial" error={errors.business_email?.message}>
            <AInput type="email" placeholder="hola@empresa.cr" {...register("business_email")} />
          </AField>
          <AField label="Número telefónico" error={errors.phone?.message}>
            <AInput placeholder="+506 0000 0000" {...register("phone")} />
          </AField>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <AField label="Cédula jurídica" error={errors.cedula_juridica?.message}>
            <AInput placeholder="3-101-000000" {...register("cedula_juridica")} />
          </AField>
          <AField label="Tamaño de empresa">
            <select {...register("company_size")} style={{ ...authInputStyle }}>
              <option value="small">Pequeña (≤30)</option>
              <option value="medium">Mediana (31–100)</option>
              <option value="large">Grande (100+)</option>
            </select>
          </AField>
        </div>
        <AField label="Contraseña" error={errors.password?.message}>
          <AInput type="password" placeholder="••••••••" {...register("password")} />
        </AField>
      </div>

      <SectionTitle n="2" title="Verificación MEIC" desc="Validación documental automática con IA." />
      <FakeUpload label="Subir cédula jurídica (PDF)" accept="PDF" note="PymeBoost escanea el documento y valida la cédula con los registros del MEIC." />

      <SectionTitle n="3" title="Contexto empresarial" desc="Alimenta el matching inteligente (ilustrativo en la demo)." />
      <textarea rows={4} placeholder="Boutique de ropa con tienda física y catálogo en línea…" style={{ ...authInputStyle, fontFamily: "var(--font-sans)", fontWeight: 500, resize: "vertical" }} />

      {registerPymeError && <p style={{ fontSize: 13, color: "var(--danger)" }}>{registerPymeError.message}</p>}
      <SubmitBtn loading={isRegisteringPyme}>✦ Registrarse como PYME</SubmitBtn>
    </form>
  );
}

function AdvisorRegister() {
  const { registerAdvisor, isRegisteringAdvisor, registerAdvisorError } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterAdvisorInput>({ resolver: zodResolver(registerAdvisorSchema) });

  return (
    <form onSubmit={handleSubmit((d) => registerAdvisor(d))} style={{ display: "grid", gap: 18 }} noValidate>
      <SectionTitle n="1" title="Datos personales" desc="Registro rápido. La IA enriquece tu perfil después." />
      <div style={{ display: "grid", gap: 12 }}>
        <AField label="Nombre completo" error={errors.full_name?.message}>
          <AInput placeholder="Mariana Solís" {...register("full_name")} />
        </AField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <AField label="Correo electrónico" error={errors.personal_email?.message}>
            <AInput type="email" placeholder="mariana@correo.com" {...register("personal_email")} />
          </AField>
          <AField label="Número telefónico" error={errors.phone?.message}>
            <AInput placeholder="+506 0000 0000" {...register("phone")} />
          </AField>
        </div>
        <AField label="Perfil de LinkedIn" error={errors.linkedin_url?.message}>
          <AInput placeholder="https://linkedin.com/in/…" {...register("linkedin_url")} />
        </AField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <AField label="Tarifa base (₡)" optional error={errors.base_rate?.message}>
            <AInput type="number" placeholder="50000" {...register("base_rate")} />
          </AField>
          <AField label="Contraseña" error={errors.password?.message}>
            <AInput type="password" placeholder="••••••••" {...register("password")} />
          </AField>
        </div>
      </div>

      <SectionTitle n="2" title="Enriquecimiento con IA" desc="LinkedIn + CV → experiencia, industrias y especialización." />
      <FakeUpload label="Subir CV (PDF)" accept="PDF" note="La IA extrae años de experiencia, industrias y áreas de especialización." />

      {registerAdvisorError && <p style={{ fontSize: 13, color: "var(--danger)" }}>{registerAdvisorError.message}</p>}
      <SubmitBtn loading={isRegisteringAdvisor}>✦ Registrarse como Advisor</SubmitBtn>
    </form>
  );
}

// ── Shared bits ────────────────────────────────────────────────────────────────
const authInputStyle: CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, padding: "9px 11px",
  border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-sm)", background: "var(--surface)",
  color: "var(--ink)", width: "100%", outline: "none",
};

const AInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function AInput(props, ref) {
  return <input ref={ref} {...props} style={{ ...authInputStyle, ...props.style }} />;
});

function AField({ label, optional, error, children }: { label: string; optional?: boolean; error?: string; children: ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 5, minWidth: 0 }}>
      <span className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {label}
        {optional && <span style={{ color: "var(--ink-faint)", fontWeight: 600, textTransform: "none", letterSpacing: 0 }}>· opcional</span>}
      </span>
      {children}
      {error && <span className="font-mono" style={{ fontSize: 10, color: "var(--danger)" }}>{error}</span>}
    </label>
  );
}

function SectionTitle({ n, title, desc }: { n: string; title: string; desc?: string }) {
  return (
    <div style={{ display: "flex", gap: 11, alignItems: "flex-start", marginTop: 4 }}>
      <span className="font-mono" style={{ flex: "0 0 24px", height: 24, borderRadius: 7, background: "var(--ink)", color: "var(--paper)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700 }}>{n}</span>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
        {desc && <div className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 2, lineHeight: 1.4 }}>{desc}</div>}
      </div>
    </div>
  );
}

function FakeUpload({ label, accept, note }: { label: string; accept: string; note: string }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, border: "var(--bd) dashed var(--ink)", borderRadius: "var(--r-md)", padding: "12px 14px", background: "var(--paper)" }}>
        <span style={{ fontSize: 22 }}>⬆</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div>
          <div className="font-mono" style={{ fontSize: 10, color: "var(--ink-soft)", marginTop: 2 }}>Arrastrá o hacé clic · {accept}</div>
        </div>
      </div>
      <div className="font-mono" style={{ fontSize: 10, color: "var(--ink-faint)", marginTop: 6, lineHeight: 1.4, display: "flex", gap: 6 }}>
        <span style={{ color: "var(--accent-deep)" }}>✦</span>
        <span>{note}</span>
      </div>
    </div>
  );
}

function SubmitBtn({ loading, children }: { loading: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="font-mono"
      style={{ width: "100%", padding: "13px", borderRadius: "var(--r-md)", cursor: loading ? "not-allowed" : "pointer", fontWeight: 600, fontSize: 15.5, border: "var(--bd) solid var(--ink)", boxShadow: "var(--sh-pop)", background: "var(--accent)", color: "#fff", opacity: loading ? 0.6 : 1 }}
    >
      {children}
    </button>
  );
}
