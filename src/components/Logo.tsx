export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full bg-lime shadow-sm ${className}`}>
      <svg viewBox="0 0 24 24" className="h-[65%] w-[65%]" aria-hidden="true">
        <circle cx="12" cy="12" r="10.5" fill="none" stroke="#14210a" strokeWidth="2.4" />
        <circle cx="12" cy="12" r="6" fill="none" stroke="#14210a" strokeWidth="2.4" />
        <circle cx="12" cy="12" r="1.8" fill="#14210a" />
      </svg>
    </span>
  );
}
