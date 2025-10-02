import { HeartIcon } from "@heroicons/react/24/solid";

function ProductCard({
  product,
  handleAddToCart,
  handleAddToWishlist,
  getProductById,
}) {
  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
      key={product.name}
    >
      {/* Wishlist Button */}
      <button
        onClick={() => handleAddToWishlist(product._id)}
        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:scale-110"
      >
        <HeartIcon className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
      </button>

      {/* Product Image */}
      <div 
        className="aspect-square w-full overflow-hidden bg-gray-50 cursor-pointer"
        onClick={() => getProductById(product?._id)}
      >
        <img
          src={product?.images?.[0] || product.image}
          alt="Product image"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">
        {/* Product Name & Price */}
        <div className="mb-2">
          <h3 className="text-base font-semibold text-gray-900 tracking-tight line-clamp-1 mb-1">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-gray-900">
            ${product.price}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Rating & Add to Cart */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
            {product.rating} ★
          </span>
          <button
            type="button"
            onClick={() => handleAddToCart(product._id)}
            className="flex-1 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white hover:bg-gray-800 transition-all duration-200 active:scale-95"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;