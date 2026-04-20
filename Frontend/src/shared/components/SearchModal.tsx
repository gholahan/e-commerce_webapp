import { X } from "lucide-react";
import ProductGrid from '../../feautures/products/components/ProductGrid';
import { useSearchPreview } from "../../feautures/products/hooks/useSearchPreview";

interface SearchModalProps {
  search: string;
  onClose: () => void;
}

const SearchModal = ({ search, onClose }: SearchModalProps) => {
  const {isLoading, data, handleViewAll} = useSearchPreview(search, onClose)


  return (
    <div
    className="mt-27 fixed inset-0 z-9999 flex items-start justify-center bg-black/30 backdrop-blur-[2px]"
    onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-6xl max-h-[55vh] overflow-y-auto bg-white rounded shadow-xl p-3 border border-gray-200 "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-800">
            Search results for "<span className="text-blue-600">{search}</span>"
          </h3>
          <button
            onClick={onClose}
            className="text-red-600 hover:text-red-800 transition-colors"
            aria-label="Close search modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        {data?.products && data.products.length > 0 ? (
          <ProductGrid product={data.products.slice(0, 4)} loading={isLoading}/>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No products found for "{search}"</p>
            <p className="text-sm mt-2">Try searching with different keywords</p>
          </div>
        )}

        {data?.products && data.products.length > 0 && (
        <div className="sticky bottom-0 flex justify-center mt-3 pt-2">
          <button
            type="button"
            onClick={handleViewAll}
            className="px-5 py-2 text-white bg-red-600 font-semibold rounded hover:bg-red-700 hover:text-white transition-colors duration-200"
          >
            See All →
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default SearchModal;
