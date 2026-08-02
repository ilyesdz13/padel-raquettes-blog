export default function Stars({ score, size = "sm" }: { score: number; size?: "sm" | "md" }) {
  const rounded = Math.round(score * 2) / 2;
  const dimension = size === "md" ? "text-base" : "text-sm";

  return (
    <span className={`inline-flex items-center gap-1 ${dimension}`}>
      <span className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = Math.min(1, Math.max(0, rounded - i));
          return (
            <span key={i} className="relative inline-block leading-none" style={{ width: "1em" }}>
              <span className="text-border">★</span>
              <span
                className="absolute inset-0 overflow-hidden text-lime-dark"
                style={{ width: `${fill * 100}%` }}
              >
                ★
              </span>
            </span>
          );
        })}
      </span>
      <span className="font-semibold text-foreground/80">{score.toFixed(1)}</span>
    </span>
  );
}
