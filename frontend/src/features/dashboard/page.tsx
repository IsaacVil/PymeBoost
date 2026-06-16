"use client";
import { useQuery } from "@tanstack/react-query";

import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { useAuthStore } from "@/store/authStore";
import { ContractDashboard } from "./components/ContractDashboard";
import { dashboardService } from "./services/dashboardService";

export default function DashboardPage() {
  const isAdvisor = useAuthStore((s) => s.session.role) === "ADVISOR";
  const userId = useAuthStore((s) => s.session.userId) ?? "";

  const { data: project, isLoading } = useQuery({
    queryKey: ["dashboard-tracking", userId],
    queryFn: () => dashboardService.getActiveTracking(),
    enabled: !!userId,
  });

  return (
    <DashboardLayout>
      {isLoading ? (
        <p className="font-mono" style={{ color: "var(--ink-soft)" }}>Cargando tu contrato…</p>
      ) : project ? (
        <ContractDashboard match={project} role={isAdvisor ? "advisor" : "pyme"} />
      ) : (
        <div style={{ display: "grid", placeItems: "center", minHeight: "50vh", textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 48 }}>📊</div>
            <h3 className="display" style={{ fontSize: 24, marginTop: 8 }}>Sin contrato activo</h3>
            <p style={{ color: "var(--ink-soft)", fontSize: 14, marginTop: 6, maxWidth: 360 }}>
              {isAdvisor
                ? "Tus proyectos activos aparecerán acá cuando formalices un contrato."
                : "Formalizá un contrato con Marry the Prospect para ver el seguimiento aquí."}
            </p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
