const items = [
  "SRE",
  "Kubernetes",
  "Terraform",
  "Ansible",
  "GitHub Actions",
  "New Relic",
  "GCP",
  "AWS",
  "Azure",
  "Observability",
  "Auto-remediation",
  "GitOps",
  "Python",
  "AI-assisted ops",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <section
      className="relative w-full overflow-hidden border-y border-[var(--color-rule)] py-6"
      data-testid="marquee"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />

      <div className="flex" style={{ animation: "ticker 50s linear infinite" }}>
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex flex-shrink-0 items-center gap-8 px-6 text-2xl font-medium text-[var(--color-fg-muted)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item}
            <span className="text-[var(--color-fg-subtle)]">◆</span>
          </div>
        ))}
      </div>
    </section>
  );
}
