import { Car, AIValuation } from '../../types';

interface CarCardProps {
  car: Car;
  valuation: AIValuation;
  isFavorite: boolean;
  onToggleFavorite: (car: Car) => void;
  isLoggedIn: boolean;
  onAuthRequired: () => void;
}

function getFallbackImage(brand?: string, model?: string) {
  const fallback =
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200';

  if (!brand) return fallback;

  const search = `${brand} ${model || ''}`.toLowerCase();

  if (search.includes('bmw')) {
    return 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200';
  }

  if (search.includes('audi')) {
    return 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1200';
  }

  if (search.includes('mercedes')) {
    return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200';
  }

  if (search.includes('tesla')) {
    return 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1200';
  }

  return fallback;
}

export function CarCard({ car }: CarCardProps) {
  const imageUrl =
    car.image && car.image.length > 5
      ? car.image
      : getFallbackImage(car.brand, car.model);

  return (
    <a
      href={car.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
    >
      <img
        src={imageUrl}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-[220px] object-cover"
      />

      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {car.platform}
          </span>
        </div>

        <h3 className="font-bold text-lg">
          {car.brand} {car.model}
        </h3>

        <p className="text-gray-600">
          {car.price?.toLocaleString('es-ES')} €
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {car.year} · {car.km?.toLocaleString('es-ES')} km
        </p>
      </div>
    </a>
  );
}
