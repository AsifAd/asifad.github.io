import { test, expect } from "@playwright/test";

/**
 * Smoke test for prefers-reduced-motion. We don't try to assert exact
 * animation durations — just verify the page still renders correctly with
 * the motion-reduced context.
 */
test.use({ reducedMotion: "reduce" });

test("renders cleanly with prefers-reduced-motion: reduce", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("hero-eyebrow")).toContainText("ASIF DRAXI");
  await expect(page.getByTestId("hero-title")).toBeVisible();
  await expect(page.getByTestId("section-projects")).toBeVisible();
});
