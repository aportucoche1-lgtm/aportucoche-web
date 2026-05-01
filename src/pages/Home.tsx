import { useState } from 'react';
import { CarCard } from '../components/cars/CarCard';
import { MOCK_CARS } from '../lib/mockData';
import { calculateAIValuation } from '../lib/aiValuation';

interface HomeProps {
  onNavigate: (path: string, query?: Record<string, string>) => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
}

const PLATFORMS = [
  'Wallapop',
  'Milanuncios',
  'Coches.net',
  'AutoScout24',
  'Facebook Marketplace',
];

export function Home({ onNavigate }: HomeProps) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [fuel, setFuel] = useState('');
  const [province, setProvince] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    onNavigate('/coches', {
      brand,
      model,
      fuel,
      province,
      maxPrice,
    });
  };

  const featured = MOCK_CARS
    .map((car) => ({
      ...car,
      valuation: calculateAIValuation(car),
    }))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="bg-white pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-5xl font-black text-gray-900 mb-4">
            El Skyscanner de los coches de segunda mano
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            Buscamos entre miles de anuncios reales de múltiples plataformas,
            detectamos chollos con inteligencia artificial y te llevamos
            directamente al anuncio original.
          </p>

          {/* Plataformas */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {PLATFORMS.map((platform) => (
              <div
                key={platform}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
              >
                {platform}
              </div>
            ))}
          </div>

          {/* Buscador PRO */}
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-5xl mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              <input
                placeholder="Marca"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="border rounded-xl px-4 py-3 w-full"
              />

              <input
                placeholder="Modelo"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="border rounded-xl px-4 py-3 w-full"
              />

              <input
                placeholder="Versión / Variante"
                className="border rounded-xl px-4 py-3 w-full"
              />

              <select
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                className="border rounded-xl px-4 py-3 w-full"
              >
                <option value="">Combustible</option>
                <option value="gasolina">Gasolina</option>
                <option value="diesel">Diésel</option>
                <option value="hibrido">Híbrido</option>
                <option value="electrico">Eléctrico</option>
              </select>

              <input
                placeholder="Provincia / Ubicación"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="border rounded-xl px-4 py-3 w-full"
              />

              <input
                placeholder="Precio máximo"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border rounded-xl px-4 py-3 w-full"
              />
            </div>

            <button
              onClick={handleSearch}
              className="w-full mt-6 bg-black text-white py-4 rounded-xl font-bold text-lg"
            >
              BUSCAR CHOLLOS
            </button>

          </div>
        </div>
      </section>

      {/* CHOLLOS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-black mb-2">
            🔥 Chollos destacados
          </h2>

          <p className="text-gray-600 mb-8">
            Vehículos detectados con mejor relación calidad-precio
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-3xl font-black text-center mb-12">
            ¿Cómo funciona?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div>
              <h3 className="font-bold text-lg mb-2">
                1. Buscamos por ti
              </h3>
              <p className="text-gray-600 text-sm">
                Analizamos anuncios reales en Wallapop, Coches.net,
                Milanuncios, AutoScout24 y más.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">
                2. Detectamos chollos
              </h3>
              <p className="text-gray-600 text-sm">
                Nuestra IA compara precios de mercado y detecta
                automáticamente oportunidades reales.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">
                3. Vas al anuncio original
              </h3>
              <p className="text-gray-600 text-sm">
                Siempre compras directamente en la plataforma original,
                con total transparencia.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* LEGAL */}
      <section className="bg-black text-white py-14 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-2xl font-bold mb-4">
            Transparencia total
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto text-sm leading-relaxed">
            AportuCoche no vende vehículos directamente. Actuamos como
            comparador de anuncios de terceros. La compra se realiza siempre
            en la plataforma original del anuncio. Los precios, disponibilidad
            e imágenes pueden variar según la plataforma de origen.
          </p>

        </div>
      </section>

    </div>
  );
}
