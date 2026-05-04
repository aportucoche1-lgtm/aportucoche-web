export const CAR_IMAGES: Record<string, string> = {
  bmw: 'https://cdn.bmwblog.com/wp-content/uploads/2022/05/2023-bmw-3-series-facelift-01.jpg',
  audi: 'https://www.audi.es/content/dam/nemo/models/q3/q3/my-2023/1920x1080-audi-q3.jpg',
  mercedes: 'https://www.mercedes-benz.es/content/dam/hq/passengercars/cars/gla/gla-h247-fl/overview/exterior/09-2023/images/mercedes-benz-gla-exterior-696x392.jpg',
  tesla: 'https://tesla-cdn.thron.com/delivery/public/image/tesla/3d7d4a/model-3.jpg',
  toyota: 'https://www.toyota.es/content/dam/toyota/nmsc/spain/modelos/rav4/overview/rav4.jpg',
  volkswagen: 'https://www.volkswagen.es/content/dam/vw-ngw/vw_pkw/importers/es/models/golf-8/overview/golf-8.jpg',
  seat: 'https://www.seat.es/content/dam/public/seat-website/carworlds/ibiza/overview/seat-ibiza.jpg',
  peugeot: 'https://www.peugeot.es/content/dam/peugeot/master/b2c/our-range/3008-suv/overview/peugeot-3008.jpg',
};

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80';

export function getCarImage(brand?: string, model?: string) {
  if (!brand) return DEFAULT_IMAGE;

  const cleanBrand = brand.toLowerCase();

  // 🔥 match por marca (siempre funcionará)
  if (cleanBrand.includes('bmw')) return CAR_IMAGES.bmw;
  if (cleanBrand.includes('audi')) return CAR_IMAGES.audi;
  if (cleanBrand.includes('mercedes')) return CAR_IMAGES.mercedes;
  if (cleanBrand.includes('tesla')) return CAR_IMAGES.tesla;
  if (cleanBrand.includes('toyota')) return CAR_IMAGES.toyota;
  if (cleanBrand.includes('volkswagen')) return CAR_IMAGES.volkswagen;
  if (cleanBrand.includes('seat')) return CAR_IMAGES.seat;
  if (cleanBrand.includes('peugeot')) return CAR_IMAGES.peugeot;

  return DEFAULT_IMAGE;
}
