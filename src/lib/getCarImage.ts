const CAR_IMAGES: Record<string, string> = {
  'bmw-serie3': 'https://cdn.bmwblog.com/...jpg',
  'audi-q3': 'https://www.audi.es/...jpg',
  'tesla-model3': 'https://tesla.com/...jpg',
};

function normalize(text?: string) {
  return (text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function getCarImage(brand?: string, model?: string) {
  const key = normalize(`${brand}${model}`);

  if (CAR_IMAGES[key]) {
    return CAR_IMAGES[key];
  }

  // fallback real dinámico
  const seed = `${brand}-${model}-${Math.random()}`;
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/600`;
}
