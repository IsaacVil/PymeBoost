// Strategy Pattern: each contract tier has different commission and duration rules
// Tiers per project spec: standard (1mo/3%), medium (3mo/5%), high (6mo/7%), custom
// Why: validation rules differ per tier — discriminatedUnion lets Zod pick the right strategy

import { z } from "zod";

// Shared action plan step — spec requires minimum 5 strategic steps, AI-generated
const actionPlanStepSchema = z.object({
  phase: z.number().int().min(1),
  title: z.string().min(3),
  description: z.string().min(10),
});

// Base fields shared by all tiers
const baseContractFields = {
  id: z.string(),
  title: z.string().min(5),
  advisorId: z.string(),
  pymeId: z.string(),
  implementationBudget: z.number().positive(),   // colones — spec: "Presupuesto de implementación"
  monthlyRetainer: z.number().positive(),         // colones — spec: "Retainer mensual para el advisor"
  advisorCommissionPercentage: z.number().min(0).max(100), // spec: "Ganancia Advisor"
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  objectives: z.array(z.string()).min(1, "At least one measurable objective required"),
  actionPlan: z.array(actionPlanStepSchema).min(5, "Action plan requires at least 5 phases"),
  status: z.enum(["pending", "active", "complete", "cancelled"]),
};

// Strategy 1: Standard — 1 month, 3% PymeBoost commission
export const standardContractSchema = z.object({
  ...baseContractFields,
  tier: z.literal("standard"),
  durationMonths: z.literal(1),
  pymeBoostCommission: z.literal(3),
});

// Strategy 2: Medium — 3 months, 5% PymeBoost commission
export const mediumContractSchema = z.object({
  ...baseContractFields,
  tier: z.literal("medium"),
  durationMonths: z.literal(3),
  pymeBoostCommission: z.literal(5),
});

// Strategy 3: High — 6 months, 7% PymeBoost commission
export const highContractSchema = z.object({
  ...baseContractFields,
  tier: z.literal("high"),
  durationMonths: z.literal(6),
  pymeBoostCommission: z.literal(7),
});

// Strategy 4: Custom — flexible duration, commission starts at 3% + 1% per extra month
export const customContractSchema = z.object({
  ...baseContractFields,
  tier: z.literal("custom"),
  durationMonths: z.number().int().min(1),
  pymeBoostCommission: z.number().min(3),
}).refine(
  (data) => data.pymeBoostCommission === 3 + (data.durationMonths - 1),
  { message: "Custom commission must be 3% + 1% per additional month", path: ["pymeBoostCommission"] }
);

export type ContractTier = "standard" | "medium" | "high" | "custom";
export type StandardContract = z.infer<typeof standardContractSchema>;
export type MediumContract   = z.infer<typeof mediumContractSchema>;
export type HighContract     = z.infer<typeof highContractSchema>;
export type CustomContract   = z.infer<typeof customContractSchema>;

// Union discriminated by tier — Zod picks the right strategy automatically
export const contractSchema = z.discriminatedUnion("tier", [
  standardContractSchema,
  mediumContractSchema,
  highContractSchema,
  customContractSchema,
]);

export type Contract = z.infer<typeof contractSchema>;

export class ContractValidator {
  static validate(data: unknown): { valid: true; data: Contract } | { valid: false; error: string } {
    const result = contractSchema.safeParse(data);
    if (result.success) return { valid: true, data: result.data };
    return {
      valid: false,
      error: result.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; "),
    };
  }

  static validateStandard(data: unknown): { valid: true; data: StandardContract } | { valid: false; error: string } {
    const result = standardContractSchema.safeParse(data);
    return result.success ? { valid: true, data: result.data } : { valid: false, error: result.error.message };
  }

  static validateMedium(data: unknown): { valid: true; data: MediumContract } | { valid: false; error: string } {
    const result = mediumContractSchema.safeParse(data);
    return result.success ? { valid: true, data: result.data } : { valid: false, error: result.error.message };
  }

  static validateHigh(data: unknown): { valid: true; data: HighContract } | { valid: false; error: string } {
    const result = highContractSchema.safeParse(data);
    return result.success ? { valid: true, data: result.data } : { valid: false, error: result.error.message };
  }

  static validateCustom(data: unknown): { valid: true; data: CustomContract } | { valid: false; error: string } {
    const result = customContractSchema.safeParse(data);
    return result.success ? { valid: true, data: result.data } : { valid: false, error: result.error.message };
  }
}
