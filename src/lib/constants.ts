import { BodyType, FuelType, Platform } from '../types';

export const BRANDS = [
  'Seat', 'Volkswagen', 'Ford', 'Renault', 'Opel', 'Toyota', 'Peugeot',
  'Citroën', 'BMW', 'Mercedes-Benz', 'Audi', 'Hyundai', 'Kia', 'Nissan',
  'Honda', 'Mazda', 'Skoda', 'Volvo', 'Fiat', 'Dacia', 'Jeep', 'Suzuki',
  'Mini', 'Porsche', 'Land Rover', 'Tesla', 'Cupra', 'Alfa Romeo', 'Subaru'
];

export const MODELS_BY_BRAND: Record<string, string[]> = {
  'Seat': ['Ibiza', 'León', 'Arona', 'Ateca', 'Tarraco', 'Alhambra', 'Mii'],
  'Volkswagen': ['Golf', 'Polo', 'Tiguan', 'Passat', 'T-Roc', 'T-Cross', 'Touareg', 'ID.4', 'ID.3'],
  'Ford': ['Fiesta', 'Focus', 'Kuga', 'Mondeo', 'Puma', 'EcoSport', 'Mustang Mach-E'],
  'Renault': ['Clio', 'Megane', 'Captur', 'Kadjar', 'Zoe', 'Twingo', 'Scenic'],
  'Opel': ['Corsa', 'Astra', 'Mokka', 'Insignia', 'Crossland', 'Grandland', 'Zafira'],
  'Toyota': ['Yaris', 'Corolla', 'RAV4', 'C-HR', 'Prius', 'Hilux', 'Land Cruiser'],
  'Peugeot': ['208', '308', '2008', '3008', '5008', '508', '108'],
  'Citroën': ['C3', 'C4', 'C5 Aircross', 'Berlingo', 'C3 Aircross', 'C1'],
  'BMW': ['Serie 1', 'Serie 2', 'Serie 3', 'Serie 5', 'X1', 'X3', 'X5', 'X6', 'i3', 'i4'],
  'Mercedes-Benz': ['Clase A', 'Clase C', 'Clase E', 'GLA', 'GLC', 'CLA', 'Vito', 'EQC'],
  'Audi': ['A1', 'A3', 'A4', 'A5', 'Q2', 'Q3', 'Q5', 'Q7', 'e-tron'],
  'Hyundai': ['i10', 'i20', 'i30', 'Tucson', 'Santa Fe', 'Ioniq', 'Ioniq 5', 'Kona'],
  'Kia': ['Picanto', 'Rio', 'Ceed', 'Sportage', 'Sorento', 'Niro', 'EV6'],
  'Nissan': ['Micra', 'Juke', 'Qashqai', 'X-Trail', 'Leaf', 'Navara'],
  'Dacia': ['Sandero', 'Duster', 'Logan', 'Spring'],
  'Tesla': ['Model 3', 'Model Y', 'Model S', 'Model X'],
  'Cupra': ['Formentor', 'Born', 'Ateca', 'Leon'],
  'Mini': ['Cooper', 'Countryman', 'Clubman'],
  'Porsche': ['Macan', 'Cayenne', 'Panamera', '911', 'Taycan'],
  'Volvo': ['XC40', 'XC60', 'XC90', 'V40', 'V60', 'S60'],
  'Skoda': ['Fabia', 'Octavia', 'Superb', 'Kodiaq', 'Karoq'],
  'Mazda': ['2', '3', '6', 'CX-3', 'CX-5', 'MX-5'],
  'Jeep': ['Renegade', 'Compass', 'Cherokee', 'Grand Cherokee'],
  'Land Rover': ['Discovery Sport', 'Range Rover Evoque', 'Range Rover Sport'],
  'Alfa Romeo': ['Giulia', 'Stelvio', 'Tonale'],
  'Fiat': ['500', '500X', 'Panda', 'Tipo'],
  'Honda': ['Jazz', 'Civic', 'CR-V', 'HR-V'],
  'Suzuki': ['Swift', 'Vitara', 'SX4 S-Cross'],
};

export const PROVINCES = [
  'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga',
  'Murcia', 'Palma', 'Las Palmas', 'Bilbao', 'Alicante', 'Córdoba',
  'Valladolid', 'Vigo', 'A Coruña', 'Granada', 'Vitoria', 'Elche',
  'Oviedo', 'Badalona', 'Cartagena', 'Terrassa', 'Jerez', 'Sabadell',
  'Santa Cruz de Tenerife', 'Pamplona', 'Almería', 'Burgos', 'Santander',
  'Castellón', 'Logroño', 'Badajoz', 'Salamanca', 'Toledo', 'Lleida',
  'Tarragona', 'Huelva', 'Cáceres', 'Marbella'
];

