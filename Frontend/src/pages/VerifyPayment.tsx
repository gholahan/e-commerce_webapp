import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useVerifyPayment } from "../feautures/checkout/useVerifyPayment";
import { useCartStore } from "../feautures/cart/cart.store";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const VerifyPayment = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const reference = params.get("reference");
  const clearCart = useCartStore((s) => s.clearCart);

  const { data, isLoading, isError, isSuccess } =
    useVerifyPayment(reference);

  // ✅ handle success safely
  useEffect(() => {
    if (isSuccess && data?.status === "success") {
      clearCart();

      const timer = setTimeout(() => {
        navigate("/");
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, data?.status, clearCart, navigate]);

  // ❌ invalid reference
  if (!reference) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Invalid payment link
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            We couldn’t find your payment reference.
          </p>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-red-600 text-white py-2 rounded-lg"
          >
            Back to Checkout
          </button>
        </div>
      </div>
    );
  }

  const isFailed =
    !isLoading &&
    (isError ||
      data?.status === "failed" ||
      data?.status === "abandoned");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 text-center">

        {/* 🔄 Loading */}
        {isLoading && (
          <>
            <Loader2 className="w-10 h-10 animate-spin text-gray-700 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-800">
              Verifying payment...
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Please wait a moment
            </p>
          </>
        )}

        {/* ❌ Failed */}
        {isFailed && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-red-600 mb-2">
              Payment not completed
            </h2>
            <p className="text-gray-500 text-sm mb-5">
              Your payment was cancelled or failed.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-red-600 text-white py-2 rounded-lg"
              >
                Try again
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg"
              >
                Go home
              </button>
            </div>
          </>
        )}

        {/* ✅ Success */}
        {isSuccess && data?.status === "success" && (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-green-600 mb-2">
              Payment successful
            </h2>

            <p className="text-gray-500 text-sm mb-4">
              Your order has been confirmed.
            </p>

            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mb-4 break-all">
              Ref: {reference}
            </div>

            <p className="text-xs text-gray-400">
              Redirecting...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyPayment;
