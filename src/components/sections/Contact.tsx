import { motion } from "framer-motion";
import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import Reveal from "../ui/Reveal";
import TerminalCopy from "../ui/TerminalCopy";
import { GitHubIcon, LinkedInIcon } from "../ui/BrandIcons";
import { profile } from "../../data/resume";

const links = [
  { label: "Email", value: "asifdraxi@gmail.com", href: profile.links.email, icon: Mail },
  { label: "LinkedIn", value: "linkedin.com/in/asifdraxi", href: profile.links.linkedin, icon: LinkedInIcon },
  { label: "GitHub", value: "github.com/AsifAd", href: profile.links.github, icon: GitHubIcon },
  {
    label: "Résumé",
    value: "PDF download",
    href: "/asif-draxi-resume.pdf",
    download: true,
    icon: Download,
  },
  { label: "Location", value: profile.location, icon: MapPin },
];

export default function Contact() {
  return (
    <section id="contact" data-testid="section-contact" className="relative w-full px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
            <span className="h-px w-8 bg-[var(--color-accent)]" />
            07 · Contact
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-[var(--color-fg)] sm:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Have a system to keep <span className="italic text-[var(--color-accent)]">running</span>?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-fg-muted)]">
            I'm open to SRE, platform, and OSS collaboration. Drop a line — the fastest path is
            email or LinkedIn.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <TerminalCopy />
        </Reveal>

        <div className="mt-12 grid gap-3 sm:grid-cols-2" data-testid="contact-links">
          {links.map((l, i) => {
            const Tag: any = l.href ? motion.a : motion.div;
            return (
              <Reveal key={l.label} delay={i * 0.05}>
                <Tag
                  href={l.href}
                  download={"download" in l && l.download ? true : undefined}
                  target={l.href?.startsWith("http") ? "_blank" : undefined}
                  rel={l.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={l.href ? { y: -2 } : undefined}
                  className="panel group flex items-center justify-between gap-4 rounded-xl p-5 transition-colors hover:bg-[var(--color-accent-soft)]"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--color-panel)] text-[var(--color-accent)]">
                      <l.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]">
                        {l.label}
                      </div>
                      <div className="mt-0.5 font-medium text-[var(--color-fg)]">{l.value}</div>
                    </div>
                  </div>
                  {l.href && (
                    <ArrowUpRight className="h-5 w-5 text-[var(--color-fg-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-fg)]" />
                  )}
                </Tag>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.4}>
          <footer className="mt-32 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-rule)] pt-8 text-xs text-[var(--color-fg-muted)]">
            <div className="font-mono">
              © {new Date().getFullYear()} {profile.name} · Built with Astro, Tailwind, Framer
              Motion
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>systems nominal</span>
            </div>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
