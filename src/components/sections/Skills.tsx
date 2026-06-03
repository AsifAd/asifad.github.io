import { motion } from "framer-motion";
import { Cloud, Container, Terminal, Code, Shield, Wrench, Settings, Activity, Server, PieChart, Network } from "lucide-react";
import Reveal from "../ui/Reveal";
import { skills } from "../../data/resume";

function getIconForSkill(skill: string) {
  const s = skill.toLowerCase();
  if (s.includes("gcp") || s.includes("aws") || s.includes("azure") || s.includes("cloud") || s.includes("vpc")) return Cloud;
  if (s.includes("kubernetes") || s.includes("docker") || s.includes("helm") || s.includes("gke") || s.includes("eks")) return Container;
  if (s.includes("terraform") || s.includes("ansible") || s.includes("gitops") || s.includes("chef") || s.includes("argocd") || s.includes("arm")) return Wrench;
  if (s.includes("python") || s.includes("bash") || s.includes("javascript") || s.includes("git") || s.includes("golang") || s.includes("angular")) return Code;
  if (s.includes("jenkins") || s.includes("action") || s.includes("ci/cd") || s.includes("devops")) return Settings;
  if (s.includes("relic") || s.includes("dynatrace") || s.includes("pager") || s.includes("opsgenie") || s.includes("pingdom")) return Activity;
  if (s.includes("prometheus") || s.includes("grafana")) return PieChart;
  if (s.includes("iam") || s.includes("security")) return Shield;
  if (s.includes("linux") || s.includes("nginx") || s.includes("server")) return Server;
  if (s.includes("tcp") || s.includes("dns") || s.includes("load balancing")) return Network;
  return Terminal;
}

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
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const Icon = getIconForSkill(item);
                    return (
                      <span
                        key={item}
                        className="inline-flex cursor-default items-center gap-1.5 rounded-md border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-2.5 py-1.5 font-mono text-xs text-[var(--color-fg)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
                      >
                        <Icon className="h-3.5 w-3.5 opacity-70" />
                        {item}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
