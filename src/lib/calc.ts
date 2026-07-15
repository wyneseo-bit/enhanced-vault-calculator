import type { Product } from "../data/products";

export type PayoutMode = "compounding" | "income";

export interface CalcInput {
  product: Product;
  depositUSD: number;
  horizonDays: number;
  assumedGrossYieldPct: number; // decimal, e.g. 0.09
  payoutMode: PayoutMode;
}

export interface CalcResult {
  productId: string;
  grossYieldUSD: number;
  feeUSD: number;
  netYieldUSD: number;
  netYieldPct: number;
  finalValueUSD: number;
  numCycles: number;
}

export function calculate(input: CalcInput): CalcResult {
  const { product, depositUSD, horizonDays, assumedGrossYieldPct, payoutMode } = input;

  const numCycles = Math.max(1, Math.floor(horizonDays / product.cycleDays));
  const horizonFraction = horizonDays / 365;
  const netAnnualRate = assumedGrossYieldPct - product.annualFeePct;
  const feeUSD = depositUSD * product.annualFeePct * horizonFraction;

  let netYieldUSD: number;

  if (product.isEnhanced && payoutMode === "compounding") {
    const ratePerCycle = netAnnualRate * (product.cycleDays / 365);
    const finalValue = depositUSD * Math.pow(1 + ratePerCycle, numCycles);
    netYieldUSD = finalValue - depositUSD;
  } else {
    netYieldUSD = depositUSD * netAnnualRate * horizonFraction;
  }

  const grossYieldUSD = netYieldUSD + feeUSD;
  const finalValueUSD = depositUSD + netYieldUSD;
  const netYieldPct = depositUSD === 0 ? 0 : netYieldUSD / depositUSD;

  return {
    productId: product.id,
    grossYieldUSD,
    feeUSD,
    netYieldUSD,
    netYieldPct,
    finalValueUSD,
    numCycles,
  };
}
