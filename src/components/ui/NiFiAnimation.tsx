import { motion } from "framer-motion";

export default function NiFiAnimation() {
  return (
    <div className="relative flex w-full items-center justify-center h-24 my-4 overflow-hidden rounded-xl bg-[var(--color-bg)]/40 px-6 border border-[var(--color-panel-border)] shadow-inner">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex h-6 w-20 items-center justify-center rounded border border-rose-500/30 bg-rose-500/10">
        <span className="text-[9px] font-mono text-rose-400">Ansible</span>
      </div>
      
      <div className="mt-7 flex w-full max-w-[240px] items-center justify-between">
        <div className="relative flex h-10 w-20 items-center justify-center rounded border border-emerald-500/30 bg-emerald-500/10">
          <span className="text-[9px] font-mono text-emerald-400">Region A</span>
          <div className="absolute -top-7 left-1/2 h-7 w-px -translate-x-1/2 bg-zinc-800" />
          <motion.div className="absolute -top-7 left-1/2 h-3 w-1 -translate-x-1/2 bg-rose-400 blur-[1px]" animate={{ y: [0, 28], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </div>
        
        <div className="relative h-px flex-1 bg-zinc-800 mx-3">
          <motion.div className="absolute top-1/2 h-1 w-6 -translate-y-1/2 bg-emerald-400 blur-[1px]" animate={{ x: [0, 60, 0] }} transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }} />
        </div>

        <div className="relative flex h-10 w-20 items-center justify-center rounded border border-emerald-500/30 bg-emerald-500/10">
          <span className="text-[9px] font-mono text-emerald-400">Region B</span>
          <div className="absolute -top-7 left-1/2 h-7 w-px -translate-x-1/2 bg-zinc-800" />
          <motion.div className="absolute -top-7 left-1/2 h-3 w-1 -translate-x-1/2 bg-rose-400 blur-[1px]" animate={{ y: [0, 28], opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }} />
        </div>
      </div>
    </div>
  );
}