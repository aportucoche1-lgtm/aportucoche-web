export const getCarImage = (brand?: string, model?: string) => {
  const cleanBrand = brand?.trim() || ""
  const cleanModel = model?.trim() || ""

  if (cleanBrand && cleanModel) {
    return `https://source.unsplash.com/800x600/?${encodeURIComponent(
      `${cleanBrand} ${cleanModel} car`
    )}`
  }

  if (cleanBrand) {
    return `https://source.unsplash.com/800x600/?${encodeURIComponent(
      `${cleanBrand} car`
    )}`
  }

  return `https://source.unsplash.com/800x600/?car`
}
