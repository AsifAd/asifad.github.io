import { motion } from "framer-motion";

export default function GitOpsFleetAnimation() {
  return (
    <div className="relative flex w-full items-center justify-center h-24 my-4 overflow-hidden rounded-xl bg-[var(--color-bg)]/40 px-6 border border-[var(--color-panel-border)] shadow-inner">
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-10">
        <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/40 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
          <span className="text-[10px] font-mono text-orange-400">ARGO</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative flex h-5 w-14 items-center justify-center rounded border border-blue-500/30 bg-blue-500/10">
              <div className="absolute -left-10 top-1/2 h-px w-10 -translate-y-1/2 bg-zinc-800" />
              <motion.div
                className="absolute -left-10 top-1/2 h-1 w-4 -translate-y-1/2 rounded-full bg-orange-400 blur-[1px]"
                animate={{ x: [0, 40], opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
              />
              <span className="text-[9px] font-mono text-blue-400">K8S</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}