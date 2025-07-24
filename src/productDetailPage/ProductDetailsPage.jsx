import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  StarIcon,
  HeartIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import useCart from "../cart/useCart";
import useWishlist from "../wishlist/useWishlist";

const ProductDetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { addToCart } = useCart();
  const { handleWishList, isExist , wishlist} = useWishlist();

  const navigate = useNavigate();

  const { id } = useParams();
  const { state } = useLocation();
  const product = state.product;
  console.log(product);

  //   const addToCart = () => {
  //     // Add to cart logic here
  //     alert(`Added ${quantity} ${product.name} to cart`);
  //   };

return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-neutral-600 hover:text-neutral-900 mb-6 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          <span className="font-medium">Back to products</span>
        </button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Product Images */}
          <div className="mb-8 lg:mb-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 border border-neutral-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain p-4"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? "border-amber-500 scale-105"
                      : "border-transparent hover:border-neutral-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${index}`}
                    className="w-full h-20 object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="px-4">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-amber-600">
                {product.brand}
              </h2>
              <h1 className="text-3xl font-bold text-neutral-900 mt-1">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`h-5 w-5 ${
                      rating < Math.floor(product.rating)
                        ? "text-amber-400"
                        : "text-neutral-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-neutral-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mb-8">
              <p className="text-neutral-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-10">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 rounded-l-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-neutral-200 font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 rounded-r-lg transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg flex items-center justify-center font-medium transition-colors shadow-sm hover:shadow-md"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>

                <button
                  onClick={() => handleWishList(product)}
                  className="p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <HeartIcon
                    className={`h-6 w-6 transition-colors ${
                      isExist
                        ? "text-rose-500 fill-current"
                        : "text-neutral-400 hover:text-rose-300"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Shipping & Returns
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Free shipping on all orders. 30-day return policy. International
                shipping available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
