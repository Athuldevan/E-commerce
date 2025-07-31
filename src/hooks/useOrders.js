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
import { fetchUsers } from "../api/services/userService";

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
      userID,
      id: `ORD-${Math.floor(Math.random() * 100000)}`,
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
      shippingAddress: "123 Kochi, kerala 55",
    };

    const data = await fetchOrders(userID);
    const previousOrders = Array.isArray(data.orders) ? data.orders : [];
    const updatedOrders = [...previousOrders, newOrder];

    console.log(previousOrders);

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
        const recentOrders = data?.orders?.filter(
          (order) => order.status !== "delivered"
        );

        const pastOrder = data?.orders?.filter(
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

  // DELETE a order.`
  async function handleDelte(orderID) {
    try {
      const allUsers = await fetchUsers();
      const user = allUsers.find(
        (user) =>
          user.role === "user" &&
          user.orders.find((order) => order.id === orderID)
      );
      const userID = user.id; // the user id of the user who placed that order;
      console.log("userid --", userID, user.name);

      const updatedOrders = user.orders.map((order) =>
        order.id === orderID ? { ...order, status: "cancelled" } : order
      );
      console.log(updatedOrders);
      await axios.put(`${BASE_URL}/users/${userID}`, {
        ...user,
        orders: updatedOrders,
      });

      const updatedOrder = updatedOrders.find((order) => order.id === orderID);

      setAllOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderID ? { ...order, status: "cancelled" } : order
        )
      );
      setLatestOrders((prev) =>
        prev.map((order) => (order.id === orderID ? orders : updatedOrder))
      );

      setPastOrders((prev) =>
        prev.map((order) => (order.id === orderID ? orders : updatedOrder))
      );

      setOrders((prev) =>
        prev.map((order) => (order.id === orderID ? orders : updatedOrder))
      );
    } catch (err) {
      console.log(err);
    }
  }

  // function handleStatus
  async function handleStatusChange(order, newStatus) {
    try {
      const res = await axios.get(`${BASE_URL}/users/${order.userID}`);
      const user = res.data;

      const updatedOrders = user.orders.map((o) =>
        o.id === order.id ? { ...o, status: newStatus } : o
      );
      console.log(updatedOrders, "updatedOrder");

      await axios.put(`${BASE_URL}/users/${order.userID}`, {
        ...user,
        orders: updatedOrders,
      });
    } catch (err) {
      console.error("Something went wrong:", err.message);
    }
  }

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
    handleDelte,
    handleStatusChange,
  };
}

export default useOrders;
