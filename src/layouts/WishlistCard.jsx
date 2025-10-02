function WishlistCard({ wishlist, handleAddToCart, handleRemoveFromWishlist }) {
  console.log(wishlist);
  return (
    <>
      {wishlist.map((product) => (
        <div
          key={product.productId._id}
          className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-50">
            <img
              src={product?.productId?.image}
              alt={product.productId.name}
              className="w-full h-full object-cover"
            />

            {/* HEART ICON SVG */}
            <div className="absolute top-3 right-3">
              <button
                onClick={() => handleRemoveFromWishlist(product.productId._id)}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform duration-200"
              >
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-5">
            {/* Product Name */}
            <h3 className="font-semibold text-gray-900 text-base tracking-tight line-clamp-2 mb-2">
              {product.productId.name}
            </h3>

            {/* Description */}
            <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
              {product.productId.description}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-3.5 h-3.5 ${
                      index < Math.floor(product.productId.rating)
                        ? "fill-current"
                        : "text-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                ({product.productId.rating})
              </span>
            </div>

            {/* Price and Button */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">
                ${product.productId.price}
              </span>
              <button
                onClick={() => handleAddToCart(product.productId._id)}
                className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-medium hover:bg-gray-800 transition-all duration-200 active:scale-95"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default WishlistCard;