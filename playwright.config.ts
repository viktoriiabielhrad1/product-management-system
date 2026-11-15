import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", // where our test files live
  workers: 1, // run tests one at a time, so they don't clash in the database
  reporter: "list", // print each test and its result in the terminal
  use: {
    baseURL: "http://localhost:3000", // lets us write page.goto("/products")
  },
});