import { describe, it, expect } from "vitest";
import { loginSchema, tokenSchema } from "@/features/auth/validators/authValidator";

describe("authValidator", () => {
  it("rejects invalid email", () => {
    expect(loginSchema.safeParse({ email: "notanemail", password: "password123" }).success).toBe(false);
  });

  it("rejects short password", () => {
    expect(loginSchema.safeParse({ email: "user@test.com", password: "short" }).success).toBe(false);
  });

  it("accepts valid credentials", () => {
    expect(loginSchema.safeParse({ email: "user@test.com", password: "securepass123" }).success).toBe(true);
  });
});
