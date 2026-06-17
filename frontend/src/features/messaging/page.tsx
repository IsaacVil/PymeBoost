"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { Avatar } from "@/shared/components/ui/Avatar";
import { useAuthStore } from "@/store/authStore";
import { ChatView } from "./components/ChatView";
import { messagingService } from "./services/messagingService";

export default function MessagingPage() {
  const role = useAuthStore((s) => s.session.role) === "ADVISOR" ? "advisor" : "pyme";
  const userId = useAuthStore((s) => s.session.userId) ?? "";
  const [activeId, setActiveId] = useState<string>("");

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ["conversations", userId],
    queryFn: () => messagingService.getConversations(),
    enabled: !!userId,
    // Near-real-time: new matches / married state appear without a manual reload.
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  const active = conversations.find((c) => c.match_id === activeId) ?? conversations[0];

  return (
    <DashboardLayout>
      <h1 className="display" style={{ fontSize: 32, marginBottom: 16 }}>Mensajes</h1>
      <div style={{ display: "grid", gridTemplateColumns: "288px 1fr", height: "calc(100vh - 12rem)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: "var(--sh-card)" }}>
        {/* conversation list */}
        <div style={{ borderRight: "var(--bd) solid var(--ink)", overflowY: "auto", background: "var(--paper)" }}>
          <div style={{ padding: "15px 16px 8px" }}>
            <div className="eyebrow">Chats activos</div>
          </div>
          {isLoading ? (
            <div className="font-mono" style={{ padding: 16, fontSize: 12, color: "var(--ink-soft)" }}>Cargando…</div>
          ) : conversations.length === 0 ? (
            <div className="font-mono" style={{ padding: 16, fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.5 }}>
              Aún no tenés matches. {role === "pyme" ? "Descubrí advisors y hacé match para empezar a conversar." : "Cuando una PYME haga match aparecerá acá."}
            </div>
          ) : (
            conversations.map((m) => {
              const preview = m.last_message ?? "Nuevo match — saludá 👋";
              return (
                <button
                  key={m.match_id}
                  onClick={() => setActiveId(m.match_id)}
                  style={{ width: "100%", textAlign: "left", display: "flex", gap: 11, padding: "12px 16px", cursor: "pointer", background: m.match_id === active?.match_id ? "var(--surface)" : "transparent", border: "none", borderBottom: "1.5px solid rgba(33,27,18,.08)", borderLeft: `3px solid ${m.match_id === active?.match_id ? "var(--accent)" : "transparent"}` }}
                >
                  <Avatar text={m.counterpart_monogram} accent={m.accent} size={42} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.counterpart_name}</span>
                      {m.married ? (
                        <span title="Activo" style={{ color: "var(--success)", fontSize: 12 }}>●</span>
                      ) : (
                        <span className="font-mono" style={{ fontSize: 9.5, color: "var(--ink-faint)", whiteSpace: "nowrap" }}>{m.status}</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-soft)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 2 }}>{preview}</div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* thread */}
        <div style={{ overflow: "hidden" }}>
          {active ? (
            <ChatView
              key={active.match_id}
              matchId={active.match_id}
              role={role}
              counterpart={{ name: active.counterpart_name, monogram: active.counterpart_monogram, role: active.counterpart_role, accent: active.accent }}
              married={active.married}
            />
          ) : (
            <div className="font-mono" style={{ display: "grid", placeItems: "center", height: "100%", color: "var(--ink-soft)" }}>
              {isLoading ? "Cargando…" : "Seleccioná un chat"}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
