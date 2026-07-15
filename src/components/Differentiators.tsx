const DIFFERENTIATORS = [
  {
    title: "AI-picked strikes, every cycle",
    body: "Strike and size are dynamically selected each cycle — no TradFi gold product does this today.",
  },
  {
    title: "Choose your payout",
    body: "Switch between compounding and income anytime. Almost no covered-call ETF gives you that choice.",
  },
  {
    title: "Biweekly premium capture",
    body: "Options are written every 14 days, versus monthly-to-annual cycles for TradFi alternatives.",
  },
];

export function Differentiators() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-lg font-medium">Why it's structurally different</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {DIFFERENTIATORS.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-ink/10 bg-ink/[0.03] p-4 dark:border-mist/10 dark:bg-mist/[0.06]"
          >
            <h3 className="font-serif text-lg italic text-accent">{item.title}</h3>
            <p className="mt-2 text-sm text-ink-muted dark:text-mist-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
