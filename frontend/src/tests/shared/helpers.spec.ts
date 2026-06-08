import { describe, it, expect } from "vitest";
import { formatCurrency, formatRelativeTime, truncate, generateId } from "@/shared/utils/helpers";

describe("formatCurrency", () => {
  it("formats USD correctly", () => {
    expect(formatCurrency(1500, "USD")).toBe("$1,500.00");
  });
});

describe("truncate", () => {
  it("truncates long strings with ellipsis", () => {
    expect(truncate("Hello world from PymeBoost", 11)).toBe("Hello world…");
  });

  it("leaves short strings unchanged", () => {
    expect(truncate("Short", 20)).toBe("Short");
  });
});

describe("generateId", () => {
  it("returns unique ids", () => {
    const a = generateId();
    const b = generateId();
    expect(a).not.toBe(b);
  });
});

describe("formatRelativeTime", () => {
  it("returns 'just now' for recent timestamps", () => {
    expect(formatRelativeTime(Date.now())).toBe("just now");
  });
});
