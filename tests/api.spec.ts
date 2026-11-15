import { test, expect } from "@playwright/test";
import { addTestProduct, deleteTestProducts } from "./helpers";

test.afterEach(async ({ request }) => {
  await deleteTestProducts(request);
});

test("getAll returns a list of products", async ({ request }) => {
  const res = await request.get("/api/getAll");
  expect(res.status()).toBe(200);
  expect(Array.isArray(await res.json())).toBe(true);
});

test("getOne without an id returns 400", async ({ request }) => {
  const res = await request.get("/api/getOne");
  expect(res.status()).toBe(400);
});

test("getOne with a wrong id returns 404", async ({ request }) => {
  const res = await request.get("/api/getOne?id=thisiddoesnotexist");
  expect(res.status()).toBe(404);
});

test("addProduct with missing values returns 400", async ({ request }) => {
  const res = await request.get("/api/addProduct?brand=PWTest");
  expect(res.status()).toBe(400);
});

test("addProduct with all values returns 201", async ({ request }) => {
  const res = await request.get(
    "/api/addProduct?brand=PWTest&model=Api%20Test&price=1&description=test"
  );
  expect(res.status()).toBe(201);
});

test("updateProduct with missing values returns 400", async ({ request }) => {
  const res = await request.get("/api/updateProduct?id=abc");
  expect(res.status()).toBe(400);
});

test("deleteProduct without an id returns 400", async ({ request }) => {
  const res = await request.delete("/api/deleteProduct");
  expect(res.status()).toBe(400);
});

test("deleteProduct removes the product", async ({ request }) => {
  const product = await addTestProduct(request, "Api Delete Test");

  const res = await request.delete(`/api/deleteProduct?id=${product.id}`);
  expect(res.status()).toBe(200);

  //it should be gone now
  const check = await request.get(`/api/getOne?id=${product.id}`);
  expect(check.status()).toBe(404);
});