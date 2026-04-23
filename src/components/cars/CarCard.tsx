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
  <div style={{ background: "blue", height: "300px", marginBottom: "20px" }}>
    TARJETA VISIBLE
  </div>
);
