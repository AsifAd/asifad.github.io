import { useEffect, useMemo, useState } from "react";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  buildPortfolioSearchIndex,
  searchValue,
  type SearchAction,
  type SearchEntry,
} from "../../lib/search-index";

const panelMotion = {
  initial: { opacity: 0, scale: 0.86, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.94, y: 4 },
  transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const },
};

const backdropMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.18 },
};

function runAction(action: SearchAction, onTheme: () => void, onClose: () => void) {
  switch (action.type) {
    case "navigate":
      window.location.hash = action.hash;
      onClose();
      break;
    case "external":
      window.open(action.url, "_blank", "noopener,noreferrer");
      onClose();
      break;
    case "resume":
      window.dispatchEvent(new CustomEvent("open-resume-modal"));
      onClose();
      break;
    case "email":
      window.location.href = "mailto:asifdraxi@gmail.com";
      onClose();
      break;
    case "theme":
      onTheme();
      break;
  }
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const entries = useMemo(() => buildPortfolioSearchIndex(), []);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchEntry[]>();
    for (const e of entries) {
      const list = map.get(e.group) ?? [];
      list.push(e);
      map.set(e.group, list);
    }
    return [...map.entries()];
  }, [entries]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) setOpen(false);
    };

    const handleOpen = () => setOpen(true);
    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", handleOpen);

    const storedTheme = document.documentElement.getAttribute("data-theme");
    if (storedTheme) setTheme(storedTheme);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", handleOpen);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setTheme(next);
    setOpen(false);
  };

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="spotlight-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Spotlight Search"
        >
          <motion.button
            type="button"
            aria-label="Close search"
            className="spotlight-backdrop"
            {...backdropMotion}
            onClick={close}
          />

          <motion.div
            data-testid="spotlight-panel"
            className="spotlight-panel"
            {...panelMotion}
          >
            <Command className="flex h-full min-h-0 flex-col" loop shouldFilter>
              <div className="spotlight-search-row">
                <Search className="spotlight-search-icon h-5 w-5" strokeWidth={2} aria-hidden />
                <Command.Input
                  autoFocus
                  data-testid="spotlight-input"
                  placeholder="Search"
                  className="spotlight-input"
                />
              </div>

              <div className="spotlight-divider" aria-hidden />

              <Command.List className="spotlight-list">
                <Command.Empty className="spotlight-empty">
                  <p className="font-medium text-[var(--color-fg)]">No results</p>
                  <p className="mt-1 text-sm opacity-80">
                    Try Ansible, BlackLine, Terraform, or résumé
                  </p>
                </Command.Empty>

                {grouped.map(([group, groupEntries]) => (
                  <Command.Group
                    key={group}
                    heading={<div className="spotlight-group-label">{group}</div>}
                  >
                    {groupEntries.map((entry) => {
                      const Icon = entry.icon;
                      return (
                        <Command.Item
                          key={entry.id}
                          value={searchValue(entry)}
                          onSelect={() => runAction(entry.action, toggleTheme, close)}
                          className="spotlight-row"
                        >
                          <span className="spotlight-row-icon">
                            <Icon className="h-4 w-4" aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="spotlight-row-title">{entry.title}</span>
                            {entry.subtitle && (
                              <span className="spotlight-row-sub">{entry.subtitle}</span>
                            )}
                          </span>
                        </Command.Item>
                      );
                    })}
                  </Command.Group>
                ))}
              </Command.List>

              <div className="spotlight-footer">
                <span>{entries.length} items</span>
                <div className="spotlight-shortcuts">
                  <span className="spotlight-kbd">↑</span>
                  <span className="spotlight-kbd">↓</span>
                  <span>navigate</span>
                  <span className="spotlight-kbd">↵</span>
                  <span>open</span>
                  <span className="spotlight-kbd">esc</span>
                </div>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
