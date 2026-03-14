import { useFavoritesProducts } from "../feautures/favorites/useFavorites"
import ProductGrid from "../feautures/products/components/ProductGrid"
import { useCartStore } from "../feautures/cart/cart.store"

const Wishlist = () => {
   const{ favorites, likedProducts, isLoading, isError } = useFavoritesProducts();
   const { addToCart, added } = useCartStore();

   const handleAddAllToCart = () => {
     favorites.forEach(id => {
       if (!added(id)) {
         addToCart(id);
       }
     });
   };

         if (isError) {
          return (
              <p className="flex justify-center items-center h-64">
                Error Loading your wishlist items
              </p>
          )
        }
  
  return (
    <div className="mt-6">
      <div>
          <div className="relative flex justify-between">
           <p className="">Wishlist ({favorites.length})</p>
           <button 
             onClick={handleAddAllToCart}
             className="absolute top-0 right-0 inline-flex items-center justify-center shadow-md px-12 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200"
           >
               Add all to cart
           </button>
          </div>
        <div>
          <ProductGrid product={likedProducts} explore={false} loading={isLoading}/>
        </div>
      </div>
    </div>
  )
}

export default Wishlist