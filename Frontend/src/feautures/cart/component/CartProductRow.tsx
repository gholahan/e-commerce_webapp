import type { Product } from "../../products/types/product"
import { useCartStore } from "../cart.store"
import { Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import CartProductRowSkeleton from "../skeleton/cartProductRowSkeleton"

interface CartProductRowProps {
  products: Product[]
  loading: boolean
}

const CartProductRow = ({ products, loading }: CartProductRowProps) => {
  if (loading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, i) => (
          <CartProductRowSkeleton key={i} />
        ))}
      </>
    )
  }

  return (
    <>
      {products.map((item) => (
        <CartProductRowItem key={item.id} item={item} />
      ))}
    </>
  )
}

function CartProductRowItem({ item }: { item: Product }) {
  const { increaseCount, decreaseCount, removeFromCart, cart, setQuantity } =
    useCartStore()

  const cartItem = cart.find((c) => c.id === item.id)
  if (!cartItem) return null

  const quantity = cartItem.quantity

  // ✅ FIXED — no rounding
  const discountPrice =
    item.price - item.price * (item.discountPercentage / 100)

  const subtotal = discountPrice * quantity

  const [inputValue, setInputValue] = useState(String(quantity))

  useEffect(() => {
    setInputValue(String(quantity))
  }, [quantity])

  const handleChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "")
    if (raw === "") {
      setInputValue("")
      return
    }
    setInputValue(digits)
  }

  const commit = () => {
    const val = inputValue.replace(/\D/g, "")
    if (!val || Number(val) < 1) {
      setQuantity(item.id, 1)
      setInputValue("1")
    } else {
      setQuantity(item.id, Number(val))
    }
  }

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-4 font-light text-gray-800 gap-3 sm:gap-4 rounded-sm bg-white px-4 sm:px-6 py-1 shadow-sm mt-3">
      
      {/* Product */}
      <div className="flex items-center gap-3">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-14 w-14 rounded object-cover shrink-0"
        />
        <div className="min-w-0">
          <p className="text-xs font-medium truncate">{item.title}</p>
          <p className="text-gray-600 text-xs">{item.category}</p>
        </div>
      </div>

      <div className="flex sm:contents items-center justify-between gap-4">
        
        {/* Price */}
        <div className="text-sm items-center flex font-bold">
          ${discountPrice.toFixed(2)}
        </div>

      {/* Quantity */}
      <div className="flex items-center border border-gray-300 rounded w-10 h-10 overflow-hidden">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          className="w-6 h-full text-center text-[11px] focus:outline-none"
          onChange={(e) => handleChange(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              commit()
            }
          }}
        />

        <div className="flex flex-col w-4 h-full">
          <button
            onClick={() => increaseCount(item.id)}
            className="flex-1 text-[9px] hover:bg-gray-100 transition"
          >
            ▲
          </button>

          <button
            onClick={() => decreaseCount(item.id)}
            disabled={quantity <= 1}
            className="flex-1 text-[9px] hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ▼
          </button>
        </div>
      </div>



        {/* Subtotal + Remove */}
        <div className="flex items-center gap-2 ml-auto sm:ml-0 sm:justify-between sm:w-full">
          <span className="text-sm
            text-right sm:text-left font-bold">
            ${subtotal.toFixed(2)}
          </span>
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartProductRow
