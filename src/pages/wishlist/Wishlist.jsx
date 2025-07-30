import useWishlist  from "../../hooks/useWishlist";
import useCart from "../../hooks/useCart";
import { HeartIcon as HeartSolid, XMarkIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";


import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, removeItemFromWishlist } = useWishlist();

  const { addToCart } = useCart();
  const navigate = useNavigate();

  function handleAddToCart(product) {
    addToCart(product);
  }

  function handleRemoveFromWishlist(product) {
    removeItemFromWishlist(product);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Wishlist
          </h1>
          <div className="inline-flex items-center px-6 py-2 bg-white rounded-full shadow-sm">
            <HeartSolid className="h-5 w-5 text-rose-500 mr-2" />
            <span className="font-medium text-gray-700">
              {wishlist?.length} {wishlist?.length === 1 ? "item" : "items"} saved
            </span>
          </div>
        </div>

        {/* Products Grid */}
        {wishlist?.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-6">
              <HeartIconOutline className="h-full w-full" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Start saving your favorite items
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist?.map((product) => (
              <div
                key={product?.id}
                className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product?.images[0] || product?.image || ''}
                    alt={product?.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(product)}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                    title="Remove from wishlist"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-600 hover:text-rose-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product?.name}
                    </h3>
                    <div className="flex items-center bg-amber-50 px-2 py-1 rounded">
                      <StarIcon className="h-4 w-4 text-amber-400 mr-1" />
                      <span className="text-xs font-medium text-amber-800">
                        {product?.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product?.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      ${product?.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
                    >
                      <ShoppingCartIcon className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Shopping Button */}
        {wishlist?.length > 0 && (
          <div className="text-center mt-16">
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
