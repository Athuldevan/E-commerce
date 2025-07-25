import OrderHistory from "./OrderHistory";
import useOrders from "../../customHooks/useOrders";

export default function OrderPage() {
  const { activeTab, setActiveTab, latestOrder, pastOrders } = useOrders();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-gray-600">
            View your order history and track recent purchases
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("recent")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "recent"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Recent Order
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "history"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Order History
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {activeTab === "recent" ? (
            <>
              {/* Recent Order Tab */}
              <div className="p-6 border-b border-gray-200 bg-indigo-50">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Recent Order
                </h2>
                <div className="flex flex-wrap justify-between items-center mt-2">
                  <p className="text-gray-700">
                    Order :
                    <span className="font-medium">{latestOrder[0]?.id}</span>
                  </p>
                  <p className="text-gray-700">
                    Date:{" "}
                    <span className="font-medium">{latestOrder[0]?.date}</span>
                  </p>
                  <div className="flex items-center">
                    <span className="text-gray-700 mr-2">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        latestOrder[0]?.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {latestOrder[0]?.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Items
                </h3>
                <ul className="divide-y divide-gray-200">
                  {latestOrder[0]?.items.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <img
                        className="h-20 w-20 rounded-md object-cover"
                        src={item?.image}
                        alt={item?.name}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100";
                        }}
                      />
                      <div className="ml-4 flex-1 flex flex-col sm:flex-row justify-between">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">
                            {item?.name}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="mt-1 text-base font-medium text-gray-900">
                          ₹{(item?.price * item?.quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-gray-900">₹{latestOrder[0]?.total}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-gray-600">Shipping</p>
                  <p className="text-gray-900">Free</p>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <p className="font-medium text-gray-900">Total</p>
                  <p className="font-bold text-lg text-gray-900">
                    ₹{latestOrder[0]?.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Shipping Address
                </h3>
                <p className="text-gray-700">
                  {/* {latestOrder[0]?.shippingAddress} */}
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Order History Tab */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Past Orders
                  {<OrderHistory pastOrders={pastOrders} />}
                </h2>
                {/* <div className="space-y-6">
                  {pastOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg"
                    >
                      <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="mb-2 sm:mb-0">
                            <p className="text-gray-700">
                              Order #:{" "}
                              <span className="font-medium">{order.id}</span>
                            </p>
                            <p className="text-sm text-gray-500">
                              Placed on {order.date}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <p className="text-gray-700">
                              Total:{" "}
                              <span className="font-medium">
                                ₹{order.total.toFixed(2)}
                              </span>
                            </p>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="mb-4">
                          <h3 className="font-medium text-gray-900 mb-2">
                            Items
                          </h3>
                          <ul className="divide-y divide-gray-200">
                            {order.items.map((item) => (
                              <li
                                key={item.id}
                                className="py-3 flex items-center"
                              >
                                <img
                                  className="h-16 w-16 rounded-md object-cover mr-4"
                                  src={item.image}
                                  alt={item.name}
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/100";
                                  }}
                                />
                                <div className="flex-1">
                                  <p className="text-gray-900">{item.name}</p>
                                  <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                                <p className="text-gray-900">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">
                              Shipping Address
                            </h3>
                            <p className="text-sm text-gray-600">
                              {order.shippingAddress}
                            </p>
                          </div>
                          <div className="flex space-x-3">
                            <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                              View Details
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                              Buy Again
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
