import { useEffect, useState } from "react";
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

const ACCENT = "#4a63ee";

const THEME = {
  light: {
    grid: "#2b2b3314",
    tick: "#6b6a72",
    otherBar: "#d7d2c8",
    tooltipBg: "#ffffff",
    tooltipBorder: "#2b2b3320",
    tooltipText: "#2b2b33",
  },
  dark: {
    grid: "#e8e5f21a",
    tick: "#9a97a8",
    otherBar: "#3a3946",
    tooltipBg: "#1c1b24",
    tooltipBorder: "#e8e5f226",
    tooltipText: "#e8e5f2",
  },
};

function useIsDarkMode() {
  const [isDark, setIsDark] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDark;
}

export function ComparisonChart({ rows, depositUSD }: ComparisonChartProps) {
  const isDark = useIsDarkMode();
  const theme = isDark ? THEME.dark : THEME.light;

  const data = rows.map(({ product, result }) => ({
    name: product.isEnhanced ? "Enhanced" : product.name,
    finalValue: Math.round(result.finalValueUSD),
    isEnhanced: product.isEnhanced,
  }));

  return (
    <div className="rounded-2xl border border-ink/10 bg-ink/[0.03] p-4 sm:p-6 dark:border-mist/10 dark:bg-mist/[0.06]">
      <h3 className="text-sm font-medium text-ink-muted dark:text-mist-muted">
        Final value after horizon (deposit: {currency.format(depositUSD)})
      </h3>
      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: theme.tick, fontSize: 12 }}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={50}
            />
            <YAxis
              tick={{ fill: theme.tick, fontSize: 12 }}
              tickFormatter={(v: number) => currency.format(v)}
              width={80}
            />
            <Tooltip
              formatter={(value) => [currency.format(Number(value)), "Final value"]}
              contentStyle={{
                backgroundColor: theme.tooltipBg,
                border: `1px solid ${theme.tooltipBorder}`,
                borderRadius: 8,
                color: theme.tooltipText,
              }}
              labelStyle={{ color: theme.tooltipText }}
              itemStyle={{ color: theme.tooltipText }}
            />
            <Bar dataKey="finalValue" radius={[6, 6, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.isEnhanced ? ACCENT : theme.otherBar} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
