import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const { handleAddToCart } = useContext(CartContext);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setProduct(location.state);
    }
  }, [location.state]);

  console.log("Product:", product); // DEBUG

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {product.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Product Image Section */}
              <div className="relative bg-gray-50 p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-contain transition-transform duration-300 hover:scale-105"
                />
                {/* Wishlist Icon */}
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
                  <HeartOutline className="h-6 w-6 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Product Details Section */}
              <div className="p-6 space-y-4">
                {/* Brand */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    {product.brand}
                  </span>
                  <div className="flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                      {"★".repeat(Math.floor(product.rating))}
                      {"☆".repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.rating})
                    </span>
                  </div>
                </div>

                {/* Product Name */}
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                    20% OFF
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed border-t border-b border-gray-100 py-4">
                  {product.description}
                </p>

                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
