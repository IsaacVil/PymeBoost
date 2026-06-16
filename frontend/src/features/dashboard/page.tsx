"use client";
import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { ContractDashboard } from "./components/ContractDashboard";
import { PROJECT } from "./data/projectMock";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <ContractDashboard match={PROJECT} />
    </DashboardLayout>
  );
}
