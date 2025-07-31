import OrderHistory from "./OrderHistory";
import useOrders from "../../hooks/useOrders";

export default function OrderPage() {
  const { activeTab, setActiveTab, latestOrders, pastOrders, orders } = useOrders();
  console.log("Latest Orders:", latestOrders);
  console.log("All Orders:", orders);

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
        My Orders
      </h2>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'recent'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('recent')}
        >
          Recent Orders
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'past'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Past Orders
        </button>
      </div>

      {/* Recent Orders Tab */}
      {activeTab === 'recent' && (
        <div>
          {!latestOrders?.length ? (
            <div className="text-center py-10 text-gray-500">
              No recent orders found.
            </div>
          ) : (
            <div className="space-y-6">
              {latestOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-700"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                      <p className="text-gray-200 font-semibold">
                        Order ID: <span className="text-blue-400">{order.id}</span>
                      </p>
                      <p className="text-sm text-gray-400">Date: {order.date}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "processing"
                            ? "bg-yellow-900 text-yellow-200"
                            : "bg-green-900 text-green-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center border border-gray-700 rounded-lg p-3 bg-gray-750"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <h4 className="text-gray-100 font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-400">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-right text-lg font-semibold text-gray-100">
                    Total: ₹{order.total}
                    <button>Delte Order</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Past Orders Tab */}
      {activeTab === 'past' && (
        <div>
          {!pastOrders.length ? (
            <div className="text-center py-10 text-gray-500">
              No past orders found.
            </div>
          ) : (
            <div className="space-y-6">
              {pastOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-700"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                      <p className="text-gray-200 font-semibold">
                        Order ID: <span className="text-blue-400">{order.id}</span>
                      </p>
                      <p className="text-sm text-gray-400">Date: {order.date}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "processing"
                            ? "bg-yellow-900 text-yellow-200"
                            : "bg-green-900 text-green-200"
                        }`}
                      >
                        {order.status}
                      </span>
                      
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center border border-gray-700 rounded-lg p-3 bg-gray-750"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <h4 className="text-gray-100 font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-400">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-right text-lg font-semibold text-gray-100">
                    Total: ₹{order.total}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}