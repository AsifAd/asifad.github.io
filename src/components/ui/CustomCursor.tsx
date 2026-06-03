import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button');
      
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[99999]"
      animate={{
        x: mousePosition.x - (isHovering ? 12 : 6),
        y: mousePosition.y - (isHovering ? 12 : 10),
        opacity: isVisible ? 1 : 0
      }}
      transition={{ type: "tween", ease: "linear", duration: 0.05 }}
    >
      <motion.div
        animate={{
          width: isHovering ? 24 : 12,
          height: isHovering ? 24 : 20,
          backgroundColor: isHovering ? "rgba(6, 182, 212, 0.15)" : "rgba(6, 182, 212, 0.9)", // Cyan color
          borderColor: "rgba(6, 182, 212, 0.9)",
          borderWidth: isHovering ? "2px" : "0px",
          opacity: [1, 0, 1] // Blinking effect
        }}
        transition={{
          width: { duration: 0.2 },
          height: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
          borderWidth: { duration: 0.2 },
          opacity: { repeat: Infinity, duration: 1, ease: "easeInOut" }
        }}
        className="rounded-[2px] shadow-[0_0_10px_rgba(6,182,212,0.5)]"
      />
    </motion.div>
  );
}