import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { AuthContext } from "../../context/AuthContext";

export default function Cart() {
  const {
    fetchCarts,
    cartItems,

    updateQuantity,
    handleRemoveFromCart,
  } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  async function handleCheckOut() {
    navigate("/payment");
  }

  //fetching carts
  useEffect(() => {
    fetchCarts();
  }, []);

  let totalPrice;
  if (cartItems.length > 0) {
    totalPrice = cartItems.reduce(
      (acc, curr) => acc + curr.productId?.price * curr.quantity,
      0
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-yellow-500 text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Please Login
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your cart.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Your Shopping Cart</h1>
            <p className="text-blue-100">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>

          {/* Cart Content */}
          <div className="p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Start adding some amazing products!
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cart Items */}
                {cartItems.map((product, index) => (
                  <div
                    key={product._id || index}
                    className="flex flex-col md:flex-row items-center bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition duration-200"
                  >
                    {/* Product Image */}
                    <div className="md:w-1/6 mb-4 md:mb-0">
                      <img
                        src={product.productId.image}
                        alt={product.productId.name}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shadow-md"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="md:w-3/6 md:pl-6 text-center md:text-left">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {product.productId.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.productId.description}
                      </p>
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                          {product.productId.brand}
                        </span>
                        <div className="flex items-center">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-gray-700 ml-1">
                            {product.productId.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="md:w-1/6 mt-4 md:mt-0">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() =>
                            updateQuantity(product.productId._id, -1)
                          }
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition duration-200"
                        >
                          <span className="text-lg font-bold">-</span>
                        </button>
                        <span className="text-lg font-semibold min-w-[2rem] text-center">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(product.productId._id, +1)
                          }
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition duration-200"
                        >
                          <span className="text-lg font-bold">+</span>
                        </button>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="md:w-1/6 mt-4 md:mt-0 text-center">
                      <p className="text-2xl font-bold text-gray-900 mb-3">
                        ${product.productId.price * product.quantity}
                      </p>
                      <button
                        onClick={() =>
                          handleRemoveFromCart(product.productId._id)
                        }
                        className="text-red-500 hover:text-red-700 font-medium text-sm transition duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {/* Order Summary */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 mt-8">
                  <div className="max-w-md ml-auto">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      Order Summary
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${totalPrice}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>

                      <div className="border-t border-gray-300 pt-3">
                        <div className="flex justify-between text-lg font-bold text-gray-900">
                          <span>Total</span>
                          <span>${totalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckOut}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
                    >
                      Proceed to Checkout
                    </button>

                    <button
                      onClick={() => navigate("/products")}
                      className="w-full mt-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
