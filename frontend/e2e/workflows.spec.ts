import { test, expect } from "@playwright/test";

// ---------------------------------------------------------------------------
// Auth workflow
// ---------------------------------------------------------------------------

test.describe("Authentication", () => {
  test("redirects unauthenticated user to login", async ({ page }) => {
    await page.goto("/");
    // TODO: assert redirect to /login
    await expect(page).toHaveURL(/login/);
  });

  test("@smoke login with valid credentials", async ({ page }) => {
    await page.goto("/login");
    // TODO: fill Auth0 login form and submit
    // await page.fill('[name="email"]', process.env.E2E_USER_EMAIL!);
    // await page.fill('[name="password"]', process.env.E2E_USER_PASSWORD!);
    // await page.click('[type="submit"]');
    // TODO: assert landing on dashboard
    await expect(page).toHaveURL("/");
  });

  test("logout clears session and redirects to login", async ({ page }) => {
    // TODO: authenticate first (use storageState or loginAs helper)
    // await page.goto("/");
    // await page.click('[data-testid="logout-btn"]');
    await expect(page).toHaveURL(/login/);
  });
});

// ---------------------------------------------------------------------------
// Matching workflow
// ---------------------------------------------------------------------------

test.describe("Matching", () => {
  test.beforeEach(async ({ page }) => {
    // TODO: load authenticated session via storageState
    // await page.goto("/matching");
  });

  test("@smoke displays advisor recommendations", async ({ page }) => {
    await page.goto("/matching");
    // TODO: assert MatchingCard components are visible
    // await expect(page.locator('[data-testid="matching-card"]')).toHaveCount(
    //   { min: 1 }
    // );
  });

  test("swipe approved sends request and refreshes list", async ({ page }) => {
    await page.goto("/matching");
    // TODO: click swipe approved on first card
    // await page.locator('[data-testid="swipe-approved"]').first().click();
    // TODO: assert card disappears and list updates
  });

  test("swipe rejected removes card from list", async ({ page }) => {
    await page.goto("/matching");
    // TODO: click swipe rejected on first card
    // await page.locator('[data-testid="swipe-rejected"]').first().click();
    // TODO: assert card is removed
  });
});

// ---------------------------------------------------------------------------
// Contract workflow
// ---------------------------------------------------------------------------

test.describe("Contracts", () => {
  test.beforeEach(async ({ page }) => {
    // TODO: load authenticated session via storageState
  });

  test("@smoke displays contract list", async ({ page }) => {
    await page.goto("/contracts");
    // TODO: assert contract items visible
    // await expect(page.locator('[data-testid="contract-item"]')).toHaveCount(
    //   { min: 1 }
    // );
  });

  test("opens contract detail with correct tier and terms", async ({
    page,
  }) => {
    await page.goto("/contracts");
    // TODO: click first contract
    // await page.locator('[data-testid="contract-item"]').first().click();
    // TODO: assert ContractViewer shows tier, dates, budget
  });

  test("standard contract shows 1-month duration and 3% commission", async ({
    page,
  }) => {
    // TODO: navigate to a known standard-tier contract
    // TODO: assert durationMonths = 1 and pymeBoostCommission = 3%
  });
});

// ---------------------------------------------------------------------------
// Messaging workflow
// ---------------------------------------------------------------------------

test.describe("Messaging", () => {
  test.beforeEach(async ({ page }) => {
    // TODO: load authenticated session via storageState
  });

  test("@smoke displays conversation list", async ({ page }) => {
    await page.goto("/messages");
    // TODO: assert conversation items visible
  });

  test("sends a message and appears in thread", async ({ page }) => {
    await page.goto("/messages");
    // TODO: open first conversation
    // await page.locator('[data-testid="conversation-item"]').first().click();
    // TODO: type and submit a message
    // await page.fill('[data-testid="message-input"]', "Hello");
    // await page.keyboard.press("Enter");
    // TODO: assert message appears in thread
  });
});
