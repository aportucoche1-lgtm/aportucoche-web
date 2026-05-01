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
                onChange={(e) => setBrand(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3"
              >
                <option value="">Marca</option>
                <option>BMW</option>
                <option>Audi</option>
                <option>Mercedes</option>
                <option>Volkswagen</option>
                <option>Toyota</option>
                <option>Seat</option>
              </select>

              <input
                placeholder="Modelo (elige marca)"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3"
              />

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

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-12">
            <div>
              <div className="text-3xl font-black text-[#13233A]">50.000+</div>
              <div className="text-sm text-gray-500">Anuncios activos</div>
            </div>

            <div>
              <div className="text-3xl font-black text-[#13233A]">5</div>
              <div className="text-sm text-gray-500">Plataformas</div>
            </div>

            <div>
              <div className="text-3xl font-black text-[#13233A]">2.400+</div>
              <div className="text-sm text-gray-500">Chollos hoy</div>
            </div>

            <div>
              <div className="text-3xl font-black text-[#13233A]">100%</div>
              <div className="text-sm text-gray-500">Gratis</div>
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

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('/coches')}
              className="bg-[#13233A] text-white px-8 py-3 rounded-xl font-bold"
            >
              Ver todos los coches
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl font-black text-[#13233A] mb-3">
            ¿Cómo funciona?
          </h2>

          <p className="text-gray-500 mb-10">
            Tecnología de inteligencia artificial para que nunca pagues de más
          </p>

          <div className="grid md:grid-cols-4 gap-6 text-left">

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold mb-2">Valoración IA</h3>
              <p className="text-sm text-gray-600">
                Analizamos miles de precios para detectar si un coche es un chollo.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold mb-2">5 plataformas</h3>
              <p className="text-sm text-gray-600">
                Wallapop, Milanuncios, Coches.net y más.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold mb-2">Alertas</h3>
              <p className="text-sm text-gray-600">
                Recibe avisos cuando aparezca el coche ideal.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold mb-2">Acceso directo</h3>
              <p className="text-sm text-gray-600">
                Siempre te llevamos al anuncio original.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* LEGAL + CTA */}
      <section className="bg-[#13233A] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-black mb-4">
            Regístrate gratis y recibe alertas de chollos
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Guarda búsquedas, marca favoritos y recibe notificaciones
            cuando aparezca el coche que buscas.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <button
              onClick={onOpenAuth}
              className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold"
            >
              Crear cuenta gratis
            </button>

            <button
              onClick={() => onNavigate('/coches')}
              className="border border-white/30 px-8 py-3 rounded-xl font-semibold"
            >
              Ver coches sin registrarme
            </button>
          </div>

          <p className="text-sm text-gray-400 max-w-3xl mx-auto">
            AportuCoche no vende vehículos directamente.
            Actuamos como comparador de anuncios de terceros.
            La compra se realiza siempre en la plataforma original del anuncio.
            Los precios, disponibilidad e imágenes pueden variar según la plataforma de origen.
          </p>
        </div>
      </section>

    </div>
  );
}
