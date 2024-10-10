import { test, expect } from "@playwright/test";

test.describe("Get Product", () => {
  test("show products", async ({ page }) => {
    await page.route("*/**/products?&", (route) => {
      const products = [
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
      ];

      route.fulfill({
        status: 200,
        body: JSON.stringify(products),
      });
    });

    await page.goto("/");
    await page.waitForTimeout(3000);
  });

  test("search product", async ({ page }) => {
    await page.route("*/**/products?&", (route) => {
      const products = [
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
        {
          id: "11",
          title: "Iphone 11",
          quantity: "1",
          measure: "un",
          salePrice: "800",
          purchasePrice: "1200",
          currency: "BRL",
          supplier: "APPLE",
          status: "completed",
          description: "Iphone 11 seminovo",
          createdAt: new Date(),
        },
        {
          id: "12",
          title: "Iphone 12",
          quantity: "1",
          measure: "un",
          salePrice: "800",
          purchasePrice: "1200",
          currency: "BRL",
          supplier: "APPLE",
          status: "completed",
          description: "Iphone 12 seminovo",
          createdAt: new Date(),
        },
      ];

      route.fulfill({
        status: 200,
        body: JSON.stringify(products),
      });
    });

    await page.goto("/");

    await page.route("*/**/products?title=iphone%2012&", (route) => {
      const products = [
        {
          id: "12",
          title: "Iphone 12",
          quantity: "1",
          measure: "un",
          salePrice: "800",
          purchasePrice: "1200",
          currency: "BRL",
          supplier: "APPLE",
          status: "completed",
          description: "Iphone 12 seminovo",
          createdAt: new Date(),
        },
      ];

      route.fulfill({
        status: 200,
        body: JSON.stringify(products),
      });
    });

    await page.fill('input[placeholder="Search product"]', "iphone 12");

    const productCard = await page.getByTestId("card--product-card");

    const productCount = await productCard.count();

    expect(productCount).toBe(1);

    await page.waitForTimeout(3000);
  });
});
