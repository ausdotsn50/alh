import menu from '../data/menu.json';

/** ₱9,000 — always the symbol, always comma thousands separators. See CLAUDE.md. */
export function peso(amount: number): string {
  return menu.currencySymbol + amount.toLocaleString('en-PH', { maximumFractionDigits: 0 });
}

/** Lowest price in a size list, for "From ₱9,000" — computed, never typed. */
export function startingPrice(sizes: { price: number }[]): number {
  return Math.min(...sizes.map((s) => s.price));
}

/** Full pax span across a size list, e.g. "20–70 pax". */
export function servesRange(sizes: { servesMin: number; servesMax: number }[]): string {
  const min = Math.min(...sizes.map((s) => s.servesMin));
  const max = Math.max(...sizes.map((s) => s.servesMax));
  return `${min}–${max} pax`;
}

/** Price span for a size list, e.g. "₱9,000–₱13,000". */
export function priceRange(sizes: { price: number }[]): string {
  const prices = sizes.map((s) => s.price);
  return `${peso(Math.min(...prices))}–${peso(Math.max(...prices))}`;
}

/** Look up a product by id, so meta copy can cite real figures. */
export function product(id: string) {
  const found = menu.products.find((p) => p.id === id);
  if (!found) throw new Error(`No product "${id}" in menu.json`);
  return found;
}