export const BODY_TYPE_LABELS: Record<BodyType, string> = {
  suv: 'SUV',
  berlina: 'Berlina',
  familiar: 'Familiar',
  compacto: 'Compacto',
  utilitario: 'Utilitario',
  monovolumen: 'Monovolumen',
  coupe: 'Coupé',
  cabrio: 'Cabrio',
  todoterreno: 'Todoterreno',
  pickup: 'Pick-up',
  deportivo: 'Deportivo',
  furgoneta: 'Furgoneta',
  microcoche: 'Microcoche',
};

export const FUEL_LABELS: Record<FuelType, string> = {
  gasolina: 'Gasolina',
  diesel: 'Diésel',
  hibrido: 'Híbrido',
  hibrido_enchufable: 'Híbrido enchufable',
  electrico: 'Eléctrico',
  glp: 'GLP',
  gnc: 'GNC',
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  wallapop: 'Wallapop',
  milanuncios: 'Milanuncios',
  'coches.net': 'Coches.net',
  autoscout24: 'AutoScout24',
  facebook: 'Facebook',
};

export const PLATFORM_COLORS: Record<Platform, string> = {
  wallapop: 'bg-teal-100 text-teal-800',
  milanuncios: 'bg-orange-100 text-orange-800',
  'coches.net': 'bg-blue-100 text-blue-800',
  autoscout24: 'bg-amber-100 text-amber-800',
  facebook: 'bg-sky-100 text-sky-800',
};

