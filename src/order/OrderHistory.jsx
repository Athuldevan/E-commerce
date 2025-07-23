function OrderHistory({pastOrders}) {
  console.log("pastOrders", pastOrders)
    return (
       <div className="p-4">
  <h2 className="text-2xl font-semibold mb-4">Order History</h2>

  {pastOrders.length === 0 ? (
    <p className="text-gray-500">No past orders yet.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600">
            <th className="px-6 py-3 border-b">Order ID</th>
            <th className="px-6 py-3 border-b">Date</th>
            <th className="px-6 py-3 border-b">Items</th>
            <th className="px-6 py-3 border-b">Total</th>
            <th className="px-6 py-3 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {pastOrders.map((order) => (
            <tr key={order?.id} className="text-sm hover:bg-gray-50">
              <td className="px-6 py-4 border-b font-medium text-blue-600">
                {order?.id}
              </td>
              <td className="px-6 py-4 border-b text-gray-500">
                {order?.date}
              </td>
              <td className="px-6 py-4 border-b">
                <ul className="list-disc pl-4">
                  {order?.items?.map((item) => (
                    <li key={item.id}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 border-b font-semibold">
                ₹{order?.total?.toFixed(2)}
              </td>
              <td className="px-6 py-4 border-b">
                <span
                  className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    order?.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
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
  )}
</div>

    )
}

export default OrderHistory


