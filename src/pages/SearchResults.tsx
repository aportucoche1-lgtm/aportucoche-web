import {
  Bell,
  ChevronDown,
  Flame,
  LayoutGrid,
  List,
  Loader2,
  Save,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CarCard } from '../components/cars/CarCard';
import { FilterPanel } from '../components/search/FilterPanel';
import { supabase } from '../lib/supabase';
import { Car, SearchFilters, SortOption } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import { generateSearchLinks } from '../lib/generateSearchLinks';
import { getCarImage } from '../lib/getCarImage';

interface SearchResultsProps {
  onOpenAuth: () => void;
  userId?: string | null;
  isLoggedIn: boolean;
  initialSearchParams?: URLSearchParams;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'chollos', label: 'Mejores chollos' },
  { value: 'precio_asc', label: 'Precio: menor a mayor' },
  { value: 'precio_desc', label: 'Precio: mayor a menor' },
  { value: 'year_desc', label: 'Más reciente' },
  { value: 'km_asc', label: 'Menos kilómetros' },
  { value: 'reciente', label: 'Publicado recientemente' },
];

function buildInitialFilters(params?: URLSearchParams): SearchFilters {
  if (!params) return { sortBy: 'chollos' };

  return {
    sortBy: 'chollos',
    brand: params.get('brand') || undefined,
    model: params.get('model') || undefined,
    province: params.get('province') || undefined,
  };
}

function filtersToSearchParams(filters: SearchFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.brand) params.set('brand', filters.brand);
  if (filters.model) params.set('model', filters.model);
  if (filters.province) params.set('province', filters.province);

  return params;
}

export function SearchResults({
  onOpenAuth,
  userId,
  isLoggedIn,
  initialSearchParams,
}: SearchResultsProps) {
  const [filters, setFilters] = useState<SearchFilters>(() =>
    buildInitialFilters(initialSearchParams)
  );

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [saveSearchOpen, setSaveSearchOpen] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState('');
  const [savingSearch, setSavingSearch] = useState(false);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites(userId);

  const updateFilters = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);

    const params = filtersToSearchParams(newFilters);
    const url = params.toString()
      ? `/coches?${params.toString()}`
      : '/coches';

    window.history.replaceState({}, '', url);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setFilters(
        buildInitialFilters(new URLSearchParams(window.location.search))
      );
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 🚀 AQUÍ ESTÁ EL MOTOR REAL DEL MVP
  const filteredCars = useMemo(() => {
    const links = generateSearchLinks(filters);

    const cars: Car[] = links.map((item, index) => ({
      id: index.toString(),
      title: `${filters.brand || ''} ${filters.model || ''}`.trim(),
      brand: filters.brand || '',
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

  async function handleSaveSearch() {
    if (!isLoggedIn) {
      onOpenAuth();
      return;
    }

    if (!saveSearchName.trim()) return;

    setSavingSearch(true);

    await supabase.from('saved_searches').insert({
      user_id: userId,
      name: saveSearchName,
      filters: filters,
      alert_enabled: false,
    });

    setSavingSearch(false);
    setSaveSearchOpen(false);
    setSaveSearchName('');
  }

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
