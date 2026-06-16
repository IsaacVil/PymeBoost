"use client";
import { useEffect, useState } from "react";

import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { Avatar } from "@/shared/components/ui/Avatar";
import { useAuthStore } from "@/store/authStore";
import { ChatView } from "./components/ChatView";
import { CONVERSATIONS, Conversation } from "./data/conversations";
import { ADVISOR_CONVERSATIONS } from "./data/advisorConversations";

export default function MessagingPage() {
  const role = useAuthStore((s) => s.session.role) === "ADVISOR" ? "advisor" : "pyme";
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Load the conversation set for the resolved role (auth store hydrates async,
  // so we sync here instead of capturing role once in useState).
  useEffect(() => {
    const list = role === "advisor" ? ADVISOR_CONVERSATIONS : CONVERSATIONS;
    setConversations(list);
    setActiveId(list[0]?.id ?? "");
  }, [role]);

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  const updateMatch = (id: string, updater: (m: Conversation) => Conversation) =>
    setConversations((prev) => prev.map((m) => (m.id === id ? updater(m) : m)));

  const unmatch = (id: string) => {
    setConversations((prev) => prev.filter((m) => m.id !== id));
    setActiveId((cur) => (cur === id ? "" : cur));
  };

  return (
    <DashboardLayout>
      <h1 className="display" style={{ fontSize: 32, marginBottom: 16 }}>Mensajes</h1>
      <div style={{ display: "grid", gridTemplateColumns: "288px 1fr", height: "calc(100vh - 12rem)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: "var(--sh-card)" }}>
        {/* conversation list */}
        <div style={{ borderRight: "var(--bd) solid var(--ink)", overflowY: "auto", background: "var(--paper)" }}>
          <div style={{ padding: "15px 16px 8px" }}>
            <div className="eyebrow">Chats activos</div>
          </div>
          {conversations.map((m) => {
            const last = [...m.messages].reverse().find((x) => x.text || x.kind) ?? ({} as (typeof m.messages)[number]);
            const preview = last.text || (last.kind === "proposal" ? "📄 Propuesta de contrato" : last.kind === "married" ? "💍 Contrato activo" : "Nuevo match — saludá 👋");
            return (
              <button
                key={m.id}
                onClick={() => setActiveId(m.id)}
                style={{ width: "100%", textAlign: "left", display: "flex", gap: 11, padding: "12px 16px", cursor: "pointer", background: m.id === active?.id ? "var(--surface)" : "transparent", border: "none", borderBottom: "1.5px solid rgba(33,27,18,.08)", borderLeft: `3px solid ${m.id === active?.id ? "var(--accent)" : "transparent"}` }}
              >
                <Avatar text={m.advisor.monogram} accent={m.advisor.accent} size={42} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.advisor.name}</span>
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
          })}
        </div>

        {/* thread */}
        <div style={{ overflow: "hidden" }}>
          {active ? (
            <ChatView
              key={active.id}
              match={active}
              role={role}
              onUpdate={(updater) => updateMatch(active.id, updater)}
              onUnmatch={unmatch}
            />
          ) : (
            <div className="font-mono" style={{ display: "grid", placeItems: "center", height: "100%", color: "var(--ink-soft)" }}>
              Seleccioná un chat
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
