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

  const featuredCars = MOCK_CARS.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO / BUSCADOR */}
      <div className="bg-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Encuentra tu coche ideal
        </h1>

        <p className="text-gray-600 mb-6">
          Busca entre miles de coches y encuentra los mejores precios
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Marca (ej: BMW)"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />

          <input
            type="text"
            placeholder="Modelo (ej: X5)"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />

          <button
            onClick={handleSearch}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* COCHES DESTACADOS */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">
          Coches destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              valuation={calculateAIValuation(car)}
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
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Ver todos los coches
          </button>
        </div>
      </div>
    </div>
  );
}
