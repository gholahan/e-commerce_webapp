// features/cart/utils/cart.utils.ts
import type { Product } from "../products/types/product";

// Calculate discounted price for a single product
export const calculateDiscountedPrice = (price: number, discountPercentage: number): number => {
  return Math.round(price - price * (discountPercentage / 100));
};

// Calculate subtotal for the cart
export const calculateSubtotal = (
  cart: { id: number; quantity: number }[],
  products: Product[]
): number => {
  // Build a fast lookup map: productId -> product
  const productMap = new Map(products.map((p) => [p.id, p]));

  return cart.reduce((acc, item) => {
    const product = productMap.get(item.id);
    if (!product) return acc;

    const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
    return acc + discountedPrice * item.quantity;
  }, 0);
};

// Calculate total including shipping (future: taxes, coupons)
export const calculateTotal = (subtotal: number, shipping: number = 0): number => {
  return subtotal + shipping;
};
