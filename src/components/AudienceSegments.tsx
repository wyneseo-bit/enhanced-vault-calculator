const SEGMENTS = [
  {
    name: "The gold believer",
    who: "Long-term holder who treats gold as a store of wealth.",
    hook: "Turn your gold into a compounding asset, not just a store of value.",
  },
  {
    name: "The cash-flow holder",
    who: "Holds gold, doesn't want to sell to access cash.",
    hook: "Stop timing your exit. Get paid every two weeks instead.",
  },
  {
    name: "The patient compounder",
    who: "Wants gold exposure, not trading it.",
    hook: "Slow, steady, and stacking. Let volatility do the work.",
  },
  {
    name: "Fund managers & treasuries",
    who: "Institutional allocators, compliance-minded.",
    hook: "Transparent onchain yield, zero KYC friction.",
  },
  {
    name: "Trading alpha groups",
    who: "Communities with built-in audience trust.",
    hook: "Early access for your community, on your terms.",
  },
];

export function AudienceSegments() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-lg font-medium">Built for how you hold gold</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SEGMENTS.map((segment) => (
          <div
            key={segment.name}
            className="rounded-2xl border border-ink/10 bg-ink/[0.03] p-4 dark:border-mist/10 dark:bg-mist/[0.06]"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted dark:text-mist-muted">
              {segment.name}
            </h3>
            <p className="mt-2 font-serif text-lg italic text-accent">"{segment.hook}"</p>
            <p className="mt-2 text-sm text-ink-muted dark:text-mist-muted">{segment.who}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
