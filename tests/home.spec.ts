import { test, expect } from "@playwright/test";

test("home page exists", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
});

test("home page shows the title from Redis", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Laptop Store" })).toBeVisible();
});

test("home page shows the welcome card from Redis", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Welcome!" })).toBeVisible();
});

test("home page has a link to the products page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Products" }).click();
  await expect(page).toHaveURL(/\/products/);
});