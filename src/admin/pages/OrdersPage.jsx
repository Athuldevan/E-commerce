import { useContext, useState } from "react";
import { OrdersContext } from "../contexts/OrdersContext";
import axios from "axios";
import BASE_URL from "../../api/BASE_URL";
import ViewOrder from "../layout/ViewOrder";
import OrdersTable from "../layout/OrdersTable";
import OrderHeader from "../layout/OrderHeader";

function OrdersPage() {
  const { orders, totalRevenue } = useContext(OrdersContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // In your OrdersPage component

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
     
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <div className="flex-1 flex flex-col overflow-hidden">
        <OrderHeader
          totalOrders={totalOrders}
          pendingOrders={pendingOrders}
          totalRevenue={totalRevenue}
        />

        <OrdersTable
          orders={orders}
          getStatusColor={getStatusColor}
          handleViewOrder={handleViewOrder}
        />
      </div>
      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <ViewOrder
          selectedOrder={selectedOrder}
          closeModal={closeModal}
          getStatusColor={getStatusColor}
          handleViewOrder={handleViewOrder}
        />
      )}
    </div>
  );
}

export default OrdersPage;
