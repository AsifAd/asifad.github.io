import { test, expect } from "@playwright/test";
import { BOOT_LINES, waitForBootLoaderDone } from "./helpers";

test.describe("terminal boot sequence loader", () => {
  test("shows loader, prints lines sequentially, then fades out and is removed", async ({
    page,
  }) => {
    await page.goto("/");

    const loader = page.locator("#boot-loader");
    await expect(loader).toBeVisible();

    const bootText = page.locator("#boot-text");
    let previousCount = 0;

    for (const line of BOOT_LINES) {
      await expect
        .poll(async () => bootText.locator("div").count(), { timeout: 8_000 })
        .toBeGreaterThan(previousCount);
      await expect(bootText).toContainText(line);
      previousCount += 1;
    }

    await page.waitForFunction(() => {
      const el = document.getElementById("boot-loader");
      return el?.style.opacity === "0" && el?.style.visibility === "hidden";
    });

    await waitForBootLoaderDone(page);
    await expect(loader).toHaveCount(0);
  });

  test("does not block hero interactions after boot completes", async ({ page }) => {
    await page.goto("/");
    await waitForBootLoaderDone(page);

    await page.getByTestId("hero-cta-projects").click();
    await expect(page).toHaveURL(/#projects$/);
  });
});
