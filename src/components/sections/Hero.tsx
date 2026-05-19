import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../ui/BrandIcons";
import { profile, focusAreas } from "../../data/resume";

const wordReveal = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.15 + i * 0.1, duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

const roleReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.45 + i * 0.07, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

const nameParts = profile.name.toUpperCase().split(" ");

export default function Hero() {
  const reduce = useReducedMotion();
  const roleParts = ["Site", "Reliability", "Engineer."];

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-center justify-center px-6 pt-32 pb-20"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          data-testid="hero-status"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-3 py-1.5 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
            Open to SRE & platform roles · {profile.location}
          </span>
        </motion.div>

        <p
          data-testid="hero-name"
          className="font-bold leading-[0.92] tracking-[-0.04em] text-[var(--color-fg)] text-[clamp(3rem,12vw,6.5rem)]"
          style={{ fontFamily: "var(--font-display)", fontFeatureSettings: "'ss01'" }}
          aria-label={profile.name}
        >
          {nameParts.map((part, i) => (
            <span key={part} className="inline-block overflow-hidden align-bottom">
              <motion.span
                custom={i}
                initial={reduce ? { opacity: 0 } : "hidden"}
                animate={reduce ? { opacity: 1 } : "visible"}
                variants={wordReveal}
                className={`inline-block ${i === nameParts.length - 1 ? "pr-0 text-[var(--color-accent)]" : "pr-[0.18em]"}`}
              >
                {part}
                {i < nameParts.length - 1 ? "\u00a0" : ""}
              </motion.span>
            </span>
          ))}
        </p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-4 h-px w-24 origin-left bg-gradient-to-r from-[var(--color-accent)] to-transparent"
          aria-hidden
        />

        <h1
          data-testid="hero-title"
          aria-label="Site Reliability Engineer"
          className="mt-5 font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--color-fg-muted)] text-[clamp(1.35rem,4.5vw,2.75rem)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {roleParts.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                custom={i}
                initial={reduce ? { opacity: 0 } : "hidden"}
                animate={reduce ? { opacity: 1 } : "visible"}
                variants={roleReveal}
                className={`inline-block ${i === roleParts.length - 1 ? "italic text-[var(--color-fg)]" : "pr-[0.15em]"}`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-6 max-w-2xl text-balance text-lg text-[var(--color-fg-muted)] sm:text-xl"
        >
          I build the platforms that keep production calm at 2 AM — and contribute upstream to{" "}
          <span className="text-[var(--color-fg)]">open source</span> along the way.
          5+ years across <span className="text-[var(--color-fg)]">SRE</span>,{" "}
          <span className="text-[var(--color-fg)]">DevOps</span>,{" "}
          <span className="text-[var(--color-fg)]">Cloud</span>, and{" "}
          <span className="text-[var(--color-fg)]">open source</span> on GCP, AWS, and Azure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            data-testid="hero-cta-projects"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] transition-all hover:scale-[1.02]"
          >
            Production work
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#opensource"
            data-testid="hero-cta-opensource"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] px-5 py-2.5 text-sm font-medium text-[var(--color-fg)] transition-colors hover:bg-[var(--color-accent-soft)]"
          >
            Open source
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-5 py-2.5 text-sm text-[var(--color-fg)] backdrop-blur transition-colors hover:bg-[var(--color-accent-soft)]"
          >
            <GitHubIcon className="h-4 w-4" /> GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-5 py-2.5 text-sm text-[var(--color-fg)] backdrop-blur transition-colors hover:bg-[var(--color-accent-soft)]"
          >
            <LinkedInIcon className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href={profile.links.email}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-5 py-2.5 text-sm text-[var(--color-fg)] backdrop-blur transition-colors hover:bg-[var(--color-accent-soft)]"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
          <a
            href="/asif-draxi-resume.pdf"
            download
            data-testid="hero-resume-download"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-5 py-2.5 text-sm text-[var(--color-fg)] backdrop-blur transition-colors hover:bg-[var(--color-accent-soft)]"
          >
            <Download className="h-4 w-4" /> Résumé
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4"
          data-testid="hero-focus-areas"
        >
          {focusAreas.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
              className="panel group relative overflow-hidden rounded-xl p-4 transition-transform hover:-translate-y-0.5"
            >
              <div
                data-focus-label={f.label}
                className="text-2xl font-bold tracking-tight text-[var(--color-fg)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {f.label}
              </div>
              <div className="mt-1 text-xs text-[var(--color-fg-muted)]">{f.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-16 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--color-fg-muted)]"
        >
          <span className="h-px w-12 ink-rule" />
          scroll
        </motion.div>
      </div>
    </section>
  );
}
