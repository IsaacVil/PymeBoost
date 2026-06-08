import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const tokenSchema = z.object({
  token: z.string().min(1),
  refreshToken: z.string().min(1),
  expiresIn: z.number().positive(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type TokenPayload = z.infer<typeof tokenSchema>;
