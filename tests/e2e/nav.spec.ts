import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

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
      const link = page.locator(`nav a[href="#${it.id}"]`).first();
      await expect(link).toBeVisible();

      await link.click();

      await expect
        .poll(async () => {
          return page.evaluate((id) => {
            const el = document.getElementById(id);
            if (!el) return false;
            const r = el.getBoundingClientRect();
            return r.top < window.innerHeight * 0.65 && r.bottom > 0;
          }, it.id);
        })
        .toBe(true);
    }
  });

  test("GitHub link in nav points to AsifAd", async ({ page }) => {
    await page.goto("/");
    const ghLink = page.getByRole("link", { name: /github/i }).first();
    const href = await ghLink.getAttribute("href");
    expect(href).toMatch(/github\.com\/AsifAd/);
  });
});
