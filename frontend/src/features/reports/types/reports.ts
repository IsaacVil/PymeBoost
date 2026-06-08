export interface ReportSection {
  title: string;
  content: string;
  metrics?: Record<string, number | string>;
}

export interface FullReport {
  id: string;
  projectId: string;
  title: string;
  generatedAt: number;
  sections: ReportSection[];
  advisorSummary: string;
  pymeSummary: string;
}
