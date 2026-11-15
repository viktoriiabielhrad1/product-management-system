import { test, expect, Page } from "@playwright/test";
import { TEST_BRAND, getTestProducts, deleteTestProducts } from "./helpers";

// clean up after every test
test.afterEach(async ({ request }) => {
  await deleteTestProducts(request);
});

// type values into the form fields
async function fillForm(page: Page, model: string, price: string, description: string) {
  await page.getByLabel("Brand").fill(TEST_BRAND);
  await page.getByLabel("Model").fill(model);
  await page.getByLabel("Price").fill(price);
  await page.getByLabel("Description").fill(description);
}

test("add product page exists", async ({ page }) => {
  const response = await page.goto("/addProduct");
  expect(response?.status()).toBe(200);
});

test("we can add data into all the fields", async ({ page }) => {
  await page.goto("/addProduct");
  await fillForm(page, "Test Model", "100", "Test description");
  await page.getByLabel("Image link").fill("https://res.cloudinary.com/demo/test.jpg");

  await expect(page.getByLabel("Brand")).toHaveValue(TEST_BRAND);
  await expect(page.getByLabel("Model")).toHaveValue("Test Model");
  await expect(page.getByLabel("Price")).toHaveValue("100");
  await expect(page.getByLabel("Description")).toHaveValue("Test description");
  await expect(page.getByLabel("Image link")).toHaveValue("https://res.cloudinary.com/demo/test.jpg");
});

test("we can submit the data", async ({ page }) => {
  await page.goto("/addProduct");
  await fillForm(page, "Test Model", "100", "Test description");
  await page.getByRole("button", { name: "Add product" }).click();
  await expect(page.getByText("Product added")).toBeVisible();
});

test("the data exists in the database after submitting", async ({ page, request }) => {
  await page.goto("/addProduct");
  await fillForm(page, "Test Model", "100", "Test description");
  await page.getByRole("button", { name: "Add product" }).click();
  await expect(page.getByText("Product added")).toBeVisible();

  const saved = await getTestProducts(request);
  expect(saved.length).toBe(1);
  expect(saved[0].model).toBe("Test Model");
  expect(saved[0].price).toBe("100");
  expect(saved[0].description).toBe("Test description");
});

test("an empty form is not submitted", async ({ page, request }) => {
  await page.goto("/addProduct");
  await page.getByRole("button", { name: "Add product" }).click();

  // the browser stops the form because the fields are required
  await expect(page.getByText("Product added")).toHaveCount(0);
  expect((await getTestProducts(request)).length).toBe(0);
});

// different kinds of input strings
const inputs = [
  { name: "a long string", value: "a".repeat(300) },
  { name: "a short string", value: "a" },
  { name: "numbers", value: "1234567890" },
  { name: "wildcards", value: "% _ * ?" },
  { name: "strange characters", value: "<b>bold</b> ' \" & ü ї 日本 😀" },
];

for (const input of inputs) {
  test(`add product with ${input.name}`, async ({ page, request }) => {
    await page.goto("/addProduct");
    await fillForm(page, input.value, input.value, input.value);
    await page.getByRole("button", { name: "Add product" }).click();
    await expect(page.getByText("Product added")).toBeVisible();

    // the database should hold exactly what we typed
    const saved = await getTestProducts(request);
    expect(saved[0].model).toBe(input.value);
    expect(saved[0].price).toBe(input.value);
    expect(saved[0].description).toBe(input.value);
  });
}