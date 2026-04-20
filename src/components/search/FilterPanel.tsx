import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { BodyType, FuelType, Platform, SearchFilters } from '../../types';
import { BODY_TYPE_LABELS, BRANDS, FUEL_LABELS, MODELS_BY_BRAND, PLATFORM_LABELS, PROVINCES } from '../../lib/constants';

interface FilterPanelProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  totalResults: number;
}

export function FilterPanel({ filters, onChange, totalResults }: FilterPanelProps) {
  const update = (partial: Partial<SearchFilters>) => onChange({ ...filters, ...partial });

  const toggleArray = <T,>(arr: T[] | undefined, value: T): T[] => {
    const current = arr || [];
    return current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
  };

  const bodyTypes = Object.keys(BODY_TYPE_LABELS) as BodyType[];
  const fuelTypes = Object.keys(FUEL_LABELS) as FuelType[];
  const platforms = Object.keys(PLATFORM_LABELS) as Platform[];
  const models = filters.brand ? MODELS_BY_BRAND[filters.brand] || [] : [];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-700" />
          <span className="font-semibold text-gray-900">Filtros</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{totalResults} resultados</span>
          <button
            onClick={() => onChange({})}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Limpiar
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <Section title="Marca y modelo">
          <select
            value={filters.brand || ''}
            onChange={(e) => update({ brand: e.target.value || undefined, model: undefined })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas las marcas</option>
            {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          {filters.brand && (
            <select
              value={filters.model || ''}
              onChange={(e) => update({ model: e.target.value || undefined })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
            >
              <option value="">Todos los modelos</option>
              {models.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          )}
        </Section>

        <Section title="Precio">
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Mínimo"
              value={filters.priceMin || ''}
              onChange={(e) => update({ priceMin: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Máximo"
              value={filters.priceMax || ''}
              onChange={(e) => update({ priceMax: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </Section>

        <Section title="Año">
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Desde"
              value={filters.yearMin || ''}
              onChange={(e) => update({ yearMin: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Hasta"
              value={filters.yearMax || ''}
              onChange={(e) => update({ yearMax: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </Section>

        <Section title="Kilómetros máximos">
          <select
            value={filters.kmMax || ''}
            onChange={(e) => update({ kmMax: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Sin límite</option>
            <option value="20000">Hasta 20.000 km</option>
            <option value="50000">Hasta 50.000 km</option>
            <option value="75000">Hasta 75.000 km</option>
            <option value="100000">Hasta 100.000 km</option>
            <option value="150000">Hasta 150.000 km</option>
          </select>
        </Section>

        <Section title="Provincia">
          <select
            value={filters.province || ''}
            onChange={(e) => update({ province: e.target.value || undefined })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Toda España</option>
            {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Section>

        <Section title="Tipo de carrocería">
          <div className="flex flex-wrap gap-1.5">
            {bodyTypes.map((type) => (
              <button
                key={type}
                onClick={() => update({ bodyType: toggleArray(filters.bodyType, type) })}
                className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                  filters.bodyType?.includes(type)
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {BODY_TYPE_LABELS[type]}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Combustible">
          <div className="flex flex-wrap gap-1.5">
            {fuelTypes.map((fuel) => (
              <button
                key={fuel}
                onClick={() => update({ fuel: toggleArray(filters.fuel, fuel) })}
                className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                  filters.fuel?.includes(fuel)
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {FUEL_LABELS[fuel]}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Tipo de vendedor">
          <div className="flex gap-2">
            {(['ambos', 'particular', 'profesional'] as const).map((type) => (
              <button
                key={type}
                onClick={() => update({ seller: type })}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors capitalize ${
                  (filters.seller || 'ambos') === type
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                }`}
              >
                {type === 'ambos' ? 'Ambos' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Plataformas">
          <div className="space-y-1.5">
            {platforms.map((platform) => (
              <label key={platform} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={!filters.platforms || filters.platforms.includes(platform)}
                  onChange={(e) => {
                    const current = filters.platforms || platforms;
                    if (e.target.checked) {
                      update({ platforms: toggleArray(current, platform) });
                    } else {
                      update({ platforms: current.filter((p) => p !== platform) });
                    }
                  }}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {PLATFORM_LABELS[platform]}
                </span>
              </label>
            ))}
          </div>
        </Section>

        <div className="pt-1">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={filters.onlyChollos || false}
                onChange={(e) => update({ onlyChollos: e.target.checked })}
                className="sr-only"
              />
              <div
                className={`w-10 h-6 rounded-full transition-colors ${
                  filters.onlyChollos ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow mt-1 transition-transform ${
                    filters.onlyChollos ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </div>
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              Solo chollos 🔥
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}
