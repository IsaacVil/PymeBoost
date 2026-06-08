import { z } from "zod";

export const matchRequestSchema = z.object({
  pymeId:    z.string().min(1),
  industry:  z.string().min(2, "Industry is required"),
  challenge: z.string().min(10, "Describe the challenge in at least 10 characters"),
  budget:    z.number().positive("Budget must be positive"),
  timeline:  z.number().int().positive("Timeline must be a positive number of weeks"),
});

export type MatchRequest = z.infer<typeof matchRequestSchema>;

export function validateMatchRequest(data: unknown) {
  const result = matchRequestSchema.safeParse(data);
  return result.success
    ? { valid: true as const, data: result.data }
    : { valid: false as const, error: result.error.errors.map((e) => e.message).join("; ") };
}
