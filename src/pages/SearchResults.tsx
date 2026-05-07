import { estimateCarPrice } from '../lib/aiValuation';
import { useEffect, useState } from 'react';
import { CarCard } from '../components/cars/CarCard';
import { useFavorites } from '../hooks/useFavorites';
import { getCarImage } from '../lib/getCarImage';

interface SearchResultsProps {
  onOpenAuth: () => void;
  userId?: string | null;
  isLoggedIn: boolean;
  initialSearchParams?: URLSearchParams;
}

export function SearchResults({
  onOpenAuth,
  userId,
  isLoggedIn,
  initialSearchParams,
}: SearchResultsProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites(userId);

  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Obtener filtros desde URL
  const brand = initialSearchParams?.get('brand') || '';
  const model = initialSearchParams?.get('model') || '';

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/search?brand=${brand}&model=${model}`
        );

        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }

      setLoading(false);
    }

    fetchCars();
  }, [brand, model]);

  const handleToggleFavorite = (car: any) => {
    if (isFavorite(car.id)) removeFavorite(car.id);
    else addFavorite(car);
  };

 const estimatedPrice = estimateCarPrice(filters.brand, filters.model);

return (
  <div className="min-h-screen bg-gray-50 pt-16">
    <div className="max-w-3xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-4">
        {filters.brand} {filters.model}
      </h1>

      {estimatedPrice && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-lg font-semibold text-green-700">
            💰 Precio medio estimado: {estimatedPrice.toLocaleString('es-ES')} €
          </p>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-3">
        Ver anuncios en plataformas:
      </h2>

      <div className="space-y-3">
        <a
          href={`https://es.wallapop.com/app/search?keywords=${encodeURIComponent(
            `${filters.brand} ${filters.model}`
          )}`}
          target="_blank"
          className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
        >
          Wallapop →
        </a>

        <a
          href={`https://www.coches.net/segunda-mano/?Key=${encodeURIComponent(
            `${filters.brand} ${filters.model}`
          )}`}
          target="_blank"
          className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
        >
          Coches.net →
        </a>

        <a
          href={`https://www.autoscout24.es/lst?search=${encodeURIComponent(
            `${filters.brand} ${filters.model}`
          )}`}
          target="_blank"
          className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
        >
          AutoScout24 →
        </a>

        <a
          href={`https://www.milanuncios.com/coches-de-segunda-mano/?q=${encodeURIComponent(
            `${filters.brand} ${filters.model}`
          )}`}
          target="_blank"
          className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
        >
          Milanuncios →
        </a>

        <a
          href={`https://www.facebook.com/marketplace/search/?query=${encodeURIComponent(
            `${filters.brand} ${filters.model}`
          )}`}
          target="_blank"
          className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
        >
          Facebook Marketplace →
        </a>
      </div>
    </div>
  </div>
);
