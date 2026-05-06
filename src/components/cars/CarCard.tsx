import { Car, AIValuation } from '../../types';

interface CarCardProps {
  car: Car;
  valuation: AIValuation;
  isFavorite: boolean;
  onToggleFavorite: (car: Car) => void;
  isLoggedIn: boolean;
  onAuthRequired: () => void;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <a
      href={car.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
    >
      {/* IMAGEN */}
      <img
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-[220px] object-cover"
        onError={(e) => {
          e.currentTarget.src =
            'https://source.unsplash.com/800x600/?car';
        }}
      />

      {/* CONTENIDO */}
      <div className="p-4">
        {/* Plataforma */}
        <div className="mb-2">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {car.platform}
          </span>
        </div>

        {/* Título */}
        <h3 className="font-bold text-lg text-[#13233A]">
          {car.brand} {car.model}
        </h3>

        {/* Precio */}
        <p className="text-xl font-bold text-green-600 mt-2">
          {car.price ? car.price.toLocaleString('es-ES') + ' €' : 'Ver anuncio'}
        </p>

        {/* Info */}
        <p className="text-sm text-gray-500 mt-2">
          {car.year || '-'} · {car.km || '-'} km · {car.province || ''}
        </p>
      </div>
    </a>
  );
}
