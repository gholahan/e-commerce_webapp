import ProductGrid from "../feautures/products/components/ProductGrid";
import Pagination from '../shared/components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useSearchQuery } from "../feautures/products/hooks/useSearchQuery";

const SearchPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const {data, isLoading, isError} = useSearchQuery(page,query)

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(newPage));
      return prev;
    });
  };

  const totalPages = data?.total ? Math.ceil(data.total / 24) : 1;

  if (!query) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No search query provided</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading search results</p>
      </div>
    );
  }

  return (
    <div> 
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Search Results for "<span className="text-blue-600">{query}</span>"
        </h2>
        {data?.products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No products found</p>
            <p className="text-sm mt-2">Try searching with different keywords</p>
          </div>
        ) : (
          <>
            <ProductGrid product={data?.products ?? []} loading={isLoading}/>
            
            {totalPages > 1 && (
              <Pagination
                page={page}
                setPage={handlePageChange}
                hasNextPage={page < totalPages}
                totalPages={totalPages}
              />
            )}
          </>
        )}
      </div>
  );
};

export default SearchPage;