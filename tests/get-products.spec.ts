import { test } from "@playwright/test";

test.describe("Get Product", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.only("show products", async ({ page }) => {
    await page.route("*/**/products", (route) => {
      const products = {
        data: [
          {
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
          },
        ],
      };

      route.fulfill({
        status: 200,
        body: JSON.stringify(products),
      });
    });

    await page.waitForTimeout(3000);
  });
});
