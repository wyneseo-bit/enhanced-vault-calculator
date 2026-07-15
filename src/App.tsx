import { useMemo, useState } from "react";
import { PRODUCTS } from "./data/products";
import { calculate, type PayoutMode } from "./lib/calc";
import { InputsPanel, type HorizonDays } from "./components/InputsPanel";
import { ComparisonTable } from "./components/ComparisonTable";
import { ComparisonChart } from "./components/ComparisonChart";
import { Disclaimer } from "./components/Disclaimer";

function App() {
  const [depositUSD, setDepositUSD] = useState(10000);
  const [horizonDays, setHorizonDays] = useState<HorizonDays>(365);
  const [assumedGrossYieldPct, setAssumedGrossYieldPct] = useState(0.09);
  const [payoutMode, setPayoutMode] = useState<PayoutMode>("compounding");

  const rows = useMemo(
    () =>
      PRODUCTS.map((product) => ({
        product,
        result: calculate({
          product,
          depositUSD,
          horizonDays,
          assumedGrossYieldPct,
          payoutMode,
        }),
      })),
    [depositUSD, horizonDays, assumedGrossYieldPct, payoutMode],
  );

  return (
    <div className="min-h-screen bg-neutral-950 pb-24 text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-500">
            Enhanced
          </div>
          <h1 className="text-2xl font-semibold leading-tight text-neutral-50 sm:text-4xl">
            Same trade Wall Street runs on gold ETFs.
            <br className="hidden sm:block" /> Half the fee. No KYC. Biweekly instead of
            monthly.
          </h1>
        </header>

        {/* Inputs */}
        <div className="mb-8">
          <InputsPanel
            depositUSD={depositUSD}
            onDepositChange={setDepositUSD}
            horizonDays={horizonDays}
            onHorizonChange={setHorizonDays}
            assumedGrossYieldPct={assumedGrossYieldPct}
            onYieldChange={setAssumedGrossYieldPct}
            payoutMode={payoutMode}
            onPayoutModeChange={setPayoutMode}
          />
        </div>

        {/* Comparison table */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-neutral-100">Side-by-side comparison</h2>
          <ComparisonTable rows={rows} />
        </section>

        {/* Chart */}
        <section className="mb-8">
          <ComparisonChart rows={rows} depositUSD={depositUSD} />
        </section>

        {/* CTA */}
        <section className="mb-8 flex justify-center">
          <a
            href="#"
            className="rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-400"
          >
            Learn more
          </a>
        </section>

        {/* Disclaimer */}
        <Disclaimer />
      </div>
    </div>
  );
}

export default App;
