import { test, expect } from "@playwright/test";

test.describe("Delete Product", () => {
  test("success delete products", async ({ page }) => {
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

    await page.route("*/**/products/10", (route) => {
      route.fulfill({
        status: 200,
      });
    });

    await page.goto("/");
    await page.getByText("Iphone XR").click();
    await page.getByText("Trash").click();
    expect(page.getByRole("heading"));

    await page.waitForTimeout(3000);
  });
});
