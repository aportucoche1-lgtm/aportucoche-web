import { getCarImage } from "../utils/getCarImage"
import { ExternalLink, Fuel, Gauge, Heart, MapPin } from 'lucide-react';
import { Car, AIValuation } from '../../types';
import { AIBadge } from './AIBadge';
import { BODY_TYPE_LABELS, FUEL_LABELS, PLATFORM_COLORS, PLATFORM_LABELS } from '../../lib/constants';
import { useCarImage } from '../../hooks/useCarImage';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-fiEhVRWA5d0?auto=format&fit=crop&w=800&q=80';

interface CarCardProps {
  car: Car;
  valuation: AIValuation;
  isFavorite: boolean;
  onToggleFavorite: (car: Car) => void;
  isLoggedIn: boolean;
  onAuthRequired: () => void;
}

export function CarCard({ car, valuation, isFavorite, onToggleFavorite, isLoggedIn, onAuthRequired }: CarCardProps) {
  const imageUrl = useCarImage(car.brand, car.model, car.bodyType);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) { onAuthRequired(); return; }
    onToggleFavorite(car);
  };

  const isChollo = valuation.rating === 'chollo_excelente';
  const isBuen = valuation.rating === 'buen_precio';
  const showSavings = isChollo || isBuen;

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 group"
      style={{
        boxShadow: isChollo
          ? '0 0 0 2px #4CAF50, 0 4px 20px rgba(76,175,80,0.12)'
          : '0 1px 4px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)',
      }}
    >
      <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '16/10' }}>
    <img
  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200"
  alt="car"
  className="w-full h-full object-cover"
/>
/>
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {isChollo && (
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #4CAF50, #66BB6A)' }} />
        )}

        <button
          onClick={handleFavorite}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
            isFavorite
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white/95 text-gray-400 hover:text-red-500 hover:scale-110'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${PLATFORM_COLORS[car.platform]}`}>
            {PLATFORM_LABELS[car.platform]}
          </span>
          {car.seller === 'particular' && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-white/95 text-gray-700">
              Particular
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3">
          <AIBadge valuation={valuation} />
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
            {car.brand} · {car.year}
          </p>
          <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-1">
            {car.model} <span className="font-normal text-gray-500 text-sm">{car.title.replace(car.brand, '').replace(car.model, '').trim()}</span>
          </h3>
        </div>

        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black tracking-tight" style={{ color: '#1E2A38' }}>
                {car.price.toLocaleString('es-ES')} €
              </span>
              {showSavings && (
                <span className="text-xs text-gray-400 line-through">
                  {valuation.averagePrice.toLocaleString('es-ES')} €
                </span>
              )}
            </div>
            {showSavings && (
              <span className="text-xs font-semibold" style={{ color: '#4CAF50' }}>
                Ahorras {Math.abs(valuation.priceDiff).toLocaleString('es-ES')} € ({Math.abs(valuation.priceDiffPercent)}% menos)
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Gauge className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
            <span className="font-medium text-gray-700">{car.km.toLocaleString('es-ES')} km</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Fuel className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
            <span className="font-medium text-gray-700">{FUEL_LABELS[car.fuel]}</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500 truncate">
            <MapPin className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
            <span className="font-medium text-gray-700 truncate">{car.province}</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current text-gray-300"><path d="M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z"/></svg>
            </span>
            <span className="font-medium text-gray-700">{BODY_TYPE_LABELS[car.bodyType]}</span>
          </span>
        </div>

        <a
          href={car.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-xl transition-all text-white"
          style={{ backgroundColor: isChollo ? '#4CAF50' : '#1E2A38' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = isChollo ? '#3d9140' : '#2F4A63';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = isChollo ? '#4CAF50' : '#1E2A38';
          }}
        >
          Ver anuncio original
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
