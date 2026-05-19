import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "../../src/components/ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  });

  it("renders with an accessible label", () => {
    render(<ThemeToggle />);
    const btn = screen.getByTestId("theme-toggle");
    expect(btn).toHaveAttribute("aria-label");
    expect(btn.getAttribute("aria-label")).toMatch(/switch to (light|dark) mode/i);
  });

  it("toggles data-theme on the html element when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

    await user.click(screen.getByTestId("theme-toggle"));
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    await user.click(screen.getByTestId("theme-toggle"));
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("persists the chosen theme to localStorage", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(screen.getByTestId("theme-toggle"));
    expect(localStorage.getItem("theme")).toBe("light");
    await user.click(screen.getByTestId("theme-toggle"));
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("reads initial theme from the html attribute (avoiding hydration flash)", () => {
    document.documentElement.setAttribute("data-theme", "light");
    render(<ThemeToggle />);
    // When current theme is light, the button should advertise switching to dark.
    expect(screen.getByTestId("theme-toggle").getAttribute("aria-label"))
      .toMatch(/dark/i);
  });
});
