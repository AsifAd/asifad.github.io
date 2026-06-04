import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "../ui/Reveal";
import { experience } from "../../data/resume";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

        <div className="relative mt-16" ref={containerRef}>
          {/* Background Line */}
          <div
            aria-hidden
            className="absolute left-4 top-0 h-full w-px bg-[var(--color-panel-border)] md:left-8"
          />
          
          {/* Animated Scroll Progress Line */}
          <motion.div
            aria-hidden
            className="absolute left-4 top-0 w-px origin-top bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)] md:left-8"
            style={{ scaleY, height: "100%" }}
          />

          <div className="space-y-16 md:space-y-24" data-testid="experience-list">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.05}>
                <article className="relative grid md:grid-cols-[1fr_2.5fr] md:gap-12">
                  <div
                    aria-hidden
                    className="absolute left-4 top-3 -translate-x-1/2 md:left-8"
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-40" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--color-accent)]" />
                    </span>
                  </div>

                  <div className="pl-12 md:pl-16">
                    <div className="sticky top-24">
                      <h3
                        className="text-xl font-semibold text-[var(--color-fg)]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {job.company}
                      </h3>
                      <div className="mt-1 font-mono text-sm text-[var(--color-accent)]">
                        {job.role}
                      </div>
                      <div className="mt-2 font-mono text-xs text-[var(--color-fg-muted)]">
                        {job.period}
                      </div>
                      <div className="mt-1 font-mono text-xs text-[var(--color-fg-subtle)]">
                        {job.location}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pl-12 md:mt-0 md:pl-0">
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="panel-strong relative overflow-hidden rounded-2xl p-6 md:p-8"
                    >
                      <ul className="space-y-3">
                        {job.highlights.map((h, hi) => (
                          <li
                            key={hi}
                            className="text-sm leading-relaxed text-[var(--color-fg-muted)]"
                          >
                            <span className="mr-2 text-[var(--color-fg-subtle)]">›</span>
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {job.stack.map((t) => (
                          <span
                            key={t}
                            className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-fg-muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
                          >
                            <span className="block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"></span>
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
