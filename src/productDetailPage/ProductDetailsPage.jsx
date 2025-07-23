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
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to products
        </button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Product Images */}
          <div className="mb-8 lg:mb-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setSelectedImage((selectedImage) => selectedImage + 1)
                  }
                  className={`bg-white rounded-md shadow-sm overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${index}`}
                    className="w-full h-20 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="px-4">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {product.brand}
              </h2>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-1">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`h-5 w-5 ${
                      rating < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-8">
              {/* <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product?.discountPrice?.toFixed(2)}
                </span>
                {product?.discountPrice < product?.price && (
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ${product?.price?.toFixed(2)}
                  </span>
                )}
                {product?.discountPrice < product?.price && (
                  <span className="ml-2 text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                    {Math.round(
                      (1 - product?.discountPrice / product?.price) * 100
                    )}
                    % OFF
                  </span>
                )}
              </div> */}

              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md flex items-center justify-center"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>

                <button
                  onClick={() => handleWishList(product)}
                  className="p-3 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  <HeartIcon
                    className={`h-6 w-6 ${
                      isExist  ? "text-red-500 fill-current" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Shipping & Returns
              </h3>
              <p className="text-gray-600">
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
