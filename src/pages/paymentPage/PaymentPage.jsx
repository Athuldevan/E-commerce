import React, { useContext, useState } from "react";
import { CheckoutContext } from "../../context/CheckoutContext";
import { OrderContext } from "../../context/orderContext";
import Loading from "../../utility/Loading";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [, setShowSuccessModal] = useState(false);
  const { checkoutItems, handleCheckout, loading } =
    useContext(CheckoutContext);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [error, setError] = useState("");

  console.log(checkoutItems);

  //  subtotal calculation
  const subtotal = checkoutItems.reduce((total, item) => {
    const price = +item.price;
    const quantity = +item.quantity;
    return total + price * quantity;
  }, 0);

  console.log(subtotal);

  const handlePlaceOrder = () => {
    if (paymentMethod === "credit-card") {
      // validate fields
      if (!cardNumber || !expiry || !cvv || !cardHolder) {
        setError("Please fill in all required card details.");
        return;
      }
    }

    setError(""); // clear error
    handleCheckout();
    setShowSuccessModal(true);
  };

  if (loading) return <Loading />;
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
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 text-sm"
                    required
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 text-sm"
                      required
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 text-sm"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 text-sm"
                    required
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
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
                      ${product.price * product.quantity}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between py-1">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-700">FREE</span>
              </div>

              <div className="flex justify-between py-2 font-bold border-t mt-2">
                <span className="text-gray-800">Total</span>
                <span className="text-blue-700"> ${subtotal}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
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
    </>
  );
};

export default PaymentPage;
