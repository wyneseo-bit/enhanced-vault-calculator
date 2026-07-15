import type { Product } from "../data/products";
import type { CalcResult } from "../lib/calc";
import { DisabledPayoutToggle } from "./InputsPanel";

interface Row {
  product: Product;
  result: CalcResult;
}

interface ComparisonTableProps {
  rows: Row[];
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const currencyPrecise = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export function ComparisonTable({ rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/10 dark:border-mist/10">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 bg-ink/[0.03] text-ink-muted dark:border-mist/10 dark:bg-mist/[0.06] dark:text-mist-muted">
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Fee</th>
            <th className="px-4 py-3 font-medium">Cycle</th>
            <th className="px-4 py-3 font-medium">KYC</th>
            <th className="px-4 py-3 font-medium">Net Yield ($)</th>
            <th className="px-4 py-3 font-medium">Net Yield (%)</th>
            <th className="px-4 py-3 font-medium">Final Value</th>
            <th className="px-4 py-3 font-medium">Payout mode</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ product, result }) => (
            <tr
              key={product.id}
              className={
                product.isEnhanced
                  ? "border-b border-accent/30 bg-accent/10"
                  : "border-b border-ink/10 dark:border-mist/10"
              }
            >
              <td className="px-4 py-3 font-medium text-ink dark:text-mist">
                <div className="flex items-center gap-2">
                  {product.isEnhanced && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Enhanced
                    </span>
                  )}
                  {product.name}
                </div>
              </td>
              <td className="px-4 py-3 text-ink-muted dark:text-mist-muted">
                {(product.annualFeePct * 100).toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-ink-muted dark:text-mist-muted">{product.cycleDays}d</td>
              <td className="px-4 py-3">
                {product.requiresKYC ? (
                  <span className="text-ink-muted dark:text-mist-muted">Required</span>
                ) : (
                  <span className="font-medium text-accent">None</span>
                )}
              </td>
              <td className="px-4 py-3 text-ink dark:text-mist">
                {currencyPrecise.format(result.netYieldUSD)}
              </td>
              <td className="px-4 py-3 text-ink dark:text-mist">
                {(result.netYieldPct * 100).toFixed(2)}%
              </td>
              <td className="px-4 py-3 font-semibold text-ink dark:text-mist">
                {currency.format(result.finalValueUSD)}
              </td>
              <td className="px-4 py-3">
                {product.supportsPayoutToggle ? (
                  <span className="text-ink-muted dark:text-mist-muted">Selectable above</span>
                ) : (
                  <DisabledPayoutToggle />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
