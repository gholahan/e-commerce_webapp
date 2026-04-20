import { useQuery } from "@tanstack/react-query";
import { getSearch } from "../product.api";
import type { ProductRes } from "../types/productRes"; 
export const useSearchQuery = (page:number, query:string) => {
    const LIMIT = 24
     const { data, isLoading, isError } = useQuery<ProductRes>({
    queryKey: ['search', query, page],
    queryFn: () => getSearch(query, (page - 1) * LIMIT, LIMIT),
    enabled: query.length > 0,
  });
  return {
     data,
     isLoading,
     isError
  }
}