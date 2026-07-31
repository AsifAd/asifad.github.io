import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "../../src/components/sections/Hero";
import { profile, yearsExperience } from "../../src/data/resume";

describe("Hero section", () => {
  it("renders the name prominently", () => {
    render(<Hero />);
    const name = screen.getByTestId("hero-name");
    expect(name.textContent).toMatch(/ASIF/);
    expect(name.textContent).toMatch(/DRAXI/);
    expect(name).toHaveAttribute("aria-label", profile.name);
  });

  it("renders the role below the name", () => {
    render(<Hero />);
    const title = screen.getByTestId("hero-title");
    expect(title.textContent).toMatch(/Site/);
    expect(title.textContent).toMatch(/Reliability/);
    expect(title.textContent).toMatch(/Engineer/);
    expect(title).toHaveAttribute("aria-label", "Site Reliability Engineer");
  });

  it("links to GitHub, LinkedIn, and email with the right destinations", () => {
    render(<Hero />);
    const gh = screen.getByRole("link", { name: /github/i });
    const li = screen.getByRole("link", { name: /linkedin/i });
    const em = screen.getByRole("link", { name: /^email/i });
    expect(gh).toHaveAttribute("href", profile.links.github);
    expect(li).toHaveAttribute("href", profile.links.linkedin);
    expect(em).toHaveAttribute("href", profile.links.email);
    // External links should open in a new tab
    expect(gh).toHaveAttribute("target", "_blank");
    expect(li).toHaveAttribute("target", "_blank");
  });

  it("quotes the same years of experience as the rest of the site", () => {
    render(<Hero />);
    const pitch = screen.getByTestId("hero-paragraph");
    expect(pitch.textContent).toContain(`${yearsExperience} years`);
  });

  it("renders all four focus areas (SRE / DevOps / Cloud / Open Source)", () => {
    render(<Hero />);
    const focus = screen.getByTestId("hero-focus-areas");
    // Match via the dedicated focus-area heading nodes, not concatenated textContent.
    expect(focus.querySelector('[data-focus-label="SRE"]')).toBeTruthy();
    expect(focus.querySelector('[data-focus-label="DevOps"]')).toBeTruthy();
    expect(focus.querySelector('[data-focus-label="Cloud"]')).toBeTruthy();
    expect(focus.querySelector('[data-focus-label="Open Source"]')).toBeTruthy();
  });
});
