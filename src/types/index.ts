export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  km: number;
  fuel: FuelType;
  bodyType: BodyType;
  province: string;
  seller: SellerType;
  platform: Platform;
  url: string;
  image: string;
  description?: string;
  color?: string;
  transmission?: string;
  power?: number;
  doors?: number;
  createdAt: string;
}

export type FuelType =
  | 'gasolina'
  | 'diesel'
  | 'hibrido'
  | 'hibrido_enchufable'
  | 'electrico'
  | 'glp'
  | 'gnc';

export type BodyType =
  | 'suv'
  | 'berlina'
  | 'familiar'
  | 'compacto'
  | 'utilitario'
  | 'monovolumen'
  | 'coupe'
  | 'cabrio'
  | 'todoterreno'
  | 'pickup'
  | 'deportivo'
  | 'furgoneta'
  | 'microcoche';

export type SellerType = 'particular' | 'profesional';

export type Platform = 'wallapop' | 'milanuncios' | 'coches.net' | 'autoscout24' | 'facebook';

export type AIRating = 'chollo_excelente' | 'buen_precio' | 'precio_normal' | 'precio_alto';

export interface AIValuation {
  rating: AIRating;
  averagePrice: number;
  priceDiff: number;
  priceDiffPercent: number;
}

export interface SearchFilters {
  query?: string;
  brand?: string;
  model?: string;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  kmMax?: number;
  province?: string;
  fuel?: FuelType[];
  bodyType?: BodyType[];
  seller?: SellerType | 'ambos';
  platforms?: Platform[];
  onlyChollos?: boolean;
  sortBy?: SortOption;
}

export type SortOption =
  | 'precio_asc'
  | 'precio_desc'
  | 'year_desc'
  | 'km_asc'
  | 'chollos'
  | 'reciente';

export interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  filters: SearchFilters;
  alert_enabled: boolean;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  car_id: string;
  car_data: Car;
  created_at: string;
}

export interface Alert {
  id: string;
  user_id: string;
  search_id?: string;
  title: string;
  message: string;
  car_data?: Car;
  is_read: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  created_at: string;
  phone?: string;
  notifications_email?: boolean;
  notifications_alerts?: boolean;
}

export interface CarListing {
  id: string;
  title: string;
  price: number;
  brand: string;
  model: string;
  year: number;
  location: string;
  source: string;
  link: string;
  image: string;
}
