import { test, expect, Page } from "@playwright/test";
import { BASE_URL, registerUser, uniqueSuffix } from "./helpers";

const SUFFIX = uniqueSuffix();
const CATEGORY = `E2E C${SUFFIX}`;
const BRAND = `E2E B${SUFFIX}`;
const MODEL = `MX${SUFFIX}`;

test.describe("Product CRUD", () => {
  test.describe.configure({ mode: "serial" });

  let page: Page;
  let productId: string;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await registerUser(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  // ── Create helpers (category & brand) ────────────────────────────

  test("Create category via dialog", async () => {
    await page.goto(`${BASE_URL}/products/post`);
    await page.waitForLoadState("networkidle");

    await page.locator("button", { hasText: "Add new category" }).click();
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    await page
      .locator('[role="dialog"] input[placeholder="Category name"]')
      .fill(CATEGORY);
    await page.locator('[role="dialog"] button[type="submit"]').click();

    await page.waitForSelector('[role="dialog"]', {
      state: "hidden",
      timeout: 10000,
    });
  });

  test("Create brand via dialog", async () => {
    // Still on /products/post from the previous test
    await page.locator("button", { hasText: "Add new brand" }).click();
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    await page
      .locator('[role="dialog"] input[placeholder="Brand name"]')
      .fill(BRAND);
    await page.locator('[role="dialog"] button[type="submit"]').click();

    await page.waitForSelector('[role="dialog"]', {
      state: "hidden",
      timeout: 10000,
    });
  });

  // ── Create ────────────────────────────────────────────────────────

  test("Create product (postProduct server action)", async () => {
    // Reload to pick up newly created category & brand
    await page.goto(`${BASE_URL}/products/post`);
    await page.waitForLoadState("networkidle");

    // Category
    const catSelect = page.locator("select").first();
    const catOption = catSelect.locator("option", { hasText: CATEGORY });
    await expect(catOption).toBeAttached({ timeout: 5000 });
    await catSelect.selectOption(await catOption.getAttribute("value")!);

    // Brand (waits for async reload after category change)
    const brandSelect = page.locator("select").nth(1);
    const brandOption = brandSelect.locator("option", { hasText: BRAND });
    await expect(brandOption).toBeAttached({ timeout: 15000 });
    await brandSelect.selectOption(await brandOption.getAttribute("value")!);

    // Fields
    await page.fill('input[placeholder="Model"]', MODEL);
    await page.fill('input[placeholder="Price"]', "299.99");
    await page.fill('input[placeholder="Stock"]', "10");
    await page.fill(
      'textarea[placeholder="Description"]',
      "E2E test product for migration verification."
    );

    await page.click('button[type="submit"]');

    // Success dialog with a link to the new product
    await page.waitForSelector('[role="dialog"]', { timeout: 15000 });

    const link = page.locator('[role="dialog"] a[href*="/products/"]').first();
    const href = await link.getAttribute("href");
    const match = href?.match(/\/products\/([^/]+)/);
    expect(match).toBeTruthy();
    productId = match![1];
  });

  // ── Read ──────────────────────────────────────────────────────────

  test("View product page", async () => {
    await page.goto(`${BASE_URL}/products/${productId}`);
    await page.waitForLoadState("networkidle");

    // Wait for the banner heading
    await expect(
      page.locator("h1", { hasText: /product/i })
    ).toBeVisible({ timeout: 15000 });

    // Owner should see Edit link
    await expect(page.locator("a", { hasText: "Edit" })).toBeVisible({
      timeout: 10000,
    });
  });

  // ── Update ────────────────────────────────────────────────────────

  test("Edit product (editProduct server action)", async () => {
    await page.goto(`${BASE_URL}/products/${productId}/edit`);
    await page.waitForLoadState("networkidle");

    const desc = page.locator('textarea[placeholder="Description"]');
    await expect(desc).toBeVisible({ timeout: 10000 });
    await desc.clear();
    await desc.fill("UPDATED via editProduct server action.");

    await page.click('button[type="submit"]');

    // Redirects back to product page
    await page.waitForURL(`**/products/${productId}`, { timeout: 15000 });
  });

  // ── Images page ───────────────────────────────────────────────────

  test("Manage images page loads (getProductImages)", async () => {
    await page.goto(`${BASE_URL}/products/${productId}/images`);
    await page.waitForLoadState("networkidle");

    const body = await page.innerText("body");
    expect(
      body.includes("Upload") || body.includes("doesn't have any images")
    ).toBeTruthy();
  });

  // ── Delete ────────────────────────────────────────────────────────

  test("Delete product (deleteProduct server action)", async () => {
    await page.goto(`${BASE_URL}/products/${productId}`);
    await page.waitForLoadState("networkidle");

    const deleteBtn = page.locator("button", { hasText: "Delete product" });
    await expect(deleteBtn).toBeVisible({ timeout: 15000 });
    await deleteBtn.click();

    // Confirmation dialog
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
    await page
      .locator('[role="dialog"] button', { hasText: "Delete" })
      .click();

    // Success message
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toContainText("successfully deleted", {
      timeout: 10000,
    });
  });

  test("Deleted product returns error page", async () => {
    const res = await page.goto(`${BASE_URL}/products/${productId}`);
    await page.waitForLoadState("networkidle");

    const body = await page.innerText("body");
    const gone =
      body.includes("not found") ||
      body.includes("404") ||
      body.includes("Error") ||
      res?.status() === 404 ||
      res?.status() === 500;
    expect(gone).toBeTruthy();
  });
});
