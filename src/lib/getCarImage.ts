export function getCarImage(brand?: string, model?: string) {
  const query = `${brand || ''} ${model || ''} car`;

  return `https://image.pollinations.ai/prompt/${encodeURIComponent(query)}`;
}
