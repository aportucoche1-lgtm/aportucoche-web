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
import { calculateAIValuation } from '../lib/aiValuation';
import { MOCK_CARS } from '../lib/mockData';
import { supabase } from '../lib/supabase';
import { Car, SearchFilters, SortOption } from '../types';
import { useFavorites } from '../hooks/useFavorites';

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

function CarCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
      <div className="bg-gray-200" style={{ aspectRatio: '16/10' }} />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-7 bg-gray-200 rounded w-1/2" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-3 bg-gray-100 rounded" />
          <div className="h-3 bg-gray-100 rounded" />
          <div className="h-3 bg-gray-100 rounded" />
          <div className="h-3 bg-gray-100 rounded" />
        </div>
        <div className="h-9 bg-gray-200 rounded-xl mt-2" />
      </div>
    </div>
  );
}

function buildInitialFilters(params?: URLSearchParams): SearchFilters {
  if (!params) return { sortBy: 'chollos' };
  const filters: SearchFilters = { sortBy: 'chollos' };
  const brand = params.get('brand');
  const model = params.get('model');
  const fuel = params.get('fuel');
  const province = params.get('province');
  const bodyType = params.get('bodyType');
  if (brand) filters.brand = brand;
  if (model) filters.model = model;
  if (fuel) filters.fuel = [fuel as import('../types').FuelType];
  if (province) filters.province = province;
  if (bodyType) filters.bodyType = [bodyType as import('../types').BodyType];
  return filters;
}

function filtersToSearchParams(filters: SearchFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.brand) params.set('brand', filters.brand);
  if (filters.model) params.set('model', filters.model);
  if (filters.province) params.set('province', filters.province);
  if (filters.fuel?.length) params.set('fuel', filters.fuel[0]);
  if (filters.bodyType?.length) params.set('bodyType', filters.bodyType[0]);
  if (filters.priceMin) params.set('priceMin', String(filters.priceMin));
  if (filters.priceMax) params.set('priceMax', String(filters.priceMax));
  if (filters.yearMin) params.set('yearMin', String(filters.yearMin));
  if (filters.yearMax) params.set('yearMax', String(filters.yearMax));
  if (filters.kmMax) params.set('kmMax', String(filters.kmMax));
  if (filters.onlyChollos) params.set('onlyChollos', '1');
  if (filters.sortBy && filters.sortBy !== 'chollos') params.set('sortBy', filters.sortBy);
  return params;
}

