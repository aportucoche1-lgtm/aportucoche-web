// src/lib/getCarImage.ts

const CAR_IMAGES: Record<string, string> = {
  // BMW
  'bmw-serie-3': 'https://cdn.bmwblog.com/wp-content/uploads/2022/05/2023-bmw-3-series-facelift-01.jpg',

  // AUDI
  'audi-q3': 'https://www.audi.es/content/dam/nemo/models/q3/q3/my-2023/1920x1080-audi-q3.jpg',

  // MERCEDES
  'mercedes-benz-gla': 'https://www.mercedes-benz.es/content/dam/hq/passengercars/cars/gla/overview/mercedes-benz-gla.jpg',

  // TESLA
  'tesla-model-3': 'https://tesla-cdn.thron.com/delivery/public/image/tesla/3d7d4a/model-3.jpg',

  // VOLKSWAGEN
  'volkswagen-golf': 'https://www.volkswagen.es/content/dam/vw-ngw/vw_pkw/importers/es/models/golf-8/overview/golf-8.jpg',
};

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7';

function normalize(text?: string) {
  return (text || '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function getCarImage(brand?: string, model?: string) {
  const key = `${normalize(brand)}-${normalize(model)}`;

  return CAR_IMAGES[key] || DEFAULT_IMAGE;
}
