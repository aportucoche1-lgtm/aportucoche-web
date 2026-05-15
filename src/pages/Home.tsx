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
    <div className="min-h-screen bg-[#F6F7FA] overflow-hidden">

      {/* HERO */}
      <section className="relative pt-16 pb-20 px-4 md:px-6 overflow-hidden">

        {/* WATERMARK */}
   <img
  src="/logo.png"
  alt="watermark"
  className="
    absolute
    left-1/2
    top-[-40px]

    -translate-x-1/2

    w-[1400px]
    md:w-[2600px]

    opacity-[0.17]

    blur-[4px]

    scale-[1.45]

    pointer-events-none
    select-none
  "
/>
        <div className="relative z-10 max-w-6xl mx-auto text-center">

          {/* TITULO */}
          <h1
            className="
            text-[42px]
md:text-[72px]
              font-black
              tracking-[-2px]
              leading-none
              text-[#13233A]
            "
          >
            Encuentra tu coche ideal
          </h1>

          {/* SUBTITULO */}
          <p
            className="
              text-gray-600
              max-w-3xl
              mx-auto
              mt-6
              mb-12
              text-lg
              md:text-[22px]
            "
          >
            Busca en todas las plataformas desde un solo sitio.
          </p>

          {/* BUSCADOR */}
          <div
            className="
              max-w-5xl
              mx-auto
              bg-white
              rounded-[34px]
              shadow-2xl
              border
              border-gray-100
              p-5
              md:p-8
            "
          >

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* MARCA */}
              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setModel('');
                }}
                className="
                  border
                  border-gray-200
                  rounded-2xl
                  px-5
                  py-4
                  text-lg
                  bg-white
                "
              >
                <option value="">Seleccionar marca</option>

                {BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              {/* MODELO */}
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!brand}
                className="
                  border
                  border-gray-200
                  rounded-2xl
                  px-5
                  py-4
                  text-lg
                  bg-white
                "
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

              {/* COMBUSTIBLE */}
              <select
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                className="
                  border
                  border-gray-200
                  rounded-2xl
                  px-5
                  py-4
                  text-lg
                  bg-white
                "
              >
                <option value="">Combustible</option>
                <option value="gasolina">Gasolina</option>
                <option value="diesel">Diésel</option>
                <option value="hybrid">Híbrido</option>
                <option value="electric">Eléctrico</option>
              </select>

              {/* PROVINCIA */}
              <input
                placeholder="Provincia"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="
                  border
                  border-gray-200
                  rounded-2xl
                  px-5
                  py-4
                  text-lg
                  md:col-span-2
                "
              />

              {/* BOTON */}
              <button
                onClick={handleSearch}
                className="
                  bg-black
                  text-white
                  rounded-2xl
                  font-bold
                  text-lg
                  px-6
                  py-4
                  hover:opacity-90
                  transition
                "
              >
                Buscar coches
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* PLATAFORMAS */}
      <section className="border-y bg-white py-6 px-4">

        <div
          className="
            max-w-6xl
            mx-auto
            flex
            flex-wrap
            justify-center
            gap-6
            md:gap-10
            text-sm
            md:text-base
            text-gray-500
          "
        >
          <span className="font-medium">
            ANUNCIOS DE:
          </span>

          {platforms.map((p) => (
            <span key={p}>
              {p}
            </span>
          ))}
        </div>

      </section>

      {/* COCHES */}
      <section className="py-20 px-4 md:px-6">

        <div className="max-w-6xl mx-auto">

          <h2
            className="
              text-4xl
              md:text-5xl
              font-black
              text-[#13233A]
              mb-10
            "
          >
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
      <section className="bg-black text-white py-24 text-center px-4">

        <h2
          className="
            text-4xl
            md:text-5xl
            font-black
            mb-6
          "
        >
          Empieza a buscar coches ahora
        </h2>

        <button
          onClick={onOpenAuth}
          className="
            bg-white
            text-black
            px-10
            py-4
            rounded-2xl
            font-bold
            text-lg
          "
        >
          Crear cuenta gratis
        </button>

      </section>

    </div>
  );
}
