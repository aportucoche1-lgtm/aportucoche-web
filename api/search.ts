export default async function handler(req, res) {
  const { brand = '', model = '' } = req.query;

  const query = `${brand} ${model}`.trim();

  const results = [
    {
      title: `${query} en Wallapop`,
      platform: 'wallapop',
      url: `https://es.wallapop.com/app/search?keywords=${encodeURIComponent(query)}`,
    },
    {
      title: `${query} en Milanuncios`,
      platform: 'milanuncios',
      url: `https://www.milanuncios.com/coches-de-segunda-mano/?q=${encodeURIComponent(query)}`,
    },
    {
      title: `${query} en Coches.net`,
      platform: 'coches.net',
      url: `https://www.coches.net/segunda-mano/?Key=${encodeURIComponent(query)}`,
    },
    {
      title: `${query} en AutoScout24`,
      platform: 'autoscout24',
      url: `https://www.autoscout24.es/lst?search=${encodeURIComponent(query)}`,
    },
    {
      title: `${query} en Facebook Marketplace`,
      platform: 'facebook',
      url: `https://www.facebook.com/marketplace/search/?query=${encodeURIComponent(query)}`,
    },
  ];

  res.status(200).json(results);
}
