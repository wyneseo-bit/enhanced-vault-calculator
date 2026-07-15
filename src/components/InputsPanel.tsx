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
    <div className="sticky top-2 z-20 rounded-2xl border border-neutral-800 bg-neutral-900/95 p-4 shadow-lg shadow-black/30 backdrop-blur sm:p-6 lg:top-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Deposit amount */}
        <div>
          <label htmlFor="deposit" className="block text-sm font-medium text-neutral-300">
            Deposit amount (USD)
          </label>
          <div className="mt-2 flex items-center rounded-lg border border-neutral-700 bg-neutral-950 px-3 focus-within:border-amber-500">
            <span className="text-neutral-500">$</span>
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
              className="w-full bg-transparent px-2 py-2 text-neutral-100 outline-none"
            />
          </div>
          <p className="mt-1 text-xs text-neutral-500">Minimum $100</p>
        </div>

        {/* Time horizon */}
        <div>
          <span className="block text-sm font-medium text-neutral-300">Time horizon</span>
          <div className="mt-2 flex rounded-lg border border-neutral-700 bg-neutral-950 p-1">
            {HORIZON_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onHorizonChange(opt.value)}
                className={`flex-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${
                  horizonDays === opt.value
                    ? "bg-amber-500 text-neutral-950"
                    : "text-neutral-400 hover:text-neutral-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Assumed gross yield */}
        <div>
          <label htmlFor="yield" className="block text-sm font-medium text-neutral-300">
            Assumed gross premium yield{" "}
            <span className="text-neutral-500">(illustrative)</span>
          </label>
          <input
            id="yield"
            type="range"
            min={4}
            max={14}
            step={0.5}
            value={assumedGrossYieldPct * 100}
            onChange={(e) => onYieldChange(parseFloat(e.target.value) / 100)}
            className="mt-4 w-full accent-amber-500"
          />
          <p className="mt-1 text-sm text-neutral-100">
            {(assumedGrossYieldPct * 100).toFixed(1)}%{" "}
            <span className="text-xs text-neutral-500">annualized, scenario input</span>
          </p>
        </div>

        {/* Payout mode */}
        <div>
          <span className="block text-sm font-medium text-neutral-300">Payout mode</span>
          <div className="group relative mt-2 flex rounded-lg border border-neutral-700 bg-neutral-950 p-1">
            <button
              type="button"
              onClick={() => onPayoutModeChange("compounding")}
              className={`flex-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${
                payoutMode === "compounding"
                  ? "bg-amber-500 text-neutral-950"
                  : "text-neutral-400 hover:text-neutral-100"
              }`}
            >
              Compounding
            </button>
            <button
              type="button"
              onClick={() => onPayoutModeChange("income")}
              className={`flex-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${
                payoutMode === "income"
                  ? "bg-amber-500 text-neutral-950"
                  : "text-neutral-400 hover:text-neutral-100"
              }`}
            >
              Income
            </button>
          </div>
          <p className="mt-1 text-xs text-neutral-500">
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
      <div className="flex rounded-md border border-neutral-800 bg-neutral-900 p-0.5 opacity-50">
        <span className="rounded px-2 py-0.5 text-xs text-neutral-500">Compounding</span>
        <span className="rounded px-2 py-0.5 text-xs text-neutral-500">Income</span>
      </div>
      <button
        type="button"
        aria-label="Why is this disabled?"
        className="ml-1 flex h-4 w-4 items-center justify-center rounded-full border border-neutral-700 text-[10px] text-neutral-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
        onClick={(e) => e.currentTarget.focus()}
      >
        ?
      </button>
      <div
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-max max-w-[12rem] -translate-x-1/2 rounded-md border border-neutral-700 bg-neutral-800 px-2 py-1 text-center text-xs text-neutral-200 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        Not offered — fixed payout structure.
      </div>
    </div>
  );
}
