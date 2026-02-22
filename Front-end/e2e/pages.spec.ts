import { test, expect } from "@playwright/test";
import { BASE_URL } from "./helpers";

test.describe("Public pages", () => {
  test("Homepage loads", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");

    await expect(page.locator("body")).not.toBeEmpty();
  });

  test("Products page loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);
    await page.waitForLoadState("networkidle");

    await expect(
      page.locator("h1, h2, [class*='product']").first()
    ).toBeVisible({ timeout: 10000 });
  });
});
