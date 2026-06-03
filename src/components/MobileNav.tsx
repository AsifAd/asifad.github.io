import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { profile } from "../data/resume";

const items = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Open Source", href: "#opensource" },
  { label: "Contact", href: "#contact" },
];

const external = [
  { label: "OSS hub", href: profile.links.ossHub },
  { label: "GitHub", href: profile.links.github },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        data-testid="mobile-nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--color-panel-border)] bg-[var(--color-panel)] text-[var(--color-fg)]"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav-panel"
            data-testid="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="panel-strong fixed left-4 right-4 top-20 z-[101] max-h-[min(70vh,32rem)] overflow-y-auto rounded-2xl p-3 shadow-lg"
          >
            <nav className="flex flex-col gap-0.5">
              {items.map((it) => (
                <a
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-[var(--color-fg)] hover:bg-[var(--color-accent-soft)]"
                >
                  {it.label}
                </a>
              ))}
              <div className="my-2 h-px bg-[var(--color-rule)]" />
              {external.map((it) => (
                <a
                  key={it.href}
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 font-mono text-sm text-[var(--color-fg-muted)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-fg)]"
                >
                  <span>
                    {it.label}
                    <span className="sr-only"> (opens in new tab)</span>
                  </span>
                  <span aria-hidden>↗</span>
                </a>
              ))}
            </nav>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
