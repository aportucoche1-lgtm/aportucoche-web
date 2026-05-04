const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80';

// 🔥 Imágenes por MARCA (fallback)
const BRAND_IMAGES: Record<string, string> = {
  bmw: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
  audi: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
  mercedesbenz: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
  volkswagen: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
  toyota: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=1200&q=80',
  tesla: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
  seat: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80',
  peugeot: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80',
  renault: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80',
  ford: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
};

// 🔥 Imágenes por MODELO (CLAVE)
const MODEL_IMAGES: Record<string, string> = {
  // BMW
  'bmw-serie3': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
  'bmw-x3': 'https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?auto=format&fit=crop&w=1200&q=80',
  'bmw-x5': 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80',

  // AUDI
  'audi-a3': 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6d9?auto=format&fit=crop&w=1200&q=80',
  'audi-a4': 'https://images.unsplash.com/photo-1549921296-3ecf9c1c7d94?auto=format&fit=crop&w=1200&q=80',
  'audi-q3': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
  'audi-q5': 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80',

  // MERCEDES
  'mercedesbenz-gla': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
  'mercedesbenz-clasec': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
  'mercedesbenz-gle': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80',

  // TESLA
  'tesla-model3': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
  'tesla-modely': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80',

  // TOYOTA
  'toyota-rav4': 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=1200&q=80',
  'toyota-yaris': 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6d9?auto=format&fit=crop&w=1200&q=80',

  // VOLKSWAGEN
  'volkswagen-golf': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
  'volkswagen-polo': 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
  'volkswagen-tiguan': 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=1200&q=80',
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

  // 1) modelo exacto
  if (MODEL_IMAGES[fullKey]) return MODEL_IMAGES[fullKey];

  // 2) marca
  if (BRAND_IMAGES[brandKey]) return BRAND_IMAGES[brandKey];

  // 3) default
  return DEFAULT_IMAGE;
}
