import { useParams, useSearchParams } from 'react-router-dom';
import {useCategory} from '../feautures/products/hooks/useCategory'
import ProductGrid from '../feautures/products/components/ProductGrid';
import Pagination from '../shared/components/Pagination';
import SideBar from '../feautures/products/components/SideBar';
 

const CategoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const { categoryName } = useParams();

  if (!categoryName) return <p>Category not found</p>;

  const { data, isLoading, isError } = useCategory(categoryName, page);
  const totalPages = data?.limit ? Math.ceil(data.total / data.limit) : 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    setSearchParams(params);
  };

  if (isLoading) {
    return (
      <div className="flex">
        <SideBar />
        <ProductGrid product={[]} loading={true} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex">
        <SideBar />
        <p className="text-center flex justify-center items-center h-64">
          Error loading the category product
        </p>
      </div>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 md:px-8 lg:px-16">
        <div className="text-center pt-6">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">{categoryName}</h1>
          <p className="text-gray-600 mt-2">Explore products in this category</p>
        </div>

        <ProductGrid product={data?.products ?? []} loading={isLoading} />

        {data?.products && data.products.length > 0 && totalPages > 1 && (
          <Pagination
            page={page}
            setPage={handlePageChange}
            hasNextPage={page < totalPages}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
