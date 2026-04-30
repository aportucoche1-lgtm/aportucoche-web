import { useState } from 'react';
import { CarCard } from '../components/cars/CarCard';
import { MOCK_CARS } from '../lib/mockData';
import { calculateAIValuation } from '../lib/aiValuation';

interface HomeProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
}

export function Home({ onNavigate }: HomeProps) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');

  const handleSearch = () => {
    onNavigate('/coches', { brand, model });
  };

  const featured = MOCK_CARS
    .map(car => ({
      ...car,
      valuation: calculateAIValuation(car)
    }))
    .filter(c => c.valuation.rating === 'chollo_excelente' || c.valuation.rating === 'buen_precio')
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="bg-white py-20 px-6 text-center">
        <h1 className="text-5xl font-black mb-4 text-gray-900">
          Encuentra tu coche ideal
        </h1>

        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Buscamos entre miles de anuncios y detectamos automáticamente los mejores precios con inteligencia artificial.
        </p>

        {/* BUSCADOR */}
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              placeholder="Marca (BMW, Audi...)"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border px-4 py-3 rounded-xl w-full"
            />

            <input
              placeholder="Modelo (X5, A4...)"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="border px-4 py-3 rounded-xl w-full"
            />

            <button
              onClick={handleSearch}
              className="bg-black text-white px-6 py-3 rounded-xl font-semibold"
            >
              Buscar
            </button>
          </div>

          {/* QUICK SEARCH */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {[
              { label: 'SUV', query: { bodyType: 'suv' } },
              { label: 'Diésel', query: { fuel: 'diesel' } },
              { label: 'Madrid', query: { province: 'Madrid' } },
              { label: 'Baratos', query: { maxPrice: '10000' } },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate('/coches', item.query)}
                className="text-sm px-3 py-1.5 bg-gray-100 rounded-full hover:bg-black hover:text-white transition"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CHOLLOS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-6 text-gray-900">
          🔥 Mejores chollos ahora
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((car) => (
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
            className="bg-black text-white px-8 py-3 rounded-xl font-semibold"
          >
            Ver todos los coches
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-10">
            ¿Por qué usar AportuCoche?
          </h2>

          <div className="grid sm:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="font-bold text-lg mb-2">⚡ Valoración IA</h3>
              <p className="text-gray-600 text-sm">
                Analizamos miles de precios para saber si es un chollo o no.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">🔎 Multi-plataforma</h3>
              <p className="text-gray-600 text-sm">
                Buscamos en Wallapop, Milanuncios, Coches.net y más.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">🔔 Alertas</h3>
              <p className="text-gray-600 text-sm">
                Recibe avisos cuando aparezca el coche perfecto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-black mb-4">
          No vuelvas a pagar de más por un coche
        </h2>

        <p className="mb-6 text-gray-300">
          Empieza a encontrar chollos ahora mismo.
        </p>

        <button
          onClick={() => onNavigate('/coches')}
          className="bg-white text-black px-8 py-3 rounded-xl font-bold"
        >
          Buscar coches
        </button>
      </section>

    </div>
  );
}
