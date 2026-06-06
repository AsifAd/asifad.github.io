import { AnimatePresence, motion, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const H = 160;

const NODES = [
  { id: "docs",   label: "Docs",    sublabel: "Knowledge Base",  x: 0.12, y: 0.32, color: "#a78bfa", fill: "rgba(167,139,250,0.10)" },
  { id: "svc",    label: "Svc Map", sublabel: "Dependencies",    x: 0.35, y: 0.72, color: "#22d3ee", fill: "rgba(34,211,238,0.10)"  },
  { id: "ai",     label: "AI Hub",  sublabel: "Intelligence",    x: 0.50, y: 0.35, color: "#34d399", fill: "rgba(52,211,153,0.12)"  },
  { id: "health", label: "Health",  sublabel: "Golden Signals",  x: 0.68, y: 0.72, color: "#fbbf24", fill: "rgba(251,191,36,0.10)"  },
  { id: "dash",   label: "Dash",    sublabel: "Single Pane",     x: 0.88, y: 0.35, color: "#60a5fa", fill: "rgba(96,165,250,0.10)"  },
];

const EDGES = [
  { from: "docs", to: "ai"     },
  { from: "svc",  to: "ai"     },
  { from: "ai",   to: "health" },
  { from: "ai",   to: "dash"   },
  { from: "health", to: "dash" },
];

type Particle = { edgeIdx: number; t: number; speed: number };

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

const METRICS = ["MTTR down 20%", "Noise down 35%", "Toil down 28%", "SLO 99.9%"];

export default function EngineeringIntelligenceAnimation() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const widthRef    = useRef(0);
  const particles   = useRef<Particle[]>([]);
  const [metricIdx, setMetricIdx] = useState(0);

  /* seed particles once */
  useEffect(() => {
    particles.current = EDGES.flatMap((_, ei) =>
      Array.from({ length: 2 }, (__, pi) => ({
        edgeIdx: ei,
        t: pi * 0.5,
        speed: 0.0025 + Math.random() * 0.002,
      }))
    );
  }, []);

  /* track container width via ResizeObserver */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      widthRef.current = entry.contentRect.width;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = entry.contentRect.width * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${entry.contentRect.width}px`;
      canvas.style.height = `${H}px`;
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* cycle metrics */
  useEffect(() => {
    const id = setInterval(() => setMetricIdx(i => (i + 1) % METRICS.length), 1800);
    return () => clearInterval(id);
  }, []);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W   = widthRef.current;
    if (W === 0) return;
    const dpr = window.devicePixelRatio || 1;

    /* reset transform, clear */
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /* draw in logical pixels */
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    /* resolved node positions in logical px */
    const pos = (n: typeof NODES[0]) => ({ x: n.x * W, y: n.y * H });

    /* edges */
    EDGES.forEach((e, i) => {
      const from = NODES.find(n => n.id === e.from)!;
      const to   = NODES.find(n => n.id === e.to)!;
      const fp   = pos(from);
      const tp   = pos(to);
      ctx.save();
      ctx.setLineDash([4, 7]);
      ctx.strokeStyle = from.color + "28";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(fp.x, fp.y);
      ctx.lineTo(tp.x, tp.y);
      ctx.stroke();
      ctx.restore();
    });

    /* nodes */
    NODES.forEach(n => {
      const { x, y } = pos(n);
      const r = 17;

      /* outer glow */
      const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 2.2);
      glow.addColorStop(0, n.color + "28");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
      ctx.fill();

      /* filled circle */
      ctx.save();
      ctx.fillStyle = n.fill;
      ctx.strokeStyle = n.color + "90";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      /* label */
      ctx.fillStyle = n.color;
      ctx.font = "bold 8.5px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(n.label, x, y);

      /* sublabel */
      ctx.fillStyle = "#52525b";
      ctx.font = "6.5px monospace";
      ctx.fillText(n.sublabel, x, y + r + 9);
    });

    /* particles */
    particles.current.forEach(p => {
      p.t += p.speed;
      if (p.t > 1) p.t = 0;

      const e    = EDGES[p.edgeIdx];
      const from = NODES.find(n => n.id === e.from)!;
      const to   = NODES.find(n => n.id === e.to)!;
      const fp   = pos(from);
      const tp   = pos(to);

      const x  = lerp(fp.x, tp.x, p.t);
      const y  = lerp(fp.y, tp.y, p.t);
      const alpha = Math.sin(p.t * Math.PI);

      /* trail */
      const trailT = Math.max(0, p.t - 0.07);
      const tx = lerp(fp.x, tp.x, trailT);
      const ty = lerp(fp.y, tp.y, trailT);

      if (Math.abs(x - tx) > 0.1 || Math.abs(y - ty) > 0.1) {
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        const hex  = Math.floor(alpha * 200).toString(16).padStart(2, "0");
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, from.color + hex);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      /* head glow dot */
      const dot = ctx.createRadialGradient(x, y, 0, x, y, 5);
      dot.addColorStop(0, from.color + Math.floor(alpha * 255).toString(16).padStart(2, "0"));
      dot.addColorStop(1, "transparent");
      ctx.fillStyle = dot;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  return (
    <div
      ref={wrapRef}
      className="relative w-full my-5 overflow-hidden rounded-2xl border border-[var(--color-panel-border)] bg-[var(--color-bg)]/60"
      style={{ height: H }}
    >
      {/* scanline texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,#fff 2px,#fff 3px)" }}
      />

      <canvas ref={canvasRef} style={{ display: "block" }} />

      {/* cycling metric badge */}
      <div className="absolute top-3 right-3 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={metricIdx}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] px-2.5 py-1 font-mono text-[10px] text-[var(--color-accent)]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            </span>
            {METRICS[metricIdx]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div aria-hidden className="absolute bottom-3 left-3 z-20 font-mono text-[9px] uppercase tracking-widest text-zinc-600">
        AI · Service Graph
      </div>
    </div>
  );
}
