import { ArrowRight, Bell, CheckCircle, ChevronDown, Flame, Loader2, Search, Shield, Zap } from 'lucide-react';
import { useState } from 'react';
import { CarCard } from '../components/cars/CarCard';
import { calculateAIValuation } from '../lib/aiValuation';
import { BRANDS, FUEL_LABELS, MODELS_BY_BRAND, PROVINCES } from '../lib/constants';
import { MOCK_CARS } from '../lib/mockData';
import { FuelType } from '../types';

interface HomeProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
}

const QUICK_SEARCHES = [
  { label: 'SUV Diésel', query: { bodyType: 'suv', fuel: 'diesel' } },
  { label: 'Eléctricos', query: { fuel: 'electrico' } },
  { label: 'Chollos Madrid', query: { province: 'Madrid' } },
  { label: 'Híbridos', query: { fuel: 'hibrido' } },
];

export function Home({ onNavigate, onOpenAuth, isLoggedIn }: HomeProps) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [fuel, setFuel] = useState<FuelType | ''>('');
  const [province, setProvince] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const availableModels = brand ? (MODELS_BY_BRAND[brand] ?? []) : [];

  const handleBrandChange = (val: string) => {
    setBrand(val);
    setModel('');
  };

  const buildQuery = (overrides: Record<string, string> = {}) => {
    const q: Record<string, string> = {};
    if (brand) q.brand = brand;
    if (model) q.model = model;
    if (fuel) q.fuel = fuel;
    if (province) q.province = province;
    return { ...q, ...overrides };
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      onNavigate('/coches', buildQuery());
      setIsSearching(false);
    }, 600);
  };

  const handleQuickSearch = (query: Record<string, string>) => {
    onNavigate('/coches', query);
  };

  const featuredChollos = [];
  const stats = [
    { value: '50.000+', label: 'Anuncios activos' },
    { value: '5', label: 'Plataformas' },
    { value: '2.400+', label: 'Chollos hoy' },
    { value: '100%', label: 'Gratis' },
  ];

  const features = [
    {
      icon: <Zap className="w-5 h-5" style={{ color: '#1E2A38' }} />,
      title: 'Valoración IA instantánea',
      description: 'Analizamos miles de precios para decirte si un coche es un chollo o está caro.',
    },
    {
      icon: <Search className="w-5 h-5" style={{ color: '#1E2A38' }} />,
      title: 'Búsqueda en 5 plataformas',
      description: 'Wallapop, Milanuncios, Coches.net, AutoScout24 y Facebook Marketplace.',
    },
    {
      icon: <Bell className="w-5 h-5" style={{ color: '#1E2A38' }} />,
      title: 'Alertas personalizadas',
      description: 'Recibe una notificación cuando aparezca un coche que se ajuste a lo que buscas.',
    },
    {
      icon: <Shield className="w-5 h-5" style={{ color: '#1E2A38' }} />,
      title: 'Acceso directo al anuncio',
      description: 'Siempre te llevamos al anuncio original. Transparente y sin intermediarios.',
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <section className="relative pt-24 pb-16 overflow-hidden" style={{ backgroundColor: '#F0F2F5' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(30,42,56,0.12), transparent)' }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-7 border"
            style={{ backgroundColor: 'rgba(76,175,80,0.08)', borderColor: 'rgba(76,175,80,0.2)', color: '#2E7D32' }}
          >
            <Flame className="w-3.5 h-3.5" />
            2.400 chollos detectados hoy
          </div>

          <h1 className="font-black leading-tight mb-4" style={{ color: '#1E2A38', fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: '1.1' }}>
            <span className="block">Encuentra tu coche ideal</span>
            <span className="block" style={{ color: '#4CAF50' }}>al mejor precio</span>
          </h1>

          <p className="text-base sm:text-lg max-w-xl mx-auto mb-10" style={{ color: '#6B7A8D' }}>
            Comparamos coches de segunda mano de las principales plataformas de España y detectamos chollos con inteligencia artificial.
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-4xl mx-auto" style={{ boxShadow: '0 4px 32px rgba(30,42,56,0.10), 0 1px 4px rgba(30,42,56,0.06)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
              <SelectField
                value={brand}
                onChange={handleBrandChange}
                placeholder="Marca"
                options={BRANDS.map((b) => ({ val: b, label: b }))}
              />
              <SelectField
                value={model}
                onChange={setModel}
                placeholder={brand ? 'Modelo' : 'Modelo (elige marca)'}
                options={availableModels.map((m) => ({ val: m, label: m }))}
                disabled={!brand}
              />
              <SelectField
                value={fuel}
                onChange={(v) => setFuel(v as FuelType | '')}
                placeholder="Combustible"
                options={(Object.keys(FUEL_LABELS) as FuelType[]).map((f) => ({ val: f, label: FUEL_LABELS[f] }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <SelectField
                value={province}
                onChange={setProvince}
                placeholder="Provincia"
                options={PROVINCES.map((p) => ({ val: p, label: p }))}
              />
              <div className="lg:col-span-2">
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 text-white font-bold rounded-xl transition-all text-sm disabled:opacity-80"
                  style={{ backgroundColor: '#1E2A38' }}
                  onMouseEnter={(e) => { if (!isSearching) (e.currentTarget as HTMLElement).style.backgroundColor = '#2F4A63'; }}
                  onMouseLeave={(e) => { if (!isSearching) (e.currentTarget as HTMLElement).style.backgroundColor = '#1E2A38'; }}
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Buscando coches...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Buscar coches
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-medium" style={{ color: '#9CA3AF' }}>Populares:</span>
              {QUICK_SEARCHES.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleQuickSearch(item.query as Record<string, string>)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-all font-medium"
                  style={{ backgroundColor: '#F5F7FA', borderColor: '#E5E7EB', color: '#6B7A8D' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#1E2A38';
                    (e.currentTarget as HTMLElement).style.color = '#fff';
                    (e.currentTarget as HTMLElement).style.borderColor = '#1E2A38';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#F5F7FA';
                    (e.currentTarget as HTMLElement).style.color = '#6B7A8D';
                    (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black" style={{ color: '#1E2A38' }}>{stat.value}</div>
                <div className="text-xs sm:text-sm mt-1" style={{ color: '#9CA3AF' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-2.5 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#CBD5E0' }}>Anuncios de</span>
            {['Wallapop', 'Milanuncios', 'Coches.net', 'AutoScout24', 'Facebook'].map((p) => (
              <span key={p} className="text-sm font-bold transition-colors cursor-default" style={{ color: '#B0BBC8' }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Chollos destacados</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black" style={{ color: '#1E2A38' }}>Los mejores precios ahora mismo</h2>
            </div>
            <button
              onClick={() => onNavigate('/coches')}
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold transition-colors"
              style={{ color: '#6B7A8D' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#1E2A38'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#6B7A8D'; }}
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredChollos.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                valuation={calculateAIValuation(car)}
                isFavorite={false}
                onToggleFavorite={() => {}}
                isLoggedIn={isLoggedIn}
                onAuthRequired={onOpenAuth}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('/coches')}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-bold rounded-xl transition-colors text-sm"
              style={{ backgroundColor: '#1E2A38' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#2F4A63'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#1E2A38'; }}
            >
              Ver todos los coches
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: '#1E2A38' }}>¿Cómo funciona?</h2>
            <p className="max-w-xl mx-auto text-sm" style={{ color: '#6B7A8D' }}>
              Tecnología de inteligencia artificial para que nunca pagues de más
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#EEF2F7' }}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: '#1E2A38' }}>{feature.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#6B7A8D' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black mb-2" style={{ color: '#1E2A38' }}>Valoración IA de precios</h2>
            <p className="max-w-xl mx-auto text-sm" style={{ color: '#6B7A8D' }}>
              Comparamos cada anuncio con el mercado y te decimos en segundos si es un buen trato
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '🔥', label: 'Chollo excelente', desc: '+20% por debajo del precio de mercado', bg: '#E8F5E9', border: '#C8E6C9', text: '#2E7D32' },
              { icon: '✓', label: 'Buen precio', desc: 'Entre 5% y 20% por debajo del mercado', bg: '#F1F8E9', border: '#DCEDC8', text: '#558B2F' },
              { icon: '≈', label: 'Precio justo', desc: 'En línea con el precio de mercado', bg: '#F5F7FA', border: '#E0E7EF', text: '#6B7A8D' },
              { icon: '↑', label: 'Precio alto', desc: 'Más del 5% sobre el precio de mercado', bg: '#FFF5F5', border: '#FFCDD2', text: '#C62828' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl p-5 border" style={{ backgroundColor: item.bg, borderColor: item.border }}>
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="font-bold mb-1 text-sm" style={{ color: item.text }}>{item.label}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#6B7A8D' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!isLoggedIn && (
        <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#1E2A38' }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(76,175,80,0.4), transparent)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(76,175,80,0.15), transparent)' }} />
          </div>
          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5 border"
              style={{ backgroundColor: 'rgba(76,175,80,0.12)', borderColor: 'rgba(76,175,80,0.25)' }}
            >
              <Bell className="w-6 h-6" style={{ color: '#4CAF50' }} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Regístrate gratis y recibe alertas de chollos
            </h2>
            <p className="mb-8 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Guarda búsquedas, marca favoritos y recibe notificaciones cuando aparezca el coche que buscas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onOpenAuth}
                className="px-8 py-3.5 text-white font-bold rounded-xl transition-colors text-sm"
                style={{ backgroundColor: '#4CAF50' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#3d9140'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#4CAF50'; }}
              >
                Crear cuenta gratis
              </button>
              <button
                onClick={() => onNavigate('/coches')}
                className="px-8 py-3.5 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.13)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
              >
                Ver coches sin registrarse
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 mt-6 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {['Sin tarjeta de crédito', 'Alertas por email', 'Cancela cuando quieras'].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" style={{ color: '#4CAF50' }} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

interface SelectFieldProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  options: { val: string; label: string }[];
  disabled?: boolean;
}

function SelectField({ value, onChange, placeholder, options, disabled = false }: SelectFieldProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-3 border rounded-xl text-sm bg-white appearance-none pr-9 focus:outline-none transition-all"
        style={{
          borderColor: '#E5E7EB',
          color: value ? '#1E2A38' : '#9CA3AF',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.55 : 1,
        }}
        onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#1E2A38'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 3px rgba(30,42,56,0.08)'; }}
        onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.val} value={opt.val}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#9CA3AF' }} />
    </div>
  );
}
