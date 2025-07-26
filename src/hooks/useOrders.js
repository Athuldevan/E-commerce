import axios from "axios";
import { useEffect, useState } from "react";
import useCart from "./useCart";
import BASE_URL from "../api/BASE_URL";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../api/services/orderService";
import {
  getAllOrderedItems,
  getRevenue,
  totalOrders as getTotalOrders,
} from "../admin/controller/orderController";

function useOrders() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("recent");
  const [latestOrders, setLatestOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [allOrders, setAllOrders] = useState([]);

  const { cartItems = [] } = useCart();
  const { userID } = useAuth();
  const navigate = useNavigate();

  // placing neworder
  async function placeOrder() {
    const totalPrice = cartItems?.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 100000)}`, // unique ID
      date: new Date().toLocaleDateString(),
      status: "processing",
      paymentMethod: "Credit Card",
      deliveredAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),

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

    const data = await fetchOrders(userID);
    const previousOrders = data.orders;
    const updatedOrders = [...previousOrders, newOrder];

    await axios.put(`${BASE_URL}/users/${userID}`, {
      ...data,
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

  // past orddr and latest orders
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

  // totalRevenue orders
  useEffect(() => {
    try {
      async function loadOrders() {
        const ordersCount = await getTotalOrders();
        console.log(ordersCount);
        setTotalOrders(ordersCount);

        const revenue = await getRevenue();
        setTotalRevenue(revenue);
      }
      loadOrders();
    } catch (err) {
      console.log(err);
    }
  }, []);

  // fetching all ordered items
  useEffect(() => {
    async function loadAllOrderedItems() {
      try {
        const orderedItems = await getAllOrderedItems();
        console.log("orderedItemns ", orderedItems);
        setAllOrders(orderedItems);
      } catch (err) {
        console.error(err);
      }
    }
    loadAllOrderedItems();
  }, []);

  const handleDelte = function (orderId) {
    allOrders.map((order) =>
      order.orderID === orderId
        ? console.log("ordere deleted ")
        : console.log("order-delted")
    );
  };

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
    totalOrders,
    totalRevenue,
    allOrders,
    handleDelte
  };
}

export default useOrders;
