import { Car, AIValuation } from '../../types';

interface CarCardProps {
  car: Car;
  valuation: AIValuation;
  isFavorite: boolean;
  onToggleFavorite: (car: Car) => void;
  isLoggedIn: boolean;
  onAuthRequired: () => void;
}

function getCarImage(brand?: string, model?: string) {
  const fallback =
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200';

  if (!brand) return fallback;

  const query = `${brand} ${model || ''} car exterior`;

  return `https://source.unsplash.com/featured/800x600/?${encodeURIComponent(query)}`;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow">
      <img
        src={getCarImage(car.brand, car.model)}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-[220px] object-cover"
      />

      <div className="p-4">
        <h3 className="font-bold text-lg">
          {car.brand} {car.model}
        </h3>

        <p className="text-gray-600">
          {car.price?.toLocaleString('es-ES')} €
        </p>
      </div>
    </div>
  );
}
