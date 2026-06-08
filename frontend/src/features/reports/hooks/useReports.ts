"use client";
import { useQuery } from "@tanstack/react-query";

export interface Report {
  id: string;
  title: string;
  projectId: string;
  generatedAt: number;
  status: "pending" | "complete";
  url?: string;
}

export function useReports(pymeId: string) {
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reports", pymeId],
    queryFn: async (): Promise<Report[]> => {
      // TODO: call reportsService.getReports(pymeId)
      return [];
    },
  });

  const generate = async (projectId: string) => {
    // TODO: POST /reports { projectId }
  };

  return { reports, isLoading, generate };
}
