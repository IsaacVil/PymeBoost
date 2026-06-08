import { describe, it, expect } from "vitest";
import { ContractValidator } from "@/features/contracts/validators/contractValidator";

describe("ContractValidator - fixed-price", () => {
  it("rejects negative price", () => {
    const result = ContractValidator.validateFixedPrice({
      id: "c1", type: "fixed-price", title: "Test Contract",
      totalPrice: -100, currency: "USD",
      startDate: new Date(), endDate: new Date(), deliverables: ["Deliverable 1"],
    });
    expect(result.valid).toBe(false);
  });

  it("accepts valid fixed-price contract", () => {
    const result = ContractValidator.validateFixedPrice({
      id: "c1", type: "fixed-price", title: "Process Audit",
      totalPrice: 5000, currency: "USD",
      startDate: new Date(), endDate: new Date(Date.now() + 86400000 * 30),
      deliverables: ["Process map", "Recommendations report"],
    });
    expect(result.valid).toBe(true);
  });
});

describe("ContractValidator - milestone-based", () => {
  it("requires at least 2 milestones", () => {
    const result = ContractValidator.validateMilestone({
      id: "c2", type: "milestone-based", title: "Optimization Project",
      totalPrice: 8000, currency: "USD",
      milestones: [{ title: "Phase 1", dueDate: new Date(), paymentPercentage: 100 }],
    });
    expect(result.valid).toBe(false);
  });
});
