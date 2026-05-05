export function getCarImage(brand?: string, model?: string) {
  const seed = `${brand || ''}-${model || ''}-${Math.random()}`;

  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/600`;
}
