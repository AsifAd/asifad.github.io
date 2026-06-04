import { Search } from "lucide-react";

export function openCommandPalette() {
  window.dispatchEvent(new Event("open-command-palette"));
}

export default function CommandTrigger() {
  return (
    <button
      type="button"
      data-testid="command-trigger"
      onClick={openCommandPalette}
      className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--color-panel-border)] bg-[var(--color-panel)] font-mono text-xs leading-none text-[var(--color-fg-muted)] transition-all hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)] h-9 w-9 justify-center p-0 lg:h-auto lg:w-auto lg:px-3 lg:py-1.5"
      aria-label="Search site"
    >
      <Search className="h-3.5 w-3.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden />
      <span className="hidden lg:inline">Search</span>
      <kbd className="ml-0.5 hidden rounded border border-[var(--color-panel-border)] bg-[var(--color-bg)] px-1 py-0.5 text-[10px] text-[var(--color-fg-subtle)] group-hover:text-[var(--color-accent)] group-hover:border-[var(--color-accent)]/30 transition-colors lg:inline">
        ⌘K
      </kbd>
    </button>
  );
}
