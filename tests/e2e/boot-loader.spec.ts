import { test, expect } from "@playwright/test";
import { BOOT_LINES, BOOT_PROMPT, waitForBootLoaderDone } from "./helpers";

test.describe("terminal boot sequence loader", () => {
  test("shows loader, prints lines sequentially, then fades out and is removed", async ({
    page,
  }) => {
    // The loader prints 12 lines in ~2.5s and then deletes itself, so polling
    // the DOM for each line races its own teardown. Record the transcript as
    // it is written and assert on that instead.
    await page.addInitScript(() => {
      (window as unknown as { __bootLines: string[] }).__bootLines = [];
      const attach = () => {
        const target = document.getElementById("boot-text");
        if (!target) return false;
        new MutationObserver((records) => {
          for (const record of records) {
            for (const node of Array.from(record.addedNodes)) {
              (window as unknown as { __bootLines: string[] }).__bootLines.push(
                (node.textContent ?? "").trim(),
              );
            }
          }
        }).observe(target, { childList: true });
        return true;
      };
      if (!attach()) {
        document.addEventListener("DOMContentLoaded", attach, { once: true });
      }
    });

    await page.goto("/");

    const loader = page.locator("#boot-loader");
    await expect(loader).toBeVisible();
    await expect(page.locator("#boot-prompt")).toContainText(BOOT_PROMPT);

    await page.waitForFunction(() => {
      const el = document.getElementById("boot-loader");
      return el?.style.opacity === "0" && el?.style.visibility === "hidden";
    });

    await waitForBootLoaderDone(page);
    await expect(loader).toHaveCount(0);

    const printed = await page.evaluate(
      () => (window as unknown as { __bootLines: string[] }).__bootLines,
    );
    const positions = BOOT_LINES.map((line) => printed.findIndex((p) => p.includes(line)));

    expect(positions.every((i) => i >= 0), `printed lines: ${JSON.stringify(printed)}`).toBe(true);
    // Sequential: each representative line lands after the previous one.
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  test("does not block hero interactions after boot completes", async ({ page }) => {
    await page.goto("/");
    await waitForBootLoaderDone(page);

    await page.getByTestId("hero-cta-projects").click();
    await expect(page).toHaveURL(/#projects$/);
  });
});
