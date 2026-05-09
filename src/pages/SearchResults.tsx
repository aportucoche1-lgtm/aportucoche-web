import {
  ExternalLink,
  TrendingUp,
  ShieldCheck,
  BadgeEuro,
} from 'lucide-react';

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
    badge: '🔥 Mejor para chollos',
    estimated: '~120 anuncios',
    getUrl: (query: string) =>
      `https://es.wallapop.com/app/search?keywords=${encodeURIComponent(query)}`,
  },

  {
    name: 'Milanuncios',
    color: 'bg-blue-500',
    description: 'Gran volumen de anuncios',
    badge: '📈 Mucha oferta',
    estimated: '~95 anuncios',
    getUrl: (query: string) =>
      `https://www.milanuncios.com/coches-de-segunda-mano/?q=${encodeURIComponent(query)}`,
  },

  {
    name: 'Coches.net',
    color: 'bg-red-500',
    description: 'Concesionarios y profesionales',
    badge: '🛡 Más confianza',
    estimated: '~80 anuncios',
    getUrl: (query: string) =>
      `https://www.coches.net/segunda-mano/?Key=${encodeURIComponent(query)}`,
  },

  {
    name: 'AutoScout24',
    color: 'bg-yellow-500',
    description: 'Vehículos premium y europeos',
    badge: '💎 Más premium',
    estimated: '~60 anuncios',
    getUrl: (query: string) =>
      `https://www.autoscout24.es/lst?search=${encodeURIComponent(query)}`,
  },

  {
    name: 'Facebook Marketplace',
    color: 'bg-indigo-500',
    description: 'Ofertas locales cercanas',
    badge: '⚡ Oportunidades rápidas',
    estimated: '~45 anuncios',
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
        <div className="max-w-6xl mx-auto">

          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🔥 Comparador inteligente de coches
          </div>

          <h1 className="text-5xl font-black text-[#13233A] mb-5">
            {query || 'Resultados'}
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Compara múltiples plataformas desde un único lugar y encuentra
            oportunidades más rápido.
          </p>

        </div>
      </section>

      {/* IA ESTIMATION */}
      <section className="px-6 mb-10">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl border shadow-sm p-8">

          <div className="grid md:grid-cols-3 gap-8">

            <div>
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <BadgeEuro size={18} />
                Precio medio IA
              </div>

              <div className="text-5xl font-black text-green-600">
                42.000€
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <TrendingUp size={18} />
                Tendencia
              </div>

              <div className="text-2xl font-black text-[#13233A]">
                Buen momento para comprar
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <ShieldCheck size={18} />
                Consejo IA
              </div>

              <div className="text-xl font-bold text-[#13233A]">
                Revisa primero Wallapop y Coches.net
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PLATFORMS */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">

            <h2 className="text-3xl font-black text-[#13233A]">
              Plataformas disponibles
            </h2>

            <div className="text-gray-500">
              5 plataformas analizadas
            </div>

          </div>

          <div className="space-y-5">

            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.getUrl(query)}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-3xl border shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-8"
              >
                <div className="flex items-center justify-between flex-wrap gap-6">

                  <div className="flex items-center gap-6">

                    <div
                      className={`w-5 h-24 rounded-full ${platform.color}`}
                    />

                    <div>

                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-3xl font-black text-[#13233A]">
                          {platform.name}
                        </h3>

                        <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {platform.badge}
                        </div>
                      </div>

                      <p className="text-gray-500 mt-2 text-lg">
                        {platform.description}
                      </p>

                      <div className="mt-4 text-sm font-bold text-[#13233A]">
                        {platform.estimated}
                      </div>

                    </div>

                  </div>

                  <div className="bg-black text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-3">
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
