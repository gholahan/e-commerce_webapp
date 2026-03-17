import CartProductRow from "../feautures/cart/component/CartProductRow"
import { Link } from "react-router-dom"
import { useCartProducts } from "../feautures/cart/useCartProducts"

const CartPage = () => {
  const {
    cartProducts,
    isLoading,
    isError,
    subtotal,
    shipping,
    total,
    cart,
  } = useCartProducts()

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-xs">
        Error Loading your cart items
      </div>
    )
  }

  if (isLoading) {
    return <CartProductRow products={[]} loading={isLoading} />
  }

  // Empty cart AFTER loading
  if (cart.length === 0) {
    return (
      <p className="text-center h-35">
        You have no products.{" "}
        <Link
          to="/"
          className="underline text-red-400 hover:text-red-700"
        >
          Move to home
        </Link>
      </p>
    )
  }

  return (
    <>
      {/* Header */}
      <header className="hidden sm:grid grid-cols-4 font-bold text-base text-black py-4 px-5 bg-white shadow-sm rounded-sm">
        <div>Product</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Subtotal</div>
      </header>

      <CartProductRow products={cartProducts} loading={false} /> 

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 justify-between mt-8">
        <button className="text-black font-medium py-3 px-5 border border-gray-300 rounded">
          Return to shop
        </button>
        <button className="text-black font-medium py-3 px-5 border border-gray-300 rounded">
          Update cart
        </button>
      </div>

      {/* Totals */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mt-9">
       <div className="flex gap-3 w-full lg:w-auto">
        <input
          type="text"
          placeholder="Coupon code"
          className="min-w-0 flex-1 text-gray-600 py-2 px-4 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-gray-800"
        />
        <button className="shrink-0 text-white bg-[#DB4444] hover:bg-[#E07575] text-sm py-2 px-5 rounded">
          Apply
        </button>
      </div>
        <div className="w-full lg:w-100 rounded-lg border border-gray-600 p-4">
          <h2 className="text-lg font-semibold text-black mb-2">
            Cart Total
          </h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <hr className="border-gray-400 mb-5" />

          <div className="flex justify-between mb-3.5">
            <span>Shipping:</span>
            <span>
              {shipping === 0
                ? "Free"
                : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <hr className="border-gray-400 mb-4" />

          <div className="flex justify-between font-medium mb-7">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="flex justify-center">
            <Link
              to="/cart/checkout"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-md text-sm font-medium transition active:scale-95"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage
