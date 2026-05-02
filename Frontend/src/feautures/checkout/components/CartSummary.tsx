import { toast } from "react-toastify";
import type { CartSummaryProps } from "../types";
import CartSummarySkeleton from "./CartSummarySkeleton";

const CartSummary = ({
  cartProducts,
  cart,
  subtotal,
  shipping,
  total,
  formik,
  isProcessing = false,
  loading,
  error,
  payError
}: CartSummaryProps) => {
  if (loading) {
    return <CartSummarySkeleton />;
  }
 if (error) {
    return (
      <div className="flex justify-center items-center text-xs">
        Error Loading your cart items
      </div>
    )
  }
  if (payError) {
   toast.error("Payment Error, Try Again Later")
  }
  return (
    <div className="w-full lg:w-110 text-sm font-medium lg:sticky lg:top-6 self-start">
      {cartProducts?.map((prod) => {
        const cartItem = cart.find((item) => item.product_id === prod.id);
        const quantity = cartItem?.quantity ?? 1;

        const discountedPrice =
          prod.price - prod.price * (prod.discountPercentage / 100);

        const itemTotal =
          Math.round(discountedPrice * quantity * 100) / 100;

        return (
          <div
            className="flex justify-between items-start mb-5 pb-4 border-b border-gray-300"
            key={prod.id}
          >
            <div className="flex gap-3 flex-1 min-w-0">
              <img
                src={prod.thumbnail}
                alt={prod.title}
                className="h-16 w-16 rounded object-cover"
              />
              <div className="min-w-0">
                <p className="font-medium text-sm text-gray-800 line-clamp-2">
                  {prod.title}
                </p>
                <p className="text-gray-600 text-xs">
                  Qty: {quantity}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="font-semibold">${itemTotal}</p>
            </div>
          </div>
        );
      })}

      <div className="flex justify-between mt-4">
        <p>Subtotal:</p>
        <span>${subtotal}</span>
      </div>

      <div className="flex justify-between mt-2">
        <p>Shipping:</p>
        <span>{shipping === 0 ? "Free" : shipping}</span>
      </div>

      <div className="flex justify-between mt-2 font-bold">
        <p>Total:</p>
        <span>${total}</span>
      </div>

      <div>
        <div className="flex items-center gap-2 mt-2.5">
          <input
            name="agree"
            type="checkbox"
            checked={formik.values.agree}
            onChange={formik.handleChange}
            className="w-4 h-4"
          />
          <label className="text-gray-600 text-sm">
            Agree to terms and condition
          </label>
        </div>

        {formik.touched.agree && formik.errors.agree && (
          <div className="text-sm text-red-600 mt-2">
            {formik.errors.agree as string}
          </div>
        )}
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded disabled:opacity-50"
          disabled={
            !(formik.isValid && formik.dirty) || isProcessing
          }
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
