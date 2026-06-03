import { motion } from "framer-motion";
import { Activity, Cloud, GitBranch, Zap } from "lucide-react";
import Reveal from "../ui/Reveal";
import HeroTerminal from "../ui/HeroTerminal";
import { aboutNote, summary } from "../../data/resume";

const stats = [
  { label: "Years in SRE", value: "5+", icon: Activity },
  { label: "Uptime SLA", value: "99.9%", icon: Zap },
  { label: "Quarterly savings", value: "$250K+", icon: Cloud },
  { label: "Release toil reduced", value: "40%", icon: GitBranch },
];

export default function About() {
  return (
    <section id="about" data-testid="section-about" className="relative w-full px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
            <span className="h-px w-8 bg-[var(--color-accent)]" />
            01 · About
          </div>
        </Reveal>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <h2
              className="text-4xl font-bold tracking-tight text-[var(--color-fg)] sm:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Reliability is a <span className="italic text-[var(--color-accent)]">design discipline</span>, not a hope.
            </h2>
            <p className="mt-6 text-balance text-lg leading-relaxed text-[var(--color-fg-muted)]">
              {summary}
            </p>
            <p className="mt-4 text-balance text-lg leading-relaxed text-[var(--color-fg-muted)]">
              {aboutNote}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-3" data-testid="about-stats">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="panel relative overflow-hidden rounded-2xl p-5"
                  >
                    <s.icon className="h-5 w-5 text-[var(--color-accent)]" />
                    <div
                      className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-fg)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8">
                <HeroTerminal />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
