"use client";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export interface DashboardStats {
  activeProjects: number;
  advisorsConnected: number;
  contractsSigned: number;
  avgAdvisorRating: number;
}

export function useDashboard(pymeId: string) {
  const { data: stats, isLoading } = useQuery({
    queryKey: queryKeys.dashboard.stats(pymeId),
    queryFn: async (): Promise<DashboardStats> => {
      // TODO: call dashboardService.getStats(pymeId)
      return { activeProjects: 0, advisorsConnected: 0, contractsSigned: 0, avgAdvisorRating: 0 };
    },
  });

  return { stats, isLoading };
}
