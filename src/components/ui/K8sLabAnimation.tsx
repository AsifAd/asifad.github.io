import { motion } from "framer-motion";

export default function K8sLabAnimation() {
  return (
    <div className="relative flex w-full items-end justify-center h-24 my-4 overflow-hidden rounded-xl bg-[var(--color-bg)]/40 px-6 pb-4 border border-[var(--color-panel-border)] shadow-inner">
      <div className="flex flex-col items-center gap-1.5">
        <motion.div 
          className="flex h-5 w-28 items-center justify-center rounded border border-blue-500/30 bg-blue-500/10"
          animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, 10] }}
          transition={{ duration: 4, times: [0, 0.15, 0.85, 1], repeat: Infinity }}
        >
          <span className="text-[9px] font-mono text-blue-400">K8s Pods</span>
        </motion.div>
        <motion.div 
          className="flex h-5 w-36 items-center justify-center rounded border border-rose-500/30 bg-rose-500/10"
          animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, 10] }}
          transition={{ duration: 4, times: [0, 0.25, 0.9, 1], repeat: Infinity }}
        >
          <span className="text-[9px] font-mono text-rose-400">Ansible Nodes</span>
        </motion.div>
        <motion.div 
          className="flex h-5 w-44 items-center justify-center rounded border border-purple-500/30 bg-purple-500/10"
          animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, 10] }}
          transition={{ duration: 4, times: [0, 0.35, 0.95, 1], repeat: Infinity }}
        >
          <span className="text-[9px] font-mono text-purple-400">Terraform VPC</span>
        </motion.div>
      </div>
    </div>
  );
}