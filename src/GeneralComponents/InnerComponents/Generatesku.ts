export function generateSKU(category: string, brand: string) {
  const categoryCode = category.substring(0, 3).toUpperCase(); // Take first 3 letters of category
  const brandCode = brand.substring(0, 3).toUpperCase(); // Take first 3 letters of brand

  // Generate a random 4-digit number for productId
  const randomProductId = Math.floor(1000 + Math.random() * 9000); // Generates a random number between 1000 and 9999

  // Combine to create SKU
  const sku = `${categoryCode}${brandCode}${randomProductId}`;
  return sku;
}
