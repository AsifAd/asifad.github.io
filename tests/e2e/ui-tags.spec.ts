import { test, expect } from "@playwright/test";
import { experience, projects } from "../../src/data/resume";
import { waitForBootLoaderDone } from "./helpers";

const PILL_CLASS =
  /rounded-full.*border-\[var\(--color-panel-border\)\].*bg-\[var\(--color-panel\)\]/;

test.describe("linear-style UI tags", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForBootLoaderDone(page);
  });

  test("experience stack tags use pill styling with accent dot", async ({ page }) => {
    const section = page.getByTestId("section-experience");
    await section.scrollIntoViewIfNeeded();

    for (const job of experience) {
      for (const tech of job.stack) {
        const tag = section
          .getByTestId("experience-list")
          .locator("span.rounded-full")
          .filter({ hasText: new RegExp(`^${tech}$`) })
          .first();
        await expect(tag).toBeVisible();
        await expect(tag).toHaveClass(PILL_CLASS);
        await expect(tag.locator("span.rounded-full.bg-\\[var\\(--color-accent\\)\\]")).toBeVisible();
      }
    }
  });

  test("project tags use pill styling with accent dot", async ({ page }) => {
    const section = page.getByTestId("section-projects");
    await section.scrollIntoViewIfNeeded();

    for (const project of projects) {
      for (const tagLabel of project.tags) {
        const tag = section
          .getByTestId("projects-grid")
          .locator("span.rounded-full")
          .filter({ hasText: new RegExp(`^${tagLabel}$`) })
          .first();
        await expect(tag).toBeVisible();
        await expect(tag).toHaveClass(PILL_CLASS);
        await expect(tag.locator("span.rounded-full.bg-\\[var\\(--color-accent\\)\\]")).toBeVisible();
      }
    }
  });
});
