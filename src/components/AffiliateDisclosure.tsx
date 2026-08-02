export default function AffiliateDisclosure() {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-border bg-lime/10 px-4 py-3 text-sm text-foreground/80">
      <span aria-hidden="true">ℹ️</span>
      <span>
        Cet article contient des liens affiliés Amazon. Si vous achetez via ces liens, nous
        touchons une commission sans surcoût pour vous — cela nous permet de tester et comparer
        plus de raquettes.
      </span>
    </div>
  );
}
