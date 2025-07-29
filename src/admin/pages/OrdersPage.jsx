import useOrders from "../../hooks/useOrders";
import OrdersTable from "../layout/OrdersTable";
import OrderSummary from "../layout/OrderSummary";

function OrdersPage() {
  const { totalOrders, allOrders, handleDelte } = useOrders();
  console.log(allOrders);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Order Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex space-x-3 w-full md:w-auto">
              <select className="bg-gray-700 border border-gray-600 text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Filter by status</option>
                <option>Completed</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Cancelled</option>
                <option>Pending</option>
              </select>

              <select className="bg-gray-700 border border-gray-600 text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Filter by date</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Last Month</option>
              </select>

              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Export
              </button>
            </div>
          </div>

          {/* Orders Summary Cards */}
          <OrderSummary totalOrders={totalOrders} />
          <OrdersTable
            handleDelte={handleDelte}
            allOrders={allOrders}
            tot={totalOrders}
          />
        </main>
      </div>
    </div>
  );
}

export default OrdersPage;
