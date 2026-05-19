import { test, expect } from "@playwright/test";

test.describe("site improvements", () => {
  test("skip link targets main content", async ({ page }) => {
    await page.goto("/");
    const skip = page.getByRole("link", { name: /skip to content/i });
    await skip.focus();
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute("href", "#main-content");
  });

  test("hero CTAs point to projects and open source", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("hero-cta-projects")).toHaveAttribute("href", "#projects");
    await expect(page.getByTestId("hero-cta-opensource")).toHaveAttribute("href", "#opensource");
  });

  test("OSS stack cards link to hub roadmap anchors", async ({ page }) => {
    await page.goto("/");
    const oss = page.getByTestId("section-opensource");
    await oss.scrollIntoViewIfNeeded();

    const ansible = page.getByTestId("oss-stack-ansible");
    await expect(ansible).toHaveAttribute("href", /opensource-contributions\/#roadmap-ansible/);

    const argocd = page.getByTestId("oss-stack-argocd");
    await expect(argocd).toHaveAttribute("href", /opensource-contributions\/#roadmap-argocd/);
  });

  test("projects have proof links", async ({ page }) => {
    await page.goto("/");
    const grid = page.getByTestId("projects-grid");
    await grid.scrollIntoViewIfNeeded();

    await expect(grid.locator('a[href="#opensource"]')).toHaveCount(1);
    await expect(grid.locator('a[href*="roadmap-nifi"]')).toHaveCount(1);
    await expect(grid.locator('a[href*="github.com/AsifAd"]')).toHaveCount(2);
  });

  test("contact includes resume download", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("section-contact").scrollIntoViewIfNeeded();
    const resume = page.getByTestId("contact-links").getByRole("link", { name: /résumé/i });
    await expect(resume).toHaveAttribute("href", "/asif-draxi-resume.pdf");
  });

  test("JSON-LD Person schema is present", async ({ page }) => {
    await page.goto("/");
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toBeTruthy();
    const data = JSON.parse(jsonLd!);
    expect(data["@type"]).toBe("Person");
    expect(data.sameAs).toEqual(
      expect.arrayContaining([
        "https://github.com/AsifAd",
        "https://www.linkedin.com/in/asifdraxi/",
        "https://asifad.github.io/opensource-contributions/",
      ]),
    );
  });

  test("meta description mentions open source", async ({ page }) => {
    await page.goto("/");
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(desc?.toLowerCase()).toContain("open source");
  });
});
