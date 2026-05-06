import { useMemo, useState } from 'react';
import { CarCard } from '../components/cars/CarCard';
import { supabase } from '../lib/supabase';
import { Car, SearchFilters } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import { getCarImage } from '../lib/getCarImage';

function generateSearchLinks(filters: {
  brand?: string;
  model?: string;
}) {
  const query = `${filters.brand || ''} ${filters.model || ''}`.trim();
  const encoded = encodeURIComponent(query);

  return [
    {
      platform: 'wallapop',
      url: `https://es.wallapop.com/app/search?keywords=${encoded}`,
    },
    {
      platform: 'milanuncios',
      url: `https://www.milanuncios.com/coches-de-segunda-mano/?q=${encoded}`,
    },
    {
      platform: 'coches.net',
      url: `https://www.coches.net/segunda-mano/?Key=${encoded}`,
    },
    {
      platform: 'autoscout24',
      url: `https://www.autoscout24.es/lst?search=${encoded}`,
    },
    {
      platform: 'facebook',
      url: `https://www.facebook.com/marketplace/search/?query=${encoded}`,
    },
  ];
}

interface SearchResultsProps {
  onOpenAuth: () => void;
  userId?: string | null;
  isLoggedIn: boolean;
  initialSearchParams?: URLSearchParams;
}

function buildInitialFilters(params?: URLSearchParams): SearchFilters {
  if (!params) return { sortBy: 'chollos' };

  return {
    sortBy: 'chollos',
    brand: params.get('brand') || undefined,
    model: params.get('model') || undefined,
    province: params.get('province') || undefined,
  };
}

export function SearchResults({
  onOpenAuth,
  userId,
  isLoggedIn,
  initialSearchParams,
}: SearchResultsProps) {
  const [filters] = useState<SearchFilters>(() =>
    buildInitialFilters(initialSearchParams)
  );

  const { addFavorite, removeFavorite, isFavorite } = useFavorites(userId);

  const filteredCars = useMemo(() => {
    const links = generateSearchLinks(filters);

    const cars: Car[] = links.map((item, index) => ({
      id: index.toString(),

      title: `${filters.brand || 'Coche'} ${filters.model || ''}`.trim(),
      brand: filters.brand || 'Coche',
      model: filters.model || '',

      year: 0,
      price: 0,
      km: 0,
      fuel: 'gasolina',
      bodyType: 'berlina',
      province: filters.province || '',

      seller: 'profesional',
      platform: item.platform as any,
      url: item.url,

      image: getCarImage(filters.brand, filters.model),

      createdAt: new Date().toISOString(),
    }));

    return cars.map((car) => ({
      car,
      valuation: {
        rating: 'precio_normal',
        averagePrice: 0,
        priceDiff: 0,
        priceDiffPercent: 0,
      },
    }));
  }, [filters]);

  const handleToggleFavorite = (car: Car) => {
    if (isFavorite(car.id)) removeFavorite(car.id);
    else addFavorite(car);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCars.map(({ car, valuation }) => (
            <CarCard
              key={car.id}
              car={car}
              valuation={valuation}
              isFavorite={isFavorite(car.id)}
              onToggleFavorite={handleToggleFavorite}
              isLoggedIn={isLoggedIn}
              onAuthRequired={onOpenAuth}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
