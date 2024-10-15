import { test, expect } from "@playwright/test";

test.describe("Edit Product", () => {
  test("Show messages errors", async ({ page }) => {
    await page.route("*/**/products/10", (route) => {
      const products = {
        id: "10",
        title: "Iphone XR",
        quantity: "1",
        measure: "un",
        salePrice: "800",
        purchasePrice: "1200",
        currency: "BRL",
        supplier: "APPLE",
        status: "completed",
        description: "Iphone XR seminovo",
        createdAt: new Date(),
      };

      route.fulfill({
        status: 200,
        body: JSON.stringify(products),
      });
    });

    await page.goto("/edit-product/10");

    await page.fill("input[name=productName]", "");
    await page.fill("input[name=quantity]", "");
    await page.fill("input[name=measureUnity]", "");
    await page.fill("input[name=purchasePrice]", "");
    await page.fill("input[name=salePrice]", "");
    await page.fill("input[name=currency]", "");
    await page.fill("input[name=supplier]", "");
    await page.fill("textarea[name=description]", "");

    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page.getByText("Quantity is required")).toBeVisible();
    await expect(page.getByText("Measure_unity is required")).toBeVisible();
    await expect(page.getByText("Purchase price is required")).toBeVisible();
    await expect(page.getByText("Sale price is required")).toBeVisible();
    await expect(page.getByText("Currency is required")).toBeVisible();
    await expect(page.getByText("Supplier is required")).toBeVisible();
    await expect(page.getByText("Description is required")).toBeVisible();

    await page.waitForTimeout(3000);
  });

  test("Success edit product", async ({ page }) => {
    await page.route("*/**/products/10", (route) => {
      const method = route.request().method();

      if (method === "GET") {
        const products = {
          id: "10",
          title: "Iphone XR",
          quantity: "1",
          measure: "un",
          salePrice: "800",
          purchasePrice: "1200",
          currency: "BRL",
          supplier: "APPLE",
          status: "completed",
          description: "Iphone XR seminovo",
          createdAt: new Date(),
        };

        route.fulfill({
          status: 200,
          body: JSON.stringify(products),
        });
      } else {
        route.fulfill({
          status: 200,
        });
      }
    });

    await page.goto("/edit-product/10");

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Product edited successfully.");
      await dialog.dismiss();
    });

    await page.getByRole("button", { name: "Save changes" }).click();

    await page.waitForTimeout(3000);
  });

  test("Delete product successfully", async ({ page }) => {
    await page.route("**/products/10", (route) => {
      const method = route.request().method();

      if (method === "GET") {
        const products = {
          id: "10",
          title: "Iphone XR",
          quantity: "1",
          measure: "un",
          salePrice: "800",
          purchasePrice: "1200",
          currency: "BRL",
          supplier: "APPLE",
          status: "completed",
          description: "Iphone XR seminovo",
          createdAt: new Date(),
        };

        route.fulfill({
          status: 200,
          body: JSON.stringify(products),
        });
      } else {
        route.fulfill({
          status: 200,
        });
      }
    });

    await page.goto("/edit-product/10");

    await page.getByRole("button", { name: "Trash" }).click();

    await page.waitForTimeout(3000);

    expect(page.url()).toBe("http://localhost:5173/");
  });
});
