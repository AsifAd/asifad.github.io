import { motion } from "framer-motion";

export default function ServiceMapAnimation() {
  const nodes = [
    { id: "nr", label: "NR", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
    { id: "pd", label: "PD", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
    { id: "gh", label: "GH", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
    { id: "ans", label: "ANS", color: "text-rose-400 border-rose-500/30 bg-rose-500/10" }
  ];

  return (
    <div className="relative flex w-full items-center justify-between h-24 my-4 overflow-hidden rounded-xl bg-[var(--color-bg)]/40 px-6 border border-[var(--color-panel-border)] shadow-inner">
      <div className="absolute top-1/2 left-8 right-8 h-px -translate-y-1/2 bg-zinc-800" />
      <motion.div
        className="absolute top-1/2 left-8 h-1 w-16 -translate-y-1/2 rounded-full bg-emerald-500 blur-[1px]"
        animate={{ x: ["0%", "400%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
      />
      {nodes.map((node) => (
        <div key={node.id} className="relative z-10 flex flex-col items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${node.color} shadow-sm backdrop-blur-sm`}>
            <div className="h-1.5 w-1.5 rounded-full bg-current" />
          </div>
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{node.label}</span>
        </div>
      ))}
    </div>
  );
}