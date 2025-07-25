import axios from "axios";
import { useEffect, useState } from "react";
import useCart from "./useCart";
import BASE_URL from "../api/BASE_URL";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

function useOrders() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("recent");
  const [latestOrders, setLatestOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const { cartItems = [] } = useCart();
  const { userID } = useAuth();
  const navigate = useNavigate();

  async function placeOrder() {
    const totalPrice = cartItems?.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 100000)}`, // unique ID
      date: new Date().toLocaleString(),
      status: "processing",
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.count,
        image: item?.images[0],
      })),
      total: totalPrice,
      shippingAddress: "123 Main St, Kochi, KL 682001",
    };

    const res = await axios.get(`${BASE_URL}/users/${userID}`);
    const previousOrders = res.data.orders || [];
    const updatedOrders = [...previousOrders, newOrder];

    await axios.put(`${BASE_URL}/users/${userID}`, {
      ...res.data,
      orders: updatedOrders,
    });
    setOrders(updatedOrders);
    navigate("/payment");

    const recentOrders = updatedOrders.filter(
      (item) => item.status !== "delivered"
    );
    setLatestOrders(recentOrders || []);
    console.log(orders);
  }

  useEffect(() => {
    async function fetechOrder() {
      if (!userID) return;
      try {
        const res = await axios.get(`${BASE_URL}/users/${userID}`);
        const data = res.data;
        console.log(data);
        const recentOrders = data.orders.filter(
          (order) => order.status !== "delivered"
        );

        const pastOrder = data.orders.filter(
          (order) => order.status === "delivered"
        );

        setPastOrders(pastOrder);
        setLatestOrders(recentOrders);
      } catch (error) {
        console.error("somethig went wrong i", error.message);
      }
    }

    fetechOrder();
  }, [userID]);

  return {
    userID,
    orders,
    setOrders,
    activeTab,
    setActiveTab,
    cartItems,
    pastOrders,
    latestOrders,
    placeOrder,
  };
}

export default useOrders;
