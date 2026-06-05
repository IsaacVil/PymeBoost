// Strategy Pattern: Different contract types have different validation rules
// Why: Runtime validation ensures invalid data never reaches components or state
//       New validation types can be added without modifying components

import { z } from "zod";

export type ContractType = "fixed-price" | "hourly" | "milestone-based";

// Strategy 1: Fixed-price contracts
export const fixedPriceContractSchema = z.object({
  id: z.string(),
  type: z.literal("fixed-price"),
  title: z.string().min(5),
  totalPrice: z.number().positive("Price must be positive"),
  currency: z.enum(["USD", "CRC"]),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  deliverables: z.array(z.string()).min(1, "At least one deliverable required"),
});

export type FixedPriceContract = z.infer<typeof fixedPriceContractSchema>;

// Strategy 2: Hourly contracts
export const hourlyContractSchema = z.object({
  id: z.string(),
  type: z.literal("hourly"),
  title: z.string().min(5),
  hourlyRate: z.number().positive("Rate must be positive"),
  estimatedHours: z.number().positive().optional(),
  currency: z.enum(["USD", "CRC"]),
  startDate: z.coerce.date(),
});

export type HourlyContract = z.infer<typeof hourlyContractSchema>;

// Strategy 3: Milestone-based contracts
export const milestoneContractSchema = z.object({
  id: z.string(),
  type: z.literal("milestone-based"),
  title: z.string().min(5),
  milestones: z.array(
    z.object({
      title: z.string(),
      dueDate: z.coerce.date(),
      paymentPercentage: z.number().min(0).max(100),
    })
  ).min(2, "At least 2 milestones required"),
  totalPrice: z.number().positive(),
  currency: z.enum(["USD", "CRC"]),
});

export type MilestoneContract = z.infer<typeof milestoneContractSchema>;

// Union type: any contract type
export const contractSchema = z.union([
  fixedPriceContractSchema,
  hourlyContractSchema,
  milestoneContractSchema,
]);

export type Contract = z.infer<typeof contractSchema>;

// Validator class: applies the right strategy based on contract type
export class ContractValidator {
  static validate(data: unknown): { valid: true; data: Contract } | { valid: false; error: string } {
    const result = contractSchema.safeParse(data);

    if (result.success) {
      return { valid: true, data: result.data };
    }

    return {
      valid: false,
      error: result.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; "),
    };
  }

  // Validate specific type
  static validateFixedPrice(data: unknown): { valid: true; data: FixedPriceContract } | { valid: false; error: string } {
    const result = fixedPriceContractSchema.safeParse(data);
    return result.success ? { valid: true, data: result.data } : { valid: false, error: result.error.message };
  }

  static validateHourly(data: unknown): { valid: true; data: HourlyContract } | { valid: false; error: string } {
    const result = hourlyContractSchema.safeParse(data);
    return result.success ? { valid: true, data: result.data } : { valid: false, error: result.error.message };
  }

  static validateMilestone(data: unknown): { valid: true; data: MilestoneContract } | { valid: false; error: string } {
    const result = milestoneContractSchema.safeParse(data);
    return result.success ? { valid: true, data: result.data } : { valid: false, error: result.error.message };
  }
}
