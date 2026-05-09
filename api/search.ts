import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const brand = String(req.query.brand || '');
  const model = String(req.query.model || '');

  const query = `${brand} ${model}`.trim();

  const results = [
    {
      title: `${query} en Wallapop`,
      platform: 'Wallapop',
      url: `https://es.wallapop.com/app/search?keywords=${encodeURIComponent(query)}`,
    },

    {
      title: `${query} en Milanuncios`,
      platform: 'Milanuncios',
      url: `https://www.milanuncios.com/coches-de-segunda-mano/?q=${encodeURIComponent(query)}`,
    },

    {
      title: `${query} en Coches.net`,
      platform: 'Coches.net',
      url: `https://www.coches.net/segunda-mano/?Key=${encodeURIComponent(query)}`,
    },

    {
      title: `${query} en AutoScout24`,
      platform: 'AutoScout24',
      url: `https://www.autoscout24.es/lst?search=${encodeURIComponent(query)}`,
    },

    {
      title: `${query} en Facebook Marketplace`,
      platform: 'Facebook Marketplace',
      url: `https://www.facebook.com/marketplace/search/?query=${encodeURIComponent(query)}`,
    },
  ];

  return res.status(200).json(results);
}
