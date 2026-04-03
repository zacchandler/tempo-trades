export interface CandleData {
  open: number;
  high: number;
  low: number;
  close: number;
  bullish: boolean;
}

export function generateCandlestickData(count: number, basePrice = 5800): CandleData[] {
  const candles: CandleData[] = [];
  let price = basePrice;

  for (let i = 0; i < count; i++) {
    const volatility = 5 + Math.random() * 15;
    const direction = Math.random() > 0.45 ? 1 : -1;
    const bodySize = Math.random() * volatility * 0.8;
    const wickUp = Math.random() * volatility * 0.5;
    const wickDown = Math.random() * volatility * 0.5;

    const open = price;
    const close = open + direction * bodySize;
    const high = Math.max(open, close) + wickUp;
    const low = Math.min(open, close) - wickDown;

    candles.push({
      open,
      high,
      low,
      close,
      bullish: close >= open,
    });

    price = close + (Math.random() - 0.5) * 3;
  }

  return candles;
}

export function generateTickerData() {
  return [
    { symbol: "ES", price: 5842.5, change: 1.2, up: true },
    { symbol: "NQ", price: 20415.75, change: 0.8, up: true },
    { symbol: "YM", price: 43210.0, change: -0.3, up: false },
    { symbol: "GC", price: 2645.8, change: 0.5, up: true },
    { symbol: "CL", price: 78.42, change: -0.7, up: false },
    { symbol: "EUR/USD", price: 1.0842, change: 0.15, up: true },
    { symbol: "GBP/USD", price: 1.2715, change: -0.22, up: false },
    { symbol: "BTC", price: 67842.0, change: 2.4, up: true },
  ];
}
