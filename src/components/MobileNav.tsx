import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, User, Code2, Briefcase, FolderGit2, GitPullRequest, Mail, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/resume";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-70">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const items = [
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Code2 },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: FolderGit2 },
  { label: "Open Source", href: "#opensource", icon: GitPullRequest },
  { label: "Contact", href: "#contact", icon: Mail },
];

const external = [
  { label: "OSS hub", href: profile.links.ossHub, icon: ExternalLink },
  { label: "GitHub", href: profile.links.github, icon: GithubIcon },
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
    <div className="lg:hidden">
      <button
        type="button"
        data-testid="mobile-nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--color-panel-border)] bg-[var(--color-panel)] text-[var(--color-fg)] transition-colors hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-4 w-4" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
            >
              <Menu className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {open && (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                type="button"
                aria-label="Close menu overlay"
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                id="mobile-nav-panel"
                data-testid="mobile-nav-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                className="panel-strong fixed left-4 right-4 top-20 z-[101] max-h-[min(70vh,32rem)] overflow-y-auto rounded-2xl p-3 shadow-2xl border border-[var(--color-panel-border)] bg-[var(--color-bg)]/95 backdrop-blur-xl"
              >
                <nav className="flex flex-col gap-1">
                  {items.map((it, i) => {
                    const Icon = it.icon;
                    return (
                      <motion.a
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={it.href}
                        href={it.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-[var(--color-fg)] font-medium transition-colors hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
                      >
                        <Icon className="h-5 w-5 opacity-70" />
                        {it.label}
                      </motion.a>
                    );
                  })}
                  <div className="my-2 h-px bg-[var(--color-rule)]" />
                  {external.map((it, i) => {
                    const Icon = it.icon;
                    return (
                      <motion.a
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (items.length + i) * 0.05 }}
                        key={it.href}
                        href={it.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-xl px-4 py-3 font-mono text-sm text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="h-4 w-4 opacity-70" />
                          {it.label}
                          <span className="sr-only"> (opens in new tab)</span>
                        </span>
                        <ExternalLink className="h-3.5 w-3.5 opacity-50" />
                      </motion.a>
                    );
                  })}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
