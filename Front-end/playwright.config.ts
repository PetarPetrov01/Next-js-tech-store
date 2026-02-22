import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60000,
  expect: { timeout: 10000 },
  use: {
    baseURL: "http://localhost:3000",
    browserName: "chromium",
    screenshot: "off",
    trace: "off",
  },
});