const uns = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const MODEL_IMAGES_MAP: Record<string, string> = {
  'BMW_X3': uns('Ni1rW3h6bMs'),
  'BMW_X5': uns('tShF65IfzHg'),
  'BMW_X6': uns('tShF65IfzHg'),
  'BMW_X1': uns('rX1t3c6Llr8'),
  'BMW_Serie 3': uns('fiEhVRWA5d0'),
  'BMW_Serie 5': uns('iaIeB11kyQE'),
  'BMW_Serie 1': uns('Z5ZdJ1ACapQ'),
  'BMW_Serie 2': uns('Z5ZdJ1ACapQ'),
  'BMW_i3': uns('N3FCay6SBzc'),
  'BMW_i4': uns('N3FCay6SBzc'),

  'Audi_Q5': uns('rX1t3c6Llr8'),
  'Audi_Q3': uns('GdUvdh2EeJE'),
  'Audi_Q7': uns('tShF65IfzHg'),
  'Audi_Q2': uns('GdUvdh2EeJE'),
  'Audi_A4': uns('uCbINA6ICPY'),
  'Audi_A3': uns('Z5ZdJ1ACapQ'),
  'Audi_A5': uns('uCbINA6ICPY'),
  'Audi_A1': uns('Z5ZdJ1ACapQ'),
  'Audi_e-tron': uns('G2Iq7rcbJXU'),

  'Mercedes-Benz_GLC': uns('BzLJa2z2FVI'),
  'Mercedes-Benz_GLA': uns('BzLJa2z2FVI'),
  'Mercedes-Benz_Clase C': uns('OkJaj_J46EE'),
  'Mercedes-Benz_Clase E': uns('OkJaj_J46EE'),
  'Mercedes-Benz_Clase A': uns('Z5ZdJ1ACapQ'),
  'Mercedes-Benz_CLA': uns('OkJaj_J46EE'),
  'Mercedes-Benz_EQC': uns('G2Iq7rcbJXU'),

  'Volkswagen_Golf': uns('AJRBx_XVKHo'),
  'Volkswagen_Polo': uns('AJRBx_XVKHo'),
  'Volkswagen_Tiguan': uns('yZ9_WcRVxMQ'),
  'Volkswagen_T-Roc': uns('yZ9_WcRVxMQ'),
  'Volkswagen_T-Cross': uns('yZ9_WcRVxMQ'),
  'Volkswagen_Passat': uns('iaIeB11kyQE'),
  'Volkswagen_Touareg': uns('tShF65IfzHg'),
  'Volkswagen_ID.4': uns('G2Iq7rcbJXU'),
  'Volkswagen_ID.3': uns('N3FCay6SBzc'),

  'Seat_León': uns('tan0stkCqkc'),
  'Seat_Ibiza': uns('AJRBx_XVKHo'),
  'Seat_Arona': uns('yZ9_WcRVxMQ'),
  'Seat_Ateca': uns('yZ9_WcRVxMQ'),
  'Seat_Tarraco': uns('tShF65IfzHg'),
  'Seat_Mii': uns('AJRBx_XVKHo'),

  'Toyota_RAV4': uns('PNyyffLvWIs'),
  'Toyota_C-HR': uns('PNyyffLvWIs'),
  'Toyota_Yaris': uns('AJRBx_XVKHo'),
  'Toyota_Corolla': uns('tan0stkCqkc'),
  'Toyota_Land Cruiser': uns('tShF65IfzHg'),
  'Toyota_Prius': uns('N3FCay6SBzc'),

  'Renault_Clio': uns('gCAjhHla5hg'),
  'Renault_Megane': uns('tan0stkCqkc'),
  'Renault_Captur': uns('yZ9_WcRVxMQ'),
  'Renault_Kadjar': uns('PNyyffLvWIs'),
  'Renault_Zoe': uns('N3FCay6SBzc'),
  'Renault_Twingo': uns('gCAjhHla5hg'),

  'Ford_Focus': uns('LHvsXD5A40g'),
  'Ford_Fiesta': uns('LHvsXD5A40g'),
  'Ford_Kuga': uns('PNyyffLvWIs'),
  'Ford_Puma': uns('yZ9_WcRVxMQ'),
  'Ford_Mustang Mach-E': uns('G2Iq7rcbJXU'),

  'Opel_Corsa': uns('gCAjhHla5hg'),
  'Opel_Astra': uns('tan0stkCqkc'),
  'Opel_Mokka': uns('yZ9_WcRVxMQ'),
  'Opel_Grandland': uns('PNyyffLvWIs'),

  'Peugeot_208': uns('gCAjhHla5hg'),
  'Peugeot_308': uns('tan0stkCqkc'),
  'Peugeot_2008': uns('yZ9_WcRVxMQ'),
  'Peugeot_3008': uns('PNyyffLvWIs'),
  'Peugeot_5008': uns('tShF65IfzHg'),

  'Citroën_C3': uns('gCAjhHla5hg'),
  'Citroën_C4': uns('tan0stkCqkc'),
  'Citroën_C5 Aircross': uns('PNyyffLvWIs'),

  'Hyundai_Tucson': uns('BEYDMfTsOFU'),
  'Hyundai_Santa Fe': uns('9TUHjKs81I8'),
  'Hyundai_Kona': uns('BEYDMfTsOFU'),
  'Hyundai_i30': uns('tan0stkCqkc'),
  'Hyundai_i20': uns('gCAjhHla5hg'),
  'Hyundai_Ioniq 5': uns('G2Iq7rcbJXU'),

  'Kia_Sportage': uns('vp3ZX76VaPU'),
  'Kia_Sorento': uns('9TUHjKs81I8'),
  'Kia_Ceed': uns('tan0stkCqkc'),
  'Kia_Niro': uns('vp3ZX76VaPU'),
  'Kia_EV6': uns('G2Iq7rcbJXU'),
  'Kia_Picanto': uns('gCAjhHla5hg'),

  'Nissan_Qashqai': uns('PNyyffLvWIs'),
  'Nissan_Juke': uns('yZ9_WcRVxMQ'),
  'Nissan_Leaf': uns('N3FCay6SBzc'),
  'Nissan_X-Trail': uns('tShF65IfzHg'),

  'Dacia_Duster': uns('PNyyffLvWIs'),
  'Dacia_Sandero': uns('gCAjhHla5hg'),

  'Tesla_Model 3': uns('N3FCay6SBzc'),
  'Tesla_Model Y': uns('G2Iq7rcbJXU'),
  'Tesla_Model S': uns('N3FCay6SBzc'),
  'Tesla_Model X': uns('G2Iq7rcbJXU'),

  'Cupra_Formentor': uns('uCbINA6ICPY'),
  'Cupra_Born': uns('N3FCay6SBzc'),
  'Cupra_Leon': uns('uCbINA6ICPY'),
  'Cupra_Ateca': uns('yZ9_WcRVxMQ'),

  'Mini_Cooper': uns('AJRBx_XVKHo'),
  'Mini_Countryman': uns('yZ9_WcRVxMQ'),
  'Mini_Clubman': uns('AJRBx_XVKHo'),

  'Porsche_Macan': uns('BzLJa2z2FVI'),
  'Porsche_Cayenne': uns('tShF65IfzHg'),
  'Porsche_Taycan': uns('N3FCay6SBzc'),
  'Porsche_Panamera': uns('iaIeB11kyQE'),
  'Porsche_911': uns('uCbINA6ICPY'),

  'Volvo_XC40': uns('PNyyffLvWIs'),
  'Volvo_XC60': uns('PNyyffLvWIs'),
  'Volvo_XC90': uns('tShF65IfzHg'),
  'Volvo_V60': uns('iaIeB11kyQE'),
  'Volvo_S60': uns('iaIeB11kyQE'),

  'Skoda_Octavia': uns('tan0stkCqkc'),
  'Skoda_Kodiaq': uns('PNyyffLvWIs'),
  'Skoda_Karoq': uns('yZ9_WcRVxMQ'),
  'Skoda_Superb': uns('iaIeB11kyQE'),

  'Mazda_CX-5': uns('PNyyffLvWIs'),
  'Mazda_CX-3': uns('yZ9_WcRVxMQ'),
  'Mazda_3': uns('tan0stkCqkc'),

  'Jeep_Renegade': uns('yZ9_WcRVxMQ'),
  'Jeep_Compass': uns('PNyyffLvWIs'),
  'Jeep_Cherokee': uns('tShF65IfzHg'),
  'Jeep_Grand Cherokee': uns('tShF65IfzHg'),

  'Land Rover_Discovery Sport': uns('tShF65IfzHg'),
  'Land Rover_Range Rover Evoque': uns('BzLJa2z2FVI'),
  'Land Rover_Range Rover Sport': uns('tShF65IfzHg'),

  'Alfa Romeo_Giulia': uns('OkJaj_J46EE'),
  'Alfa Romeo_Stelvio': uns('BzLJa2z2FVI'),

  'Fiat_500': uns('gCAjhHla5hg'),
  'Fiat_Panda': uns('gCAjhHla5hg'),

  'Honda_Civic': uns('tan0stkCqkc'),
  'Honda_CR-V': uns('PNyyffLvWIs'),
  'Honda_HR-V': uns('yZ9_WcRVxMQ'),

  'Suzuki_Vitara': uns('yZ9_WcRVxMQ'),
  'Suzuki_Swift': uns('gCAjhHla5hg'),
};

