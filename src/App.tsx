import { useMemo, useState } from "react";
import { PRODUCTS } from "./data/products";
import { SEGMENTS } from "./data/segments";
import { calculate, type PayoutMode } from "./lib/calc";
import { InputsPanel, type HorizonDays } from "./components/InputsPanel";
import { ComparisonTable } from "./components/ComparisonTable";
import { Differentiators } from "./components/Differentiators";
import { SegmentSelector } from "./components/SegmentSelector";
import { HeroMessage } from "./components/HeroMessage";
import { Disclaimer } from "./components/Disclaimer";

function App() {
  const [depositUSD, setDepositUSD] = useState(10000);
  const [horizonDays, setHorizonDays] = useState<HorizonDays>(365);
  const [assumedGrossYieldPct, setAssumedGrossYieldPct] = useState(0.09);
  const [payoutMode, setPayoutMode] = useState<PayoutMode>("compounding");
  const [activeSegmentId, setActiveSegmentId] = useState(SEGMENTS[0].id);

  const activeSegment = SEGMENTS.find((s) => s.id === activeSegmentId) ?? SEGMENTS[0];

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
    <div className="min-h-screen bg-cream pb-24 text-ink dark:bg-night dark:text-mist">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-6 text-sm font-semibold uppercase tracking-widest text-ink-muted dark:text-mist-muted">
            <span className="font-serif text-lg italic text-accent normal-case tracking-normal">
              Thesis Vault
            </span>{" "}
            <span className="normal-case tracking-normal">— PAXG Vol Income Vault by Enhanced</span>
          </div>

          <SegmentSelector
            segments={SEGMENTS}
            activeId={activeSegmentId}
            onChange={setActiveSegmentId}
          />

          <HeroMessage segment={activeSegment} />

          <p className="mt-6 max-w-2xl text-sm text-ink-muted sm:text-base dark:text-mist-muted">
            Plug in a deposit amount and time horizon to see how Enhanced's PAXG Vol Income
            Vault stacks up against today's leading gold covered-call ETFs — fee, KYC
            requirement, premium cycle, and projected net yield, side by side.
          </p>
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
          <h2 className="mb-4 text-lg font-medium">Side-by-side comparison</h2>
          <ComparisonTable rows={rows} />
        </section>

        <Differentiators />

        {/* Disclaimer */}
        <Disclaimer />
      </div>
    </div>
  );
}

export default App;
