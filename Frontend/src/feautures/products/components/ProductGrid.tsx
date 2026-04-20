import type { Product } from "../types/product";
import ProductCard from "./ProuctCard";
import ProductCardSkeleton from "../skeleton/productCardskelton";

interface ProductsGridProp{
    product: Product[],
    loading:boolean
}

const ProductGrid = ({product,loading}:ProductsGridProp) => {
  return (
    <div className="bg-white p-4 mt-13">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : product?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}

export default ProductGrid