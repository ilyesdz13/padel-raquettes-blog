function normalizeShape(shape: string): "diamant" | "goutte" | "rond" {
  const s = shape.toLowerCase();
  if (s.includes("diamant")) return "diamant";
  if (s.includes("goutte")) return "goutte";
  return "rond";
}

const HEAD_PATHS: Record<string, string> = {
  rond: "M50,8 C74,8 90,28 90,54 C90,80 74,98 50,98 C26,98 10,80 10,54 C10,28 26,8 50,8 Z",
  goutte: "M50,4 C70,4 86,18 89,40 C92,64 84,86 66,95 C58,99 42,99 34,95 C16,86 8,64 11,40 C14,18 30,4 50,4 Z",
  diamant: "M50,3 L84,32 C90,50 90,58 84,76 L50,101 L16,76 C10,58 10,50 16,32 Z",
};

const HOLES: Record<string, [number, number][]> = {
  rond: [
    [50, 30], [35, 38], [65, 38], [26, 54], [50, 54], [74, 54], [35, 70], [65, 70], [50, 82],
  ],
  goutte: [
    [50, 26], [37, 36], [63, 36], [30, 52], [50, 54], [70, 52], [38, 72], [62, 72], [50, 86],
  ],
  diamant: [
    [50, 24], [37, 36], [63, 36], [28, 50], [50, 52], [72, 50], [34, 68], [66, 68], [50, 84],
  ],
};

export default function RacketIllustration({
  shape,
  className = "h-full w-full",
}: {
  shape: string;
  className?: string;
}) {
  const key = normalizeShape(shape);

  return (
    <svg viewBox="0 0 100 150" className={className} aria-hidden="true">
      <rect x="43" y="92" width="14" height="44" rx="6" fill="#d7f83a" opacity="0.9" />
      {[100, 106, 112, 118, 124].map((y) => (
        <line key={y} x1="45" y1={y} x2="55" y2={y} stroke="#0b1220" strokeWidth="1.2" opacity="0.5" />
      ))}
      <path d={HEAD_PATHS[key]} fill="none" stroke="#d7f83a" strokeWidth="4.5" strokeLinejoin="round" />
      {HOLES[key].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.4" fill="#d7f83a" opacity="0.55" />
      ))}
    </svg>
  );
}
