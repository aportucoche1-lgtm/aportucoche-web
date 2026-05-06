export function getCarImage(brand?: string, model?: string) {
  const query = `${brand || ''} ${model || ''} car`;

  return `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`;
}
