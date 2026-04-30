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
    .map((car) => ({
      ...car,
      valuation: calculateAIValuation(car),
    }))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">

      <section className="bg-white py-20 px-6 text-center">
        <h1 className="text-5xl font-black mb-4 text-gray-900">
          Encuentra tu coche ideal
        </h1>

        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Buscamos entre miles de anuncios y detectamos los mejores precios.
        </p>

        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <input
              placeholder="Marca"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border px-4 py-3 rounded-xl w-full"
            />

            <input
              placeholder="Modelo"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="border px-4 py-3 rounded-xl w-full"
            />

            <input
              placeholder="Versión / Variante"
              className="border px-4 py-3 rounded-xl w-full"
            />

            <select className="border px-4 py-3 rounded-xl w-full">
              <option>Combustible</option>
              <option>Gasolina</option>
              <option>Diésel</option>
              <option>Híbrido</option>
              <option>Eléctrico</option>
            </select>

            <input
              placeholder="Ubicación"
              className="border px-4 py-3 rounded-xl w-full"
            />

            <input
              placeholder="Precio máximo"
              className="border px-4 py-3 rounded-xl w-full"
            />

          </div>

          <div className="mt-6">
            <button
              onClick={handleSearch}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg"
            >
              BUSCAR CHOLLOS
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-6">
          Mejores coches destacados
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
      </section>

    </div>
  );
}
