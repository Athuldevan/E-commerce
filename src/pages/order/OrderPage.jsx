import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/orderContext";
import OrderList from "../../layouts/OrderList";
import Loading from "../../utility/Loading";
import NoOrdersFound from "../../layouts/NoOrderLayout";

const OrderPage = () => {
  const { orders, getAllOrders, loading } = useContext(OrderContext);
  const [activeTab, setActiveTab] = useState("recent");

  useEffect(() => {
    getAllOrders();
  }, []);

  const recentOrders = orders.slice(0, 3); // latest 3 orders
  const pastOrders = orders.slice(3);

  const displayedOrders = activeTab === "recent" ? recentOrders : pastOrders;

  if (loading) return <Loading />;

  if (orders.length === 0) {
   <NoOrdersFound/>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600 text-sm">
            Track and manage your purchases
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b border-gray-200 mb-8">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("recent")}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === "recent"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Recent Orders
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === "past"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Past Orders
            </button>
          </div>
        </div>

        {/* Orders List */}
        {displayedOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">No orders found.</p>
          </div>
        ) : (
          displayedOrders.map((order) => (
            <OrderList order={order} loading={loading} />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderPage;
