export interface ProjectMilestone {
  id: string;
  projectId: string;
  title: string;
  dueDate: number;
  status: "pending" | "active" | "complete";
  completedAt?: number;
}

export interface ProjectOverview {
  id: string;
  title: string;
  advisorId: string;
  startDate: number;
  milestones: ProjectMilestone[];
  healthScore: number;
}
