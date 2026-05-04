const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80';

const BRAND_IMAGES: Record<string, string> = {
  bmw: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
  audi: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
  mercedes: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
  volkswagen: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
  toyota: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=1200&q=80',
  tesla: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
};

const MODEL_IMAGES: Record<string, string> = {
  'bmw-serie3': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
  'audi-q3': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
  'mercedes-benz-gla': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
  'tesla-model3': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
  'toyota-rav4': 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=1200&q=80',
  'volkswagen-golf': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
};

function normalize(text?: string) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

export function getCarImage(brand?: string, model?: string) {
  if (!brand) return DEFAULT_IMAGE;

  const brandKey = normalize(brand);
  const modelKey = normalize(model);

  const fullKey = `${brandKey}-${modelKey}`;

  // 🔥 1. Intentar modelo exacto
  if (MODEL_IMAGES[fullKey]) {
    return MODEL_IMAGES[fullKey];
  }

  // 🔥 2. Fallback marca
  if (BRAND_IMAGES[brandKey]) {
    return BRAND_IMAGES[brandKey];
  }

  // 🔥 3. fallback global
  return DEFAULT_IMAGE;
}
