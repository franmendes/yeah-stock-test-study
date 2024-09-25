import { test, expect } from "@playwright/test";

test.describe("Sign up", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-up");
  });

  test("show error message", async ({ page }) => {
    const button = page.getByRole("button", { name: "SignUp" });
    await button.click();

    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("signup successfully", async ({ page }) => {
    await page.route("*/**/users", (route) => {
      route.fulfill({
        status: 201,
      });
    });

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain(
        "User created with success, now you can sign in."
      );
      await dialog.dismiss();
    });

    await page.fill("input[name=name]", "fran");
    await page.fill("input[name=email]", "yeah@email.com");
    await page.fill("input[name=password]", "12345678");

    const button = page.getByRole("button", { name: "SignUp" });
    await button.click();
  });

  test("signup failed", async ({ page }) => {
    await page.route("*/**/users", (route) => {
      route.fulfill({
        status: 400,
      });
    });

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain(
        "Error where trying to sign up, try again later."
      );
      await dialog.dismiss();
    });

    await page.fill("input[name=name]", "fran");
    await page.fill("input[name=email]", "yeah@email.com");
    await page.fill("input[name=password]", "12345678");

    const button = page.getByRole("button", { name: "SignUp" });
    await button.click();
  });

  test("redirect to sign in", async ({ page }) => {
    await page.click("a[href='/sign-in']");

    expect(page.url()).toContain("/sign-in");
  });
});
