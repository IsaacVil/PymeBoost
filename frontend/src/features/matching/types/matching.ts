// Matching types and interfaces

export interface AdvisorProfile {
  id: string;
  name: string;
  email: string;
  specializations: string[];
  rating: number;
  completedProjects: number;
}

export interface MatchingCriteria {
  industry: string;
  challenge: string;
  budget: number;
  timeline: number;
}
