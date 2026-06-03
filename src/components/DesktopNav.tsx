import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Open Source", id: "opensource" },
  { label: "Contact", id: "contact" },
];

export default function DesktopNav() {
  const [active, setActive] = useState<string>("");

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
    <div className="hidden shrink-0 items-center gap-1 sm:flex">
      {SECTIONS.map((it) => {
        const isActive = active === it.id;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              isActive ? "text-[var(--color-accent)]" : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 -z-10 rounded-full bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/20"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{it.label}</span>
          </a>
        );
      })}
    </div>
  );
}