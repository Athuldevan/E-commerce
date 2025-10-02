import axios from "axios";
import { createContext, useEffect, useState } from "react";
import BASE_URL from "../api/BASE_URL";
import Loading from "../utility/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const CheckoutContext = createContext();

export default function CheckoutProvider({ children }) {
  const [checkoutItems, setCheckOutItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getCheckoutItems() {
    try {
      const { data } = await axios.get(`${BASE_URL}/checkout`, {
        withCredentials: true,
      });
      setCheckOutItems(data.products);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckout() {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/orders/create`,
        {},
        {
          withCredentials: true,
        }
      );
      setLoading(true);
      Swal.fire({
        icon: "success",
        title: "Order Placed Successfully!",
        text: "Thank you for your purchase.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/orders");
        }
      });
    } catch (err) {
      console.log("Error creating order:", err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCheckoutItems();
  }, []);

  return (
    <CheckoutContext.Provider
      value={{ checkoutItems, handleCheckout, loading }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
