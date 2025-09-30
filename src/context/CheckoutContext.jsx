import axios from "axios";
import { createContext, useEffect, useState } from "react";
import BASE_URL from "../api/BASE_URL";

export const CheckoutContext = createContext();

export default function CheckoutProvider({ children }) {
  const [checkoutItems, setCheckOutItems] = useState([]);

  async function getCheckoutItems() {
    try {
      const { data } = await axios.get(`${BASE_URL}/checkout`, {
        withCredentials: true,
      });
      setCheckOutItems(data.products);
    } catch (err) {
      console.log(err.message);
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
      console.log("Order created successfully:", data);
      alert("order created succesfully");
    } catch (err) {
      console.log("Error creating order:", err.message);
    }
  }

  useEffect(() => {
    getCheckoutItems();
  }, []);

  return (
    <CheckoutContext.Provider value={{ checkoutItems, handleCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
}
