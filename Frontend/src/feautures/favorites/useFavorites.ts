import { useQueries } from "@tanstack/react-query";
import { useFavoritesStore } from "./favourite.store";
import { eachProduct } from "../products/product.api";
import type { Product } from "../products/types/product";

export const useFavoritesProducts = () => {
  const favorites = useFavoritesStore((s) => s.favorites);

  const likedProductQueries = useQueries({
    queries: favorites.map((id: number) => ({
      queryKey: ["likedProduct", id],
      queryFn: () => eachProduct(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 5 // 5 minutes
    })),
  });

  const likedProducts = likedProductQueries
    .map((q) => q.data)
    .filter(Boolean) as Product[];

  const isLoading = likedProductQueries.some(
    (q) => q.isLoading || q.isFetching
  );

  const isError = likedProductQueries.some((q) => q.isError);

  return {
    favorites,
    likedProducts,
    isLoading,
    isError,
  };
};
