import { Car } from '../types';
import { getCarImage } from './constants';

export const MOCK_CARS: Car[] = [
  {
    id: '1', title: 'Seat Ibiza 1.0 TSI Style 95cv', brand: 'Seat', model: 'Ibiza',
    year: 2020, price: 12500, km: 45000, fuel: 'gasolina', bodyType: 'utilitario',
    province: 'Madrid', seller: 'particular', platform: 'wallapop',
    url: 'https://es.wallapop.com', image: getCarImage('Seat', 'Ibiza', 'utilitario'),
    color: 'Blanco', transmission: 'Manual', power: 95, doors: 5,
    description: 'Seat Ibiza en perfecto estado, un solo dueño, revisiones al día.',
    createdAt: '2024-03-15T10:00:00Z'
  },
  {
    id: '2', title: 'Volkswagen Golf 2.0 TDI Advance 150cv', brand: 'Volkswagen', model: 'Golf',
    year: 2019, price: 18900, km: 78000, fuel: 'diesel', bodyType: 'compacto',
    province: 'Barcelona', seller: 'profesional', platform: 'coches.net',
    url: 'https://www.coches.net', image: getCarImage('Volkswagen', 'Golf', 'compacto'),
    color: 'Gris', transmission: 'Automático', power: 150, doors: 5,
    description: 'Golf TDI con extras: navegador, asientos calefactados, sensores parking.',
    createdAt: '2024-03-14T09:00:00Z'
  },
  {
    id: '3', title: 'Toyota RAV4 Hybrid 2.5 AWD Executive', brand: 'Toyota', model: 'RAV4',
    year: 2021, price: 31500, km: 22000, fuel: 'hibrido', bodyType: 'suv',
    province: 'Valencia', seller: 'profesional', platform: 'autoscout24',
    url: 'https://www.autoscout24.es', image: getCarImage('Toyota', 'RAV4', 'suv'),
    color: 'Azul', transmission: 'Automático', power: 222, doors: 5,
    description: 'RAV4 Hybrid con mínimo consumo, garantía oficial Toyota.',
    createdAt: '2024-03-13T11:00:00Z'
  },
  {
    id: '4', title: 'BMW Serie 3 320d xDrive Touring', brand: 'BMW', model: 'Serie 3',
    year: 2018, price: 24900, km: 95000, fuel: 'diesel', bodyType: 'familiar',
    province: 'Sevilla', seller: 'particular', platform: 'milanuncios',
    url: 'https://www.milanuncios.com', image: getCarImage('BMW', 'Serie 3', 'familiar'),
    color: 'Negro', transmission: 'Automático', power: 190, doors: 5,
    description: 'BMW 320d Touring en excelentes condiciones. Pack Sport, techo panorámico.',
    createdAt: '2024-03-12T14:00:00Z'
  },
  {
    id: '5', title: 'Dacia Sandero Stepway 1.0 TCe 90cv', brand: 'Dacia', model: 'Sandero',
    year: 2022, price: 11200, km: 18000, fuel: 'gasolina', bodyType: 'utilitario',
    province: 'Zaragoza', seller: 'particular', platform: 'wallapop',
    url: 'https://es.wallapop.com', image: getCarImage('Dacia', 'Sandero', 'utilitario'),
    color: 'Naranja', transmission: 'Manual', power: 90, doors: 5,
    description: 'Sandero Stepway casi nuevo, garantía fabricante vigente.',
    createdAt: '2024-03-11T16:00:00Z'
  },
  {
    id: '6', title: 'Tesla Model 3 Long Range AWD', brand: 'Tesla', model: 'Model 3',
    year: 2021, price: 36800, km: 31000, fuel: 'electrico', bodyType: 'berlina',
    province: 'Madrid', seller: 'particular', platform: 'milanuncios',
    url: 'https://www.milanuncios.com', image: getCarImage('Tesla', 'Model 3', 'berlina'),
    color: 'Blanco', transmission: 'Automático', power: 450, doors: 4,
    description: 'Tesla Model 3 LR con autopilot, batería al 97%.',
    createdAt: '2024-03-10T08:00:00Z'
  },
  {
    id: '7', title: 'Ford Kuga ST-Line 2.0 EcoBlue 120cv', brand: 'Ford', model: 'Kuga',
    year: 2020, price: 19800, km: 56000, fuel: 'diesel', bodyType: 'suv',
    province: 'Bilbao', seller: 'profesional', platform: 'coches.net',
    url: 'https://www.coches.net', image: getCarImage('Ford', 'Kuga', 'suv'),
    color: 'Rojo', transmission: 'Manual', power: 120, doors: 5,
    description: 'Kuga ST-Line con estética sport. Cámara trasera, SYNC3.',
    createdAt: '2024-03-09T12:00:00Z'
  },
  {
    id: '8', title: 'Renault Clio 1.5 dCi 85cv Energy Zen', brand: 'Renault', model: 'Clio',
    year: 2018, price: 8900, km: 102000, fuel: 'diesel', bodyType: 'utilitario',
    province: 'Málaga', seller: 'particular', platform: 'facebook',
    url: 'https://www.facebook.com/marketplace', image: getCarImage('Renault', 'Clio', 'utilitario'),
    color: 'Gris', transmission: 'Manual', power: 85, doors: 5,
    description: 'Clio diesel muy económico, mantenimiento al día.',
    createdAt: '2024-03-08T15:00:00Z'
  },
  {
    id: '9', title: 'Audi Q3 2.0 TDI 150cv S tronic Sport', brand: 'Audi', model: 'Q3',
    year: 2019, price: 27500, km: 63000, fuel: 'diesel', bodyType: 'suv',
    province: 'Barcelona', seller: 'profesional', platform: 'autoscout24',
    url: 'https://www.autoscout24.es', image: getCarImage('Audi', 'Q3', 'suv'),
    color: 'Plata', transmission: 'Automático', power: 150, doors: 5,
    description: 'Q3 Sport con Virtual Cockpit, Matrix LED, pack invierno.',
    createdAt: '2024-03-07T10:00:00Z'
  },
  {
    id: '10', title: 'Hyundai Tucson 1.6 CRDi 115cv Klass', brand: 'Hyundai', model: 'Tucson',
    year: 2020, price: 17900, km: 48000, fuel: 'diesel', bodyType: 'suv',
    province: 'Valencia', seller: 'particular', platform: 'milanuncios',
    url: 'https://www.milanuncios.com', image: getCarImage('Hyundai', 'Tucson', 'suv'),
    color: 'Blanco', transmission: 'Manual', power: 115, doors: 5,
    description: 'Tucson en buen estado, único propietario, ITV nueva.',
    createdAt: '2024-03-06T13:00:00Z'
  },
  {
    id: '11', title: 'Mercedes-Benz GLA 200d AMG Line', brand: 'Mercedes-Benz', model: 'GLA',
    year: 2021, price: 33900, km: 28000, fuel: 'diesel', bodyType: 'suv',
    province: 'Madrid', seller: 'profesional', platform: 'coches.net',
    url: 'https://www.coches.net', image: getCarImage('Mercedes-Benz', 'GLA', 'suv'),
    color: 'Negro', transmission: 'Automático', power: 150, doors: 5,
    description: 'GLA AMG Line con techo panorámico, MBUX, asientos cuero.',
    createdAt: '2024-03-05T09:00:00Z'
  },
  {
    id: '12', title: 'Peugeot 3008 GT Line 1.5 BlueHDi 130cv', brand: 'Peugeot', model: '3008',
    year: 2020, price: 22100, km: 41000, fuel: 'diesel', bodyType: 'suv',
    province: 'Sevilla', seller: 'profesional', platform: 'autoscout24',
    url: 'https://www.autoscout24.es', image: getCarImage('Peugeot', '3008', 'suv'),
    color: 'Gris', transmission: 'Automático', power: 130, doors: 5,
    description: 'Peugeot 3008 GT Line. iCockpit, sensores, cámara 360.',
    createdAt: '2024-03-04T11:00:00Z'
  },
  {
    id: '13', title: 'Seat León FR 1.5 eTSI 150cv DSG', brand: 'Seat', model: 'León',
    year: 2021, price: 21800, km: 33000, fuel: 'hibrido', bodyType: 'compacto',
    province: 'Zaragoza', seller: 'profesional', platform: 'coches.net',
    url: 'https://www.coches.net', image: getCarImage('Seat', 'León', 'compacto'),
    color: 'Rojo', transmission: 'Automático', power: 150, doors: 5,
    description: 'León FR eTSI, microhíbrido, consumo reducido, equipamiento completo.',
    createdAt: '2024-03-03T14:00:00Z'
  },
  {
    id: '14', title: 'Opel Mokka 1.2 Turbo 130cv GS Line', brand: 'Opel', model: 'Mokka',
    year: 2022, price: 19500, km: 15000, fuel: 'gasolina', bodyType: 'suv',
    province: 'Madrid', seller: 'particular', platform: 'wallapop',
    url: 'https://es.wallapop.com', image: getCarImage('Opel', 'Mokka', 'suv'),
    color: 'Azul', transmission: 'Automático', power: 130, doors: 5,
    description: 'Mokka GS Line, diseño nuevo con IntelliLux LED.',
    createdAt: '2024-03-02T16:00:00Z'
  },
  {
    id: '15', title: 'Cupra Formentor 2.0 TSI 310cv 4Drive', brand: 'Cupra', model: 'Formentor',
    year: 2021, price: 38500, km: 24000, fuel: 'gasolina', bodyType: 'suv',
    province: 'Barcelona', seller: 'particular', platform: 'milanuncios',
    url: 'https://www.milanuncios.com', image: getCarImage('Cupra', 'Formentor', 'suv'),
    color: 'Negro', transmission: 'Automático', power: 310, doors: 5,
    description: 'Cupra Formentor 310cv con Akrapovic, pack performance.',
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: '16', title: 'Kia Sportage 1.6 GDI 132cv Drive', brand: 'Kia', model: 'Sportage',
    year: 2019, price: 15900, km: 72000, fuel: 'gasolina', bodyType: 'suv',
    province: 'Valencia', seller: 'particular', platform: 'wallapop',
    url: 'https://es.wallapop.com', image: getCarImage('Kia', 'Sportage', 'suv'),
    color: 'Plata', transmission: 'Manual', power: 132, doors: 5,
    description: 'Sportage Drive con cámara trasera, pantalla táctil, garantía extendida Kia.',
    createdAt: '2024-02-28T12:00:00Z'
  },
  {
    id: '17', title: 'Ford Focus ST-Line 1.5 EcoBoost 182cv', brand: 'Ford', model: 'Focus',
    year: 2019, price: 16200, km: 67000, fuel: 'gasolina', bodyType: 'compacto',
    province: 'Madrid', seller: 'profesional', platform: 'coches.net',
    url: 'https://www.coches.net', image: getCarImage('Ford', 'Focus', 'compacto'),
    color: 'Azul', transmission: 'Automático', power: 182, doors: 5,
    description: 'Focus ST-Line, pack invierno, B&O audio, SYNC4.',
    createdAt: '2024-02-27T09:00:00Z'
  },
  {
    id: '18', title: 'Citroën C5 Aircross 1.5 BlueHDi 130cv', brand: 'Citroën', model: 'C5 Aircross',
    year: 2020, price: 18700, km: 52000, fuel: 'diesel', bodyType: 'suv',
    province: 'Bilbao', seller: 'profesional', platform: 'autoscout24',
    url: 'https://www.autoscout24.es', image: getCarImage('Citroën', 'C5 Aircross', 'suv'),
    color: 'Gris', transmission: 'Automático', power: 130, doors: 5,
    description: 'C5 Aircross con suspensión Progressive Hydraulic Cushions.',
    createdAt: '2024-02-26T11:00:00Z'
  },
  {
    id: '19', title: 'Mazda CX-5 2.2 Skyactiv-D 150cv Zenith', brand: 'Mazda', model: 'CX-5',
    year: 2020, price: 23400, km: 38000, fuel: 'diesel', bodyType: 'suv',
    province: 'Córdoba', seller: 'particular', platform: 'facebook',
    url: 'https://www.facebook.com/marketplace', image: getCarImage('Mazda', 'CX-5', 'suv'),
    color: 'Rojo', transmission: 'Automático', power: 150, doors: 5,
    description: 'CX-5 Zenith con piel, techo solar, Bose audio. Impecable.',
    createdAt: '2024-02-25T15:00:00Z'
  },
  {
    id: '20', title: 'Mini Cooper S 2.0T 192cv 3p', brand: 'Mini', model: 'Cooper',
    year: 2020, price: 22800, km: 29000, fuel: 'gasolina', bodyType: 'compacto',
    province: 'Madrid', seller: 'particular', platform: 'wallapop',
    url: 'https://es.wallapop.com', image: getCarImage('Mini', 'Cooper', 'compacto'),
    color: 'Naranja', transmission: 'Automático', power: 192, doors: 3,
    description: 'Mini Cooper S con pack Chili, techo panorámico, JCW volante.',
    createdAt: '2024-02-24T10:00:00Z'
  },
  {
    id: '21', title: 'Skoda Octavia Combi 2.0 TDI 150cv Style', brand: 'Skoda', model: 'Octavia',
    year: 2021, price: 20900, km: 42000, fuel: 'diesel', bodyType: 'familiar',
    province: 'Barcelona', seller: 'profesional', platform: 'coches.net',
    url: 'https://www.coches.net', image: getCarImage('Skoda', 'Octavia', 'familiar'),
    color: 'Azul', transmission: 'Automático', power: 150, doors: 5,
    description: 'Octavia Combi Style con maletero XL, Virtual Cockpit.',
    createdAt: '2024-02-23T13:00:00Z'
  },
  {
    id: '22', title: 'Jeep Renegade 1.3 GSE 150cv Longitude', brand: 'Jeep', model: 'Renegade',
    year: 2020, price: 16800, km: 58000, fuel: 'gasolina', bodyType: 'suv',
    province: 'Sevilla', seller: 'particular', platform: 'milanuncios',
    url: 'https://www.milanuncios.com', image: getCarImage('Jeep', 'Renegade', 'suv'),
    color: 'Verde', transmission: 'Automático', power: 150, doors: 5,
    description: 'Renegade Longitude en muy buen estado. Apple CarPlay.',
    createdAt: '2024-02-22T16:00:00Z'
  },
  {
    id: '23', title: 'Renault Captur 1.3 TCe 130cv Intens', brand: 'Renault', model: 'Captur',
    year: 2021, price: 17600, km: 26000, fuel: 'gasolina', bodyType: 'suv',
    province: 'Valencia', seller: 'profesional', platform: 'autoscout24',
    url: 'https://www.autoscout24.es', image: getCarImage('Renault', 'Captur', 'suv'),
    color: 'Naranja', transmission: 'Automático', power: 130, doors: 5,
    description: 'Captur Intens con sensor parking, clima bizona, Android Auto.',
    createdAt: '2024-02-21T09:00:00Z'
  },
  {
    id: '24', title: 'Volkswagen Tiguan 2.0 TDI 150cv Advance', brand: 'Volkswagen', model: 'Tiguan',
    year: 2019, price: 23900, km: 71000, fuel: 'diesel', bodyType: 'suv',
    province: 'Madrid', seller: 'profesional', platform: 'coches.net',
    url: 'https://www.coches.net', image: getCarImage('Volkswagen', 'Tiguan', 'suv'),
    color: 'Negro', transmission: 'Automático', power: 150, doors: 5,
    description: 'Tiguan Advance con techo panorámico, 4Motion desconectable.',
    createdAt: '2024-02-20T11:00:00Z'
  },
  {
    id: '25', title: 'Honda CR-V 1.5 VTEC Turbo 193cv Executive', brand: 'Honda', model: 'CR-V',
    year: 2019, price: 26800, km: 55000, fuel: 'gasolina', bodyType: 'suv',
    province: 'Zaragoza', seller: 'particular', platform: 'facebook',
    url: 'https://www.facebook.com/marketplace', image: getCarImage('Honda', 'CR-V', 'suv'),
    color: 'Plata', transmission: 'Automático', power: 193, doors: 5,
    description: 'CR-V Executive con piel blanca, techo solar, Honda Sensing.',
    createdAt: '2024-02-19T14:00:00Z'
  },
  {
    id: '26', title: 'Fiat 500 1.2 69cv Lounge', brand: 'Fiat', model: '500',
    year: 2019, price: 7800, km: 68000, fuel: 'gasolina', bodyType: 'microcoche',
    province: 'Málaga', seller: 'particular', platform: 'wallapop',
    url: 'https://es.wallapop.com', image: getCarImage('Fiat', '500', 'microcoche'),
    color: 'Rojo', transmission: 'Manual', power: 69, doors: 3,
    description: 'Fiat 500 en buen estado, techo panorámico, radio táctil.',
    createdAt: '2024-02-18T10:00:00Z'
  },
  {
    id: '27', title: 'Volvo XC40 2.0 D3 150cv R-Design', brand: 'Volvo', model: 'XC40',
    year: 2020, price: 28900, km: 44000, fuel: 'diesel', bodyType: 'suv',
    province: 'Barcelona', seller: 'profesional', platform: 'autoscout24',
    url: 'https://www.autoscout24.es', image: getCarImage('Volvo', 'XC40', 'suv'),
    color: 'Azul', transmission: 'Manual', power: 150, doors: 5,
    description: 'XC40 R-Design con Harman Kardon, pilot assist, cargador inalámbrico.',
    createdAt: '2024-02-17T13:00:00Z'
  },
  {
    id: '28', title: 'Nissan Leaf 40 kWh Acenta', brand: 'Nissan', model: 'Leaf',
    year: 2020, price: 19500, km: 38000, fuel: 'electrico', bodyType: 'compacto',
    province: 'Madrid', seller: 'particular', platform: 'milanuncios',
    url: 'https://www.milanuncios.com', image: getCarImage('Nissan', 'Leaf', 'compacto'),
    color: 'Blanco', transmission: 'Automático', power: 150, doors: 5,
    description: 'Nissan Leaf eléctrico, batería 40kWh, cargador rápido incluido.',
    createdAt: '2024-02-16T16:00:00Z'
  },
  {
    id: '29', title: 'Porsche Macan S 3.0 V6 354cv PDK', brand: 'Porsche', model: 'Macan',
    year: 2018, price: 47900, km: 62000, fuel: 'gasolina', bodyType: 'suv',
    province: 'Valencia', seller: 'particular', platform: 'coches.net',
    url: 'https://www.coches.net', image: getCarImage('Porsche', 'Macan', 'suv'),
    color: 'Negro', transmission: 'Automático', power: 354, doors: 5,
    description: 'Macan S con Sport Chrono, PASM, ruedas 21", revisiones Porsche.',
    createdAt: '2024-02-15T09:00:00Z'
  },
  {
    id: '30', title: 'Toyota Yaris 1.5 Hybrid 116cv Advance', brand: 'Toyota', model: 'Yaris',
    year: 2022, price: 18200, km: 12000, fuel: 'hibrido', bodyType: 'utilitario',
    province: 'Sevilla', seller: 'profesional', platform: 'autoscout24',
    url: 'https://www.autoscout24.es', image: getCarImage('Toyota', 'Yaris', 'utilitario'),
    color: 'Gris', transmission: 'Automático', power: 116, doors: 5,
    description: 'Yaris Hybrid recién entrado, garantía Toyota Plus.',
    createdAt: '2024-02-14T11:00:00Z'
  },
  {
    id: '31', title: 'Audi A3 Sportback 35 TFSI 150cv S line', brand: 'Audi', model: 'A3',
    year: 2021, price: 27800, km: 31000, fuel: 'gasolina', bodyType: 'compacto',
    province: 'Madrid', seller: 'profesional', platform: 'coches.net',
    url: 'https://www.coches.net', image: getCarImage('Audi', 'A3', 'compacto'),
    color: 'Azul', transmission: 'Automático', power: 150, doors: 5,
    description: 'A3 S line con MMI Navigation, Matrix LED, ambient light.',
    createdAt: '2024-02-13T14:00:00Z'
  },
  {
    id: '32', title: 'Land Rover Discovery Sport 2.0 TD4 150cv SE', brand: 'Land Rover', model: 'Discovery Sport',
    year: 2019, price: 29500, km: 68000, fuel: 'diesel', bodyType: 'todoterreno',
    province: 'Bilbao', seller: 'particular', platform: 'facebook',
    url: 'https://www.facebook.com/marketplace', image: getCarImage('Land Rover', 'Discovery Sport', 'todoterreno'),
    color: 'Blanco', transmission: 'Automático', power: 150, doors: 5,
    description: 'Discovery Sport 7 plazas, 4WD, InControl Touch.',
    createdAt: '2024-02-12T10:00:00Z'
  },
  {
    id: '33', title: 'Peugeot 208 1.2 PureTech 100cv Allure', brand: 'Peugeot', model: '208',
    year: 2021, price: 14900, km: 23000, fuel: 'gasolina', bodyType: 'utilitario',
    province: 'Zaragoza', seller: 'profesional', platform: 'milanuncios',
    url: 'https://www.milanuncios.com', image: getCarImage('Peugeot', '208', 'utilitario'),
    color: 'Naranja', transmission: 'Manual', power: 100, doors: 5,
    description: '208 Allure con iCockpit 3D, sensor parking, clima automático.',
    createdAt: '2024-02-11T13:00:00Z'
  },
  {
    id: '34', title: 'Mercedes-Benz Clase C 220d 194cv AMG Line', brand: 'Mercedes-Benz', model: 'Clase C',
    year: 2020, price: 34500, km: 47000, fuel: 'diesel', bodyType: 'berlina',
    province: 'Barcelona', seller: 'profesional', platform: 'autoscout24',
    url: 'https://www.autoscout24.es', image: getCarImage('Mercedes-Benz', 'Clase C', 'berlina'),
    color: 'Plata', transmission: 'Automático', power: 194, doors: 4,
    description: 'Clase C AMG Line con Burmester audio, HUD, techo panorámico.',
    createdAt: '2024-02-10T16:00:00Z'
  },
  {
    id: '35', title: 'Seat Ateca 2.0 TDI 150cv FR', brand: 'Seat', model: 'Ateca',
    year: 2020, price: 21300, km: 49000, fuel: 'diesel', bodyType: 'suv',
    province: 'Valencia', seller: 'particular', platform: 'wallapop',
    url: 'https://es.wallapop.com', image: getCarImage('Seat', 'Ateca', 'suv'),
    color: 'Rojo', transmission: 'Automático', power: 150, doors: 5,
    description: 'Ateca FR con DCC, techo panorámico, Pack Winter.',
    createdAt: '2024-02-09T09:00:00Z'
  },
  {
    id: '36', title: 'Volkswagen ID.4 Pro Performance 204cv', brand: 'Volkswagen', model: 'ID.4',
    year: 2022, price: 34900, km: 18000, fuel: 'electrico', bodyType: 'suv',
    province: 'Madrid', seller: 'profesional', platform: 'coches.net',
    url: 'https://www.coches.net', image: getCarImage('Volkswagen', 'ID.4', 'suv'),
    color: 'Verde', transmission: 'Automático', power: 204, doors: 5,
    description: 'ID.4 Pro con batería 77kWh, IQ.Drive, 500km autonomía WLTP.',
    createdAt: '2024-02-08T11:00:00Z'
  },
  {
    id: '37', title: 'Alfa Romeo Giulia 2.2 Diesel 150cv Sprint', brand: 'Alfa Romeo', model: 'Giulia',
    year: 2020, price: 25900, km: 44000, fuel: 'diesel', bodyType: 'berlina',
    province: 'Sevilla', seller: 'particular', platform: 'milanuncios',
    url: 'https://www.milanuncios.com', image: getCarImage('Alfa Romeo', 'Giulia', 'berlina'),
    color: 'Rojo', transmission: 'Automático', power: 150, doors: 4,
    description: 'Giulia Sprint, dinámica y elegante. Full-LED, cámara 360.',
    createdAt: '2024-02-07T14:00:00Z'
  },
  {
    id: '38', title: 'Citroën C3 1.2 PureTech 83cv Feel', brand: 'Citroën', model: 'C3',
    year: 2020, price: 10800, km: 51000, fuel: 'gasolina', bodyType: 'utilitario',
    province: 'Córdoba', seller: 'particular', platform: 'facebook',
    url: 'https://www.facebook.com/marketplace', image: getCarImage('Citroën', 'C3', 'utilitario'),
    color: 'Blanco', transmission: 'Manual', power: 83, doors: 5,
    description: 'C3 Feel en perfecto estado, primer propietario.',
    createdAt: '2024-02-06T10:00:00Z'
  },
  {
    id: '39', title: 'BMW X3 xDrive20d 190cv xLine', brand: 'BMW', model: 'X3',
    year: 2020, price: 37800, km: 52000, fuel: 'diesel', bodyType: 'suv',
    province: 'Barcelona', seller: 'profesional', platform: 'autoscout24',
    url: 'https://www.autoscout24.es', image: getCarImage('BMW', 'X3', 'suv'),
    color: 'Negro', transmission: 'Automático', power: 190, doors: 5,
    description: 'X3 xLine con Live Cockpit Prof., Head-Up Display, Dynamic Damper.',
    createdAt: '2024-02-05T13:00:00Z'
  },
  {
    id: '40', title: 'Hyundai Ioniq 5 58kWh 170cv Launch Edition', brand: 'Hyundai', model: 'Ioniq 5',
    year: 2022, price: 39500, km: 21000, fuel: 'electrico', bodyType: 'suv',
    province: 'Madrid', seller: 'particular', platform: 'wallapop',
    url: 'https://es.wallapop.com', image: getCarImage('Hyundai', 'Ioniq 5', 'suv'),
    color: 'Blanco', transmission: 'Automático', power: 170, doors: 5,
    description: 'Ioniq 5 con carga rápida 220kW, calidad premium.',
    createdAt: '2024-02-04T16:00:00Z'
  },
  {
    id: '41', title: 'Skoda Kodiaq 2.0 TDI 150cv Style DSG', brand: 'Skoda', model: 'Kodiaq',
    year: 2020, price: 26900, km: 58000, fuel: 'diesel', bodyType: 'suv',
    province: 'Valladolid', seller: 'profesional', platform: 'coches.net',
    url: 'https://www.coches.net', image: getCarImage('Skoda', 'Kodiaq', 'suv'),
    color: 'Gris', transmission: 'Automático', power: 150, doors: 5,
    description: 'Kodiaq 7 plazas Style con techo panorámico, Canton audio.',
    createdAt: '2024-02-03T09:00:00Z'
  },
  {
    id: '42', title: 'Opel Corsa 1.2 Turbo 100cv GS Line', brand: 'Opel', model: 'Corsa',
    year: 2021, price: 13900, km: 27000, fuel: 'gasolina', bodyType: 'utilitario',
    province: 'Málaga', seller: 'particular', platform: 'milanuncios',
    url: 'https://www.milanuncios.com', image: getCarImage('Opel', 'Corsa', 'utilitario'),
    color: 'Amarillo', transmission: 'Automático', power: 100, doors: 5,
    description: 'Corsa GS Line con IntelliLux LED, cámara, paquete invierno.',
    createdAt: '2024-02-02T11:00:00Z'
  },
  {
    id: '43', title: 'Kia EV6 77.4kWh 229cv GT-Line', brand: 'Kia', model: 'EV6',
    year: 2022, price: 42900, km: 15000, fuel: 'electrico', bodyType: 'suv',
    province: 'Barcelona', seller: 'profesional', platform: 'autoscout24',
    url: 'https://www.autoscout24.es', image: getCarImage('Kia', 'EV6', 'suv'),
    color: 'Gris', transmission: 'Automático', power: 229, doors: 5,
    description: 'EV6 GT-Line con carga rápida 800V, head-up display, AR.',
    createdAt: '2024-02-01T14:00:00Z'
  },
  {
    id: '44', title: 'Ford Mustang Mach-E RWD 269cv', brand: 'Ford', model: 'Mustang Mach-E',
    year: 2022, price: 38900, km: 22000, fuel: 'electrico', bodyType: 'suv',
    province: 'Valencia', seller: 'particular', platform: 'facebook',
    url: 'https://www.facebook.com/marketplace', image: getCarImage('Ford', 'Mustang Mach-E', 'suv'),
    color: 'Azul', transmission: 'Automático', power: 269, doors: 5,
    description: 'Mach-E con batería 98kWh, 610km autonomía, SYNC4A.',
    createdAt: '2024-01-31T10:00:00Z'
  },
  {
    id: '45', title: 'Suzuki Vitara 1.4 BoosterJet 140cv Hybrid', brand: 'Suzuki', model: 'Vitara',
    year: 2021, price: 18900, km: 32000, fuel: 'hibrido', bodyType: 'suv',
    province: 'Sevilla', seller: 'particular', platform: 'wallapop',
    url: 'https://es.wallapop.com', image: getCarImage('Suzuki', 'Vitara', 'suv'),
    color: 'Blanco', transmission: 'Automático', power: 140, doors: 5,
    description: 'Vitara Hybrid con AllGrip 4x4, cuero, navegador.',
    createdAt: '2024-01-30T13:00:00Z'
  },
  {
    id: '46', title: 'Renault Zoe R135 52kWh Intens', brand: 'Renault', model: 'Zoe',
    year: 2021, price: 17800, km: 29000, fuel: 'electrico', bodyType: 'utilitario',
    province: 'Madrid', seller: 'profesional', platform: 'coches.net',
    url: 'https://www.coches.net', image: getCarImage('Renault', 'Zoe', 'utilitario'),
    color: 'Verde', transmission: 'Automático', power: 135, doors: 5,
    description: 'Zoe R135 con batería propia (no alquiler), carga rápida CCS.',
    createdAt: '2024-01-29T16:00:00Z'
  },
  {
    id: '47', title: 'Volkswagen Polo 1.0 TSI 95cv R-Line', brand: 'Volkswagen', model: 'Polo',
    year: 2020, price: 13800, km: 41000, fuel: 'gasolina', bodyType: 'utilitario',
    province: 'Bilbao', seller: 'particular', platform: 'wallapop',
    url: 'https://es.wallapop.com', image: getCarImage('Volkswagen', 'Polo', 'utilitario'),
    color: 'Azul', transmission: 'Manual', power: 95, doors: 5,
    description: 'Polo R-Line con pantalla táctil 8", App-Connect, sensor lluvia.',
    createdAt: '2024-01-28T09:00:00Z'
  },
  {
    id: '48', title: 'Toyota C-HR 1.8 Hybrid 122cv Advance', brand: 'Toyota', model: 'C-HR',
    year: 2020, price: 19900, km: 43000, fuel: 'hibrido', bodyType: 'suv',
    province: 'Zaragoza', seller: 'profesional', platform: 'autoscout24',
    url: 'https://www.autoscout24.es', image: getCarImage('Toyota', 'C-HR', 'suv'),
    color: 'Negro', transmission: 'Automático', power: 122, doors: 5,
    description: 'C-HR Hybrid diseño exclusivo, Toyota Safety Sense.',
    createdAt: '2024-01-27T11:00:00Z'
  },
  {
    id: '49', title: 'Dacia Duster 1.5 Blue dCi 115cv Prestige 4x4', brand: 'Dacia', model: 'Duster',
    year: 2020, price: 14500, km: 63000, fuel: 'diesel', bodyType: 'suv',
    province: 'Córdoba', seller: 'particular', platform: 'facebook',
    url: 'https://www.facebook.com/marketplace', image: getCarImage('Dacia', 'Duster', 'suv'),
    color: 'Naranja', transmission: 'Manual', power: 115, doors: 5,
    description: 'Duster Prestige 4WD, el todoterreno más económico del mercado.',
    createdAt: '2024-01-26T14:00:00Z'
  },
  {
    id: '50', title: 'BMW Serie 1 118d 150cv Sport Line', brand: 'BMW', model: 'Serie 1',
    year: 2020, price: 22400, km: 38000, fuel: 'diesel', bodyType: 'compacto',
    province: 'Madrid', seller: 'profesional', platform: 'milanuncios',
    url: 'https://www.milanuncios.com', image: getCarImage('BMW', 'Serie 1', 'compacto'),
    color: 'Azul', transmission: 'Automático', power: 150, doors: 5,
    description: 'Serie 1 Sport Line FWD, Live Cockpit, parking sensors.',
    createdAt: '2024-01-25T10:00:00Z'
  },
];
