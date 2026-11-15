import { APIRequestContext } from "@playwright/test";

//every product made by a test uses this brand to find and delete it
export const TEST_BRAND = "PWTest";

//add one test product straight through the api and return it
export async function addTestProduct(request: APIRequestContext, model: string) {
  const params = new URLSearchParams({
    brand: TEST_BRAND,
    model,
    price: "100",
    description: "Made by a test",
  });
  const res = await request.get(`/api/addProduct?${params}`);
  return await res.json();
}

//get every test product that is in the database right now
export async function getTestProducts(request: APIRequestContext) {
  const res = await request.get("/api/getAll");
  const products = await res.json();
  return products.filter((p: any) => p.brand === TEST_BRAND);
}

//delete every test product so the database is clean again
export async function deleteTestProducts(request: APIRequestContext) {
  for (const product of await getTestProducts(request)) {
    await request.delete(`/api/deleteProduct?id=${product.id}`);
  }
}