import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
import Reveal from "../ui/Reveal";
import { openSourceContributions, profile } from "../../data/resume";

export default function OpenSource() {
  return (
    <section
      id="opensource"
      data-testid="section-opensource"
      className="relative w-full px-6 py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
            <span className="h-px w-8 bg-[var(--color-accent)]" />
            05 · Open source
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-[var(--color-fg)] sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Upstream work I'm building in public.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-fg-muted)]">
            Ansible, Argo CD, Jenkins, and more — tracked on a live dashboard with PR status,
            roadmap, and contribution timeline.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.a
            href={profile.links.ossHub}
            target="_blank"
            rel="noopener"
            data-testid="oss-hub-cta"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="panel group mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--color-accent)]/25 bg-[var(--color-accent-soft)]/30 p-6"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                Live dashboard
              </div>
              <div
                className="mt-2 text-xl font-semibold text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                OSS Contributions Hub
              </div>
              <p className="mt-2 max-w-xl text-sm text-[var(--color-fg-muted)]">
                Full tracker with animated PR cards, roadmap filters, and per-stack notes — updated
                as work lands upstream.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-4 py-2 text-sm font-medium text-[var(--color-bg)]">
              Open hub
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </motion.a>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2" data-testid="opensource-grid">
          {openSourceContributions.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <motion.a
                href={c.link || "#"}
                target={c.link ? "_blank" : undefined}
                rel="noopener"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`panel group relative block h-full overflow-hidden rounded-2xl p-6 ${
                  c.highlight ? "md:col-span-2" : ""
                }`}
              >
                {c.highlight && (
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                    <Star className="h-3 w-3" /> Featured
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <h3
                    className="text-xl font-semibold text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {c.name}
                  </h3>
                  {c.link && (
                    <ExternalLink className="h-4 w-4 flex-shrink-0 text-[var(--color-fg-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-fg)]" />
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                  {c.blurb}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-md border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-fg-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
