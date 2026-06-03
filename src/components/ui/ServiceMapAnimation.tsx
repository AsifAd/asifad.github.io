import { motion } from "framer-motion";

export default function ServiceMapAnimation() {
  const nodes = [
    { id: "nr", label: "New Relic", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
    { id: "pd", label: "PagerDuty", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
    { id: "gh", label: "GH Actions", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
    { id: "ans", label: "Ansible", color: "text-rose-400 border-rose-500/30 bg-rose-500/10" }
  ];

  return (
    <div className="relative flex w-full items-center justify-between py-6 my-4 overflow-hidden rounded-lg bg-[var(--color-bg)]/50 px-4 border border-[var(--color-panel-border)]">
      {/* Connecting Line */}
      <div className="absolute top-1/2 left-8 right-8 h-px -translate-y-1/2 bg-zinc-800" />
      
      {/* Animated Packet */}
      <motion.div
        className="absolute top-1/2 left-8 h-2 w-16 -translate-y-1/2 rounded-full bg-emerald-500 blur-[2px]"
        animate={{
          x: ["0%", "400%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {nodes.map((node, i) => (
        <div key={node.id} className="relative z-10 flex flex-col items-center gap-2">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${node.color} shadow-lg backdrop-blur`}>
            <div className="h-2 w-2 rounded-full bg-current" />
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{node.label}</span>
        </div>
      ))}
    </div>
  );
}