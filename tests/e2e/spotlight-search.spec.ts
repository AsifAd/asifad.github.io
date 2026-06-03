import { test, expect } from "@playwright/test";
import { waitForBootLoaderDone } from "./helpers";

test.describe("spotlight search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForBootLoaderDone(page);
    await page.keyboard.press(process.platform === "darwin" ? "Meta+k" : "Control+k");
    await expect(page.getByTestId("spotlight-panel")).toBeVisible();
  });

  test("finds experience by company name", async ({ page }) => {
    const input = page.getByTestId("spotlight-input");
    await input.fill("BlackLine");
    await expect(page.getByRole("option", { name: /BlackLine/i }).first()).toBeVisible();
    await page.getByRole("option", { name: /BlackLine/i }).first().click();
    await expect(page).toHaveURL(/#experience/);
  });

  test("finds skills and opens résumé action", async ({ page }) => {
    const input = page.getByTestId("spotlight-input");
    await input.fill("terraform");
    await expect(page.getByRole("option", { name: /Terraform/i }).first()).toBeVisible();

    await input.fill("resume");
    await page.getByRole("option", { name: /Preview résumé/i }).click();
    await expect(page.locator("object[type='application/pdf']")).toBeVisible();
  });
});
