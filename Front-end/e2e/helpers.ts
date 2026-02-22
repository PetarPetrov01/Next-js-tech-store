import { Page } from "@playwright/test";

export const BASE_URL = "http://localhost:3000";
export const TEST_PASSWORD = "123123";

/**
 * Register a fresh user and return their email.
 * The app auto-logs in after registration.
 */
export async function registerUser(page: Page): Promise<string> {
  const ts = Date.now();
  const email = `e2e${ts}@test.com`;

  await page.goto(`${BASE_URL}/register`);
  await page.waitForLoadState("networkidle");

  await page.fill('input[placeholder="First name"]', "E2E");
  await page.fill('input[placeholder="Last name"]', "Tester");
  await page.fill('input[placeholder="Email"]', email);
  await page.fill('input[placeholder="Username"]', `e2e${ts}`);
  await page.fill('input[placeholder="Password"]', TEST_PASSWORD);
  await page.fill('input[placeholder="Repeat password"]', TEST_PASSWORD);
  await page.click('button[type="submit"]');

  // Wait for redirect after auto-login
  await page.waitForURL((url) => !url.pathname.includes("/register"), {
    timeout: 10000,
  });
  await page.waitForLoadState("networkidle");

  return email;
}

/** Unique suffix for names that must be ≤15 chars (categories, brands). */
export function uniqueSuffix(): string {
  return Date.now().toString().slice(-4);
}
