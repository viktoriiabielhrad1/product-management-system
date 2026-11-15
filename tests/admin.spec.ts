import { test, expect } from "@playwright/test";

test("admin page exists", async ({ page }) => {
  const response = await page.goto("/admin");
  expect(response?.status()).toBe(200);
});

test("admin page shows the bar graph", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: /bar graph/ })).toBeVisible();
  await expect(page.locator(".card svg").first()).toBeVisible();
});

test("admin page shows the line graph", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: /line graph/ })).toBeVisible();
  await expect(page.locator("canvas")).toBeVisible();
});