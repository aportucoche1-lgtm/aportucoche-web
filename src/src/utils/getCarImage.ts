export const getCarImage = (brand?: string, model?: string) => {
  const fallback =
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200"

  if (!brand && !model) return fallback

  const query = [brand, model, "car"]
    .filter(Boolean)
    .join(" ")

  return `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`
}
