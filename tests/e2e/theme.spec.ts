import { test, expect } from "@playwright/test";

test.describe("theme toggle", () => {
  test("defaults to dark mode with no stored preference", async ({ page }) => {
    await page.goto("/");
    const theme = await page.locator("html").getAttribute("data-theme");
    expect(theme).toBe("dark");
  });

  test("toggling switches data-theme between dark and light", async ({ page }) => {
    await page.goto("/");

    // Wait for ThemeToggle to hydrate before clicking.
    const toggle = page.getByTestId("theme-toggle");
    await expect(toggle).toBeVisible();

    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("light mode visually inverts background to a paper color", async ({ page }) => {
    await page.goto("/");

    // Wait for the toggle to hydrate (click before hydration is a no-op).
    const toggle = page.getByTestId("theme-toggle");
    await expect(toggle).toBeVisible();
    // Polling-style: click, then expect; if hydration was slow, retry.
    await expect(async () => {
      await toggle.click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light", {
        timeout: 1000,
      });
    }).toPass({ timeout: 5000 });

    // Body has a 0.4s background-color transition; wait for it to land.
    await page.waitForTimeout(600);

    const bg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    // Paper bg #faf7f2 → rgb values all > 230. Catches accidental dark bg leak.
    const m = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    expect(m, `expected rgb() but got ${bg}`).not.toBeNull();
    if (m) {
      const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
      expect(r, `R channel: bg=${bg}`).toBeGreaterThan(230);
      expect(g, `G channel: bg=${bg}`).toBeGreaterThan(230);
      expect(b, `B channel: bg=${bg}`).toBeGreaterThan(220);
    }
  });

  test("theme choice persists across reloads", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("theme-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });

  test("toggle exposes an accessible label for screen readers", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByTestId("theme-toggle");
    const label = await toggle.getAttribute("aria-label");
    expect(label).toMatch(/switch to (light|dark) mode/i);
  });
});
