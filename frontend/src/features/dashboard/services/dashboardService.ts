import { apiClient } from "@/lib/apiClient";
import { DashboardStats } from "../hooks/useDashboard";

export const dashboardService = {
  getStats: (pymeId: string) =>
    apiClient.request<DashboardStats>(`/dashboard/stats?pymeId=${pymeId}`, { method: "GET" }),

  getMilestones: (pymeId: string) =>
    apiClient.request<any[]>(`/dashboard/milestones?pymeId=${pymeId}`, { method: "GET" }),
};
