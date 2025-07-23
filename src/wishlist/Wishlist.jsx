import useWishlist from "./useWishlist";
import useCart from "../cart/useCart";

import { HeartIcon as HeartSolid, XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {

  const { wishlist,removeItemFromWishlist} = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  function handleAddToCart(product) {
    addToCart(product);
  }

  function handleRemoveFromWishlist(product) {
    removeItemFromWishlist(product);
   

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
            Your Wishlist
          </h1>
          <div className="inline-block px-4 py-2 bg-pink-100 rounded-full">
            <span className="font-medium text-pink-700">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {wishlist?.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white hover:border-pink-200"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product?.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                {/* Remove button */}
                <button
                  onClick={() => handleRemoveFromWishlist(product)}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md hover:bg-pink-100 transition-colors"
                  title="Remove from wishlist"
                >
                  <XMarkIcon className="h-5 w-5 text-pink-600" />
                </button>
                {/* Rating badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 rounded-full flex items-center">
                  <span className="text-amber-500 font-bold mr-1">★</span>
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all hover:scale-105"
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-gradient-to-r from-amber-400 to-pink-400 text-white font-medium rounded-full hover:shadow-lg transition-all transform hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
