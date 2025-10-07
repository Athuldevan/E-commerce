import { useContext, useState } from "react";
import { OrdersContext } from "../contexts/OrdersContext";
import axios from "axios";
import BASE_URL from "../../api/BASE_URL";
import ViewOrder from "../layout/ViewOrder";

function OrdersPage() {
  const { orders, totalRevenue, orderedProducts } = useContext(OrdersContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!orders)
    return (
      <p className="text-gray-200 text-center p-8">Loading the orders...</p>
    );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-purple-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "pending"
  ).length;

  async function handleViewOrder(orderId) {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/admin/viewOrder/${orderId}`,
        {
          withCredentials: true,
        }
      );
      setSelectedOrder(data.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error fetching order details:", err.message);
      // You might want to show a toast notification here
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Orders Management
            </h1>
            <p className="text-gray-400">
              Manage and track all customer orders
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-400 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-white mt-1">
                {totalOrders}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-white mt-1">
                ${totalRevenue}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-400 text-sm">Pending Orders</p>
              <p className="text-2xl font-bold text-white mt-1">
                {pendingOrders}
              </p>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-750 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-white font-medium">
                          #{order.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-white font-medium">
                          ${order.totalPrice}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )} text-white`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewOrder(order._id)}
                            className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                          >
                            View
                          </button>
                          <button className="text-green-400 hover:text-green-300 transition-colors p-1">
                            Edit
                          </button>
                          <button className="text-red-400 hover:text-red-300 transition-colors p-1">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing <span className="font-medium text-white">1</span> to{" "}
                <span className="font-medium text-white">{orders.length}</span>{" "}
                of{" "}
                <span className="font-medium text-white">{orders.length}</span>{" "}
                results
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors text-sm">
                  Previous
                </button>
                <button className="px-3 py-1 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <ViewOrder
          selectedOrder={selectedOrder}
          closeModal={closeModal}
          getStatusColor={getStatusColor}
        />
      )}
    </div>
  );
}

export default OrdersPage;
