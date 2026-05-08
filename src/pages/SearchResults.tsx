import { useState } from 'react';

interface SearchResultsProps {
  onOpenAuth: () => void;
  userId?: string | null;
  isLoggedIn: boolean;
  initialSearchParams?: URLSearchParams;
}

function buildInitialFilters(params?: URLSearchParams) {
  return {
    brand: params?.get('brand') || '',
    model: params?.get('model') || '',
  };
}

export function SearchResults({ initialSearchParams }: SearchResultsProps) {
  const [filters] = useState(() =>
    buildInitialFilters(initialSearchParams)
  );

  const query = `${filters.brand} ${filters.model}`.trim();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 py-10">

        <h1 className="text-3xl font-bold mb-6">
          {query || 'Búsqueda de coches'}
        </h1>

        <p className="mb-6 text-gray-600">
          Selecciona una plataforma para ver anuncios reales:
        </p>

        <div className="space-y-4">

          <a
            href={`https://es.wallapop.com/app/search?keywords=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
          >
            🔎 Buscar en Wallapop →
          </a>

          <a
            href={`https://www.coches.net/segunda-mano/?Key=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
          >
            🔎 Buscar en Coches.net →
          </a>

          <a
            href={`https://www.autoscout24.es/lst?search=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
          >
            🔎 Buscar en AutoScout24 →
          </a>

          <a
            href={`https://www.milanuncios.com/coches-de-segunda-mano/?q=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
          >
            🔎 Buscar en Milanuncios →
          </a>

          <a
            href={`https://www.facebook.com/marketplace/search/?query=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
          >
            🔎 Buscar en Facebook Marketplace →
          </a>

        </div>

      </div>
    </div>
  );
}
