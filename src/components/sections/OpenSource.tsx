import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Reveal from "../ui/Reveal";
import SpotlightCard from "../ui/SpotlightCard";
import { openSourceStacks, profile } from "../../data/resume";

const statusStyles: Record<
  (typeof openSourceStacks)[number]["status"],
  string
> = {
  active:
    "border-[var(--color-accent)]/35 bg-[var(--color-accent-soft)] text-[var(--color-accent)]",
  planned: 
    "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  exploring:
    "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
};

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
            PRs, roadmaps, and repro notes for each stack — synced from the live dashboard below.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.a
            href={profile.links.ossHub}
            target="_blank"
            rel="noopener noreferrer"
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

        <Reveal delay={0.12}>
          <div className="mt-10">
            <h3
              className="text-sm font-semibold uppercase tracking-widest text-[var(--color-fg-muted)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Technologies I'm working on
            </h3>
            <div
              className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              data-testid="opensource-stacks"
            >
              {openSourceStacks.map((stack, i) => (
                <motion.a
                  key={stack.tech}
                  href={stack.hubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-stack={stack.name}
                  data-testid={`oss-stack-${stack.tech}`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  className="block"
                >
                  <SpotlightCard className="panel group block h-full rounded-xl p-4 transition-colors hover:bg-[var(--color-accent-soft)]/20">
                    <div className="relative z-20">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="font-semibold text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {stack.name}
                        </span>
                        <span
                          className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${statusStyles[stack.status]}`}
                        >
                          {stack.statusLabel}
                          {stack.openPRs > 0 ? ` · ${stack.openPRs} PR` : ""}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                        {stack.focus}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] text-[var(--color-accent)]">
                        View on hub
                        <ExternalLink className="h-3 w-3" />
                        <span className="sr-only"> (opens in new tab)</span>
                      </span>
                    </div>
                  </SpotlightCard>
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
