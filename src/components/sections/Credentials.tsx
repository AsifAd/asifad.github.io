import { motion } from "framer-motion";
import { Award, ExternalLink, GraduationCap } from "lucide-react";
import Reveal from "../ui/Reveal";
import SpotlightCard from "../ui/SpotlightCard";
import { certifications, education } from "../../data/resume";

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
            Certifications & Education
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Reveal>
            <div className="h-full">
              <div className="mb-6 flex items-center gap-2 text-[var(--color-accent)]">
                <Award className="h-5 w-5" />
                <span className="font-mono text-sm uppercase tracking-widest">
                  Certifications
                </span>
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
              <div className="mb-6 flex items-center gap-2 text-[var(--color-accent)]">
                <GraduationCap className="h-5 w-5" />
                <span className="font-mono text-sm uppercase tracking-widest">Education</span>
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
