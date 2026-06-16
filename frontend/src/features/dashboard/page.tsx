"use client";
import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { useAuthStore } from "@/store/authStore";
import { ContractDashboard } from "./components/ContractDashboard";
import { PROJECT, PROJECT_ADVISOR } from "./data/projectMock";

export default function DashboardPage() {
  const isAdvisor = useAuthStore((s) => s.session.role) === "ADVISOR";
  return (
    <DashboardLayout>
      <ContractDashboard
        match={isAdvisor ? PROJECT_ADVISOR : PROJECT}
        role={isAdvisor ? "advisor" : "pyme"}
      />
    </DashboardLayout>
  );
}
