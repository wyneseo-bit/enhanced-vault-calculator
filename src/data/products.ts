export interface Product {
  id: string;
  name: string;
  isEnhanced: boolean;
  strikeType: string; // e.g. "103-107% OTM (dynamic)"
  cycleDays: number; // days per option cycle
  annualFeePct: number; // annualized management fee, as decimal e.g. 0.005
  requiresKYC: boolean;
  yieldLowPct: number; // stated illustrative yield range, decimal
  yieldHighPct: number;
  supportsPayoutToggle: boolean; // compounding/income choice
}

export const PRODUCTS: Product[] = [
  {
    id: "enhanced",
    name: "Enhanced PAXG Vol Income Vault",
    isEnhanced: true,
    strikeType: "103-107% OTM (dynamic)",
    cycleDays: 14,
    annualFeePct: 0.005,
    requiresKYC: false,
    yieldLowPct: 0.04,
    yieldHighPct: 0.14,
    supportsPayoutToggle: true,
  },
  {
    id: "gldi",
    name: "GLDI",
    isEnhanced: false,
    strikeType: "103% OTM",
    cycleDays: 30,
    annualFeePct: 0.0065,
    requiresKYC: true,
    yieldLowPct: 0.14,
    yieldHighPct: 0.14,
    supportsPayoutToggle: false,
  },
  {
    id: "iaui",
    name: "IAUI (NEOS)",
    isEnhanced: false,
    strikeType: "Dynamic OTM",
    cycleDays: 30,
    annualFeePct: 0.0049,
    requiresKYC: true,
    yieldLowPct: 0.13,
    yieldHighPct: 0.13,
    supportsPayoutToggle: false,
  },
  {
    id: "zwgd",
    name: "ZWGD (BMO)",
    isEnhanced: false,
    strikeType: "OTM spread",
    cycleDays: 45, // ~1-2 month, use midpoint
    annualFeePct: 0.0065,
    requiresKYC: true,
    yieldLowPct: 0.05,
    yieldHighPct: 0.05,
    supportsPayoutToggle: false,
  },
  {
    id: "igld",
    name: "IGLD (FT Vest)",
    isEnhanced: false,
    strikeType: "ATM",
    cycleDays: 365,
    annualFeePct: 0.0085,
    requiresKYC: true,
    yieldLowPct: 0.085,
    yieldHighPct: 0.085,
    supportsPayoutToggle: false,
  },
];
