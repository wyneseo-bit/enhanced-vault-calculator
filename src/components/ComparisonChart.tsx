import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Product } from "../data/products";
import type { CalcResult } from "../lib/calc";

interface ChartRow {
  product: Product;
  result: CalcResult;
}

interface ComparisonChartProps {
  rows: ChartRow[];
  depositUSD: number;
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ComparisonChart({ rows, depositUSD }: ComparisonChartProps) {
  const data = rows.map(({ product, result }) => ({
    name: product.isEnhanced ? "Enhanced" : product.name,
    finalValue: Math.round(result.finalValueUSD),
    isEnhanced: product.isEnhanced,
  }));

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
      <h3 className="text-sm font-medium text-neutral-300">
        Final value after horizon (deposit: {currency.format(depositUSD)})
      </h3>
      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={50}
            />
            <YAxis
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
              tickFormatter={(v: number) => currency.format(v)}
              width={80}
            />
            <Tooltip
              formatter={(value) => currency.format(Number(value))}
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: 8,
                color: "#f4f4f5",
              }}
              labelStyle={{ color: "#f4f4f5" }}
            />
            <Bar dataKey="finalValue" radius={[6, 6, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.isEnhanced ? "#f59e0b" : "#52525b"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
