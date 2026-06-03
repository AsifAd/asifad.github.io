import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Monitor, Code, FileText, Moon, Sun, Mail } from "lucide-react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
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
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    setOpen(false);
  };

  const navigate = (hash: string) => {
    window.location.hash = hash;
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={() => setOpen(false)}
      />
      
      {/* Command Modal */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-[var(--color-panel-border)] bg-[var(--color-panel)] shadow-2xl backdrop-blur-md">
        <Command
          className="flex h-full w-full flex-col"
          loop
        >
          <div className="flex items-center border-b border-[var(--color-panel-border)] px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-[var(--color-fg-muted)]" />
            <Command.Input 
              autoFocus
              placeholder="Type a command or search..." 
              className="flex h-12 w-full bg-transparent py-3 text-sm text-[var(--color-fg)] outline-none placeholder:text-[var(--color-fg-muted)] disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 text-sm text-[var(--color-fg)]">
            <Command.Empty className="py-6 text-center text-sm text-[var(--color-fg-muted)]">
              No results found.
            </Command.Empty>

            <Command.Group heading={<div className="px-2 py-1.5 text-xs font-medium text-[var(--color-fg-muted)]">Navigation</div>}>
              <Command.Item 
                onSelect={() => navigate("#experience")}
                className="flex cursor-pointer items-center rounded-md px-2 py-2.5 aria-selected:bg-[var(--color-accent-soft)] aria-selected:text-[var(--color-accent)]"
              >
                <Monitor className="mr-2 h-4 w-4" /> Go to Experience
              </Command.Item>
              <Command.Item 
                onSelect={() => navigate("#opensource")}
                className="flex cursor-pointer items-center rounded-md px-2 py-2.5 aria-selected:bg-[var(--color-accent-soft)] aria-selected:text-[var(--color-accent)]"
              >
                <Code className="mr-2 h-4 w-4" /> View Open Source PRs
              </Command.Item>
              <Command.Item 
                onSelect={() => navigate("#projects")}
                className="flex cursor-pointer items-center rounded-md px-2 py-2.5 aria-selected:bg-[var(--color-accent-soft)] aria-selected:text-[var(--color-accent)]"
              >
                <FileText className="mr-2 h-4 w-4" /> View Projects
              </Command.Item>
            </Command.Group>

            <Command.Group heading={<div className="px-2 py-1.5 text-xs font-medium text-[var(--color-fg-muted)] mt-2">Actions</div>}>
              <Command.Item 
                onSelect={toggleTheme}
                className="flex cursor-pointer items-center rounded-md px-2 py-2.5 aria-selected:bg-[var(--color-accent-soft)] aria-selected:text-[var(--color-accent)]"
              >
                {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                Toggle {theme === "dark" ? "Light" : "Dark"} Mode
              </Command.Item>
              <Command.Item 
                onSelect={() => {
                  window.open('/asif-draxi-resume.pdf');
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center rounded-md px-2 py-2.5 aria-selected:bg-[var(--color-accent-soft)] aria-selected:text-[var(--color-accent)]"
              >
                <FileText className="mr-2 h-4 w-4" /> Download Resume (PDF)
              </Command.Item>
              <Command.Item 
                onSelect={() => {
                  window.location.href = 'mailto:asifdraxi@gmail.com';
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center rounded-md px-2 py-2.5 aria-selected:bg-[var(--color-accent-soft)] aria-selected:text-[var(--color-accent)]"
              >
                <Mail className="mr-2 h-4 w-4" /> Send Email
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}