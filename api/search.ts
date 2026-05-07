export default async function handler(req, res) {
  const { brand = '', model = '' } = req.query;

  const query = `${brand} ${model}`.trim();
  const url = `https://www.autoscout24.es/lst?sort=standard&desc=0&ustate=N%2CU&size=20&search=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const html = await response.text();

    const cars = [];

    const blocks = html.split('cldt-summary-full-item');

    for (let i = 1; i < Math.min(blocks.length, 15); i++) {
      const block = blocks[i];

      const titleMatch = block.match(/<h2[^>]*>(.*?)<\/h2>/);
      const title = titleMatch
        ? titleMatch[1].replace(/<[^>]+>/g, '').trim()
        : query;

      const priceMatch = block.match(/€\s?[\d\.\,]+/);
      const price = priceMatch ? priceMatch[0] : null;

      const kmMatch = block.match(/[\d\.\,]+\s?km/);
      const km = kmMatch ? kmMatch[0] : null;

     const linkMatch = block.match(/href="(\/oferta\/[^"]+)"/);
      const link = linkMatch
        ? 'https://www.autoscout24.es' + linkMatch[1]
        : null;

    const brandMatch = brand && title.toLowerCase().includes(brand.toLowerCase());
const modelMatch = model && title.toLowerCase().includes(model.toLowerCase());

if (link && (brandMatch || modelMatch)) {
        cars.push({
          title,
          price,
          km,
          platform: 'autoscout24',
          url: link,
        });
      }
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Error scraping AutoScout' });
  }
}
