"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { Avatar } from "@/shared/components/ui/Avatar";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import { OpportunitiesAdvisor } from "./components/OpportunitiesAdvisor";
import { SwipeDeck } from "./components/SwipeDeck";
import { DeckAdvisor } from "./data/advisors";
import { matchingService } from "./services/matchingService";

// PYME demo context — Emma · Ropa Sol (journey principal de la demo).
const PYME = {
  name: "Ropa Sol",
  tagline: "Tienda de ropa · San José, CR",
  problem: "Baja conversión en campañas de pauta digital pagada",
  objective: "Subir la conversión de campañas de 2.1% a 3.4% (+25%) en 4 meses",
};

const HOW_IT_WORKS: [string, string][] = [
  ["♥", "Swipe Approved abre un chat con el advisor."],
  ["✉", "Negociá tarifa y alcance en mensajes."],
  ["📄", "Negotiate Contract define el acuerdo."],
  ["💍", "Marry the Prospect activa el contrato."],
];

export default function MatchingPage() {
  const { publish: notify } = useNotificationStore();
  const queryClient = useQueryClient();
  const pymeId = useAuthStore((s) => s.session.userId) ?? "";
  const isAdvisor = useAuthStore((s) => s.session.role) === "ADVISOR";

  const { data: advisors = [], isLoading } = useQuery({
    queryKey: ["recommendations", pymeId],
    queryFn: () => matchingService.getRecommendations(pymeId),
    enabled: !!pymeId && !isAdvisor, // advisors don't swipe — they receive opportunities
  });

  const onDecision = (dir: "left" | "right", advisor: DeckAdvisor) => {
    if (pymeId) {
      // Persist the swipe, then refresh the chat list so a new match shows up in
      // Mensajes without a manual reload.
      void matchingService.swipe(pymeId, advisor.id, dir === "right").then(() => {
        if (dir === "right") queryClient.invalidateQueries({ queryKey: ["conversations"] });
      });
    }
    if (dir === "right") {
      notify({
        type: "success",
        title: `¡Match con ${advisor.name.split(" ")[0]}!`,
        message: "Chat habilitado.",
        duration: 3000,
      });
    }
  };

  // Advisor flow (Journey 2): receives opportunities, does not swipe.
  if (isAdvisor) {
    return (
      <DashboardLayout>
        <OpportunitiesAdvisor />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 312px", gap: 24 }}>
        {/* Deck column */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ textAlign: "center", marginBottom: 22 }}>
            <div className="eyebrow">Matching inteligente</div>
            <h2 className="display" style={{ fontSize: 34, lineHeight: 1.12, marginTop: 6 }}>
              Descubrí tu advisor
            </h2>
          </div>
          {isLoading ? (
            <p className="font-mono" style={{ color: "var(--ink-soft)" }}>Buscando tus mejores matches…</p>
          ) : (
            <SwipeDeck advisors={advisors} onDecision={onDecision} />
          )}
        </div>

        {/* Side panels */}
        <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <Panel>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <Avatar text="RS" accent="primary" size={44} square />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: 15, lineHeight: 1.15 }}>{PYME.name}</h4>
                <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
                  {PYME.tagline}
                </div>
              </div>
              <span className="font-mono" style={{ fontSize: 10, fontWeight: 600, color: "var(--success)", border: "1.5px solid var(--success)", borderRadius: 999, padding: "2px 7px", flexShrink: 0 }}>
                ✓ MEIC
              </span>
            </div>
            <div style={{ marginTop: 13, borderTop: "1.5px dashed var(--ink-faint)", paddingTop: 12 }}>
              <div className="eyebrow" style={{ marginBottom: 5 }}>Problema a optimizar</div>
              <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.45 }}>{PYME.problem}</p>
              <div className="eyebrow" style={{ margin: "11px 0 5px" }}>Objetivo</div>
              <p style={{ fontSize: 13, fontWeight: 600 }}>{PYME.objective}</p>
            </div>
          </Panel>

          <Panel>
            <div className="eyebrow" style={{ marginBottom: 9 }}>Cómo funciona el matching</div>
            <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 9 }}>
              {HOW_IT_WORKS.map(([ic, t], i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 14, width: 20, textAlign: "center", flex: "0 0 20px" }}>{ic}</span>
                  <span style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.4 }}>{t}</span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--surface)", border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-card)", padding: 16 }}>
      {children}
    </div>
  );
}
