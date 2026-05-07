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

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {loading ? (
          <p>Cargando coches...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cars.map((item, index) => (
              <CarCard
                key={index}
                car={{
                  id: index.toString(),
                  title: item.title,
                  brand: brand || 'Coche',
                  model: model || '',
                  price: 0,
                  km: 0,
                  year: 0,
                  fuel: 'gasolina',
                  bodyType: 'berlina',
                  province: '',
                  seller: 'profesional',
                  platform: item.platform,
                  url: item.url,
                  image: getCarImage(brand, model),
                  createdAt: new Date().toISOString(),
                }}
                valuation={{
                  rating: 'precio_normal',
                  averagePrice: 0,
                  priceDiff: 0,
                  priceDiffPercent: 0,
                }}
                isFavorite={isFavorite(index.toString())}
                onToggleFavorite={handleToggleFavorite}
                isLoggedIn={isLoggedIn}
                onAuthRequired={onOpenAuth}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
