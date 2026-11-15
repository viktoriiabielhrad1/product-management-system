import { test, expect } from "@playwright/test";
import { addTestProduct, deleteTestProducts } from "./helpers";

test.afterEach(async ({ request }) => {
  await deleteTestProducts(request);
});

test("single product page shows the product details", async ({ page, request }) => {
  const product = await addTestProduct(request, "Single Test");

  await page.goto(`/products/${product.id}`);
  await expect(page.getByText("Model: Single Test")).toBeVisible();
  await expect(page.getByText("Price: €100")).toBeVisible();
  await expect(page.getByText("Description: Made by a test")).toBeVisible();
});

test("single product page has a link to the update page", async ({ page, request }) => {
  const product = await addTestProduct(request, "Single Test");

  await page.goto(`/products/${product.id}`);
  await page.getByRole("link", { name: "Edit this product" }).click();
  await expect(page).toHaveURL(`/updateProduct/${product.id}`);
});

test("a wrong id shows product not found", async ({ page }) => {
  await page.goto("/products/thisiddoesnotexist");
  await expect(page.getByText("Product not found")).toBeVisible();
});