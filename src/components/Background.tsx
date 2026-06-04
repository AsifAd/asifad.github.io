import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function Background() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const springX = useSpring(0, { stiffness: 50, damping: 20 });
  const springY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[var(--color-bg)]" />

      {/* Mouse-reactive glowing orb */}
      <motion.div
        className="absolute h-[40vw] w-[40vw] rounded-full bg-emerald-500/20 opacity-40 blur-[100px] mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* warm corner wash — top left */}
      <div
        className="absolute -top-[20%] -left-[10%] h-[60vw] w-[60vw] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent-soft), transparent 70%)",
        }}
      />
      {/* warm corner wash — bottom right */}
      <div
        className="absolute -bottom-[20%] -right-[10%] h-[55vw] w-[55vw] rounded-full opacity-20 blur-[140px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent-soft), transparent 70%)",
        }}
      />

      {/* grid */}
      <div className="grid-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      {/* paper grain */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
