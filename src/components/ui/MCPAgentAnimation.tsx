import { motion } from "framer-motion";

const steps = [
  { label: "Alert", sublabel: "New Relic", color: "text-red-400 border-red-500/30 bg-red-500/10", glow: "#f87171" },
  { label: "MCP", sublabel: "Agent", color: "text-violet-400 border-violet-500/30 bg-violet-500/10", glow: "#a78bfa" },
  { label: "Runbook", sublabel: "Classify", color: "text-amber-400 border-amber-500/30 bg-amber-500/10", glow: "#fbbf24" },
  { label: "Resolve", sublabel: "PagerDuty", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10", glow: "#34d399" },
];

export default function MCPAgentAnimation() {
  return (
    <div className="relative flex w-full items-center justify-between h-24 my-4 overflow-hidden rounded-xl bg-[var(--color-bg)]/40 px-6 border border-[var(--color-panel-border)] shadow-inner">
      {/* background rail */}
      <div className="absolute top-1/2 left-8 right-8 h-px -translate-y-1/2 bg-zinc-800" />

      {/* animated pulse traveling across */}
      <motion.div
        className="absolute top-1/2 left-8 h-px w-10 -translate-y-1/2 rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, #a78bfa, transparent)" }}
        animate={{ x: ["0%", "calc(100vw - 5rem)"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.8, ease: "linear", repeat: Infinity }}
      />

      {steps.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.8, delay: i * 0.7, repeat: Infinity }}
          className="relative z-10 flex flex-col items-center gap-1.5"
        >
          <motion.div
            className={`flex h-9 w-9 items-center justify-center rounded-lg border ${s.color} shadow-sm backdrop-blur-sm`}
            animate={{ boxShadow: [`0 0 0px ${s.glow}`, `0 0 10px ${s.glow}55`, `0 0 0px ${s.glow}`] }}
            transition={{ duration: 2.8, delay: i * 0.7, repeat: Infinity }}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-current" />
          </motion.div>
          <div className="flex flex-col items-center gap-0">
            <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-zinc-300">{s.label}</span>
            <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-600">{s.sublabel}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
