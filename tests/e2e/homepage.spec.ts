import { test, expect } from "@playwright/test";

test.describe("homepage", () => {
  test("loads without errors and renders all sections", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto("/");

    await expect(page).toHaveTitle(/Asif Draxi/);

    // Hero
    await expect(page.getByTestId("hero-eyebrow")).toContainText("ASIF DRAXI");
    await expect(page.getByTestId("hero-title")).toHaveAttribute(
      "aria-label",
      "Site Reliability Engineer",
    );

    // All sections present — scroll each into view since the page is long.
    for (const id of [
      "section-about",
      "section-skills",
      "section-experience",
      "section-projects",
      "section-contact",
    ]) {
      const section = page.getByTestId(id);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    }

    expect(consoleErrors, `Console errors: ${consoleErrors.join("\n")}`).toEqual([]);
  });

  test("has working meta tags for sharing", async ({ page }) => {
    await page.goto("/");
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    const ogDesc = await page
      .locator('meta[property="og:description"]')
      .getAttribute("content");
    expect(ogTitle).toMatch(/Asif Draxi/);
    expect(ogDesc?.length || 0).toBeGreaterThan(40);
  });

  test("featured project links to the community.general PR", async ({ page }) => {
    await page.goto("/");
    const prLink = page.locator('a[href*="community.general/pull/12083"]').first();
    await expect(prLink).toBeVisible();
    await expect(prLink).toHaveAttribute("target", "_blank");
  });
});
