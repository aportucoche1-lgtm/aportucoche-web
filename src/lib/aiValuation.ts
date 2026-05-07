export function estimateCarPrice(brand?: string, model?: string) {
  if (!brand || !model) return null;

  const key = `${brand} ${model}`.toLowerCase();

  const PRICE_TABLE: Record<string, number> = {
    'bmw x5': 32000,
    'bmw serie 3': 22000,
    'audi q3': 25000,
    'audi a4': 23000,
    'mercedes gla': 30000,
    'mercedes clase c': 27000,
    'volkswagen golf': 18000,
    'seat leon': 17000,
    'toyota rav4': 26000,
    'tesla model 3': 35000,
  };

  return PRICE_TABLE[key] || 20000; // fallback
}
