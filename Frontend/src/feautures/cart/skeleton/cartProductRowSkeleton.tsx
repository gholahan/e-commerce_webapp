const CartProductRowSkeleton = () => {
  return (
    <div className="grid grid-cols-4 items-center gap-6 rounded-sm bg-white px-6 py-5 shadow-sm mt-4">
      
      {/* Product */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 skeleton"></div>

        <div className="space-y-2">
          <div className="h-4 w-32 skeleton"></div>
          <div className="h-3 w-20 skeleton"></div>
        </div>
      </div>

      {/* Price */}
      <div className="h-4 w-16 skeleton"></div>

      {/* Quantity */}
      <div className="h-8 w-16 skeleton"></div>

      {/* Subtotal + Trash */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-20 skeleton"></div>
        <div className="h-6 w-6 skeleton"></div>
      </div>
    </div>
  );
};

export default CartProductRowSkeleton;
