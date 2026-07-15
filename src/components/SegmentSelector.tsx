import type { Segment } from "../data/segments";

interface SegmentSelectorProps {
  segments: Segment[];
  activeId: string;
  onChange: (id: string) => void;
}

export function SegmentSelector({ segments, activeId, onChange }: SegmentSelectorProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {segments.map((segment) => (
        <button
          key={segment.id}
          type="button"
          aria-pressed={segment.id === activeId}
          onClick={() => onChange(segment.id)}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            segment.id === activeId
              ? "border-accent bg-accent text-white"
              : "border-ink/15 bg-ink/[0.03] text-ink-muted hover:text-ink dark:border-mist/15 dark:bg-mist/[0.06] dark:text-mist-muted dark:hover:text-mist"
          }`}
        >
          {segment.label}
        </button>
      ))}
    </div>
  );
}
