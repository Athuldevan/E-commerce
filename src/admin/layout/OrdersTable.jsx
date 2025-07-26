function OrdersTable() {
  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  #12345
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  John Smith
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-900 text-green-200">
                    Completed
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  May 15, 2023
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">$245.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-purple-400 hover:text-purple-300">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  #12344
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  Sarah Johnson
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-900 text-yellow-200">
                    Processing
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  May 14, 2023
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">$189.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-purple-400 hover:text-purple-300">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  #12343
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  Michael Brown
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-900 text-blue-200">
                    Shipped
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  May 14, 2023
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">$312.50</td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-purple-400 hover:text-purple-300">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  #12342
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  Emily Davis
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-red-900 text-red-200">
                    Cancelled
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  May 13, 2023
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">$98.75</td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-purple-400 hover:text-purple-300">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default OrdersTable;
