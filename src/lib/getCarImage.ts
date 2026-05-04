const MODEL_IMAGE_MAP: Record<string, string> = {
  // BMW
  'bmw-serie3': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
  'bmw-x3': 'https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?auto=format&fit=crop&w=1200&q=80',

  // AUDI
  'audi-a3': 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6d9?auto=format&fit=crop&w=1200&q=80',
  'audi-q3': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',

  // MERCEDES
  'mercedesbenz-gla': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',

  // TESLA
  'tesla-model3': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',

  // TOYOTA
  'toyota-rav4': 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=1200&q=80',

  // VW
  'volkswagen-golf': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
};

const BRAND_FALLBACK: Record<string, string> = {
  bmw: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
  audi: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6',
  mercedesbenz: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8',
  toyota: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8',
};

const DEFAULT =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7';

function normalize(text?: string) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

export function getCarImage(brand?: string, model?: string) {
  const key = `${normalize(brand)}-${normalize(model)}`;

  if (MODEL_IMAGE_MAP[key]) {
    return MODEL_IMAGE_MAP[key];
  }

  const brandKey = normalize(brand);
  if (BRAND_FALLBACK[brandKey]) {
    return BRAND_FALLBACK[brandKey];
  }

  return DEFAULT;
}
