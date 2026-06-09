import { describe, it, expect } from "vitest";
import { ContractValidator } from "@/features/contracts/validators/contractValidator";

const baseContract = {
  id: "c1",
  title: "Process Audit",
  advisorId: "adv-1",
  pymeId: "pyme-1",
  implementationBudget: 500_000,
  monthlyRetainer: 150_000,
  advisorCommissionPercentage: 10,
  startDate: new Date("2026-07-01"),
  endDate: new Date("2026-08-01"),
  objectives: ["Increase sales conversion by 25%"],
  actionPlan: [
    { phase: 1, title: "Diagnosis",      description: "Analyze current processes and identify gaps" },
    { phase: 2, title: "Planning",       description: "Define optimized process and KPIs" },
    { phase: 3, title: "Execution",      description: "Implement the new process with the team" },
    { phase: 4, title: "Monitoring",     description: "Track KPIs and adjust based on results" },
    { phase: 5, title: "Final report",   description: "Deliver report and measure impact vs baseline" },
  ],
  status: "pending" as const,
};

describe("ContractValidator - standard tier", () => {
  it("accepts a valid standard contract (1 month, 3%)", () => {
    const result = ContractValidator.validateStandard({
      ...baseContract,
      tier: "standard",
      durationMonths: 1,
      pymeBoostCommission: 3,
    });
    expect(result.valid).toBe(true);
  });

  it("rejects standard contract with wrong commission", () => {
    const result = ContractValidator.validateStandard({
      ...baseContract,
      tier: "standard",
      durationMonths: 1,
      pymeBoostCommission: 5,
    });
    expect(result.valid).toBe(false);
  });
});

describe("ContractValidator - medium tier", () => {
  it("accepts a valid medium contract (3 months, 5%)", () => {
    const result = ContractValidator.validateMedium({
      ...baseContract,
      tier: "medium",
      durationMonths: 3,
      pymeBoostCommission: 5,
      endDate: new Date("2026-10-01"),
    });
    expect(result.valid).toBe(true);
  });
});

describe("ContractValidator - high tier", () => {
  it("accepts a valid high contract (6 months, 7%)", () => {
    const result = ContractValidator.validateHigh({
      ...baseContract,
      tier: "high",
      durationMonths: 6,
      pymeBoostCommission: 7,
      endDate: new Date("2027-01-01"),
    });
    expect(result.valid).toBe(true);
  });
});

describe("ContractValidator - custom tier", () => {
  it("accepts valid custom contract with correct commission (3% + 1% per extra month)", () => {
    // 4 months → 3% + (4-1)*1% = 6%
    const result = ContractValidator.validateCustom({
      ...baseContract,
      tier: "custom",
      durationMonths: 4,
      pymeBoostCommission: 6,
      endDate: new Date("2026-11-01"),
    });
    expect(result.valid).toBe(true);
  });

  it("rejects custom contract with wrong commission calculation", () => {
    // 4 months → should be 6%, not 8%
    const result = ContractValidator.validateCustom({
      ...baseContract,
      tier: "custom",
      durationMonths: 4,
      pymeBoostCommission: 8,
      endDate: new Date("2026-11-01"),
    });
    expect(result.valid).toBe(false);
  });
});

describe("ContractValidator - generic validate()", () => {
  it("rejects contract missing required objectives", () => {
    const result = ContractValidator.validate({
      ...baseContract,
      tier: "standard",
      durationMonths: 1,
      pymeBoostCommission: 3,
      objectives: [],
    });
    expect(result.valid).toBe(false);
  });

  it("rejects contract with fewer than 5 action plan phases", () => {
    const result = ContractValidator.validate({
      ...baseContract,
      tier: "standard",
      durationMonths: 1,
      pymeBoostCommission: 3,
      actionPlan: baseContract.actionPlan.slice(0, 3),
    });
    expect(result.valid).toBe(false);
  });
});
