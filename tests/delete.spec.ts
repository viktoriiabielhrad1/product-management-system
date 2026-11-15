import { test, expect } from "@playwright/test";
import { addTestProduct, getTestProducts, deleteTestProducts } from "./helpers";

test.afterEach(async ({ request }) => {
  await deleteTestProducts(request);
});

test("delete button removes the product", async ({ page, request }) => {
  await addTestProduct(request, "Delete Me");

  await page.goto("/products");
  //find the table row for the test product
  const row = page.getByRole("row").filter({ hasText: "Delete Me" });
  await expect(row).toBeVisible();

  await row.getByRole("button", { name: "Delete" }).click();

  //the row is gone from the page and from the database
  await expect(row).toHaveCount(0);
  expect((await getTestProducts(request)).length).toBe(0);
});