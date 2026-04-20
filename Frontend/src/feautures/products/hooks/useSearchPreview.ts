import { useQuery } from '@tanstack/react-query';
import { getSearch } from '../product.api';
import type { ProductRes } from '../types/productRes';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export const useSearchPreview = (search: string, onClose :()=> void) => {
      const [debounced, setDebounced] = useState(search);
  const navigate = useNavigate();

  useEffect(() => {
   const timer = setTimeout(()=> setDebounced(search), 1000);
   return () => clearTimeout(timer)
  }, [search]);

  const { data, isLoading } = useQuery<ProductRes>({
    queryKey: ['search', debounced],
    queryFn: () => getSearch(debounced, 0, 0),
    enabled: debounced.length > 2,
  });

  const handleViewAll = () => {
    navigate(`/search?q=${encodeURIComponent(debounced)}&page=1`);
    onClose();  
  };
  return{
    data,
    isLoading,
    handleViewAll
  }
}