const BRAND_IMAGES_MAP: Record<string, string> = {
  'BMW': uns('fiEhVRWA5d0'),
  'Audi': uns('uCbINA6ICPY'),
  'Mercedes-Benz': uns('OkJaj_J46EE'),
  'Volkswagen': uns('AJRBx_XVKHo'),
  'Seat': uns('tan0stkCqkc'),
  'Toyota': uns('PNyyffLvWIs'),
  'Ford': uns('LHvsXD5A40g'),
  'Renault': uns('gCAjhHla5hg'),
  'Opel': uns('tan0stkCqkc'),
  'Peugeot': uns('gCAjhHla5hg'),
  'Citroën': uns('gCAjhHla5hg'),
  'Hyundai': uns('BEYDMfTsOFU'),
  'Kia': uns('vp3ZX76VaPU'),
  'Nissan': uns('yZ9_WcRVxMQ'),
  'Dacia': uns('PNyyffLvWIs'),
  'Tesla': uns('N3FCay6SBzc'),
  'Cupra': uns('uCbINA6ICPY'),
  'Mini': uns('AJRBx_XVKHo'),
  'Porsche': uns('uCbINA6ICPY'),
  'Volvo': uns('PNyyffLvWIs'),
  'Land Rover': uns('tShF65IfzHg'),
  'Jeep': uns('tShF65IfzHg'),
  'Skoda': uns('tan0stkCqkc'),
  'Mazda': uns('PNyyffLvWIs'),
  'Alfa Romeo': uns('OkJaj_J46EE'),
  'Fiat': uns('gCAjhHla5hg'),
  'Honda': uns('tan0stkCqkc'),
  'Suzuki': uns('yZ9_WcRVxMQ'),
};

const BODY_TYPE_IMAGES_MAP: Record<BodyType, string> = {
  suv: uns('PNyyffLvWIs'),
  berlina: uns('iaIeB11kyQE'),
  familiar: uns('iaIeB11kyQE'),
  compacto: uns('tan0stkCqkc'),
  utilitario: uns('gCAjhHla5hg'),
  monovolumen: uns('yZ9_WcRVxMQ'),
  coupe: uns('uCbINA6ICPY'),
  cabrio: uns('AJRBx_XVKHo'),
  todoterreno: uns('tShF65IfzHg'),
  pickup: uns('tShF65IfzHg'),
  deportivo: uns('uCbINA6ICPY'),
  furgoneta: uns('yZ9_WcRVxMQ'),
  microcoche: uns('gCAjhHla5hg'),
};

export const MODEL_IMAGES = MODEL_IMAGES_MAP;
export const BRAND_IMAGES = BRAND_IMAGES_MAP;
export const BODY_TYPE_IMAGES = BODY_TYPE_IMAGES_MAP;

export function getCarImage(brand: string, model: string, bodyType: BodyType): string {
  const key = `${brand}_${model}`;
  if (MODEL_IMAGES_MAP[key]) return MODEL_IMAGES_MAP[key];
  if (BRAND_IMAGES_MAP[brand]) return BRAND_IMAGES_MAP[brand];
  return BODY_TYPE_IMAGES_MAP[bodyType] || uns('fiEhVRWA5d0');
}
