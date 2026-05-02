import type { Product } from "../types/product";
import { Eye, ShoppingCart, Star, Trash } from "lucide-react";
import { useFavoritesStore } from "../../favorites/favourite.store";
import { CiHeart } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { useCartStore } from "../../cart/cart.store";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discountPrice = Math.round(
    product.price - product.price * (product.discountPercentage / 100)
  );

  const {
    addToCart,
    added,
    removeFromCart,
    increaseCount,
    decreaseCount,
    // cart // not destructuring cart here as we use selector below
  } = useCartStore();

  // quantity of this product in cart (0 when not added)
  const quantity = useCartStore((state) =>
    state.cart.find((item) => item.product_id === product.id)?.quantity ?? 0
  );

  const addedToCart = added(product.id);

  const { addFavorite, removeFavorite, isFavorite } =
    useFavoritesStore();

  const liked = isFavorite(product.id);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < Math.floor(rating)
            ? "text-yellow-500 fill-yellow-500"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className=" text-sx group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

      {/* Image Section */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">

        {/* Discount Badge */}
        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full ">
          -{product.discountPercentage}%
        </span>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={() =>
              liked
                ? removeFavorite(product.id)
                : addFavorite(product.id)
            }
            className="bg-white p-2 rounded-full shadow hover:scale-105 transition"
          >
            {liked ? (
              <AiFillHeart size={17} className="text-red-500" />
            ) : (
              <CiHeart size={17} />
            )}
          </button>

          <button className="bg-white p-2 rounded-full shadow hover:scale-105 transition">
            <Eye size={18} />
          </button>
        </div>

        {/* Product Image */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-3">

        {/* Title */}
        <h3 className="font-medium text-xs mb-1 line-clamp-2">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-red-500">
            ${discountPrice}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ${product.price}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-1 text-sm font-medium">
          {renderStars(product.rating)}
          ({(product.rating * 10).toFixed(1)})
        </div>

        {/* Cart Section */}
        {!addedToCart ? (
          <button
            onClick={() => addToCart(product.id)}
            className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition"
          >
            <ShoppingCart size={16} />
            <span className="text-xs">Add to Cart</span>
          </button>
        ) : (
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-">
              <button
                onClick={() => decreaseCount(product.id)}
                disabled={quantity <= 1}
                className={`w-6 h-6 flex items-center justify-center rounded-full p-2 hover:bg-gray-500 bg-gray-300 transition ${
                  quantity <= 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                -
              </button>
            </div>
                 <span className="text-xs font-medium">{quantity}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => increaseCount(product.id)}
                className="w-6 h-6 flex items-center justify-center  hover:bg-gray-400 bg-gray-300 rounded-full transition"
              >
                +
              </button>
            </div>
            <button
                onClick={() => removeFromCart(product.id)}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 transition text-red-500"
                title="Remove from cart"
              >
                <Trash size={16} />
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
