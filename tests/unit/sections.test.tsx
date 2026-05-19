import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "../../src/components/sections/About";
import Skills from "../../src/components/sections/Skills";
import Experience from "../../src/components/sections/Experience";
import Projects from "../../src/components/sections/Projects";
import Credentials from "../../src/components/sections/Credentials";
import Contact from "../../src/components/sections/Contact";
import {
  experience,
  projects,
  skills,
  certifications,
} from "../../src/data/resume";

describe("About", () => {
  it("renders the four stats", () => {
    render(<About />);
    const stats = screen.getByTestId("about-stats");
    expect(stats.textContent).toMatch(/5\+/);
    expect(stats.textContent).toMatch(/99\.9%/);
    expect(stats.textContent).toMatch(/\$250K\+/);
    expect(stats.textContent).toMatch(/40%/);
  });
});

describe("Skills", () => {
  it("renders one card per skill group with every item", () => {
    render(<Skills />);
    for (const group of skills) {
      expect(screen.getByText(group.label)).toBeInTheDocument();
      for (const item of group.items) {
        // Items may appear multiple times across groups; at least one must exist.
        expect(screen.getAllByText(item).length).toBeGreaterThan(0);
      }
    }
  });
});

describe("Experience", () => {
  it("lists every company in the data", () => {
    render(<Experience />);
    for (const job of experience) {
      expect(screen.getByText(job.company)).toBeInTheDocument();
      expect(screen.getByText(job.role)).toBeInTheDocument();
    }
  });

  it("renders highlights for each role", () => {
    render(<Experience />);
    const list = screen.getByTestId("experience-list");
    for (const job of experience) {
      for (const h of job.highlights) {
        // Highlights can be long; just verify the first 20 chars land.
        expect(list.textContent).toContain(h.slice(0, 20));
      }
    }
  });
});

describe("Projects", () => {
  it("renders the community.general PR with a real GitHub link", () => {
    render(<Projects />);
    const linkEl = screen
      .getAllByRole("link")
      .find((a) => a.getAttribute("href")?.includes("community.general/pull"));
    expect(linkEl).toBeDefined();
    expect(linkEl).toHaveAttribute("target", "_blank");
  });

  it("renders every project from data", () => {
    render(<Projects />);
    for (const p of projects) {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    }
  });

  it("marks featured projects with a Featured badge", () => {
    render(<Projects />);
    const featured = projects.filter((p) => p.highlight);
    expect(featured.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Featured/i).length).toBe(featured.length);
  });
});

describe("Credentials", () => {
  it("lists every certification", () => {
    render(<Credentials />);
    for (const c of certifications) {
      expect(screen.getByText(c.name)).toBeInTheDocument();
    }
  });

  it("certs with a link render an anchor tag", () => {
    render(<Credentials />);
    const linkedCerts = certifications.filter((c) => c.link);
    for (const c of linkedCerts) {
      const a = screen.getByRole("link", { name: c.name });
      expect(a).toHaveAttribute("href", c.link);
    }
  });
});

describe("Contact", () => {
  it("renders email, LinkedIn, GitHub, and location entries", () => {
    render(<Contact />);
    const grid = screen.getByTestId("contact-links");
    expect(grid.textContent).toMatch(/asifdraxi@gmail\.com/);
    expect(grid.textContent).toMatch(/linkedin\.com\/in\/asifdraxi/);
    expect(grid.textContent).toMatch(/github\.com\/AsifAd/);
    expect(grid.textContent).toMatch(/Bengaluru/);
  });

  it("email link uses mailto:", () => {
    render(<Contact />);
    const email = screen.getByRole("link", { name: /Email/i });
    expect(email).toHaveAttribute("href", "mailto:asifdraxi@gmail.com");
  });
});
