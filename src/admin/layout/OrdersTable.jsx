import axios from "axios";
import BASE_URL from "../../api/BASE_URL";
import { useContext, useState } from "react";
import { OrdersContext } from "../contexts/OrdersContext";
import Loading from "../../utility/Loading";

function OrdersTable({ orders, getStatusColor, handleViewOrder }) {
  const { dispatch } = useContext(OrdersContext);
  const [loadingOrder, setLoadingOrder] = useState(null);

  async function handleChangeOrderStatus(orderId, status) {
    setLoadingOrder(orderId);
    try {
      await axios.put(
        `${BASE_URL}/admin/changeOrderStatus/${orderId}`,
        { status },
        { withCredentials: true }
      );
      
      dispatch({
        type: "orders/updateOrderStatus",
        payload: { orderId, status },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrder(null);
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-800">
            {orders.map((order) => (
              <tr 
                key={order._id} 
                className="hover:bg-gray-800 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-white">
                    #{order._id?.slice(-8) || order.id?.slice(-8)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-300">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold text-white">
                    ${order.totalPrice}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleChangeOrderStatus(order._id, e.target.value)}
                    disabled={loadingOrder === order._id}
                    className={`px-3 py-1 rounded text-sm border-0 font-medium ${getStatusColor(order.status)} text-white cursor-pointer disabled:opacity-50`}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleViewOrder(order._id)}
                    className="px-3 py-1 text-xs font-medium rounded border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTable;