import { motion } from "framer-motion";

export default function ServerlessAlertingAnimation() {
  return (
    <div className="relative flex w-full items-center justify-center gap-8 h-24 my-4 overflow-hidden rounded-xl bg-[var(--color-bg)]/40 px-6 border border-[var(--color-panel-border)] shadow-inner">
      {/* Logs */}
      <div className="relative flex h-12 w-12 flex-col gap-1.5 items-end justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-1 w-4 rounded-full bg-zinc-700"
            animate={{ backgroundColor: ["#3f3f46", "#f87171", "#3f3f46"] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Lambda */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute h-14 w-14 rounded-full border border-orange-500/50"
          animate={{ scale: [1, 1.6], opacity: [1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 border border-orange-500/50">
          <span className="text-[12px] font-mono text-orange-400">λ</span>
        </div>
      </div>

      {/* Webhook */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10">
        <div className="absolute -left-8 top-1/2 h-px w-8 -translate-y-1/2 bg-zinc-800" />
        <motion.div
          className="absolute -left-8 top-1/2 h-1 w-3 -translate-y-1/2 bg-orange-400 blur-[1px]"
          animate={{ x: [0, 32], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, delay: 0.6, repeat: Infinity }}
        />
        <span className="text-[14px]">🔔</span>
      </div>
    </div>
  );
}