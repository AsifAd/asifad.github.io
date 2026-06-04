import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Code2, Briefcase, FolderGit2, GitPullRequest, Mail } from "lucide-react";

const SECTIONS = [
  { label: "About", id: "about", icon: User },
  { label: "Skills", id: "skills", icon: Code2 },
  { label: "Experience", id: "experience", icon: Briefcase },
  { label: "Projects", id: "projects", icon: FolderGit2 },
  { label: "Open Source", id: "opensource", icon: GitPullRequest },
  { label: "Contact", id: "contact", icon: Mail },
];

export default function DesktopNav() {
  const [active, setActive] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden shrink-0 items-center gap-1 lg:flex" onMouseLeave={() => setHovered(null)}>
      {SECTIONS.map((it) => {
        const isActive = active === it.id;
        const Icon = it.icon;
        return (
          <a
            key={it.id}
            data-nav-link={it.id}
            href={`#${it.id}`}
            onMouseEnter={() => setHovered(it.id)}
            className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              isActive ? "text-[var(--color-accent)]" : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            }`}
          >
            {hovered === it.id && (
              <motion.div
                layoutId="nav-hover"
                className="absolute inset-0 -z-10 rounded-full bg-[var(--color-panel)] border border-[var(--color-panel-border)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {isActive && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 -z-10 rounded-full bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/20 shadow-[0_0_12px_var(--color-accent-soft)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <Icon className="h-4 w-4 relative z-10" strokeWidth={isActive ? 2.5 : 2} />
            <span className="relative z-10">{it.label}</span>
          </a>
        );
      })}
    </div>
  );
}