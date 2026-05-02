import { useQueries } from "@tanstack/react-query";
import { eachProduct } from "../products/product.api";
import type { Product } from "../products/types/product";
import { calculateSubtotal, calculateTotal } from "./cart.utils";
import { useCartStore } from "./cart.store";

export const useCartProducts = () => {
  const cart = useCartStore(s=>s.cart);
  const cartIds = cart.map((item) => item.product_id);

  // Fetch products
  const cartProductQueries = useQueries({
    queries: cartIds.map((id) => ({
      queryKey: ["cartProduct", id],
      queryFn: () => eachProduct(id),
      enabled: !!id,
    })),
  });

  const cartProducts = cartProductQueries
    .map((q) => q.data)
    .filter(Boolean) as Product[];

  const isLoading = cartProductQueries.some((q) => q.isLoading || q.isFetching);
  const apiError = cartProductQueries.some((q) => q.isError);

  // Business logic: subtotal, total, shipping
  const subtotal = calculateSubtotal(cart, cartProducts);
  const shipping = 0; // you can make dynamic later
  const total = calculateTotal(subtotal, shipping);

  return {
    cart,
    cartProducts,
    isLoading,
    apiError,
    subtotal,
    shipping,
    total,
  };
};
