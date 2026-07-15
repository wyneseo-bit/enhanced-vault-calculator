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
    <div className="overflow-x-auto rounded-2xl border border-neutral-800">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-800 bg-neutral-900 text-neutral-400">
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
                  ? "border-b border-amber-500/30 bg-amber-500/10"
                  : "border-b border-neutral-800"
              }
            >
              <td className="px-4 py-3 font-medium text-neutral-100">
                <div className="flex items-center gap-2">
                  {product.isEnhanced && (
                    <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-950">
                      Enhanced
                    </span>
                  )}
                  {product.name}
                </div>
              </td>
              <td className="px-4 py-3 text-neutral-300">
                {(product.annualFeePct * 100).toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-neutral-300">{product.cycleDays}d</td>
              <td className="px-4 py-3">
                {product.requiresKYC ? (
                  <span className="text-neutral-400">Required</span>
                ) : (
                  <span className="font-medium text-amber-400">None</span>
                )}
              </td>
              <td className="px-4 py-3 text-neutral-100">
                {currencyPrecise.format(result.netYieldUSD)}
              </td>
              <td className="px-4 py-3 text-neutral-100">
                {(result.netYieldPct * 100).toFixed(2)}%
              </td>
              <td className="px-4 py-3 font-semibold text-neutral-100">
                {currency.format(result.finalValueUSD)}
              </td>
              <td className="px-4 py-3">
                {product.supportsPayoutToggle ? (
                  <span className="text-neutral-400">Selectable above</span>
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
