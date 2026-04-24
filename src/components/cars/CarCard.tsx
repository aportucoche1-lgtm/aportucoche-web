import { Car, AIValuation } from '../../types';

interface CarCardProps {
  car: Car;
  valuation: AIValuation;
  isFavorite: boolean;
  onToggleFavorite: (car: Car) => void;
  isLoggedIn: boolean;
  onAuthRequired: () => void;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <div style={{ background: "blue", height: "300px", marginBottom: "20px", color: "white", padding: "20px" }}>
      TARJETA VISIBLE<br />
      {car.brand} {car.model}
    </div>
  );
}
