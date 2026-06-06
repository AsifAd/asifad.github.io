import { test, expect } from "@playwright/test";
import {
  waitForBootLoaderDone,
  openResumeModalFromHero,
  resumeModal,
  resumeModalShell,
  expectResumeModalOpen,
} from "./helpers";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function scrollTo(page: import("@playwright/test").Page, selector: string) {
  await page.locator(selector).scrollIntoViewIfNeeded();
}

async function openModalFromNav(page: import("@playwright/test").Page) {
  await waitForBootLoaderDone(page);
  const navBtn = page.getByRole("button", { name: /resume/i }).first();
  await navBtn.click();
}

// ---------------------------------------------------------------------------
// RESUME MODAL
// ---------------------------------------------------------------------------

test.describe("Resume modal — entry points", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForBootLoaderDone(page);
  });

  // 1
  test("nav Resume button opens modal (not a new tab)", async ({ page }) => {
    const navBtn = page
      .locator("nav")
      .getByRole("button", { name: /resume/i })
      .first();
    await expect(navBtn).toBeVisible();

    const [newPage] = await Promise.all([
      page.context().waitForEvent("page", { timeout: 2_000 }).catch(() => null),
      navBtn.click(),
    ]);
    expect(newPage).toBeNull();
    await expectResumeModalOpen(page);
  });

  // 2
  test("hero Résumé button opens modal", async ({ page }) => {
    await openResumeModalFromHero(page);
    await expectResumeModalOpen(page);
  });

  // 3
  test("contact Résumé card opens modal", async ({ page }) => {
    await page.getByTestId("section-contact").scrollIntoViewIfNeeded();
    const card = page.getByTestId("contact-resume-card");
    await expect(card).toBeVisible({ timeout: 10_000 });
    await card.click();
    await expectResumeModalOpen(page);
  });

  // 4
  test("floating FAB opens modal after scrolling 600px", async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 700));
    const fab = page.getByTestId("resume-fab");
    await expect(fab).toBeVisible({ timeout: 5_000 });
    await fab.click();
    await expectResumeModalOpen(page);
  });

  // 5
  test("modal shows PDF <object> pointing to /asif-draxi-resume.pdf", async ({ page }) => {
    await openResumeModalFromHero(page);
    const obj = resumeModal(page);
    await expect(obj).toBeVisible({ timeout: 10_000 });
    await expect(obj).toHaveAttribute("data", "/asif-draxi-resume.pdf");
  });

  // 6
  test("modal Download button has correct href and download attribute", async ({ page }) => {
    await openResumeModalFromHero(page);
    // The header bar's "Download" link (not the PDF-fallback inside <object>)
    const dlLink = page.locator('a[href="/asif-draxi-resume.pdf"][download]').first();
    await expect(dlLink).toBeAttached();
    await expect(dlLink).toHaveAttribute("href", "/asif-draxi-resume.pdf");
    await expect(dlLink).toHaveAttribute("download", "");
  });

  // 7
  test("Escape key closes the modal", async ({ page }) => {
    await openResumeModalFromHero(page);
    await expectResumeModalOpen(page);
    await page.keyboard.press("Escape");
    await expect(resumeModal(page)).toHaveCount(0);
  });

  // 8
  test("clicking the backdrop closes the modal", async ({ page }) => {
    await openResumeModalFromHero(page);
    await expectResumeModalOpen(page);
    await page.mouse.click(8, 8);
    await expect(resumeModal(page)).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
// HERO CONTENT
// ---------------------------------------------------------------------------

test.describe("Hero content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForBootLoaderDone(page);
  });

  // 9
  test('hero paragraph contains "AI agents"', async ({ page }) => {
    const heroPara = page.getByTestId("hero-paragraph");
    await expect(heroPara).toContainText("AI agents");
  });

  // 10
  test('hero paragraph contains "agentic automation"', async ({ page }) => {
    const heroPara = page.getByTestId("hero-paragraph");
    await expect(heroPara).toContainText("agentic automation");
  });

  // 11
  test('focus areas grid contains "AI Ops" card', async ({ page }) => {
    await expect(page.locator('[data-focus-label="AI Ops"]')).toBeVisible();
  });

  // 12
  test("focus areas grid contains all 5 cards", async ({ page }) => {
    for (const label of ["SRE", "AI Ops", "Cloud", "DevOps", "Open Source"]) {
      await expect(page.locator(`[data-focus-label="${label}"]`)).toBeVisible();
    }
  });

  // 13
  test('no text contains "AI-Augmented SRE"', async ({ page }) => {
    await expect(page.getByText("AI-Augmented SRE")).toHaveCount(0);
  });

  // 14 — scoped to hero section only; OSS section intentionally uses em-dashes in focus descriptions
  test("no visible text in hero contains an em-dash character", async ({ page }) => {
    const heroSection = page.locator("section").filter({ has: page.getByTestId("hero-paragraph") });
    const text = await heroSection.innerText();
    expect(text).not.toContain("—");
  });
});

// ---------------------------------------------------------------------------
// ABOUT CONTENT
// ---------------------------------------------------------------------------

