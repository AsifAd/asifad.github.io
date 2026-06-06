import { motion } from "framer-motion";
import { Award, ExternalLink, GraduationCap, Star, Trophy, Zap } from "lucide-react";
import Reveal from "../ui/Reveal";
import SpotlightCard from "../ui/SpotlightCard";
import { certifications, education, awards } from "../../data/resume";

const awardIcons = [Trophy, Star, Zap];

const awardAccents = [
  { gradient: "from-amber-500/20 via-yellow-500/10 to-transparent", border: "border-amber-500/20", dot: "bg-amber-400", glow: "shadow-amber-500/10" },
  { gradient: "from-violet-500/20 via-purple-500/10 to-transparent", border: "border-violet-500/20", dot: "bg-violet-400", glow: "shadow-violet-500/10" },
  { gradient: "from-cyan-500/20 via-sky-500/10 to-transparent", border: "border-cyan-500/20", dot: "bg-cyan-400", glow: "shadow-cyan-500/10" },
];

export default function Credentials() {
  return (
    <section id="credentials" className="relative w-full px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
            <span className="h-px w-8 bg-[var(--color-accent)]" />
            06 · Credentials
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-[var(--color-fg)] sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Awards, Certifications & Education
          </h2>
        </Reveal>

        {/* ── Awards ── */}
        <div className="mt-16">
          <Reveal>
            <div className="mb-8 flex items-center gap-3">
              <Trophy className="h-5 w-5 text-amber-400" />
              <span className="font-mono text-sm uppercase tracking-widest text-[var(--color-fg-muted)]">
                Recognition
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[var(--color-panel-border)] to-transparent" />
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {awards.map((a, i) => {
              const Icon = awardIcons[i] ?? Trophy;
              const accent = awardAccents[i] ?? awardAccents[0];
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  <div
                    className={`group relative h-full overflow-hidden rounded-2xl border ${accent.border} bg-[var(--color-panel)] p-6 shadow-xl ${accent.glow}`}
                  >
                    {/* gradient wash */}
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent.gradient} opacity-60`} />

                    {/* top row */}
                    <div className="relative z-10 flex items-start justify-between gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${accent.border} bg-[var(--color-bg)]/60`}>
                        <Icon className="h-5 w-5 text-[var(--color-fg-muted)] transition-colors group-hover:text-[var(--color-fg)]" />
                      </div>
                      <span className={`mt-1 inline-flex h-2 w-2 shrink-0 rounded-full ${accent.dot} shadow-lg`} />
                    </div>

                    {/* org badge */}
                    <div className="relative z-10 mt-4">
                      <span className="inline-flex items-center rounded-full border border-[var(--color-panel-border)] bg-[var(--color-bg)]/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]">
                        {a.org}
                      </span>
                    </div>

                    {/* title */}
                    <h3 className="relative z-10 mt-3 font-semibold leading-snug text-[var(--color-fg)] transition-colors group-hover:text-white">
                      {a.title}
                    </h3>

                    {/* description */}
                    <p className="relative z-10 mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                      {a.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Certifications + Education ── */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Reveal>
            <div className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <Award className="h-5 w-5 text-[var(--color-accent)]" />
                <span className="font-mono text-sm uppercase tracking-widest text-[var(--color-fg-muted)]">
                  Certifications
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-[var(--color-panel-border)] to-transparent" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2" data-testid="certifications-list">
                {certifications.map((c, i) => {
                  const content = (
                    <SpotlightCard className="panel group block h-full rounded-xl p-5 transition-colors hover:bg-[var(--color-accent-soft)]/20">
                      <div className="relative z-20 flex h-full flex-col justify-between gap-4">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]">
                            {c.issuer}
                          </div>
                          <div className="mt-2 font-medium text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]">
                            {c.name}
                          </div>
                        </div>
                        {c.link && (
                          <div className="flex items-center gap-1 font-mono text-[11px] text-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100">
                            Verify <ExternalLink className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    </SpotlightCard>
                  );

                  return (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="block h-full"
                    >
                      {c.link ? (
                        <a
                          href={c.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block h-full"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="block h-full">{content}</div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-[var(--color-accent)]" />
                <span className="font-mono text-sm uppercase tracking-widest text-[var(--color-fg-muted)]">Education</span>
                <span className="h-px flex-1 bg-gradient-to-r from-[var(--color-panel-border)] to-transparent" />
              </div>
              <SpotlightCard className="panel rounded-xl p-6 h-[calc(100%-2.5rem)]">
                <div className="relative z-20">
                  <ul className="space-y-6">
                    {education.map((e) => (
                      <li key={e.institution} className="relative">
                        <div className="font-medium text-[var(--color-fg)]">{e.institution}</div>
                        <div className="mt-2 text-sm text-[var(--color-fg-muted)]">{e.degree}</div>
                        <div className="mt-3 inline-flex items-center rounded bg-[var(--color-bg)]/50 px-2 py-1 font-mono text-[11px] text-[var(--color-fg-subtle)] border border-[var(--color-panel-border)]">
                          {e.location} · {e.period}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
