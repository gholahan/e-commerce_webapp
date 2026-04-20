import ProductGrid from "./ProductGrid";
import Pagination from "../../../shared/components/Pagination";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

const HomePageGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1', 10);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(newPage));
      return prev;
    });
  };

  const { products, isLoading, isError, totalPages } = useProducts(page);

  if (isError) {
    return <div className="flex text-sm justify-center items-center h-screen">Something went wrong reload page </div>
  }

  return (
    <div>
      {/* <div className="mt-6 ml-6">
        <img
          src="/public/images/homePage.jpg"
          alt="Top showcase"
          className="w-full h-auto object-cover shadow-md"
        />
      </div> */}

      <ProductGrid product={products} loading={isLoading} />

      {products.length > 0 && totalPages > 1 && (
        <Pagination
          page={page}
          setPage={handlePageChange}
          hasNextPage={page < totalPages}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default HomePageGrid;
