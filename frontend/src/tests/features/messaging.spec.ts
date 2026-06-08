import { describe, it, expect } from "vitest";
import { sendMessageSchema } from "@/features/messaging/validators/messagingValidator";

describe("messagingValidator", () => {
  it("rejects empty messages", () => {
    const result = sendMessageSchema.safeParse({ matchId: "m1", content: "" });
    expect(result.success).toBe(false);
  });

  it("rejects messages over 2000 chars", () => {
    const result = sendMessageSchema.safeParse({ matchId: "m1", content: "a".repeat(2001) });
    expect(result.success).toBe(false);
  });

  it("accepts valid message", () => {
    const result = sendMessageSchema.safeParse({ matchId: "m1", content: "Hello, let's discuss the proposal." });
    expect(result.success).toBe(true);
  });
});
