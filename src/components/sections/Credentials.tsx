import { Award, GraduationCap } from "lucide-react";
import Reveal from "../ui/Reveal";
import { certifications, education } from "../../data/resume";

export default function Credentials() {
  return (
    <section id="credentials" className="relative w-full px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
            <span className="h-px w-8 bg-[var(--color-accent)]" />
            05 · Credentials
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="panel rounded-2xl p-6">
              <div className="flex items-center gap-2 text-[var(--color-accent)]">
                <Award className="h-4 w-4" />
                <span className="font-mono text-xs uppercase tracking-widest">
                  Certifications
                </span>
              </div>
              <ul className="mt-5 space-y-3" data-testid="certifications-list">
                {certifications.map((c) => (
                  <li
                    key={c.name}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--color-rule)] pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      {c.link ? (
                        <a
                          href={c.link}
                          target="_blank"
                          rel="noopener"
                          className="font-medium text-[var(--color-fg)] underline-offset-4 hover:underline"
                        >
                          {c.name}
                        </a>
                      ) : (
                        <span className="font-medium text-[var(--color-fg)]">{c.name}</span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-[var(--color-fg-muted)]">
                      {c.issuer}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel rounded-2xl p-6">
              <div className="flex items-center gap-2 text-[var(--color-accent)]">
                <GraduationCap className="h-4 w-4" />
                <span className="font-mono text-xs uppercase tracking-widest">Education</span>
              </div>
              <ul className="mt-5 space-y-3">
                {education.map((e) => (
                  <li
                    key={e.institution}
                    className="border-b border-[var(--color-rule)] pb-3 last:border-0"
                  >
                    <div className="font-medium text-[var(--color-fg)]">{e.institution}</div>
                    <div className="mt-1 text-sm text-[var(--color-fg-muted)]">{e.degree}</div>
                    <div className="mt-1 font-mono text-xs text-[var(--color-fg-muted)]">
                      {e.location} · {e.period}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
