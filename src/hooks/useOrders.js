import axios from "axios";
import { useState, useEffect } from "react";
import useCart from "./useCart";
import BASE_URL from "../api/BASE_URL";
import { useNavigate } from "react-router-dom";

function useOrders() {
  const [userId, setUserId] = useState("");
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("recent");
  const { cartItems = [] } = useCart();

  const navigate = useNavigate()


  const latestOrder = orders?.slice(-1) || [];
  const pastOrders = orders?.slice(0, -1);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userId = loggedInUser.id;
    setUserId(userId);      

    if(!userId) {
        navigate('/login')
    }

    // fetching the  orderof the logged user id
    if (userId && cartItems?.length > 0) {
      //  calculating total price
      const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );

      // fetching data with taht partcular user id
      axios.get(`${BASE_URL}/users/${userId}`).then((res) => {
        // CREATING A NEW ORDEER
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
        const previousOrders = res.data.orders || [];
        const updatedOrders = [...previousOrders, newOrder];

        // SAVING + UPDATING THE ORDERS ARRAY IN JSON (BACKEDN );
        axios
          .put(`${BASE_URL}/users/${userId}`, {
            ...res.data,
            orders: updatedOrders,
          })
          .then(() => setOrders(updatedOrders));
      });
    }
  }, [cartItems]);

  return {
    userId,
    orders,
    setOrders,
    activeTab,
    setActiveTab,
    cartItems,
    latestOrder,
    pastOrders,
  };
}

export default useOrders;
