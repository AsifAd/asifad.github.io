import { test, expect } from "@playwright/test";

test.describe("content integrity", () => {
  test("renders every company from the resume", async ({ page }) => {
    await page.goto("/");
    for (const company of ["BlackLine", "Liferay", "Capgemini"]) {
      await expect(page.getByText(company, { exact: true }).first()).toBeVisible();
    }
  });

  test("renders the four focus areas", async ({ page }) => {
    await page.goto("/");
    for (const label of ["SRE", "DevOps", "Cloud", "Open Source"]) {
      await expect(
        page.locator(`[data-focus-label="${label}"]`),
      ).toBeVisible();
    }
  });

  test("contact section shows email, LinkedIn, GitHub, location", async ({ page }) => {
    await page.goto("/");
    const contact = page.getByTestId("contact-links");
    await expect(contact).toContainText("asifdraxi@gmail.com");
    await expect(contact).toContainText("linkedin.com/in/asifdraxi");
    await expect(contact).toContainText("github.com/AsifAd");
    await expect(contact).toContainText("Bengaluru");
  });

  test("at least one Terraform certification link is rendered", async ({ page }) => {
    await page.goto("/");
    // Credentials uses client:visible + framer-motion reveal — scroll its anchor
    // into view and wait for the in-view tween to finish.
    await page.evaluate(() => {
      document.getElementById("credentials")?.scrollIntoView({ block: "center" });
    });
    await page.waitForTimeout(900);
    const tf = page.getByText(/HashiCorp Terraform Associate/);
    await expect(tf).toBeVisible();
  });
});
