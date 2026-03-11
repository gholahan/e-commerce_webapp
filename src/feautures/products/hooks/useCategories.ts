import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../product.api';

export const useCategories = () => {
     const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    gcTime: 1000 * 60 * 30 ,
  });
  return {
    categories
  }
}

