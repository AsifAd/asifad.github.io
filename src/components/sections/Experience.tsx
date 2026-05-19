import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { experience } from "../../data/resume";

export default function Experience() {
  return (
    <section
      id="experience"
      data-testid="section-experience"
      className="relative w-full px-6 py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
            <span className="h-px w-8 bg-[var(--color-accent)]" />
            03 · Experience
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-[var(--color-fg)] sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A timeline of the systems I've kept running.
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-[var(--color-panel-border)] to-transparent md:left-1/2"
          />

          <div className="space-y-12 md:space-y-20" data-testid="experience-list">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.05}>
                <article className="relative grid md:grid-cols-2 md:gap-12">
                  <div
                    aria-hidden
                    className="absolute left-4 top-3 -translate-x-1/2 md:left-1/2"
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-40" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--color-accent)]" />
                    </span>
                  </div>

                  <div
                    className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}`}
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="panel-strong relative overflow-hidden rounded-2xl p-6"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3
                          className="text-xl font-semibold text-[var(--color-fg)]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {job.company}
                        </h3>
                        <span className="font-mono text-xs text-[var(--color-fg-muted)]">
                          {job.period}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-[var(--color-accent)]">{job.role}</span>
                        <span className="font-mono text-xs text-[var(--color-fg-muted)]">
                          {job.location}
                        </span>
                      </div>

                      <ul className={`mt-5 space-y-2.5 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                        {job.highlights.map((h, hi) => (
                          <li
                            key={hi}
                            className="text-sm leading-relaxed text-[var(--color-fg-muted)]"
                          >
                            <span className="text-[var(--color-fg-subtle)]">›</span> {h}
                          </li>
                        ))}
                      </ul>

                      <div
                        className={`mt-5 flex flex-wrap gap-1.5 ${i % 2 === 0 ? "md:justify-end" : ""}`}
                      >
                        {job.stack.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center rounded-md border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-2 py-1 font-mono text-[11px] text-[var(--color-fg-muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <div className="hidden md:block" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
