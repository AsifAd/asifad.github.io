import { test, expect } from "@playwright/test";
import { waitForBootLoaderDone } from "./helpers";

test.describe("responsive search trigger", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForBootLoaderDone(page);
  });

  test("mobile shows Search trigger without ⌘K in hero", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await expect(page.getByTestId("hero-search-trigger")).toBeVisible();
    await expect(page.getByTestId("hero-cmd-hint")).toBeHidden();
    await expect(page.getByTestId("command-trigger")).toBeVisible();
    await expect(page.getByTestId("command-trigger").locator("kbd")).toBeHidden();
  });

  test("mobile search buttons open the palette", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.getByTestId("hero-search-trigger").click();
    await expect(page.getByPlaceholder("Search")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByPlaceholder("Search")).toHaveCount(0);
    const navSearch = page.getByTestId("command-trigger");
    await navSearch.scrollIntoViewIfNeeded();
    await navSearch.click();
    await expect(page.getByPlaceholder("Search")).toBeVisible();
  });

  test("desktop shows ⌘K hint in nav and hero", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    await expect(page.getByTestId("hero-cmd-hint")).toBeVisible();
    await expect(page.getByTestId("hero-search-trigger")).toBeHidden();
    await expect(page.getByTestId("command-trigger")).toContainText("⌘K");
  });
});