export function SearchResults({ onOpenAuth, userId, isLoggedIn, initialSearchParams }: SearchResultsProps) {
  const [filters, setFilters] = useState<SearchFilters>(() => buildInitialFilters(initialSearchParams));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const updateFilters = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    const params = filtersToSearchParams(newFilters);
    const qs = params.toString();
    const url = qs ? `/coches?${qs}` : '/coches';
    window.history.replaceState({}, '', url);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setFilters(buildInitialFilters(new URLSearchParams(window.location.search)));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [saveSearchOpen, setSaveSearchOpen] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState('');
  const [savingSearch, setSavingSearch] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading] = useState(false);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites(userId);

  const filteredCars = useMemo(() => {
    let cars: Car[] = [...MOCK_CARS];

    if (filters.brand) cars = cars.filter((c) => c.brand === filters.brand);
    if (filters.model) cars = cars.filter((c) => c.model === filters.model);
    if (filters.priceMin) cars = cars.filter((c) => c.price >= (filters.priceMin || 0));
    if (filters.priceMax) cars = cars.filter((c) => c.price <= (filters.priceMax || Infinity));
    if (filters.yearMin) cars = cars.filter((c) => c.year >= (filters.yearMin || 0));
    if (filters.yearMax) cars = cars.filter((c) => c.year <= (filters.yearMax || 9999));
    if (filters.kmMax) cars = cars.filter((c) => c.km <= (filters.kmMax || Infinity));
    if (filters.province) cars = cars.filter((c) => c.province === filters.province);
    if (filters.fuel?.length) cars = cars.filter((c) => filters.fuel!.includes(c.fuel));
    if (filters.bodyType?.length) cars = cars.filter((c) => filters.bodyType!.includes(c.bodyType));
    if (filters.seller && filters.seller !== 'ambos') {
      cars = cars.filter((c) => c.seller === filters.seller);
    }
    if (filters.platforms?.length) {
      cars = cars.filter((c) => filters.platforms!.includes(c.platform));
    }

    const withValuation = cars.map((car) => ({ car, valuation: calculateAIValuation(car) }));

    if (filters.onlyChollos) {
      return withValuation.filter(
        ({ valuation }) =>
          valuation.rating === 'chollo_excelente' || valuation.rating === 'buen_precio'
      );
    }

    const sortBy = filters.sortBy || 'chollos';
    return withValuation.sort((a, b) => {
      switch (sortBy) {
        case 'chollos': {
          const order = { chollo_excelente: 0, buen_precio: 1, precio_normal: 2, precio_alto: 3 };
          return order[a.valuation.rating] - order[b.valuation.rating];
        }
        case 'precio_asc': return a.car.price - b.car.price;
        case 'precio_desc': return b.car.price - a.car.price;
        case 'year_desc': return b.car.year - a.car.year;
        case 'km_asc': return a.car.km - b.car.km;
        case 'reciente': return new Date(b.car.createdAt).getTime() - new Date(a.car.createdAt).getTime();
        default: return 0;
      }
    });
  }, [filters]);

  async function handleSaveSearch() {
    if (!isLoggedIn) { onOpenAuth(); return; }
    if (!saveSearchName.trim()) return;
    setSavingSearch(true);

    await supabase.from('saved_searches').insert({
      user_id: userId,
      name: saveSearchName,
      filters: filters,
      alert_enabled: false,
    });

    setSaveSuccess(true);
    setSavingSearch(false);
    setTimeout(() => {
      setSaveSearchOpen(false);
      setSaveSuccess(false);
      setSaveSearchName('');
    }, 1500);
  }

  const handleToggleFavorite = (car: Car) => {
    if (isFavorite(car.id)) {
      removeFavorite(car.id);
    } else {
      addFavorite(car);
    }
  };

  const chollosCount = filteredCars.filter(
    ({ valuation }) => valuation.rating === 'chollo_excelente' || valuation.rating === 'buen_precio'
  ).length;

  const activeFilterCount = [
    filters.brand, filters.model, filters.province,
    filters.fuel?.length, filters.bodyType?.length,
    filters.priceMin, filters.priceMax, filters.yearMin, filters.yearMax,
    filters.kmMax, filters.onlyChollos, filters.platforms?.length,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className={`lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilterCount > 0
                    ? 'bg-navy-800 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
                {activeFilterCount > 0 && (
                  <span className="bg-white/20 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="text-sm text-gray-600">
                {isLoading ? (
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Buscando...
                  </span>
                ) : (
                  <div>
                    <div>
                      <span className="font-semibold text-gray-900">{filteredCars.length}</span>
                      <span className="ml-1">coches encontrados</span>
                      {chollosCount > 0 && (
                        <span className="ml-2 inline-flex items-center gap-1 text-emerald-600 font-medium">
                          · <Flame className="w-3.5 h-3.5" /> {chollosCount} chollos
                        </span>
                      )}
                    </div>
                    {(filters.brand || filters.province) && (
                      <div className="text-xs text-gray-400 mt-0.5">
                        {[filters.brand, filters.model, filters.province].filter(Boolean).join(' · ')}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={filters.sortBy || 'chollos'}
                  onChange={(e) => updateFilters({ ...filters, sortBy: e.target.value as SortOption })}
                  className="pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-green appearance-none text-gray-700"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <button
                onClick={() => { if (!isLoggedIn) { onOpenAuth(); return; } setSaveSearchOpen(!saveSearchOpen); }}
                className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 hover:border-brand-green rounded-lg text-sm font-medium text-gray-600 hover:text-brand-green transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Guardar alerta</span>
              </button>

              <div className="hidden sm:flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-navy-800 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-navy-800 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {saveSearchOpen && (
            <div className="mt-3 flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <Save className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <input
                type="text"
                placeholder="Nombre de la alerta..."
                value={saveSearchName}
                onChange={(e) => setSaveSearchName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveSearch()}
                className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700 placeholder-gray-400"
                autoFocus
              />
              {saveSuccess ? (
                <span className="text-xs text-emerald-600 font-semibold">¡Alerta guardada!</span>
              ) : (
                <button
                  onClick={handleSaveSearch}
                  disabled={savingSearch || !saveSearchName.trim()}
                  className="px-3 py-1 bg-brand-green hover:bg-brand-green-dark disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  {savingSearch && <Loader2 className="w-3 h-3 animate-spin" />}
                  Guardar
                </button>
              )}
              <button onClick={() => setSaveSearchOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-36 shadow-sm">
              <FilterPanel
                filters={filters}
                onChange={updateFilters}
                totalResults={filteredCars.length}
              />
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            {isLoading ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'space-y-4'}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <CarCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sin resultados</h3>
                <p className="text-gray-500 mb-6 max-w-xs mx-auto">
                  No encontramos coches con esos filtros. Prueba a ampliar la búsqueda.
                </p>
                <button
                  onClick={() => updateFilters({ sortBy: 'chollos' })}
                  className="px-6 py-2.5 bg-navy-800 hover:bg-navy-900 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                    : 'space-y-4'
                }
              >
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
            )}
          </main>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto shadow-2xl">
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-gray-900">Filtros</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <FilterPanel
                filters={filters}
                onChange={(f) => { updateFilters(f); setMobileFiltersOpen(false); }}
                totalResults={filteredCars.length}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
