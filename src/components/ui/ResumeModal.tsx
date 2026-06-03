import React, { useEffect, useState } from "react";
import { Download, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("open-resume-modal", handleOpen);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-resume-modal", handleOpen);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[var(--color-panel-border)] bg-[var(--color-bg)] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-panel-border)] bg-[var(--color-panel)] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="ml-2 flex items-center gap-2 font-mono text-sm text-[var(--color-fg-muted)]">
                  <FileText className="h-4 w-4" />
                  asif-draxi-resume.pdf
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <a
                  href="/asif-draxi-resume.pdf"
                  download
                  className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-[var(--color-accent-text)] transition-transform hover:-translate-y-0.5"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-panel-border)] hover:text-[var(--color-fg)]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 bg-zinc-900/50">
              <object
                data="/asif-draxi-resume.pdf"
                type="application/pdf"
                className="absolute inset-0 h-full w-full"
              >
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <FileText className="h-16 w-16 text-[var(--color-fg-muted)] opacity-50" />
                  <p className="text-[var(--color-fg-muted)]">
                    Your browser doesn't support inline PDF rendering.
                  </p>
                  <a
                    href="/asif-draxi-resume.pdf"
                    download
                    className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-6 py-2.5 text-sm font-medium text-[var(--color-bg)] transition-transform hover:-translate-y-0.5"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF instead
                  </a>
                </div>
              </object>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
