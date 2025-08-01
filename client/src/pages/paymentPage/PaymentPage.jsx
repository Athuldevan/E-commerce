import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useAuth";


export default function PaymentPage() {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || "0.00";
  const navigate = useNavigate();
  const {cartItems = [], } = useCart()

  // const cartItems = location.state?.cartItems || [];
  // console.log(cartItems);

  function handleOrder() {
    alert("order placed sucess");
    navigate("/orders", {state : {cartItems, totalPrice}});
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Checkout Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Complete Your Purchase
          </h1>
          <p className="mt-2 text-gray-600">
            Secure payment processed with encryption
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Order Summary */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal (2 items)</p>
                <p className="text-gray-900">$298.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping</p>
                <p className="text-gray-900">Free</p>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <p className="font-medium text-gray-900">Total</p>
                <p className="font-bold text-lg text-gray-900">{totalPrice}</p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Payment Method
            </h2>

            {/* Credit Card */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <input
                  id="credit-card"
                  name="payment"
                  type="radio"
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  checked
                />
                <label
                  htmlFor="credit-card"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Credit Card
                </label>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Card number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4"></div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleOrder}
              className="w-full bg-indigo-600 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ${totalPrice}
            </button>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-6 flex justify-center space-x-8">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">256-bit Encryption</p>
          </div>
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">PCI Compliant</p>    



          </div>
        </div>
      </div>
    </div>
  );
}
