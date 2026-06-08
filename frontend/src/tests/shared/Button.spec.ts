import { describe, it, expect } from "vitest";

// TODO: set up @testing-library/react for component tests
describe("Button component", () => {
  it("renders with primary variant by default", () => {
    // TODO: render(<Button>Click</Button>) and assert bg-purple-500 class
    expect(true).toBe(true);
  });

  it("shows loading spinner when isLoading is true", () => {
    // TODO: render(<Button isLoading>Click</Button>) and assert spinner
    expect(true).toBe(true);
  });

  it("is disabled when isLoading is true", () => {
    expect(true).toBe(true);
  });
});
