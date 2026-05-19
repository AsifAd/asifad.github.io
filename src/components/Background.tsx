/**
 * Subtle paper/ink backdrop:
 *   - flat base color from --color-bg
 *   - soft grid that fades into the page
 *   - faint warm wash in two corners
 *   - paper-grain noise overlay
 *
 * No animation. The grid + grain do the heavy lifting; restraint sells the
 * editorial look.
 */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[var(--color-bg)]" />

      {/* warm corner wash — top left */}
      <div
        className="absolute -top-[20%] -left-[10%] h-[60vw] w-[60vw] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent-soft), transparent 70%)",
        }}
      />
      {/* warm corner wash — bottom right */}
      <div
        className="absolute -bottom-[20%] -right-[10%] h-[55vw] w-[55vw] rounded-full opacity-30 blur-[140px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent-soft), transparent 70%)",
        }}
      />

      {/* grid */}
      <div className="grid-bg absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

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
