import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function HeroTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const sequence = [
      "> systemctl status engineer",
      "● Asif Draxi - Site Reliability Engineer",
      "   Active: active (running) since 2019",
      "   Tasks: 42 (limit: 4096)",
      "   Memory: 100% optimized",
      "> echo 'Systems Nominal.'",
      "Systems Nominal."
    ];

    let currentLine = 0;
    let timeout: NodeJS.Timeout;

    const nextLine = () => {
      if (currentLine < sequence.length) {
        setLines(prev => [...prev, sequence[currentLine]]);
        currentLine++;
        timeout = setTimeout(nextLine, currentLine === 1 || currentLine === 5 ? 800 : 300);
      }
    };

    timeout = setTimeout(nextLine, 500);
    return () => clearTimeout(timeout);
  }, [isInView]);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="w-full overflow-hidden rounded-xl border border-zinc-800 bg-[#0d0d0d] shadow-[0_0_30px_rgba(16,185,129,0.15)]">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>
        <span className="font-mono text-[10px] text-zinc-500">asif@production:~</span>
        <div className="w-12" /> {/* Spacer for centering */}
      </div>
      <div className="p-5 font-mono text-xs leading-relaxed sm:text-sm min-h-[160px]">
        {lines.map((line, i) => (
          <div key={i} className={line.startsWith(">") ? "text-emerald-400 mt-2" : "text-zinc-300 ml-4"}>
            {line}
          </div>
        ))}
        <div className="text-emerald-400 mt-2">
          &gt;<span className={`${cursorVisible ? "opacity-100" : "opacity-0"}`}>_</span>
        </div>
      </div>
    </div>
  );
}