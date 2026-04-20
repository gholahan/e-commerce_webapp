import { useCartStore } from "../cart/cart.store";

const CartSummarySkeleton = () => {
  const cart = useCartStore(state => state.cart);

  return (
    <div className="w-120 text-sm font-medium">
      {Array.from({ length: cart.length || 3 }).map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-start mb-5 pb-4 border-b border-gray-300"
        >
          <div className="flex gap-3 flex-1">
            <div className="h-16 w-16 skeleton"></div>

            <div className="space-y-2 flex-1">
              <div className="h-4 w-40 skeleton"></div>
              <div className="h-3 w-20 skeleton"></div>
            </div>
          </div>

          <div className="h-4 w-16 skeleton"></div>
        </div>
      ))}

      {/* Subtotal */}
      <div className="flex justify-between mt-4">
        <div className="h-4 w-20 skeleton"></div>
        <div className="h-4 w-16 skeleton"></div>
      </div>

      {/* Shipping */}
      <div className="flex justify-between mt-2">
        <div className="h-4 w-20 skeleton"></div>
        <div className="h-4 w-16 skeleton"></div>
      </div>

      {/* Total */}
      <div className="flex justify-between mt-2">
        <div className="h-5 w-16 skeleton"></div>
        <div className="h-5 w-20 skeleton"></div>
      </div>

      {/* Button */}
      <div className="mt-6">
        <div className="h-10 w-full skeleton"></div>
      </div>
    </div>
  );
};

export default CartSummarySkeleton;

