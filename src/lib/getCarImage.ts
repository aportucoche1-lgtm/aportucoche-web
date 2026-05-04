export function getCarImage(brand?: string, model?: string) {
  const DEFAULT =
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80';

  if (!brand) return DEFAULT;

  const query = `${brand} ${model || ''} car exterior`;

  // 🔥 clave: usar Unsplash search real
  return `https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80&${encodeURIComponent(
    query
  )}`;
}
