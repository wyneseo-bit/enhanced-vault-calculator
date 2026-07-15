import { useMemo, useState } from "react";
import { PRODUCTS } from "./data/products";
import { calculate, type PayoutMode } from "./lib/calc";
import { InputsPanel, type HorizonDays } from "./components/InputsPanel";
import { ComparisonTable } from "./components/ComparisonTable";
import { Differentiators } from "./components/Differentiators";
import { AudienceSegmentsTable } from "./components/AudienceSegmentsTable";
import { TabNav } from "./components/TabNav";
import { Disclaimer } from "./components/Disclaimer";

const TABS = [
  { id: "calculator", label: "Calculator" },
  { id: "insights", label: "Why Enhanced & audience" },
];

function App() {
  const [depositUSD, setDepositUSD] = useState(10000);
  const [horizonDays, setHorizonDays] = useState<HorizonDays>(365);
  const [assumedGrossYieldPct, setAssumedGrossYieldPct] = useState(0.09);
  const [payoutMode, setPayoutMode] = useState<PayoutMode>("compounding");
  const [activeTab, setActiveTab] = useState(TABS[0].id);

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
          <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-ink-muted dark:text-mist-muted">
            <span className="font-serif text-lg italic text-accent normal-case tracking-normal">
              Thesis Vault
            </span>{" "}
            <span className="normal-case tracking-normal">— PAXG Vol Income Vault by Enhanced</span>
          </div>
          <h1 className="text-2xl font-medium leading-tight sm:text-4xl">
            The gold trade Wall Street runs,{" "}
            <span className="font-serif italic text-accent">
              without the fee, the paperwork, or the wait.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-ink-muted sm:text-base dark:text-mist-muted">
            Plug in a deposit amount and time horizon to see how Enhanced's PAXG Vol Income
            Vault stacks up against today's leading gold covered-call ETFs — fee, KYC
            requirement, premium cycle, and projected net yield, side by side.
          </p>
        </header>

        <TabNav tabs={TABS} activeId={activeTab} onChange={setActiveTab} />

        {activeTab === "calculator" && (
          <>
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
          </>
        )}

        {activeTab === "insights" && (
          <>
            <Differentiators />
            <AudienceSegmentsTable />
          </>
        )}

        {/* Disclaimer */}
        <Disclaimer />
      </div>
    </div>
  );
}

export default App;
