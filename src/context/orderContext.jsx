import axios from "axios";
import { createContext, useState } from "react";
import BASE_URL from "../api/BASE_URL";

export const OrderContext = createContext();

export default function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getAllOrders() {
    try {
      const { data } = await axios.get(`${BASE_URL}/orders`, {
        withCredentials: true,
      });
      setOrders(data.orders);
      console.log(data.orders);
      const productsArray = data.orders.flatMap((order) => order.products);
      setOrderedProducts(productsArray);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function createOrder() {
    try {
      const { data } = await axios.post(`${BASE_URL}/orders/create`, null, {
        withCredentials: true,
      });
      setLoading(true);
      await getAllOrders();
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  // DELTE ORDER
  async function handleDeleteOrder(orderId) {
    console.log(orderId);
    try {
      await axios.delete(`${BASE_URL}/orders/delete/${orderId}`, {
        data: orderId,
        withCredentials: true,
      });
      setLoading(true);
      await getAllOrders();
      setLoading(true);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <OrderContext.Provider
      value={{
        getAllOrders,
        orders,
        createOrder,
        orderedProducts,
        handleDeleteOrder,
        loading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
