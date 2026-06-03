import { test, expect } from "@playwright/test";

test.describe("SEO + assets", () => {
  test("og:image meta points to og.png and the asset is reachable", async ({ page, request }) => {
    await page.goto("/");
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toMatch(/\/og\.png$/);

    const res = await request.get("/og.png");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toMatch(/image\/png/);
  });

  test("resume PDF is downloadable from the hero", async ({ page, request }) => {
    await page.goto("/");
    const link = page.getByTestId("hero-resume-download");
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "/asif-draxi-resume.pdf");
    await expect(link).toHaveAttribute("download", "");

    const res = await request.get("/asif-draxi-resume.pdf");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toMatch(/pdf/);
  });

  test("robots.txt advertises the sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/Sitemap:\s*https:\/\/asifad\.github\.io\/sitemap-index\.xml/);
  });

  test.skip("sitemap-index.xml exists", async ({ request }) => {
    const res = await request.get("/sitemap-index.xml");
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain("<sitemap>");
  });

  test("404 page renders with theme styling and a home link", async ({ page }) => {
    const res = await page.goto("/this-route-does-not-exist", { waitUntil: "domcontentloaded" });
    // Astro static 404 returns 404 on a real server; preview serves the file with 200.
    // Either way, the content must be the themed 404.
    expect([200, 404]).toContain(res?.status() ?? 0);
    await expect(page.getByRole("heading", { name: /Page not found/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Back home/i })).toHaveAttribute("href", "/");
  });
});
