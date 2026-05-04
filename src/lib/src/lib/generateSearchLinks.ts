export function generateSearchLinks(filters: {
  brand?: string;
  model?: string;
  province?: string;
}) {
  const query = `${filters.brand || ''} ${filters.model || ''}`.trim();

  const encoded = encodeURIComponent(query);

  return [
    {
      platform: 'wallapop',
      url: `https://es.wallapop.com/app/search?keywords=${encoded}`,
    },
    {
      platform: 'milanuncios',
      url: `https://www.milanuncios.com/coches-de-segunda-mano/?q=${encoded}`,
    },
    {
      platform: 'coches.net',
      url: `https://www.coches.net/segunda-mano/?Key=${encoded}`,
    },
    {
      platform: 'autoscout24',
      url: `https://www.autoscout24.es/lst?search=${encoded}`,
    },
    {
      platform: 'facebook',
      url: `https://www.facebook.com/marketplace/search/?query=${encoded}`,
    },
  ];
}
