interface Tab {
  id: string;
  label: string;
}

interface TabNavProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
}

export function TabNav({ tabs, activeId, onChange }: TabNavProps) {
  return (
    <div
      role="tablist"
      className="mb-8 inline-flex rounded-lg border border-ink/15 bg-ink/[0.03] p-1 dark:border-mist/15 dark:bg-mist/[0.06]"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={tab.id === activeId}
          onClick={() => onChange(tab.id)}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            tab.id === activeId
              ? "bg-accent text-white"
              : "text-ink-muted hover:text-ink dark:text-mist-muted dark:hover:text-mist"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
