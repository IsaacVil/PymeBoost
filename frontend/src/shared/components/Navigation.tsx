"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar } from "@/shared/components/ui/Avatar";
import { useAuthStore } from "@/store/authStore";

// 3 sections, in the order of the reference design.
const navItems = [
  { href: "/matching", label: "Descubrir", icon: "◆", badge: 0, dot: false },
  { href: "/messaging", label: "Mensajes", icon: "✉", badge: 2, dot: false },
  { href: "/dashboard", label: "Mi Contrato", icon: "▣", badge: 0, dot: true },
];

export function Navigation() {
  const pathname = usePathname();
  const { session, logout } = useAuthStore();

  const isAdvisor = session.role === "ADVISOR";
  const roleLabel = isAdvisor ? "Advisor" : "PYME";
  const membershipEyebrow = isAdvisor ? "Membresía Advisor" : "Membresía PYME";
  const membershipValue = isAdvisor ? "Advisor Pro · $15/mes" : "PymeBoost Plus · $25/mes";
  const name = (session.email ?? "").split("@")[0] || "Cuenta";
  const monogram = name.slice(0, 2).toUpperCase();

  return (
    <nav style={{ flex: 1, display: "flex", flexDirection: "column", padding: 16 }}>
      {/* Nav items */}
      <ul style={{ display: "grid", gap: 6, margin: 0, padding: 0, listStyle: "none" }}>
        {navItems.map(({ href, label, icon, badge, dot }) => {
          const active = pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className="font-mono"
                style={{
                  display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: "var(--r-md)",
                  border: `var(--bd) solid ${active ? "var(--ink)" : "transparent"}`,
                  background: active ? "var(--accent)" : "transparent",
                  color: active ? "#fff" : "var(--ink)",
                  boxShadow: active ? "var(--sh-pop)" : "none",
                  fontWeight: 600, fontSize: 13, textDecoration: "none",
                }}
              >
                <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>{icon}</span>
                <span>{label}</span>
                {badge > 0 && (
                  <span className="font-mono" style={{ marginLeft: "auto", background: "var(--accent)", color: "#fff", borderRadius: 999, border: "1.5px solid var(--ink)", fontSize: 10, fontWeight: 700, padding: "1px 7px" }}>{badge}</span>
                )}
                {dot && <span style={{ marginLeft: badge > 0 ? 0 : "auto", width: 8, height: 8, borderRadius: "50%", background: "var(--success)", border: "1.5px solid var(--ink)", flexShrink: 0 }} />}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Bottom: membership + account */}
      <div style={{ display: "grid", gap: 12, marginTop: "auto" }}>
        <div style={{ background: "var(--paper)", border: "1.5px solid var(--ink)", borderRadius: "var(--r-md)", padding: "11px 12px" }}>
          <div className="eyebrow" style={{ marginBottom: 4 }}>{membershipEyebrow}</div>
          <div className="font-mono" style={{ fontSize: 12, fontWeight: 700 }}>{membershipValue}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 2px" }}>
          <Avatar text={monogram} accent={isAdvisor ? "secondary" : "primary"} size={38} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {name} <span title="Verificado" style={{ color: "var(--success)" }}>✓</span>
            </div>
            <div className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-soft)" }}>{roleLabel}</div>
          </div>
        </div>

        <button
          onClick={logout}
          className="font-mono"
          style={{ background: "none", border: "1.5px solid var(--ink-faint)", borderRadius: "var(--r-sm)", color: "var(--ink-soft)", fontSize: 11, fontWeight: 600, padding: 7, cursor: "pointer" }}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
