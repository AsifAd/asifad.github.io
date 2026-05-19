import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test("clicking nav links scrolls to the matching section", async ({ page }) => {
    await page.goto("/");

    const items = [
      { label: "About", id: "about" },
      { label: "Skills", id: "skills" },
      { label: "Experience", id: "experience" },
      { label: "Projects", id: "projects" },
      { label: "Open Source", id: "opensource" },
      { label: "Contact", id: "contact" },
    ];

    for (const it of items) {
      // The nav contains a desktop and mobile variant; .first() picks the visible one.
      const link = page.getByRole("link", { name: it.label, exact: true }).first();

      // Mobile viewport hides the nav links — skip those gracefully.
      if (!(await link.isVisible())) continue;

      await link.click();
      // Allow a beat for smooth scroll
      await page.waitForTimeout(700);

      const inView = await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      }, it.id);

      expect(inView, `Section #${it.id} not in viewport after clicking ${it.label}`).toBe(true);
    }
  });

  test("GitHub link in nav points to AsifAd", async ({ page }) => {
    await page.goto("/");
    const ghLink = page.getByRole("link", { name: /github/i }).first();
    const href = await ghLink.getAttribute("href");
    expect(href).toMatch(/github\.com\/AsifAd/);
  });
});
