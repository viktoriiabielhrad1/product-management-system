import { test, expect } from "@playwright/test";
import { TEST_BRAND, addTestProduct, deleteTestProducts } from "./helpers";

test.afterEach(async ({ request }) => {
  await deleteTestProducts(request);
});

test("update page is filled with the current values", async ({ page, request }) => {
  const product = await addTestProduct(request, "Update Test");

  await page.goto(`/updateProduct/${product.id}`);
  await expect(page.getByLabel("Brand")).toHaveValue(TEST_BRAND);
  await expect(page.getByLabel("Model")).toHaveValue("Update Test");
  await expect(page.getByLabel("Price")).toHaveValue("100");
});

test("we can change a product and it is saved in the database", async ({ page, request }) => {
  const product = await addTestProduct(request, "Update Test");

  await page.goto(`/updateProduct/${product.id}`);
  //wait until the form has loaded the old values
  await expect(page.getByLabel("Model")).toHaveValue("Update Test");

  await page.getByLabel("Model").fill("Changed Model");
  await page.getByLabel("Price").fill("555");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("Product updated")).toBeVisible();

  //read the product back from the api and check the new values
  const res = await request.get(`/api/getOne?id=${product.id}`);
  const saved = await res.json();
  expect(saved.model).toBe("Changed Model");
  expect(saved.price).toBe("555");
});