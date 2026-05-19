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
    await expect(page.getByTestId("hero-name")).toContainText("ASIF");
    await expect(page.getByTestId("hero-name")).toContainText("DRAXI");
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
      "section-opensource",
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

  test("hero tagline mentions open source contributions", async ({ page }) => {
    await page.goto("/");
    const tagline = page.locator("#top p").filter({ hasText: /contribute upstream to/i });
    await expect(tagline).toBeVisible();
    await expect(tagline).toContainText(/open source/i);
  });

  test("open source section lists technology stacks", async ({ page }) => {
    await page.goto("/");
    const oss = page.getByTestId("section-opensource");
    await oss.scrollIntoViewIfNeeded();
    await expect(oss.getByTestId("opensource-stacks")).toBeVisible();
    await expect(oss.getByText("Ansible", { exact: true })).toBeVisible();
    await expect(oss.getByText("Argo CD", { exact: true })).toBeVisible();
  });
});
