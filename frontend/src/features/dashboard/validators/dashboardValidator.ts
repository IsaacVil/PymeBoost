import { z } from "zod";

export const milestoneSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  dueDate: z.coerce.date(),
  status: z.enum(["pending", "active", "complete"]),
});

export const dashboardStatsSchema = z.object({
  activeProjects: z.number().int().min(0),
  advisorsConnected: z.number().int().min(0),
  contractsSigned: z.number().int().min(0),
  avgAdvisorRating: z.number().min(0).max(5),
});
