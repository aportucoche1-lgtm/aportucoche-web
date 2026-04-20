import { AIRating, AIValuation, Car } from '../types';
import { MOCK_CARS } from './mockData';

function getComparableCars(car: Car, allCars: Car[]): Car[] {
  return allCars.filter(
    (c) =>
      c.id !== car.id &&
      c.brand === car.brand &&
      c.model === car.model &&
      Math.abs(c.year - car.year) <= 2
  );
}

function calculateAveragePrice(cars: Car[]): number {
  if (cars.length === 0) return 0;
  const sum = cars.reduce((acc, c) => acc + c.price, 0);
  return Math.round(sum / cars.length);
}

function getRatingFromPercent(diffPercent: number): AIRating {
  if (diffPercent <= -20) return 'chollo_excelente';
  if (diffPercent <= -5) return 'buen_precio';
  if (diffPercent <= 5) return 'precio_normal';
  return 'precio_alto';
}

export function calculateAIValuation(car: Car, allCars: Car[] = MOCK_CARS): AIValuation {
  const comparableCars = getComparableCars(car, allCars);

  let averagePrice: number;
  if (comparableCars.length >= 3) {
    averagePrice = calculateAveragePrice(comparableCars);
  } else {
    const brandCars = allCars.filter(
      (c) => c.id !== car.id && c.brand === car.brand && Math.abs(c.year - car.year) <= 3
    );
    if (brandCars.length >= 2) {
      averagePrice = calculateAveragePrice(brandCars);
    } else {
      const bodyTypeCars = allCars.filter(
        (c) =>
          c.id !== car.id &&
          c.bodyType === car.bodyType &&
          c.fuel === car.fuel &&
          Math.abs(c.year - car.year) <= 2
      );
      if (bodyTypeCars.length >= 2) {
        averagePrice = calculateAveragePrice(bodyTypeCars);
      } else {
        averagePrice = car.price * (1 + (Math.random() * 0.3 - 0.1));
      }
    }
  }

  const kmAdjustment = car.km > 100000 ? -0.05 : car.km < 30000 ? 0.05 : 0;
  averagePrice = Math.round(averagePrice * (1 + kmAdjustment));

  const priceDiff = car.price - averagePrice;
  const priceDiffPercent = Math.round((priceDiff / averagePrice) * 100);
  const rating = getRatingFromPercent(priceDiffPercent);

  return {
    rating,
    averagePrice,
    priceDiff,
    priceDiffPercent,
  };
}

export const AI_RATING_CONFIG: Record<
  AIRating,
  {
    label: string;
    icon: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
    badgeClass: string;
    detailColor: string;
  }
> = {
  chollo_excelente: {
    label: 'Chollo',
    icon: '🔥',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    badgeClass: 'inline-flex items-center gap-1 px-2 py-0.5 text-white text-xs font-bold rounded-full' + ' bg-[#4CAF50]',
    detailColor: 'text-green-600',
  },
  buen_precio: {
    label: 'Buen precio',
    icon: '✓',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    badgeClass: 'inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 border border-green-200 text-xs font-semibold rounded-full',
    detailColor: 'text-green-600',
  },
  precio_normal: {
    label: 'Precio justo',
    icon: '~',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-600',
    borderColor: 'border-gray-200',
    badgeClass: 'inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-200 text-xs font-semibold rounded-full',
    detailColor: 'text-gray-500',
  },
  precio_alto: {
    label: 'Precio alto',
    icon: '↑',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    borderColor: 'border-red-200',
    badgeClass: 'inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-full',
    detailColor: 'text-red-500',
  },
};
