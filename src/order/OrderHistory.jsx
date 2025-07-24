function OrderHistory({pastOrders}) {
  console.log("pastOrders", pastOrders)
  return (
  <div className="p-6 max-w-7xl mx-auto">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Orders</h2>
      <p className="text-gray-500">View and manage your purchase history</p>
    </div>

    {pastOrders.length === 0 ? (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-4 text-lg font-medium text-gray-700">No orders yet</h3>
        <p className="mt-2 text-gray-500">Your order history will appear here</p>
      </div>
    ) : (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pastOrders.map((order) => (
                <tr key={order?.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800">
                    #{order?.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order?.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <ul className="space-y-1">
                      {order?.items?.map((item) => (
                        <li key={item.id} className="flex items-center">
                          <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ₹{order?.total?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order?.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order?.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order?.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
)
}

export default OrderHistory


