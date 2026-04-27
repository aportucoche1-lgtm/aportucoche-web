import { ExternalLink, Fuel, Gauge, Heart, MapPin } from 'lucide-react';
import { Car, AIValuation } from '../../types';
import { getCarImage } from '../../utils/getCarImage';

interface CarCardProps {
  car: Car;
  valuation: AIValuation;
  isFavorite: boolean;
  onToggleFavorite: (car: Car) => void;
  isLoggedIn: boolean;
  onAuthRequired: () => void;
}

export function CarCard({
  car,
  valuation,
  isFavorite,
  onToggleFavorite,
  isLoggedIn,
  onAuthRequired
}: CarCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow">
      <div className="relative bg-gray-100">
        <img
          src={getCarImage(car.brand, car.model)}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-[220px] object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200";
          }}
        />
      </div>

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
