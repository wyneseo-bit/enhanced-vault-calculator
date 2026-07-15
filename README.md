# Enhanced Vault Comparison Calculator

A single-page, interactive calculator comparing Enhanced's PAXG Vol Income Vault
against four TradFi gold covered-call ETFs (GLDI, IAUI, ZWGD, IGLD) on fees, KYC
requirements, premium-capture cycle length, and projected net yield.

This is a marketing/demo asset — no wallet connection, no real transactions, no
backend. All calculation logic runs client-side against a hardcoded product table.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Recharts for the comparison chart
- Vitest for calculation-logic unit tests

## Development

```bash
npm install
npm run dev
```

## Testing

```bash
npm run test
```

## Build

```bash
npm run build
```

Deploys as a static site — zero custom config needed on Vercel (Vite preset).

## Disclaimer

Illustrative only. Figures are hypothetical, based on publicly stated terms and
assumed yield scenarios. Not investment advice.
