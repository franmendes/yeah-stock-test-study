import { test, expect } from "@playwright/test";

test.describe("Sign in", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-in");
  });

  test("has title", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("show error message", async ({ page }) => {
    const button = page.getByRole("button", { name: "Login" });
    await button.click();

    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("login successfully", async ({ page }) => {
    await page.route("*/**/users/sessions", (route) => {
      const json = { token: "banana" };

      route.fulfill({
        status: 200,
        body: JSON.stringify(json),
      });
    });

    await page.fill("input[name=email]", "yeah@email.com");
    await page.fill("input[name=password]", "12345678");

    await page.click("button[type=submit]");

    expect(page.url()).toBe("http://localhost:5173/");
  });

  test("login failed", async ({ page }) => {
    await page.route("*/**/users/sessions", (route) => {
      route.fulfill({
        status: 401,
      });
    });

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain(
        "Error when trying to sign in, try again later."
      );
      await dialog.dismiss();
    });

    await page.fill("input[name=email]", "yeah@email.com");
    await page.fill("input[name=password]", "12345678");

    await page.click("button[type=submit]");
  });

  test("redirect to sign up", async ({ page }) => {
    await page.click("a[href='/sign-up']");

    expect(page.url()).toContain("/sign-up");
  });
});
