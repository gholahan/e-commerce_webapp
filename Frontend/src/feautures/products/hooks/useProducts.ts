import { useQuery } from "@tanstack/react-query";
import { fetchAllProduct } from "../product.api";
import type { ProductRes } from "../types/productRes";

const LIMIT = 24;

export const useProducts = (page: number) => {
  const query = useQuery<ProductRes>({
    queryKey: ["products", page],
    queryFn: () => fetchAllProduct((page - 1) * LIMIT, LIMIT),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });

  const products = query.data?.products ?? [];
  const totalPages = query.data
    ? Math.ceil(query.data.total / LIMIT)
    : 1;

  return {
    products,
    totalPages,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
