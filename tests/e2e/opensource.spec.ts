import { test, expect } from "@playwright/test";
import { openSourceStacks } from "../../src/data/resume";

test.describe("open source section", () => {
  test("is separate from projects and shows technology stacks", async ({ page }) => {
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
    await expect(oss.getByText("Technologies I'm working on")).toBeVisible();

    for (const stack of openSourceStacks) {
      await expect(oss.getByText(stack.name, { exact: true })).toBeVisible();
    }

    const hubCta = page.getByTestId("oss-hub-cta");
    await expect(hubCta).toHaveAttribute(
      "href",
      "https://asifad.github.io/opensource-contributions/",
    );
  });

  test("nav Open Source scrolls to the opensource section", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const link = page.locator('nav a[href="#opensource"]').first();
    await expect(link).toBeVisible();
    await link.click();

    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const el = document.getElementById("opensource");
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.top < window.innerHeight * 0.6 && r.bottom > 0;
        });
      })
      .toBe(true);
  });

  test("desktop github link uses inline icon without broken layout", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const ghLink = page.locator('nav a[href="https://github.com/AsifAd"]').first();
    await expect(ghLink).toBeVisible();

    const box = await ghLink.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeLessThan(40);

    await expect(ghLink.locator("span").first()).toHaveText("GitHub");
    await expect(ghLink.locator("svg")).toBeVisible();
  });
});
