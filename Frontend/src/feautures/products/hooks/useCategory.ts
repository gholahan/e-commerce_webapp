import { getProductByCategory } from '../product.api';
import { useQuery } from '@tanstack/react-query';

const LIMIT = 24

export const useCategory = (categoryName: string, page: number) => {
     const{data, isLoading, isError} = useQuery({
     queryKey: ['category', categoryName],
     queryFn: () => getProductByCategory(categoryName as string, (page - 1) * LIMIT, LIMIT),
     enabled: !!categoryName,
  });
  return{
    data,
    isLoading,
    isError
  }
}

export default useCategory