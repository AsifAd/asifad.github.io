import { test, expect } from "@playwright/test";

test.describe("hero name", () => {
  test("name is larger than role title", async ({ page }) => {
    await page.goto("/");

    const nameSize = await page.getByTestId("hero-name").evaluate((el) => {
      return parseFloat(getComputedStyle(el).fontSize);
    });
    const roleSize = await page.getByTestId("hero-title").evaluate((el) => {
      return parseFloat(getComputedStyle(el).fontSize);
    });

    expect(nameSize).toBeGreaterThan(roleSize);
  });

  test("status pill shows Bengaluru without remote", async ({ page }) => {
    await page.goto("/");
    const pill = page.getByTestId("hero-status");
    await expect(pill).toContainText("Bengaluru, IN");
    await expect(pill).not.toContainText(/remote/i);
  });
});
