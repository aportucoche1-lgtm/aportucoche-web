export function getCarImage(brand?: string, model?: string) {
  const fallback =
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80';

  if (!brand && !model) return fallback;

  const query = `${brand || ''} ${model || ''} car`;

  return `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`;
}
