export const CAR_IMAGES: Record<string, string> = {
  'bmw-serie-3': 'https://cdn.bmwblog.com/wp-content/uploads/2022/05/2023-bmw-3-series-facelift-01.jpg',
  'audi-q3': 'https://www.audi.es/content/dam/nemo/models/q3/q3/my-2023/1920x1080-audi-q3.jpg',
  'mercedes-benz-gla': 'https://www.mercedes-benz.es/content/dam/hq/passengercars/cars/gla/gla-h247-fl/overview/exterior/09-2023/images/mercedes-benz-gla-exterior-696x392.jpg',
  'tesla-model-3': 'https://tesla-cdn.thron.com/delivery/public/image/tesla/3d7d4a/model-3.jpg',
  'toyota-rav4': 'https://www.toyota.es/content/dam/toyota/nmsc/spain/modelos/rav4/overview/rav4.jpg',
  'volkswagen-golf': 'https://www.volkswagen.es/content/dam/vw-ngw/vw_pkw/importers/es/models/golf-8/overview/golf-8.jpg',
};

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80';

export function getCarImage(brand?: string, model?: string) {
  if (!brand) return DEFAULT_IMAGE;

  const cleanBrand = brand.toLowerCase().replace(/\s+/g, '-');
  const cleanModel = (model || '').toLowerCase().replace(/\s+/g, '-');

  const key = `${cleanBrand}-${cleanModel}`;

  // 1. intento exacto (bmw-serie-3)
  if (CAR_IMAGES[key]) return CAR_IMAGES[key];

  // 2. intento solo marca (bmw)
  const brandKey = cleanBrand;
  const brandImage = Object.entries(CAR_IMAGES).find(([k]) =>
    k.startsWith(brandKey)
  );

  if (brandImage) return brandImage[1];

  // 3. fallback final
  return DEFAULT_IMAGE;
}
