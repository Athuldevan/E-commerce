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
      console.log(data);
      await getAllOrders();
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <OrderContext.Provider
      value={{ getAllOrders, orders, createOrder, orderedProducts, loading }}
    >
      {children}
    </OrderContext.Provider>
  );
}
