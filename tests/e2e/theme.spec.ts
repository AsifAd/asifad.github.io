import { test, expect } from "@playwright/test";
import { waitForBootLoaderDone } from "./helpers";

test.describe("theme toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      if (!sessionStorage.getItem("__themeStorageCleared")) {
        localStorage.removeItem("theme");
        sessionStorage.setItem("__themeStorageCleared", "1");
      }
    });
  });

  test("defaults to dark mode with no stored preference", async ({ page }) => {
    await page.goto("/");
    await waitForBootLoaderDone(page);
    const theme = await page.locator("html").getAttribute("data-theme");
    expect(theme).toBe("dark");
  });

  test("toggling switches data-theme between dark and light", async ({ page }) => {
    await page.goto("/");
    await waitForBootLoaderDone(page);

    // Wait for ThemeToggle to hydrate before clicking.
    const toggle = page.getByTestId("theme-toggle");
    await expect(toggle).toBeVisible();

    await expect(async () => {
      await toggle.click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light", {
        timeout: 1000,
      });
    }).toPass({ timeout: 10_000 });

    await expect(async () => {
      await toggle.click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark", {
        timeout: 1000,
      });
    }).toPass({ timeout: 10_000 });
  });

  test("light mode visually inverts background to a paper color", async ({ page }) => {
    await page.goto("/");
    await waitForBootLoaderDone(page);

    // Wait for the toggle to hydrate (click before hydration is a no-op).
    const toggle = page.getByTestId("theme-toggle");
    await expect(toggle).toBeVisible();
    // Polling-style: click, then expect; if hydration was slow, retry.
    await expect(async () => {
      await toggle.click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light", {
        timeout: 1000,
      });
    }).toPass({ timeout: 10_000 });

    // The body has a background-color transition, and getComputedStyle reports
    // interpolated values while it runs. Poll until the colour stops changing
    // instead of betting on a fixed wait.
    const readBg = () =>
      page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    await expect
      .poll(
        async () => {
          const m = (await readBg()).match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          return m ? Math.min(Number(m[1]), Number(m[2]), Number(m[3])) : -1;
        },
        { timeout: 5_000, message: "body background should settle on the paper colour" },
      )
      .toBeGreaterThan(220);

    const bg = await readBg();
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
    await waitForBootLoaderDone(page);
    
    // Polling-style: click, then expect; if hydration was slow, retry.
    const toggle = page.getByTestId("theme-toggle");
    await expect(toggle).toBeVisible();
    await expect(async () => {
      await toggle.click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light", {
        timeout: 1000,
      });
    }).toPass({ timeout: 10_000 });

    await page.reload();
    await waitForBootLoaderDone(page);
    await expect(page.getByTestId("theme-toggle")).toBeVisible();
    
    // Check attribute after reload
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });

  test("toggle exposes an accessible label for screen readers", async ({ page }) => {
    await page.goto("/");
    await waitForBootLoaderDone(page);
    const toggle = page.getByTestId("theme-toggle");
    const label = await toggle.getAttribute("aria-label");
    expect(label).toMatch(/switch to (light|dark) mode/i);
  });
});
