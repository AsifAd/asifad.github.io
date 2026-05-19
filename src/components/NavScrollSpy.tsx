import { useEffect, useState } from "react";

const SECTIONS = ["about", "skills", "experience", "projects", "opensource", "contact"] as const;

export default function NavScrollSpy() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]").forEach((link) => {
      const section = link.dataset.navLink;
      const isActive = section === active;
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
      link.classList.toggle("nav-link-active", isActive);
    });
  }, [active]);

  return null;
}
