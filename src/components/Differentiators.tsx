const DIFFERENTIATORS = [
  {
    title: "AI-powered strike/size selection",
    body: "Your strongest differentiator, no TradFi gold product dynamically picks strike and size the way this does. But right now it's a claim with zero data behind it. The move: the first 1-2 completed epochs should be pre-packaged as a dedicated recap, strike chosen, premium captured, realized APY, ready to publish the moment they close. That's the point it stops being marketing copy and becomes proof.",
  },
  {
    title: "Auditor",
    body: 'Still open in the doc, "top-tier firm, TBD." Worth pushing to lock in a name with actual derivatives/options experience, Spearbit or Trail of Bits both fit given the Opyn Gamma base. A recognizable name does two things at once: real technical assurance, and a genuine content moment, a teaser when the audit kicks off, a full recap when the report lands.',
  },
  {
    title: "Compounding/income toggle",
    body: "Already built, so the point isn't the feature, it's where it sits. Right now it's a mechanics footnote. Almost no TradFi covered-call product lets the user choose or switch their payout structure at all, that's a headline claim, not a detail buried in section 4.3.",
  },
  {
    title: "Lead with comparison",
    body: "The strongest top-of-funnel asset in the entire document is sitting on page 4. Pull the GLDI/IAUI/ZWGD/IGLD comparison to the front and reduce it to one line: same trade Wall Street already runs on gold ETFs, half the fee, no KYC, biweekly instead of monthly. Lands without requiring anyone to understand options first.",
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
