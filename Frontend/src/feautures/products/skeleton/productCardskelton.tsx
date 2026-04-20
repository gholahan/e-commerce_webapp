const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      {/* Image */}
      <div className="aspect-square skeleton"></div>

      <div className="p-4">
        {/* Title */}
        <div className="h-4 w-3/4 mb-3 skeleton"></div>
        <div className="h-4 w-1/2 mb-4 skeleton"></div>

        {/* Price */}
        <div className="flex gap-2 mb-4">
          <div className="h-4 w-16 skeleton"></div>
          <div className="h-4 w-12 skeleton"></div>
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-4 skeleton"></div>
          ))}
        </div>

        {/* Button */}
        <div className="h-10 rounded-lg skeleton"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
