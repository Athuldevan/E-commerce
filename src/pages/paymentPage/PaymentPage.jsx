import React, { useContext,  useState } from "react";
import { CheckoutContext } from "../../context/CheckoutContext";
import { OrderContext } from "../../context/orderContext";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { checkoutItems, handleCheckout } = useContext(CheckoutContext);
  const {createOrder} = useContext(OrderContext)

  // Safe subtotal calculation
  const subtotal = checkoutItems.reduce((total, item) => {
    const price = item?.price || 0;
    const quantity = item?.quantity || 0;
    return total + price * quantity;
  }, 0);

  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

 
  const closeModal = () => {
    setShowSuccessModal(false);
  };


  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-2">
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Checkout
            </h1>
            <p className="text-gray-500 text-sm">Secure & Simple Payment</p>
          </header>
          <div className="grid grid-cols-1 gap-6">
            {/* Payment Details */}
            <section className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
              <h2 className="text-lg font-medium text-gray-700 mb-5">
                Payment Options
              </h2>
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setPaymentMethod("credit-card")}
                  className={`flex-1 border rounded-lg py-2 text-sm ${
                    paymentMethod === "credit-card"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  } transition`}
                >
                  Card
                </button>
                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex-1 border rounded-lg py-2 text-sm ${
                    paymentMethod === "paypal"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  } transition`}
                >
                  Cash
                </button>
              </div>
              {paymentMethod === "credit-card" && (
                <form className="space-y-3">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 text-sm"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 text-sm"
                  />
                </form>
              )}
              {paymentMethod === "paypal" && (
                <div className="text-center py-8 bg-gray-100 rounded mt-2">
                  <span className="text-gray-800 text-base font-medium">
                    Cash on Delivery
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    Pay with cash when you receive your order.
                  </p>
                </div>
              )}
            </section>
            {/* Order Summary */}
            <section className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-lg font-medium text-gray-700 mb-5">
                Order Summary
              </h2>
              <ul className="divide-y divide-gray-100 mb-5">
                {checkoutItems.map((product) => (
                  <li key={product.name} className="flex items-center py-3">
                    <img
                      src={product?.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded mr-3 bg-gray-100 border"
                    />
                    <div className="flex-1">
                      <div className="text-gray-800 text-sm font-medium">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.description}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mx-2">
                      x{product.quantity}
                    </div>
                    <div className="text-sm text-gray-900 font-semibold">
                      ${(product.price * product.quantity).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-sm py-2 border-t">
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-700">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-700">FREE</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Tax</span>
                  <span className="text-gray-700">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold border-t mt-2">
                  <span className="text-gray-800">Total</span>
                  <span className="text-blue-700">${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition"
              >
                Place Order
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                By placing your order, you agree to our Terms
              </p>
            </section>
          </div>
        </div>
      </div>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-xs w-full p-6 text-center animate-scaleIn">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg
                className="w-8 h-8 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Order Complete!
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Thank you for shopping with us.
            </p>
            <div className="bg-gray-50 rounded p-3 mb-3 text-left text-xs">
              <div className="flex justify-between mb-1">
                <span className="text-gray-500">Total:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500">Paid by:</span>
                <span>
                  {paymentMethod === "credit-card"
                    ? "Credit Card"
                    : "Cash on Delivery"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Items:</span>
                <span>{checkoutItems.length}</span>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="w-full py-2 rounded bg-gray-200 text-gray-800 font-medium mt-2 hover:bg-gray-300 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* Minimal animation */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
};

export default PaymentPage;
