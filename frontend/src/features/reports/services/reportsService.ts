import { apiClient } from "@/lib/apiClient";
import { Report } from "../hooks/useReports";

export const reportsService = {
  getReports: (pymeId: string) =>
    apiClient.request<Report[]>(`/reports?pymeId=${pymeId}`, { method: "GET" }),

  generate: (projectId: string) =>
    apiClient.request<Report>("/reports", { method: "POST", body: { projectId } }),

  download: (reportId: string) =>
    apiClient.request<{ url: string }>(`/reports/${reportId}/download`, { method: "GET" }),
};
