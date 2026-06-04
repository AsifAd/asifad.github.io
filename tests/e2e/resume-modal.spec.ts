import { test, expect } from "@playwright/test";
import {
  openResumeModalFromHero,
  resumeModal,
  resumeModalShell,
  waitForBootLoaderDone,
  expectResumeModalOpen,
} from "./helpers";

async function expectResumeModalClosed(page: import("@playwright/test").Page) {
  await expect(resumeModal(page)).toHaveCount(0);
}

test.describe("interactive resume modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForBootLoaderDone(page);
  });

  test("opens from hero Résumé button", async ({ page }) => {
    const resumeBtn = page.getByTestId("hero-resume-download");
    await expect(resumeBtn).toBeVisible();
    await expect(async () => {
      await resumeBtn.click();
      await expectResumeModalOpen(page);
    }).toPass({ timeout: 15_000 });
  });

  test("opens from contact Preview & Download card", async ({ page }) => {
    await page.getByTestId("section-contact").scrollIntoViewIfNeeded();
    const resumeCard = page.getByTestId("contact-resume-card");
    await expect(resumeCard).toBeVisible({ timeout: 10_000 });
    await resumeCard.click();
    await expectResumeModalOpen(page);
  });

  test("opens from CMD+K palette (search Resume → Enter)", async ({ page }) => {
    await page.keyboard.press(process.platform === "darwin" ? "Meta+k" : "Control+k");
    const paletteInput = page.getByPlaceholder("Search");
    await paletteInput.fill("Resume");
    await page.getByRole("option", { name: /Preview résumé/i }).click();
    await expectResumeModalOpen(page);
  });

  test("closes via X button, Escape key, and backdrop click", async ({ page }) => {
    await openResumeModalFromHero(page);

    await resumeModalShell(page).getByRole("button").click();
    await expectResumeModalClosed(page);

    await openResumeModalFromHero(page);
    await page.keyboard.press("Escape");
    await expectResumeModalClosed(page);

    await openResumeModalFromHero(page);
    await page.mouse.click(8, 8);
    await expectResumeModalClosed(page);
  });

  test("renders PDF object and fallback download control in the DOM", async ({ page }) => {
    await openResumeModalFromHero(page);

    const pdfObject = resumeModal(page);
    await expect(pdfObject).toBeVisible();
    await expect(pdfObject).toHaveAttribute("type", "application/pdf");

    const fallback = page.getByRole("link", { name: "Download PDF instead" });
    await expect(fallback).toBeAttached();
    await expect(fallback).toHaveAttribute("href", "/asif-draxi-resume.pdf");
    await expect(fallback).toHaveAttribute("download", "");
  });
});
