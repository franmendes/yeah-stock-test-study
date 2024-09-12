import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173/sign-in");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Vite/);
});

test("has login form", async ({ page }) => {
  await page.goto("http://localhost:5173/sign-in");

  // Expect a form with a name attribute of "login".
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
});
