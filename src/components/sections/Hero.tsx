import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../ui/BrandIcons";
import { profile, focusAreas } from "../../data/resume";

const word = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.08, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

export default function Hero() {
  const reduce = useReducedMotion();
  const titleParts = ["Site", "Reliability", "Engineer."];

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-center justify-center px-6 pt-32 pb-20"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        {/* status pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-3 py-1.5 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
            On-call ready · Open to collaboration
          </span>
        </motion.div>

        {/* eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="font-mono text-sm tracking-widest text-[var(--color-accent)]"
          data-testid="hero-eyebrow"
        >
          ASIF DRAXI
        </motion.p>

        {/* title */}
        <h1
          aria-label="Site Reliability Engineer"
          data-testid="hero-title"
          className="mt-3 font-bold leading-[0.95] tracking-[-0.03em] text-[var(--color-fg)] text-[clamp(2.5rem,9vw,7.5rem)]"
          style={{ fontFamily: "var(--font-display)", fontFeatureSettings: "'ss01'" }}
        >
          {titleParts.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                custom={i}
                initial={reduce ? { opacity: 0 } : "hidden"}
                animate={reduce ? { opacity: 1 } : "visible"}
                variants={word}
                className="inline-block pr-[0.2em]"
              >
                {i === titleParts.length - 1 ? (
                  <span className="italic text-[var(--color-accent)]">{w}</span>
                ) : (
                  w
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-6 max-w-2xl text-balance text-lg text-[var(--color-fg-muted)] sm:text-xl"
        >
          I build the platforms that keep production calm at 2 AM.
          5+ years across <span className="text-[var(--color-fg)]">SRE</span>,{" "}
          <span className="text-[var(--color-fg)]">DevOps</span>,{" "}
          <span className="text-[var(--color-fg)]">Cloud</span>, and{" "}
          <span className="text-[var(--color-fg)]">AI-assisted automation</span> on GCP, AWS, and Azure.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#experience"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] transition-all hover:scale-[1.02]"
          >
            See my work
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-5 py-2.5 text-sm text-[var(--color-fg)] backdrop-blur transition-colors hover:bg-[var(--color-accent-soft)]"
          >
            <GitHubIcon className="h-4 w-4" /> GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener"
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

        {/* focus area chips */}
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

        {/* scroll cue */}
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