test.describe("About content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // 15
  test('about stats grid contains "MTTR via AI"', async ({ page }) => {
    const about = page.getByTestId("section-about");
    await about.scrollIntoViewIfNeeded();
    await expect(about).toContainText("MTTR via AI");
  });

  // 16
  test('about stats grid contains "$300K+" not "$250K+"', async ({ page }) => {
    const about = page.getByTestId("section-about");
    await about.scrollIntoViewIfNeeded();
    await expect(about).toContainText("$300K+");
    await expect(about).not.toContainText("$250K+");
  });

  // 17
  test('about section contains "MCP-based on-call agents"', async ({ page }) => {
    const about = page.getByTestId("section-about");
    await about.scrollIntoViewIfNeeded();
    await expect(about).toContainText("MCP-based on-call agents");
  });

  // 18
  test('about terminal eventually shows "oncall-agent"', async ({ page }) => {
    const terminal = page.getByTestId("about-terminal");
    await terminal.scrollIntoViewIfNeeded();
    await expect(terminal).toContainText("oncall-agent", { timeout: 15_000 });
  });
});

// ---------------------------------------------------------------------------
// EXPERIENCE CONTENT
// ---------------------------------------------------------------------------

test.describe("Experience — BlackLine card", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("section-experience").scrollIntoViewIfNeeded();
  });

  const blacklineCard = (page: import("@playwright/test").Page) =>
    page.locator("[data-company='BlackLine']").first();

  // 19
  test('BlackLine card contains "MCP server"', async ({ page }) => {
    await expect(blacklineCard(page)).toContainText("MCP server");
  });

  // 20
  test('BlackLine card contains "On-Call Agent"', async ({ page }) => {
    await expect(blacklineCard(page)).toContainText("On-Call Agent");
  });

  // 21
  test('BlackLine card contains "Vertex AI"', async ({ page }) => {
    await expect(blacklineCard(page)).toContainText("Vertex AI");
  });

  // 22
  test('BlackLine stack tags include "MCP"', async ({ page }) => {
    const tags = blacklineCard(page).locator("[data-stack-tag]");
    await expect(tags.filter({ hasText: "MCP" })).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// PROJECTS CONTENT
// ---------------------------------------------------------------------------

test.describe("Projects grid", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("section-projects").scrollIntoViewIfNeeded();
  });

  // 23
  test('projects grid contains "Engineering Intelligence Platform"', async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Engineering Intelligence Platform" }),
    ).toBeVisible();
  });

  // 24
  test('"Engineering Intelligence Platform" has "Hackathon 2nd Place" badge', async ({ page }) => {
    const card = page
      .locator("[data-project-title='Engineering Intelligence Platform']")
      .first();
    await expect(card).toContainText("Hackathon 2nd Place");
  });

  // 25
  test('projects grid contains "MCP On-Call Automation Suite"', async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "MCP On-Call Automation Suite" }),
    ).toBeVisible();
  });

  // 26
  test('"MCP On-Call Automation Suite" has "AI · MCP" badge', async ({ page }) => {
    const card = page
      .locator("[data-project-title='MCP On-Call Automation Suite']")
      .first();
    await expect(card).toContainText("AI · MCP");
  });

  // 27
  test("both new cards have the Featured badge", async ({ page }) => {
    for (const title of [
      "Engineering Intelligence Platform",
      "MCP On-Call Automation Suite",
    ]) {
      const card = page.locator(`[data-project-title='${title}']`).first();
      await expect(card).toContainText("Featured");
    }
  });
});

// ---------------------------------------------------------------------------
// CREDENTIALS / AWARDS
// ---------------------------------------------------------------------------

test.describe("Credentials / Awards section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() =>
      document.getElementById("credentials")?.scrollIntoView({ block: "center" }),
    );
    await page.waitForTimeout(900);
  });

  // 28
  test('credentials section heading contains "Awards"', async ({ page }) => {
    const section = page.locator("#credentials");
    await expect(section.getByRole("heading", { name: /awards/i })).toBeVisible();
  });

  // 29
  test("three award cards are present", async ({ page }) => {
    const awards = [
      "Star of the Month",
      "Company-Wide Hackathon: 2nd Place",
      "Best Performer Award",
    ];
    for (const award of awards) {
      await expect(page.getByText(award)).toBeVisible();
    }
  });

  // 30
  test("each award card shows the org name", async ({ page }) => {
    await expect(page.getByText("BlackLine").first()).toBeVisible();
    await expect(page.getByText("Capgemini").first()).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// SKILLS
// ---------------------------------------------------------------------------

test.describe("Skills section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("section-skills").scrollIntoViewIfNeeded();
  });

  // 31
  test('skills section contains "AI & Agentic Operations" group', async ({ page }) => {
    await expect(
      page.getByText("AI & Agentic Operations"),
    ).toBeVisible();
  });

  // 32
  test('"AI & Agentic Operations" group tags include MCP, Vertex AI, AIOps', async ({ page }) => {
    const group = page
      .locator("[data-skill-group='AI & Agentic Operations']")
      .first();
    for (const tag of ["MCP", "Vertex AI", "AIOps"]) {
      await expect(group.getByText(tag, { exact: true })).toBeVisible();
    }
  });
});

// ---------------------------------------------------------------------------
// PDF ASSET
// ---------------------------------------------------------------------------

test.describe("PDF asset", () => {
  // 33
  test("GET /asif-draxi-resume.pdf returns 200 application/pdf", async ({ request }) => {
    const res = await request.get("/asif-draxi-resume.pdf");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toMatch(/application\/pdf/);
  });

  // 34
  test("PDF is larger than 30 KB", async ({ request }) => {
    const res = await request.get("/asif-draxi-resume.pdf");
    const body = await res.body();
    expect(body.byteLength).toBeGreaterThan(30 * 1024);
  });
});
