import { test, expect } from "@playwright/test";

test.describe("Create Product", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/create-product");
  });

  test("show error message", async ({ page }) => {
    const button = page.getByRole("button", { name: "Create product" });
    await button.click();

    await expect(page.getByText("Quantity is required")).toBeVisible();
    await expect(page.getByText("Measure_unity is required")).toBeVisible();
    await expect(page.getByText("Purchase price is required")).toBeVisible();
    await expect(page.getByText("Sale price is required")).toBeVisible();
    await expect(page.getByText("Currency is required")).toBeVisible();
    await expect(page.getByText("Supplier is required")).toBeVisible();
    await expect(page.getByText("Description is required")).toBeVisible();
  });

  test("create product successfully", async ({ page }) => {
    await page.route("*/**/product", (route) => {
      route.fulfill({
        status: 201,
      });
    });

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Product created successfully.");
      await dialog.dismiss();
    });

    await page.fill("input[name=productName]", "Iphone XR");
    await page.fill("input[name=quantity]", "1");
    await page.fill("input[name=measureUnity]", "un");
    await page.fill("input[name=purchasePrice]", "500");
    await page.fill("input[name=salePrice]", "1200");
    await page.fill("input[name=currency]", "BRL");
    await page.fill("input[name=supplier]", "Apple");
    await page.fill("textarea[name=description]", "Iphone XR sem água salgada");

    const button = page.getByRole("button", { name: "Create product" });
    await button.click();
  });

  test("create product failed", async ({ page }) => {
    await page.route("*/**/product", (route) => {
      route.fulfill({
        status: 400,
      });
    });
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Error when creating product.");
      await dialog.dismiss();
    });

    await page.fill("input[name=productName]", "Iphone XR");
    await page.fill("input[name=quantity]", "1");
    await page.fill("input[name=measureUnity]", "un");
    await page.fill("input[name=purchasePrice]", "500");
    await page.fill("input[name=salePrice]", "1200");
    await page.fill("input[name=currency]", "BRL");
    await page.fill("input[name=supplier]", "Apple");
    await page.fill("textarea[name=description]", "Iphone XR sem água salgada");

    const button = page.getByRole("button", { name: "Create product" });
    await button.click();
  });
});
