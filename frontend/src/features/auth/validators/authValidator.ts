import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSmeSchema = z.object({
  owner_name: z.string().min(1, "Required"),
  business_email: z.string().email("Invalid email address"),
  phone: z.string().min(3, "Required"),
  cedula_juridica: z.string().min(3, "Required"),
  company_name: z.string().min(1, "Required"),
  company_size: z.enum(["small", "medium", "large"]),
  industry: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerAdvisorSchema = z.object({
  full_name: z.string().min(1, "Required"),
  personal_email: z.string().email("Invalid email address"),
  phone: z.string().min(3, "Required"),
  linkedin_url: z.string().url("Invalid URL"),
  base_rate: z.coerce.number().min(0).optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterSmeInput = z.infer<typeof registerSmeSchema>;
export type RegisterAdvisorInput = z.infer<typeof registerAdvisorSchema>;
