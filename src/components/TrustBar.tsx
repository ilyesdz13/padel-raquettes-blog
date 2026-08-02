const STATS = [
  { value: "13+", label: "Raquettes analysées" },
  { value: "5", label: "Critères passés au crible" },
  { value: "100%", label: "Guides gratuits" },
];

export default function TrustBar() {
  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 grid grid-cols-3 gap-4 text-center">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground">{stat.value}</div>
            <div className="text-xs sm:text-sm text-muted mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
