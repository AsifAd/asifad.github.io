import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { skills } from "../../data/resume";

export default function Skills() {
  return (
    <section id="skills" data-testid="section-skills" className="relative w-full px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
            <span className="h-px w-8 bg-[var(--color-accent)]" />
            02 · Stack
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-[var(--color-fg)] sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What I work with.
          </h2>
        </Reveal>

        <div
          className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          data-testid="skills-grid"
        >
          {skills.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="panel group relative h-full overflow-hidden rounded-2xl p-6"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]">
                  Group {String(gi + 1).padStart(2, "0")}
                </div>
                <h3
                  className="mt-2 text-xl font-semibold text-[var(--color-fg)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {group.label}
                </h3>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-md border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-2 py-1 font-mono text-xs text-[var(--color-fg)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
