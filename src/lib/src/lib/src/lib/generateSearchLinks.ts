export function generateSearchLinks(filters) {
  const brand = filters.brand || '';
  const model = filters.model || '';

  const query = `${brand} ${model}`.trim().replace(/\s+/g, '+');

  return [
    {
      platform: 'wallapop',
      name: 'Wallapop',
      url: `https://es.wallapop.com/app/search?keywords=${query}`,
    },
    {
      platform: 'coches.net',
      name: 'Coches.net',
      url: `https://www.coches.net/segunda-mano/?Make=${brand}&Model=${model}`,
    },
    {
      platform: 'milanuncios',
      name: 'Milanuncios',
      url: `https://www.milanuncios.com/coches-de-segunda-mano/?q=${query}`,
    },
    {
      platform: 'autoscout24',
      name: 'AutoScout24',
      url: `https://www.autoscout24.es/lst?query=${query}`,
    },
    {
      platform: 'facebook',
      name: 'Facebook Marketplace',
      url: `https://www.facebook.com/marketplace/search/?query=${query}`,
    },
  ];
}
