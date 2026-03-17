import { useParams, useSearchParams } from 'react-router-dom';
import {useCategory} from '../feautures/products/hooks/useCategory'
import ProductGrid from '../feautures/products/components/ProductGrid';
import Pagination from '../shared/components/Pagination';
 

const CategoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const {categoryName } = useParams()
  if(!categoryName) return
  const {data,isLoading} = useCategory(categoryName,page)
   const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(newPage));
      return prev;
    });
  };
  return (
    <>
      <div className="text-center pt-6">
        <h1 className="text-3xl font-bold text-gray-800 capitalize">{categoryName}</h1>
        <p className="text-gray-600 mt-2">Explore products in this category</p>
      </div>

      <ProductGrid product={data?.products ?? []}  loading={isLoading}/>

      {data?.products && data.products.length > 0 && totalPages > 1 && (
        <Pagination
          page={page}
          setPage={handlePageChange}
          hasNextPage={page < totalPages}
          totalPages={totalPages}
        />
      )}
    </>
  )
}

export default CategoryPage