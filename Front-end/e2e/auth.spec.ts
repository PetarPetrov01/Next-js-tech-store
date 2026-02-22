import { test, expect, Page } from "@playwright/test";
import { BASE_URL, registerUser } from "./helpers";

test.describe("Auth flows", () => {
  test.describe.configure({ mode: "serial" });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await registerUser(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("Protected route is accessible after registration", async () => {
    await page.goto(`${BASE_URL}/products/post`);
    await page.waitForLoadState("networkidle");

    // Should NOT redirect to /login
    expect(page.url()).not.toContain("/login");
  });

  test("Profile page loads (getProfile server action)", async () => {
    await page.goto(`${BASE_URL}/profile`);
    await page.waitForLoadState("networkidle");

    expect(page.url()).not.toContain("/login");
  });

  test("Cart page loads (auth() session check)", async () => {
    await page.goto(`${BASE_URL}/cart`);
    await page.waitForLoadState("networkidle");

    expect(page.url()).not.toContain("/login");
  });
});
