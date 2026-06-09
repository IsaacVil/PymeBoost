// Types aligned with project spec: AI-generated Tinder-style matching

export interface AdvisorProfile {
  id: string;
  name: string;
  specializations: string[];
  industry: string;
  rating: number;
  completedProjects: number;
}

export interface PreviousProject {
  name: string;
  description: string;
}

export interface EarningsDistribution {
  advisorPercentage: number;
  pymeBoostPercentage: number;
  estimatedMonthlyUSD: number;
}

export interface Match {
  advisorId: string;
  advisorName: string;
  industry: string;
  specializations: string[];
  rating: number;
  compatibilityScore: number;       // 1–5 scale per spec
  previousProject: PreviousProject; // project spec: "Proyecto similar realizado anteriormente"
  estimatedMetricImprovement: string; // e.g. "20% cost reduction in 3 months"
  earningsDistribution: EarningsDistribution;
}
