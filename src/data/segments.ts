export interface Segment {
  id: string;
  label: string; // short label for the selector tab/pill
  whoTheyAre: string;
  whatMovesThem: string;
  hook: string; // the headline copy shown when this segment is active
  ctaLabel: string; // button text
  ctaType: "waitlist" | "institutional" | "partnership";
}

export const SEGMENTS: Segment[] = [
  {
    id: "gold-believer",
    label: "Gold believer",
    whoTheyAre: "Long-term holder, treats gold as a store of wealth",
    whatMovesThem: "Predictable, low-risk growth",
    hook: "Turn your gold into a compounding asset, not just a store of value.",
    ctaLabel: "Join the waitlist",
    ctaType: "waitlist",
  },
  {
    id: "cash-flow-holder",
    label: "Cash-flow holder",
    whoTheyAre: "Holds gold, doesn't want to sell to access cash",
    whatMovesThem: "Recurring income without touching principal",
    hook: "Stop timing your exit. Get paid every two weeks instead.",
    ctaLabel: "Join the waitlist",
    ctaType: "waitlist",
  },
  {
    id: "patient-compounder",
    label: "Patient compounder",
    whoTheyAre: "Wants gold exposure, not trading it",
    whatMovesThem: "Smooth ride, upside preserved",
    hook: "Slow, steady, and stacking. Let volatility do the work.",
    ctaLabel: "Join the waitlist",
    ctaType: "waitlist",
  },
  {
    id: "fund-treasury",
    label: "Fund / treasury",
    whoTheyAre: "Institutional allocators, compliance-minded",
    whatMovesThem: "Audit status, custody caps, counterparty risk",
    hook: "Audited treasury yield on gold, zero KYC friction.",
    ctaLabel: "Request institutional access",
    ctaType: "institutional",
  },
  {
    id: "alpha-group",
    label: "Alpha group",
    whoTheyAre: "Communities with built-in audience trust",
    whatMovesThem: "Early access they can pass on to members",
    hook: "Give your community first access, and better terms, before this goes public.",
    ctaLabel: "Apply for partnership",
    ctaType: "partnership",
  },
];
