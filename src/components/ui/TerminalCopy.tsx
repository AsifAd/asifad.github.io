import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

export default function TerminalCopy() {
  const [copied, setCopied] = useState(false);
  const code = "curl -sL https://asifad.github.io/asif-draxi-resume.pdf -o asif-draxi-resume.pdf";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="relative mt-8 overflow-hidden rounded-xl border border-[var(--color-panel-border)] bg-[#0d0d0d] font-mono shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2 text-xs text-zinc-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5" />
            <span className="font-medium">fetch-resume.sh</span>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded bg-white/[0.05] px-2.5 py-1 text-[10px] uppercase tracking-wider transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4 text-sm text-zinc-300">
        <div className="flex gap-4">
          <span className="select-none text-zinc-600">1</span>
          <span className="text-zinc-500"># Fetch my resume directly from your terminal</span>
        </div>
        <div className="flex gap-4">
          <span className="select-none text-zinc-600">2</span>
          <span>
            <span className="text-emerald-400">curl</span> <span className="text-blue-400">-sL</span>{" "}
            <span className="text-amber-300">https://asifad.github.io/asif-draxi-resume.pdf</span> <span className="text-blue-400">-o</span>{" "}
            asif-draxi-resume.pdf
          </span>
        </div>
      </div>
    </div>
  );
}