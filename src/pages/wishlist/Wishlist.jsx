import { useContext, useEffect } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/cartContext";
import WishlistCard from "../../layouts/WishlistCard";
import Loading from "../../utility/Loading";

function Wishlist() {
  const { wishlist, getWishlist, handleRemoveFromWishlist, loading } =
    useContext(WishlistContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { handleAddToCart } = useContext(CartContext);

  useEffect(() => {
    getWishlist();
  }, []);

  if(loading) return <Loading/>

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Please login
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm p-12 max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600">
                Start adding items you love to your wishlist!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <WishlistCard
              wishlist={wishlist}
              handleAddToCart={handleAddToCart}
              handleRemoveFromWishlist={handleRemoveFromWishlist}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
