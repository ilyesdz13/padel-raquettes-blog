export default function CourtLines({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <rect x="40" y="40" width="720" height="420" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="400" y1="40" x2="400" y2="460" stroke="currentColor" strokeWidth="2" />
      <line x1="220" y1="40" x2="220" y2="460" stroke="currentColor" strokeWidth="1.5" />
      <line x1="580" y1="40" x2="580" y2="460" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="250" x2="220" y2="250" stroke="currentColor" strokeWidth="1.5" />
      <line x1="580" y1="250" x2="760" y2="250" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="400" cy="250" r="3" fill="currentColor" />
    </svg>
  );
}
