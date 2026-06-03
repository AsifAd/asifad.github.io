import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import Reveal from "../ui/Reveal";
import ServiceMapAnimation from "../ui/ServiceMapAnimation";
import StorageComplianceAnimation from "../ui/StorageComplianceAnimation";
import GitOpsFleetAnimation from "../ui/GitOpsFleetAnimation";
import NiFiAnimation from "../ui/NiFiAnimation";
import K8sLabAnimation from "../ui/K8sLabAnimation";
import ServerlessAlertingAnimation from "../ui/ServerlessAlertingAnimation";
import SpotlightCard from "../ui/SpotlightCard";
import { projects } from "../../data/resume";

function isExternal(link: string) {
  return link.startsWith("http");
}

export default function Projects() {
  return (
    <section id="projects" data-testid="section-projects" className="relative w-full px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
            <span className="h-px w-8 bg-[var(--color-accent)]" />
            04 · Selected work
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-[var(--color-fg)] sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Things I've shipped.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2" data-testid="projects-grid">
          {projects.map((p, i) => {
            const cardClass = `panel group relative block h-full overflow-hidden rounded-2xl p-6 ${
              p.highlight ? "md:col-span-2" : ""
            }`;
            const inner = (
              <>
                {p.highlight && (
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                    <Star className="h-3 w-3" /> Featured
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <h3
                    className="text-xl font-semibold text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.name}
                  </h3>
                  {p.link && (
                    <ExternalLink className="h-4 w-4 flex-shrink-0 text-[var(--color-fg-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-fg)]" />
                  )}
                </div>

                {p.name === "Automated Storage Compliance Controller" && <StorageComplianceAnimation />}
                {p.name === "GitOps Fleet Manager" && <GitOpsFleetAnimation />}
                {p.name === "Auto-healing remediation loop" && <ServiceMapAnimation />}
                {p.name === "NiFi multi-region orchestration" && <NiFiAnimation />}
                {p.name === "Enterprise K8s Automation Lab" && <K8sLabAnimation />}
                {p.name === "Serverless cloud alerting engine" && <ServerlessAlertingAnimation />}

                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">{p.blurb}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-fg-muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
                    >
                      <span className="block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"></span>
                      {t}
                    </span>
                  ))}
                </div>
              </>
            );

            return (
              <Reveal key={p.name} delay={i * 0.05}>
                {p.link ? (
                  <motion.a
                    href={p.link}
                    target={isExternal(p.link) ? "_blank" : undefined}
                    rel={isExternal(p.link) ? "noopener noreferrer" : undefined}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="block h-full"
                  >
                    <SpotlightCard className={cardClass}>
                      <div className="relative z-20">
                        {inner}
                      </div>
                    </SpotlightCard>
                  </motion.a>
                ) : (
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="block h-full"
                  >
                    <SpotlightCard className={cardClass}>
                      <div className="relative z-20">
                        {inner}
                      </div>
                    </SpotlightCard>
                  </motion.article>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
