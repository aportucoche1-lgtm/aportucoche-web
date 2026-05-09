import { ExternalLink } from 'lucide-react';

interface SearchResultsProps {
  onOpenAuth: () => void;
  userId?: string | null;
  isLoggedIn: boolean;
  initialSearchParams?: URLSearchParams;
}

const platforms = [
  {
    name: 'Wallapop',
    color: 'bg-green-500',
    description: 'Particulares y posibles chollos',
    getUrl: (query: string) =>
      `https://es.wallapop.com/app/search?keywords=${encodeURIComponent(query)}`,
  },

  {
    name: 'Milanuncios',
    color: 'bg-blue-500',
    description: 'Gran volumen de anuncios',
    getUrl: (query: string) =>
      `https://www.milanuncios.com/coches-de-segunda-mano/?q=${encodeURIComponent(query)}`,
  },

  {
    name: 'Coches.net',
    color: 'bg-red-500',
    description: 'Concesionarios y profesionales',
    getUrl: (query: string) =>
      `https://www.coches.net/segunda-mano/?Key=${encodeURIComponent(query)}`,
  },

  {
    name: 'AutoScout24',
    color: 'bg-yellow-500',
    description: 'Vehículos premium y europeos',
    getUrl: (query: string) =>
      `https://www.autoscout24.es/lst?search=${encodeURIComponent(query)}`,
  },

  {
    name: 'Facebook Marketplace',
    color: 'bg-indigo-500',
    description: 'Ofertas locales cercanas',
    getUrl: (query: string) =>
      `https://www.facebook.com/marketplace/search/?query=${encodeURIComponent(query)}`,
  },
];

export function SearchResults({
  initialSearchParams,
}: SearchResultsProps) {
  const brand = initialSearchParams?.get('brand') || '';
  const model = initialSearchParams?.get('model') || '';

  const query = `${brand} ${model}`.trim();

  return (
    <div className="min-h-screen bg-[#F7F8FA] pt-16">

      {/* HERO */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🔥 Comparador inteligente
          </div>

          <h1 className="text-5xl font-black text-[#13233A] mb-4">
            {query || 'Resultados'}
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl">
            Busca este coche en múltiples plataformas desde un único lugar.
          </p>

        </div>
      </section>

      {/* IA BOX */}
      <section className="px-6 mb-10">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border p-8">

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>
              <p className="text-sm text-gray-500 mb-2">
                ESTIMACIÓN IA
              </p>

              <h2 className="text-3xl font-black text-[#13233A]">
                Precio medio estimado:
              </h2>

              <div className="text-5xl font-black text-green-600 mt-3">
                42.000€
              </div>
            </div>

            <div className="bg-green-50 text-green-700 px-5 py-3 rounded-2xl font-bold">
              🔥 Buen momento para comprar
            </div>

          </div>

        </div>
      </section>

      {/* PLATFORMS */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-2xl font-black text-[#13233A] mb-6">
            Comparar plataformas
          </h2>

          <div className="space-y-5">

            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.getUrl(query)}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-3xl border shadow-sm hover:shadow-xl transition-all p-7"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">

                  <div className="flex items-center gap-5">

                    <div className={`w-5 h-20 rounded-full ${platform.color}`} />

                    <div>
                      <h3 className="text-2xl font-black text-[#13233A]">
                        {platform.name}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        {platform.description}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-2 text-lg font-bold text-black">
                    Ver anuncios
                    <ExternalLink size={20} />
                  </div>

                </div>
              </a>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
}
