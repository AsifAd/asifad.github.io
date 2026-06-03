import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";

export default function SystemStatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-6 left-6 z-40 hidden items-center gap-3 rounded-full border border-[var(--color-panel-border)] bg-[var(--color-panel)]/80 px-4 py-2.5 font-mono text-[10px] text-[var(--color-fg-muted)] backdrop-blur-md shadow-2xl sm:flex"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="font-medium text-[var(--color-fg)]">SYS.NOMINAL</span>
      </div>
      <div className="h-3 w-px bg-[var(--color-panel-border)]" />
      <div className="flex items-center gap-1.5">
        <Activity className="h-3 w-3 text-emerald-400" />
        <span>BLR {time}</span>
      </div>
    </motion.div>
  );
}