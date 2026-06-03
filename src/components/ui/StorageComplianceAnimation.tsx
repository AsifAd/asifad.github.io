import { motion } from "framer-motion";

export default function StorageComplianceAnimation() {
  return (
    <div className="relative flex w-full items-center justify-center gap-8 h-24 my-4 overflow-hidden rounded-xl bg-[var(--color-bg)]/40 px-6 border border-[var(--color-panel-border)] shadow-inner">
      {[0, 1, 2].map((i) => (
        <div key={i} className="relative flex h-10 w-12 flex-col items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/50 shadow-sm">
          <motion.div
            className="absolute inset-0 rounded-lg border border-emerald-500/0 bg-emerald-500/0"
            animate={{
              borderColor: ["rgba(16, 185, 129, 0)", "rgba(16, 185, 129, 0.8)", "rgba(16, 185, 129, 0)"],
              backgroundColor: ["rgba(16, 185, 129, 0)", "rgba(16, 185, 129, 0.15)", "rgba(16, 185, 129, 0)"],
            }}
            transition={{ duration: 3, delay: i * 0.4 + 0.5, repeat: Infinity }}
          />
          <span className="text-[9px] font-mono text-zinc-400">S3</span>
        </div>
      ))}
      <motion.div
        className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-blue-500/10 to-blue-400/60 border-r-2 border-blue-400"
        animate={{ left: ["-30%", "130%"] }}
        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
      />
    </div>
  );
}