const DIFFERENTIATORS = [
  {
    title: "AI-powered strike/size selection",
    body: "One of the few products picking strike dynamically, and the only one pairing that with AI-driven size selection on a 14-day cycle, nobody else runs that combination. Right now it's unproven, no epoch has closed yet. The move: package the first 1-2 completed epochs as a dedicated recap the moment they close, strike chosen, premium captured, realized APY. That's the point it stops being a claim and becomes proof.",
  },
  {
    title: "Auditor",
    body: 'Still open, the doc only says "top-tier firm, TBD." Worth locking in a name with real derivatives experience, firms like Spearbit or Trail of Bits would fit well given the Opyn Gamma base, though that\'s a suggestion to vet, not a done deal. A recognizable name does two things at once, real technical assurance, and a genuine content moment, a teaser when the audit starts, a full recap when the report lands.',
  },
  {
    title: "Compounding/income toggle",
    body: "Already built, so the opportunity isn't the feature, it's the framing. Most TradFi products only offer payout flexibility indirectly, through a broker's dividend reinvestment setting. Enhanced builds it natively into the vault, switchable anytime, no broker involved. That's a headline claim, not a detail sitting quietly in section 4.3.",
  },
  {
    title: "Lead with comparison",
    body: "The strongest top-of-funnel asset in the document is sitting two-thirds of the way through it, in the fine print of section 4.6. Pull the GLDI/IAUI/ZWGD/IGLD comparison to the front and reduce it to one line: same trade Wall Street already runs on gold ETFs, up to 40% cheaper, no KYC, biweekly instead of monthly. Lands without requiring anyone to understand options first.",
  },
];

export function Differentiators() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-lg font-medium">Why it's structurally different</h2>
      <div className="space-y-4">
        {DIFFERENTIATORS.map((item, i) => (
          <div
            key={item.title}
            className="rounded-2xl border border-ink/10 bg-ink/[0.03] p-4 dark:border-mist/10 dark:bg-mist/[0.06]"
          >
            <h3 className="font-serif text-lg italic text-accent">
              {i + 1}. {item.title}
            </h3>
            <p className="mt-2 text-sm text-ink-muted dark:text-mist-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
