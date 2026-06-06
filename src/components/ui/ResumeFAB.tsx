import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";

export default function ResumeFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={() => window.dispatchEvent(new CustomEvent("open-resume-modal"))}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 hover:bg-[var(--color-accent)] hover:text-white"
          aria-label="View Resume"
          data-testid="resume-fab"
        >
          <FileText className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}