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
              <p className=" text-xs flex justify-center items-center h-64">
                Error Loading your wishlist items 
              </p>
          )
        }
  
  return (
    <div className="mt-6">
      <div>
          {
            favorites.length > 0 ? (
               <>
               <div className="relative flex justify-between">
                <p >Wishlist ({favorites.length})</p>
                <button 
                  onClick={handleAddAllToCart}
                  className=" cursor-pointer absolute top-0 right-0 text-sm inline-flex items-center justify-center shadow-md px-4 py-2 bg-slate-500 text-white rounded-lg hover:scale-105 transition-all duration-200"
                >
                    Add all to cart
                </button>
                </div>
              <div>
          <ProductGrid product={likedProducts} loading={isLoading}/>
        </div>
               </>
            ) : (
              <p>you have no liked products </p>
            )
          }
      </div>
    </div>
  )
}

export default Wishlist