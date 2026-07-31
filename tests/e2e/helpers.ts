import { expect, type Locator, type Page } from "@playwright/test";

/** Representative lines from the AsifOS CRT boot sequence in BaseLayout.astro */
export const BOOT_LINES = [
  "Booting AsifOS kernel 6.8.0-sre",
  "Checking SRE protocols... [ OK ]",
  "Verifying 99.99% SLA... [ OK ]",
  "Welcome to Asif Draxi Portfolio.",
  "Systems nominal.",
] as const;

export const BOOT_PROMPT = "root@asif-os:~#";

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

/**
 * Components hydrate lazily, so a click can land on a control React has not
 * wired up yet and silently do nothing. Retry until the expected result shows
 * up rather than assuming the first click took.
 */
export async function clickUntilVisible(trigger: Locator, target: Locator) {
  await expect(trigger).toBeVisible({ timeout: 10_000 });
  await expect(async () => {
    await trigger.click();
    await expect(target).toBeVisible({ timeout: 1_000 });
  }).toPass({ timeout: 15_000 });
}

export async function openResumeModalVia(page: Page, trigger: Locator) {
  await clickUntilVisible(trigger, resumeModal(page));
}

export async function openResumeModalFromHero(page: Page) {
  await waitForBootLoaderDone(page);
  await openResumeModalVia(page, page.getByTestId("hero-resume-download"));
}

/**
 * ⌘K is handled by a React effect, so a press that lands before the palette
 * hydrates is simply dropped. Only re-press while the panel is still closed,
 * so the retry can never toggle an open palette shut.
 */
export async function openCommandPalette(page: Page) {
  const shortcut = process.platform === "darwin" ? "Meta+k" : "Control+k";
  await expect(async () => {
    await page.keyboard.press(shortcut);
    await expect(page.getByTestId("spotlight-panel")).toBeVisible({ timeout: 1_000 });
  }).toPass({ timeout: 15_000 });
}

export function resumeModal(page: Page) {
  return page.locator("object[type='application/pdf']");
}

export function resumeModalShell(page: Page) {
  return page.locator("div.fixed").filter({ has: resumeModal(page) });
}

export async function expectResumeModalOpen(page: Page) {
  await expect(resumeModal(page)).toBeVisible({ timeout: 10_000 });
  await expect(resumeModal(page)).toHaveAttribute("data", "/asif-draxi-resume.pdf");
  await expect(
    resumeModalShell(page).getByText("asif-draxi-resume.pdf", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Download PDF instead" }),
  ).toBeAttached();
}
