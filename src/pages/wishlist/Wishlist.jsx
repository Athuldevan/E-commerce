import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWishlist from "../../hooks/useWishlist";

import { HeartIcon as HeartSolid, XMarkIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { CartContext } from "../../context/cartContext";

export default function Wishlist() {
  const { removeItemFromWishlist } = useWishlist();
  const { getWishlist, wishlist } = useContext(WishlistContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { handleAddToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      getWishlist();
    }
  }, [isLoggedIn]);

  const handleRemoveFromWishlist = (product) => {
    removeItemFromWishlist(product);
    toast.info(`${product.productId.name} removed from wishlist`, {
      autoClose: 2000,
    });
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.productId._id || product.productId.id}`);
  };

  // Render stars for rating
  const renderRatingStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <StarIcon
        key={index}
        className={`h-5 w-5 ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
        aria-hidden="true"
      />
    ));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <HeartIconOutline
            className="mx-auto h-16 w-16 text-indigo-600"
            aria-hidden="true"
          />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Please Log In
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Sign in to view and manage your wishlist.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white text-base font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Navigate to login page"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 text-base font-medium rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Continue shopping"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty wishlist state
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <HeartIconOutline
            className="mx-auto h-16 w-16 text-indigo-600"
            aria-hidden="true"
          />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Your Wishlist is Empty
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Discover products you'll love and add them to your wishlist!
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 inline-flex items-center px-6 py-3 bg-indigo-600 text-white text-base font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Continue shopping"
          >
            Explore Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            My Wishlist
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => {
            const product = item.productId;
            console.log(product);
            return (
              <div
                key={item._id || product._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                role="article"
                aria-label={`Wishlist item: ${product.name}`}
              >
                {/* Product Image */}
                <div className="relative aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => handleProductClick(item)}
                    loading="lazy"
                  />
                  {/* Remove from Wishlist Button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(item)}
                    className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  {/* Wishlist Heart Icon */}
                  <HeartSolid
                    className="absolute top-3 left-3 h-6 w-6 text-red-500"
                    aria-hidden="true"
                  />
                </div>

                {/* Product Info */}
                <div className="p-5">
                  {/* Brand */}
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {product.brand || "Unknown Brand"}
                  </p>

                  {/* Product Name */}
                  <h3
                    className="mt-1 text-lg font-semibold text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors duration-200 line-clamp-2"
                    onClick={() => handleProductClick(item)}
                  >
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="mt-2 flex items-center">
                    <div
                      className="flex items-center"
                      aria-label={`Rating: ${product.rating || 0} stars`}
                    >
                      {renderRatingStars(product.rating || 0)}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      ({product.rating || 0})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-3">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCartIcon
                        className="h-5 w-5 mr-2"
                        aria-hidden="true"
                      />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleAddToCart(product?._id)}
                      className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      aria-label={`View details of ${product.name}`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center px-8 py-3 bg-white text-gray-700 text-base font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Continue shopping"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
