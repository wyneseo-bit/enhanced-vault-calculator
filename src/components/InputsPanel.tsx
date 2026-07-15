import type { PayoutMode } from "../lib/calc";

export type HorizonDays = 90 | 180 | 365;

const HORIZON_OPTIONS: { label: string; value: HorizonDays }[] = [
  { label: "3 months", value: 90 },
  { label: "6 months", value: 180 },
  { label: "1 year", value: 365 },
];

interface InputsPanelProps {
  depositUSD: number;
  onDepositChange: (value: number) => void;
  horizonDays: HorizonDays;
  onHorizonChange: (value: HorizonDays) => void;
  assumedGrossYieldPct: number;
  onYieldChange: (value: number) => void;
  payoutMode: PayoutMode;
  onPayoutModeChange: (value: PayoutMode) => void;
}

export function InputsPanel({
  depositUSD,
  onDepositChange,
  horizonDays,
  onHorizonChange,
  assumedGrossYieldPct,
  onYieldChange,
  payoutMode,
  onPayoutModeChange,
}: InputsPanelProps) {
  return (
    <div className="sticky top-2 z-20 rounded-2xl border border-ink/10 bg-ink/[0.03] p-4 shadow-lg shadow-ink/5 backdrop-blur sm:p-6 lg:top-4 dark:border-mist/10 dark:bg-mist/[0.06] dark:shadow-black/20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Deposit amount */}
        <div>
          <label htmlFor="deposit" className="block text-sm font-medium text-ink-muted dark:text-mist-muted">
            Deposit amount (USD)
          </label>
          <div className="mt-2 flex items-center rounded-lg border border-ink/15 bg-cream px-3 focus-within:border-accent dark:border-mist/15 dark:bg-night">
            <span className="text-ink-muted dark:text-mist-muted">$</span>
            <input
              id="deposit"
              type="text"
              inputMode="numeric"
              value={depositUSD.toLocaleString("en-US")}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                const num = raw === "" ? 0 : parseInt(raw, 10);
                onDepositChange(Math.max(0, num));
              }}
              onBlur={() => {
                if (depositUSD < 100) onDepositChange(100);
              }}
              className="w-full bg-transparent px-2 py-2 text-ink outline-none dark:text-mist"
            />
          </div>
          <p className="mt-1 text-xs text-ink-muted dark:text-mist-muted">Minimum $100</p>
        </div>

        {/* Time horizon */}
        <div>
          <span className="block text-sm font-medium text-ink-muted dark:text-mist-muted">
            Time horizon
          </span>
          <div className="mt-2 flex rounded-lg border border-ink/15 bg-cream p-1 dark:border-mist/15 dark:bg-night">
            {HORIZON_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onHorizonChange(opt.value)}
                className={`flex-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${
                  horizonDays === opt.value
                    ? "bg-accent text-white"
                    : "text-ink-muted hover:text-ink dark:text-mist-muted dark:hover:text-mist"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Assumed gross yield */}
        <div>
          <label htmlFor="yield" className="block text-sm font-medium text-ink-muted dark:text-mist-muted">
            Assumed gross premium yield <span className="opacity-70">(illustrative)</span>
          </label>
          <input
            id="yield"
            type="range"
            min={4}
            max={14}
            step={0.5}
            value={assumedGrossYieldPct * 100}
            onChange={(e) => onYieldChange(parseFloat(e.target.value) / 100)}
            className="accent-accent mt-4 w-full"
          />
          <p className="mt-1 text-sm text-ink dark:text-mist">
            {(assumedGrossYieldPct * 100).toFixed(1)}%{" "}
            <span className="text-xs text-ink-muted dark:text-mist-muted">
              annualized, scenario input
            </span>
          </p>
        </div>

        {/* Payout mode */}
        <div>
          <span className="block text-sm font-medium text-ink-muted dark:text-mist-muted">
            Payout mode
          </span>
          <div className="group relative mt-2 flex rounded-lg border border-ink/15 bg-cream p-1 dark:border-mist/15 dark:bg-night">
            <button
              type="button"
              onClick={() => onPayoutModeChange("compounding")}
              className={`flex-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${
                payoutMode === "compounding"
                  ? "bg-accent text-white"
                  : "text-ink-muted hover:text-ink dark:text-mist-muted dark:hover:text-mist"
              }`}
            >
              Compounding
            </button>
            <button
              type="button"
              onClick={() => onPayoutModeChange("income")}
              className={`flex-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${
                payoutMode === "income"
                  ? "bg-accent text-white"
                  : "text-ink-muted hover:text-ink dark:text-mist-muted dark:hover:text-mist"
              }`}
            >
              Income
            </button>
          </div>
          <p className="mt-1 text-xs text-ink-muted dark:text-mist-muted">
            Applies to Enhanced only — other products use a fixed payout structure.
          </p>
        </div>
      </div>
    </div>
  );
}

export function DisabledPayoutToggle() {
  return (
    <div className="group relative inline-flex items-center">
      <div className="flex rounded-md border border-ink/10 bg-ink/[0.03] p-0.5 opacity-50 dark:border-mist/10 dark:bg-mist/[0.05]">
        <span className="rounded px-2 py-0.5 text-xs text-ink-muted dark:text-mist-muted">
          Compounding
        </span>
        <span className="rounded px-2 py-0.5 text-xs text-ink-muted dark:text-mist-muted">
          Income
        </span>
      </div>
      <button
        type="button"
        aria-label="Why is this disabled?"
        className="ml-1 flex h-4 w-4 items-center justify-center rounded-full border border-ink/20 text-[10px] text-ink-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-accent dark:border-mist/20 dark:text-mist-muted"
        onClick={(e) => e.currentTarget.focus()}
      >
        ?
      </button>
      <div
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-max max-w-[12rem] -translate-x-1/2 rounded-md bg-ink px-2 py-1 text-center text-xs text-cream opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-mist dark:text-ink"
      >
        Not offered — fixed payout structure.
      </div>
    </div>
  );
}
