export function getCarImage(brand?: string, model?: string) {
  const search = `${brand || ''} ${model || ''} car`.trim();

  return `https://source.unsplash.com/800x600/?${encodeURIComponent(search)}`;
}
