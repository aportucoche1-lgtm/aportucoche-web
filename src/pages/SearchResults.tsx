import { useState } from 'react';
import { estimateCarPrice } from '../lib/aiValuation';

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

export function SearchResults({
  initialSearchParams,
}: SearchResultsProps) {
  const [filters] = useState(() =>
    buildInitialFilters(initialSearchParams)
  );

  const estimatedPrice = estimateCarPrice(
    filters.brand,
    filters.model
  );

  const query = `${filters.brand} ${filters.model}`.trim();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 py-10">

        <h1 className="text-3xl font-bold mb-4">
          {filters.brand} {filters.model}
        </h1>

        {estimatedPrice && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-lg font-semibold text-green-700">
              💰 Precio medio estimado:{' '}
              {estimatedPrice.toLocaleString('es-ES')} €
            </p>
          </div>
        )}

        <h2 className="text-lg font-semibold mb-3">
          Ver anuncios en plataformas:
        </h2>

        <div className="space-y-3">

          <a
            href={`https://es.wallapop.com/app/search?keywords=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
          >
            Wallapop →
          </a>

          <a
            href={`https://www.coches.net/segunda-mano/?Key=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
          >
            Coches.net →
          </a>

          <a
            href={`https://www.autoscout24.es/lst?search=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
          >
            AutoScout24 →
          </a>

          <a
            href={`https://www.milanuncios.com/coches-de-segunda-mano/?q=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
          >
            Milanuncios →
          </a>

          <a
            href={`https://www.facebook.com/marketplace/search/?query=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-xl shadow hover:shadow-md"
          >
            Facebook Marketplace →
          </a>

        </div>
      </div>
    </div>
  );
}
