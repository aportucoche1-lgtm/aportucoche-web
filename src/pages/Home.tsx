import { useState } from 'react';
import { CarCard } from '../components/cars/CarCard';
import { MOCK_CARS } from '../lib/mockData';

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

const BRANDS = [
  'Audi','BMW','Mercedes-Benz','Volkswagen','SEAT','Cupra',
  'Toyota','Peugeot','Renault','Ford','Hyundai','Kia','Tesla',
  'Nissan','Honda','Mazda','Volvo','Skoda','Fiat','Jeep',
  'Land Rover','Jaguar','Mini','Alfa Romeo','Dacia','Suzuki',
  'Mitsubishi','Lexus','Porsche','Subaru','Smart','DS','MG'
];

const MODELS_BY_BRAND: Record<string, string[]> = {
  BMW: ['Serie 1','Serie 2','Serie 3','Serie 4','Serie 5','X1','X3','X5'],
  Audi: ['A1','A3','A4','A5','A6','Q2','Q3','Q5','Q7'],
  'Mercedes-Benz': ['Clase A','Clase C','Clase E','GLA','GLC','GLE'],
  Volkswagen: ['Golf','Polo','Passat','Tiguan','T-Roc'],
  SEAT: ['Ibiza','León','Arona','Ateca'],
  Toyota: ['Yaris','Corolla','RAV4','C-HR'],
  Ford: ['Fiesta','Focus','Kuga','Puma'],
  Peugeot: ['208','308','2008','3008'],
  Renault: ['Clio','Megane','Captur'],
  Tesla: ['Model 3','Model S','Model X','Model Y'],
};

export function Home({ onNavigate, onOpenAuth }: HomeProps) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [fuel, setFuel] = useState('');
  const [province, setProvince] = useState('');

  const featuredCars = MOCK_CARS.slice(0, 3);

  const handleSearch = () => {
    onNavigate('/coches', {
      brand,
      model,
      fuel,
      province,
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] overflow-hidden">

      {/* HERO */}
      <section className="relative pt-16 pb-14 px-6 overflow-hidden">

        {/* WATERMARK LOGO */}
     <img
  src="/logo.png"
  alt="watermark"
  className="
    absolute
    left-1/2
    top-[52%]
    -translate-x-1/2
    -translate-y-1/2
    w-[1400px]
    md:w-[1800px]
    opacity-[0.09]
    blur-[5px]
    pointer-events-none
    select-none
  "
/>

        <div className="relative z-10 max-w-6xl mx-auto text-center">

          {/* TITULO */}
          <h1 className="text-3xl md:text-5xl font-black text-[#13233A] leading-tight">
            Encuentra tu coche ideal
          </h1>

          {/* SUBTITULO */}
         <p className="text-gray-600 max-w-3xl mx-auto mt-4 mb-10 text-base md:text-lg">
            Busca en todas las plataformas desde un solo sitio.
          </p>

          {/* BUSCADOR */}
          <div className="max-w-5xl mx-auto bg-white rounded-[32px] shadow-xl border border-gray-100 p-6 md:p-8">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setModel('');
                }}
                className="border border-gray-200 rounded-2xl px-5 py-4 text-lg bg-white"
              >
                <option value="">Seleccionar marca</option>

                {BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="border border-gray-200 rounded-2xl px-5 py-4 text-lg bg-white"
                disabled={!brand}
              >
                <option value="">
                  {brand ? 'Seleccionar modelo' : 'Primero marca'}
                </option>

                {(MODELS_BY_BRAND[brand] || ['General']).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                className="border border-gray-200 rounded-2xl px-5 py-4 text-lg bg-white"
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
                className="border border-gray-200 rounded-2xl px-5 py-4 text-lg md:col-span-2"
              />

              <button
                onClick={handleSearch}
                className="
                  bg-black
                  hover:bg-[#111]
                  transition
                  text-white
                  rounded-2xl
                  font-bold
                  text-lg
                  px-6
                  py-4
                  shadow-lg
                "
              >
                Buscar coches
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* PLATAFORMAS */}
      <section className="border-y bg-white py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 text-sm text-gray-500">
          <span>ANUNCIOS DE:</span>

          {platforms.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
      </section>

      {/* COCHES */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-black mb-8 text-[#13233A]">
            Ejemplos de coches
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {featuredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                valuation={{
                  rating: 'precio_normal',
                  averagePrice: 0,
                  priceDiff: 0,
                  priceDiffPercent: 0,
                }}
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
      <section className="bg-black text-white py-20 text-center">

        <h2 className="text-4xl font-black mb-4">
          Empieza a buscar coches ahora
        </h2>

        <button
          onClick={onOpenAuth}
          className="bg-white text-black px-8 py-3 rounded-xl font-bold"
        >
          Crear cuenta gratis
        </button>

      </section>

    </div>
  );
}
