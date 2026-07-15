interface SegmentRow {
  segment: string;
  whoTheyAre: string;
  whatMovesThem: string;
  hook: string;
  channel: string;
}

const SEGMENTS: SegmentRow[] = [
  {
    segment: "The gold believer",
    whoTheyAre: "Long-term holder, treats gold as a store of wealth",
    whatMovesThem: "Predictable, low-risk growth",
    hook: "Turn your gold into a compounding asset, not just a store of value.",
    channel: "Organic content (X threads, long-form)",
  },
  {
    segment: "The cash-flow holder",
    whoTheyAre: "Holds gold, doesn't want to sell to access cash",
    whatMovesThem: "Recurring income without touching principal",
    hook: "Stop timing your exit. Get paid every two weeks instead.",
    channel: "Organic content (X, TikTok, Reddit)",
  },
  {
    segment: "The patient compounder",
    whoTheyAre: "Wants gold exposure, not trading it",
    whatMovesThem: "Smooth ride, upside preserved",
    hook: "Slow, steady, and stacking. Let volatility do the work.",
    channel: "Organic content (YouTube, X)",
  },
  {
    segment: "Fund managers / treasuries",
    whoTheyAre: "Institutional allocators, compliance-minded",
    whatMovesThem: "Audit status, custody caps, counterparty risk",
    hook: "Audited treasury yield on gold, zero KYC friction.",
    channel: "Direct BD, RFQ demos, sales-assisted",
  },
  {
    segment: "Trading alpha groups",
    whoTheyAre: "Communities with built-in audience trust",
    whatMovesThem: "Early access they can pass on to members",
    hook: "Not a hook, a partnership offer (whitelist slot, better terms).",
    channel: "Ecosystem partnerships / KOL seeding",
  },
];

export function AudienceSegmentsTable() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-lg font-medium">Audience segments</h2>
      <div className="overflow-x-auto rounded-2xl border border-ink/10 dark:border-mist/10">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 bg-ink/[0.03] text-ink-muted dark:border-mist/10 dark:bg-mist/[0.06] dark:text-mist-muted">
              <th className="px-4 py-3 font-medium">Segment</th>
              <th className="px-4 py-3 font-medium">Who they are</th>
              <th className="px-4 py-3 font-medium">What moves them</th>
              <th className="px-4 py-3 font-medium">Message hook</th>
              <th className="px-4 py-3 font-medium">Channel / motion</th>
            </tr>
          </thead>
          <tbody>
            {SEGMENTS.map((row) => (
              <tr key={row.segment} className="border-b border-ink/10 align-top dark:border-mist/10">
                <td className="px-4 py-3 font-medium text-ink dark:text-mist">{row.segment}</td>
                <td className="px-4 py-3 text-ink-muted dark:text-mist-muted">{row.whoTheyAre}</td>
                <td className="px-4 py-3 text-ink-muted dark:text-mist-muted">{row.whatMovesThem}</td>
                <td className="px-4 py-3 font-serif italic text-accent">"{row.hook}"</td>
                <td className="px-4 py-3 text-ink-muted dark:text-mist-muted">{row.channel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
