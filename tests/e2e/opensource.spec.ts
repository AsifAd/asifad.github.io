import { test, expect } from "@playwright/test";

test.describe("open source section", () => {
  test("is separate from projects and links to the OSS hub", async ({ page }) => {
    await page.goto("/");

    const projects = page.getByTestId("section-projects");
    const oss = page.getByTestId("section-opensource");

    await projects.scrollIntoViewIfNeeded();
    await expect(projects).toBeVisible();

    await oss.scrollIntoViewIfNeeded();
    await expect(oss).toBeVisible();

    await expect(projects.getByText("OSS Contributions Hub")).toHaveCount(0);
    await expect(projects.getByText(/community\.general/)).toHaveCount(0);

    await expect(oss.getByText("OSS Contributions Hub")).toBeVisible();
    await expect(oss.getByText(/community\.general/)).toBeVisible();

    const hubCta = page.getByTestId("oss-hub-cta");
    await expect(hubCta).toHaveAttribute(
      "href",
      "https://asifad.github.io/opensource-contributions/",
    );
  });

  test("nav Open Source scrolls to the opensource section", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Open Source", exact: true }).first();
    if (!(await link.isVisible())) return;

    await link.click();
    await page.waitForTimeout(700);

    const inView = await page.evaluate(() => {
      const el = document.getElementById("opensource");
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    });

    expect(inView).toBe(true);
  });
});
