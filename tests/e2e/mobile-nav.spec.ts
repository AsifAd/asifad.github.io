import { test, expect } from "@playwright/test";

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger opens panel with section links", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByTestId("mobile-nav-toggle");
    await expect(toggle).toBeVisible();

    await expect(async () => {
      await toggle.click();
      await expect(page.getByTestId("mobile-nav-panel")).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 5000 });

    const panel = page.getByTestId("mobile-nav-panel");
    await expect(panel.getByRole("link", { name: "Projects" })).toBeVisible();
    await expect(panel.getByRole("link", { name: "Open Source" })).toBeVisible();

    await panel.getByRole("link", { name: "Projects" }).click();
    await expect(panel).toHaveCount(0);

    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const el = document.getElementById("projects");
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.top < window.innerHeight * 0.6;
        });
      })
      .toBe(true);
  });
});
