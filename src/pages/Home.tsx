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
  <div style={{ background: "white", minHeight: "100vh", padding: "40px" }}>
    <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
      HOME FUNCIONA
    </h1>

    <button
      onClick={() => onNavigate('/coches')}
      style={{
        marginTop: "20px",
        padding: "12px 24px",
        background: "green",
        color: "white",
        borderRadius: "8px"
      }}
    >
      Ir a coches
    </button>
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
