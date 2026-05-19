import { describe, it, expect } from "vitest";
import {
  profile,
  summary,
  skills,
  experience,
  projects,
  openSourceContributions,
  certifications,
  education,
  focusAreas,
} from "../../src/data/resume";

describe("resume data", () => {
  it("profile is complete", () => {
    expect(profile.name).toBe("Asif Draxi");
    expect(profile.handle).toBe("AsifAd");
    expect(profile.links.github).toBe("https://github.com/AsifAd");
    expect(profile.links.linkedin).toMatch(/linkedin\.com\/in\/asifdraxi/);
    expect(profile.links.email).toMatch(/^mailto:/);
  });

  it("summary is non-empty prose", () => {
    expect(summary.length).toBeGreaterThan(100);
  });

  it("every skill group has items", () => {
    expect(skills.length).toBeGreaterThan(0);
    for (const g of skills) {
      expect(g.label).toBeTruthy();
      expect(g.items.length).toBeGreaterThan(0);
      expect(["cyan", "violet", "emerald"]).toContain(g.accent);
    }
  });

  it("experience entries are well formed and chronologically labelled", () => {
    expect(experience.length).toBeGreaterThanOrEqual(3);
    for (const job of experience) {
      expect(job.company).toBeTruthy();
      expect(job.role).toBeTruthy();
      expect(job.period).toMatch(/\d{4}/);
      expect(job.highlights.length).toBeGreaterThan(0);
      expect(job.stack.length).toBeGreaterThan(0);
    }
    expect(experience[0].company).toBe("BlackLine");
  });

  it("open source contributions include the community.general PR with a real link", () => {
    const pr = openSourceContributions.find((p) => p.name.includes("community.general"));
    expect(pr).toBeDefined();
    expect(pr?.link).toMatch(/pull\/12083$/);
    expect(pr?.highlight).toBe(true);
  });

  it("projects are production work, not upstream OSS cards", () => {
    for (const p of projects) {
      expect(p.name).not.toMatch(/community\.general/i);
      expect(p.name).not.toMatch(/OSS Contributions Hub/i);
    }
  });

  it("featured projects have links or are clearly real work", () => {
    for (const p of projects) {
      expect(p.tags.length).toBeGreaterThan(0);
      expect(p.blurb.length).toBeGreaterThan(20);
    }
  });

  it("certifications are present", () => {
    expect(certifications.length).toBeGreaterThanOrEqual(3);
    for (const c of certifications) {
      expect(c.name).toBeTruthy();
      expect(c.issuer).toBeTruthy();
    }
  });

  it("education has at least one entry", () => {
    expect(education.length).toBeGreaterThan(0);
    expect(education[0].institution).toMatch(/Reva/);
  });

  it("focus areas cover SRE / DevOps / Cloud / AI", () => {
    const labels = focusAreas.map((f) => f.label);
    expect(labels).toContain("SRE");
    expect(labels).toContain("DevOps");
    expect(labels).toContain("Cloud");
    expect(labels).toContain("AI");
  });
});
