import { useState } from 'react';
import { CarCard } from '../components/cars/CarCard';
import { MOCK_CARS } from '../lib/mockData';
import { calculateAIValuation } from '../lib/aiValuation';

interface HomeProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
}

const platforms = [
  'Wallapop',
  'Milanuncios',
  'Coches.net',
  'AutoScout24',
  'Facebook Marketplace',
];

const quickFilters = [
  { label: 'SUV', query: { bodyType: 'suv' } },
  { label: 'SUV Diésel', query: { bodyType: 'suv', fuel: 'diesel' } },
  { label: 'Híbrido', query: { fuel: 'hybrid' } },
  { label: 'Chollo Madrid', query: { province: 'Madrid' } },
];

const BRANDS = [
  'Audi',
  'BMW',
  'Mercedes-Benz',
  'Volkswagen',
  'SEAT',
  'Cupra',
  'Toyota',
  'Peugeot',
  'Renault',
  'Ford',
  'Hyundai',
  'Kia',
  'Tesla',
];

const MODELS_BY_BRAND: Record<string, string[]> = {
  BMW: [
    'Serie 1',
    'Serie 2',
    'Serie 3',
    'Serie 4',
    'Serie 5',
    'X1',
    'X3',
    'X5',
    'X6',
  ],

  Audi: [
    'A1',
    'A3',
    'A4',
    'A5',
    'A6',
    'Q2',
    'Q3',
    'Q5',
    'Q7',
  ],

  'Mercedes-Benz': [
    'Clase A',
    'Clase B',
    'Clase C',
    'Clase E',
    'GLA',
    'GLC',
    'GLE',
  ],

  Volkswagen: [
    'Golf',
    'Polo',
    'Passat',
    'Tiguan',
    'T-Roc',
    'Touareg',
  ],

  SEAT: [
    'Ibiza',
    'León',
    'Arona',
    'Ateca',
    'Tarraco',
  ],

  Cupra: [
    'León',
    'Formentor',
    'Born',
    'Ateca',
  ],

  Toyota: [
    'Yaris',
    'Corolla',
    'C-HR',
    'RAV4',
    'Hilux',
  ],

  Peugeot: [
    '208',
    '308',
    '2008',
    '3008',
    '5008',
  ],

  Renault: [
    'Clio',
    'Megane',
    'Captur',
    'Austral',
    'Kadjar',
  ],

  Ford: [
    'Fiesta',
    'Focus',
    'Kuga',
    'Puma',
    'Mondeo',
  ],

  Hyundai: [
    'i20',
    'i30',
    'Tucson',
    'Kona',
    'Santa Fe',
  ],

  Kia: [
    'Rio',
    'Ceed',
    'Sportage',
    'Niro',
    'Sorento',
  ],

  Tesla: [
    'Model 3',
    'Model S',
    'Model X',
    'Model Y',
  ],
};

export function Home({ onNavigate, onOpenAuth }: HomeProps) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [fuel, setFuel] = useState('');
  const [province, setProvince] = useState('');

  const featuredCars = MOCK_CARS
    .map((car) => ({
      ...car,
      valuation: calculateAIValuation(car),
    }))
    .slice(0, 3);

  const handleSearch = () => {
    onNavigate('/coches', {
      brand,
      model,
      fuel,
      province,
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* HERO */}
      <section className="pt-20 pb-14 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <div className="inline-flex px-4 py-1 rounded-full bg-green-50 border border-green-200 text-sm font-medium text-green-700 mb-6">
            + 2.400 chollos detectados hoy
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-[#13233A] leading-tight">
            Encuentra tu coche ideal
            <br />
            <span className="text-green-500">
              al mejor precio
            </span>
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto mt-6 mb-10 text-lg">
            Comparamos coches de segunda mano de las principales plataformas
            de España y detectamos chollos con inteligencia artificial.
          </p>

          {/* SEARCH BOX */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setModel('');
                }}
                className="border border-gray-200 rounded-xl px-4 py-3"
              >
                <option value="">Seleccionar marca</option>

                {BRANDS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3"
                disabled={!brand}
              >
                <option value="">
                  {brand ? 'Seleccionar modelo' : 'Primero elige marca'}
                </option>

                {(MODELS_BY_BRAND[brand] || []).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3"
              >
                <option value="">Combustible</option>
                <option value="gasolina">Gasolina</option>
                <option value="diesel">Diésel</option>
                <option value="hybrid">Híbrido</option>
                <option value="electric">Eléctrico</option>
              </select>

              <input
                placeholder="Provincia"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3 md:col-span-2"
              />

              <button
                onClick={handleSearch}
                className="bg-[#13233A] text-white rounded-xl font-bold px-6 py-3 hover:opacity-95 transition"
              >
                Buscar coches
              </button>
            </div>

            {/* QUICK FILTERS */}
            <div className="flex flex-wrap gap-2 justify-center mt-5">
              {quickFilters.map((item) => (
                <button
                  key={item.label}
                  onClick={() => onNavigate('/coches', item.query)}
                  className="px-3 py-1.5 text-sm rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="border-y bg-white py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 text-sm text-gray-500 font-medium">
          <span>ANUNCIOS DE:</span>
          {platforms.map((platform) => (
            <span key={platform}>{platform}</span>
          ))}
        </div>
      </section>

      {/* CHOLLOS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-bold text-orange-500 uppercase">
                Chollos destacados
              </p>

              <h2 className="text-3xl font-black text-[#13233A]">
                Los mejores precios ahora mismo
              </h2>
            </div>

            <button
              onClick={() => onNavigate('/coches')}
              className="text-sm font-semibold"
            >
              Ver todos →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                valuation={car.valuation}
                isFavorite={false}
                onToggleFavorite={() => {}}
                isLoggedIn={false}
                onAuthRequired={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#13233A] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-black mb-4">
            Regístrate gratis y recibe alertas de chollos
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Guarda búsquedas, marca favoritos y recibe notificaciones
            cuando aparezca el coche que buscas.
          </p>

          <button
            onClick={onOpenAuth}
            className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold"
          >
            Crear cuenta gratis
          </button>
        </div>
      </section>
    </div>
  );
}
