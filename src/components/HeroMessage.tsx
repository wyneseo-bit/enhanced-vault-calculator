import type { Segment } from "../data/segments";

const CTA_HREF: Record<Segment["ctaType"], string> = {
  waitlist: "#waitlist",
  institutional: "#institutional-contact",
  partnership: "#partnership-inquiry",
};

const CTA_STYLES: Record<Segment["ctaType"], string> = {
  waitlist: "bg-ink text-cream hover:bg-ink/90 dark:bg-mist dark:text-ink dark:hover:bg-mist/90",
  institutional: "border-2 border-accent bg-transparent text-accent hover:bg-accent/10",
  partnership: "bg-accent text-white hover:bg-accent/90",
};

interface HeroMessageProps {
  segment: Segment;
}

export function HeroMessage({ segment }: HeroMessageProps) {
  return (
    <div>
      <h1 className="text-2xl font-medium leading-tight sm:text-4xl">{segment.hook}</h1>
      <p className="mt-3 text-sm text-ink-muted sm:text-base dark:text-mist-muted">
        {segment.whatMovesThem}
      </p>
      <a
        href={CTA_HREF[segment.ctaType]}
        className={`mt-5 inline-block rounded-full px-8 py-3 text-sm font-semibold shadow-lg shadow-ink/10 transition-colors dark:shadow-mist/10 ${CTA_STYLES[segment.ctaType]}`}
      >
        {segment.ctaLabel}
      </a>
    </div>
  );
}
