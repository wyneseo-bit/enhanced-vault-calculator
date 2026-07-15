import { describe, expect, it } from "vitest";
import { calculate } from "./calc";
import { PRODUCTS } from "../data/products";

const enhanced = PRODUCTS.find((p) => p.id === "enhanced")!;
const gldi = PRODUCTS.find((p) => p.id === "gldi")!;
const igld = PRODUCTS.find((p) => p.id === "igld")!;

describe("calculate", () => {
  it("Enhanced, compounding, $10,000 / 1yr / 9% gross: matches hand-checked value", () => {
    // numCycles = floor(365/14) = 26, netAnnualRate = 0.085, ratePerCycle = 0.085 * 14/365
    const result = calculate({
      product: enhanced,
      depositUSD: 10000,
      horizonDays: 365,
      assumedGrossYieldPct: 0.09,
      payoutMode: "compounding",
    });
    const ratePerCycle = 0.085 * (14 / 365);
    const expectedFinal = 10000 * Math.pow(1 + ratePerCycle, 26);
    expect(result.numCycles).toBe(26);
    expect(result.feeUSD).toBeCloseTo(50, 6);
    expect(result.finalValueUSD).toBeCloseTo(expectedFinal, 6);
    expect(result.netYieldUSD).toBeCloseTo(expectedFinal - 10000, 6);
    expect(result.finalValueUSD).toBeGreaterThan(10883);
    expect(result.finalValueUSD).toBeLessThan(10884);
  });

  it("Enhanced, income mode, $10,000 / 1yr / 9% gross: simple pro-rata, no compounding", () => {
    const result = calculate({
      product: enhanced,
      depositUSD: 10000,
      horizonDays: 365,
      assumedGrossYieldPct: 0.09,
      payoutMode: "income",
    });
    // netYieldUSD = 10000 * (0.09 - 0.005) * (365/365) = 850
    expect(result.netYieldUSD).toBeCloseTo(850, 6);
    expect(result.feeUSD).toBeCloseTo(50, 6);
    expect(result.finalValueUSD).toBeCloseTo(10850, 6);
  });

  it("GLDI, $10,000 / 1yr / 9% gross: simple pro-rata regardless of payoutMode", () => {
    const result = calculate({
      product: gldi,
      depositUSD: 10000,
      horizonDays: 365,
      assumedGrossYieldPct: 0.09,
      payoutMode: "compounding",
    });
    // netYieldUSD = 10000 * (0.09 - 0.0065) * 1 = 835
    expect(result.netYieldUSD).toBeCloseTo(835, 6);
    expect(result.feeUSD).toBeCloseTo(65, 6);
    expect(result.finalValueUSD).toBeCloseTo(10835, 6);
    expect(result.numCycles).toBe(12); // floor(365/30)
  });

  it("numCycles is never less than 1, even for long-cycle products on short horizons", () => {
    const result = calculate({
      product: igld, // cycleDays 365
      depositUSD: 10000,
      horizonDays: 90,
      assumedGrossYieldPct: 0.09,
      payoutMode: "income",
    });
    expect(result.numCycles).toBe(1);
  });

  it("gross yield always equals net yield plus fee (decomposition holds in both modes)", () => {
    for (const payoutMode of ["compounding", "income"] as const) {
      const result = calculate({
        product: enhanced,
        depositUSD: 10000,
        horizonDays: 365,
        assumedGrossYieldPct: 0.09,
        payoutMode,
      });
      expect(result.grossYieldUSD).toBeCloseTo(result.netYieldUSD + result.feeUSD, 9);
    }
  });

  it("net yield stays positive across the full assumed-yield range for every product", () => {
    for (const product of PRODUCTS) {
      for (const yieldPct of [0.04, 0.09, 0.14]) {
        const result = calculate({
          product,
          depositUSD: 10000,
          horizonDays: 365,
          assumedGrossYieldPct: yieldPct,
          payoutMode: "compounding",
        });
        expect(result.netYieldUSD).toBeGreaterThan(0);
      }
    }
  });
});
