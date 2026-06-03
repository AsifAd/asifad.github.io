import { expect, type Page } from "@playwright/test";

export const BOOT_LINES = [
  "> Booting system... [OK]",
  "> Fetching remote configurations... [OK]",
  "> Resolving dependencies... [OK]",
  "> Systems nominal.",
] as const;

/** Wait until the terminal boot loader finishes and is removed from the DOM. */
export async function waitForBootLoaderDone(page: Page) {
  await page.waitForFunction(
    () => !document.getElementById("boot-loader"),
    { timeout: 15_000 },
  );
}

export async function expectBootSequence(page: Page) {
  const loader = page.locator("#boot-loader");
  await expect(loader).toBeVisible();

  for (const line of BOOT_LINES) {
    await expect(page.locator("#boot-text")).toContainText(line, { timeout: 8_000 });
  }

  await page.waitForFunction(() => {
    const el = document.getElementById("boot-loader");
    return el?.style.opacity === "0";
  });

  await waitForBootLoaderDone(page);
}

export async function openResumeModalFromHero(page: Page) {
  await waitForBootLoaderDone(page);
  await page.getByTestId("hero-resume-download").click();
}

export function resumeModal(page: Page) {
  return page.locator("object[type='application/pdf']");
}

export function resumeModalShell(page: Page) {
  return page.locator("div.fixed").filter({ has: resumeModal(page) });
}
