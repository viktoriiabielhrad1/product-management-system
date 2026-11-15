import { test, expect } from "@playwright/test";

test("products page exists", async ({ page }) => {
  const response = await page.goto("/products");
  expect(response?.status()).toBe(200);
});

test("products page shows the table headings", async ({ page }) => {
  await page.goto("/products");
  await expect(page.getByRole("columnheader", { name: "Brand" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Model" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Price" })).toBeVisible();
});

test("products page shows laptops from the database", async ({ page }) => {
  await page.goto("/products");
  await expect(page.getByRole("cell", { name: "Dell", exact: true }).first()).toBeVisible();
  await expect(page.getByRole("cell", { name: "Lenovo", exact: true }).first()).toBeVisible();
  await expect(page.getByRole("cell", { name: "Acer", exact: true }).first()).toBeVisible();
});

test("products page shows laptop images", async ({ page }) => {
  await page.goto("/products");
  await expect(page.locator("tbody img").first()).toBeVisible();
});

test("view link opens the single product page", async ({ page }) => {
  await page.goto("/products");
  await page.getByRole("link", { name: "View" }).first().click();
  await expect(page).toHaveURL(/\/products\/.+/);
});

test("edit link opens the update page", async ({ page }) => {
  await page.goto("/products");
  await page.getByRole("link", { name: "Edit" }).first().click();
  await expect(page).toHaveURL(/\/updateProduct\/.+/);
});
