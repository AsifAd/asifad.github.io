import { Search } from "lucide-react";

export default function CommandTrigger() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
      className="hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-3 py-1.5 font-mono text-xs leading-none text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-fg)] hover:border-[var(--color-accent)]/30 sm:inline-flex group"
      aria-label="Search"
    >
      <Search className="h-3.5 w-3.5" />
      <span>Search</span>
      <span className="ml-1 rounded bg-[var(--color-bg)] px-1 py-0.5 text-[10px] text-[var(--color-fg-subtle)] border border-[var(--color-panel-border)] group-hover:border-[var(--color-accent)]/30">⌘K</span>
    </button>
  );
}