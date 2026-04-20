import { BodyType } from '../types';
import { getCarImage } from '../lib/constants';

export function getCarImageUrl(brand: string, model: string, bodyType: BodyType): string {
  return getCarImage(brand, model, bodyType);
}

export function useCarImage(brand: string, model: string, bodyType: BodyType): string {
  return getCarImage(brand, model, bodyType);
}
