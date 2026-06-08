import { z } from "zod";

export const generateReportSchema = z.object({
  projectId: z.string().min(1),
  includeMetrics: z.boolean().default(true),
});
