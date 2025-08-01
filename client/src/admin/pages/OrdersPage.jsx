import useOrders from "../../hooks/useOrders";
import OrdersTable from "../layout/OrdersTable";
import OrderSummary from "../layout/OrderSummary";

function OrdersPage() {
  const { totalOrders, allOrders, handleStatusChange } =
    useOrders();
  console.log(allOrders);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Order Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex space-x-3 w-full md:w-auto">
              <select className="bg-gray-700 border border-gray-600 text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Filter by status</option>
                <option>Completed</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Cancelled</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          {/* Orders Summary Cards */}
          <OrderSummary totalOrders={totalOrders} allOrders={allOrders} />
          <OrdersTable
            allOrders={allOrders}
            totalOrders={totalOrders}
            handleStatusChange={handleStatusChange}
          />
        </main>
      </div>
    </div>
  );
}

export default OrdersPage;
