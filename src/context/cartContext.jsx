import { createContext, useState } from "react";
import BASE_URL from "../api/BASE_URL";
import axios from "axios";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items of the user
  async function fetchCarts() {
    try {
      const { data } = await axios.get(`${BASE_URL}/carts`, {
        withCredentials: true,
      });
      setCartItems(data.data || []);
      console.log(cartItems);
      setCartItems(data.data || []);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  }

  //Update cart  quantity
  async function updateQuantity(productId, value) {
    const product = cartItems.find((item) => item.productId._id === productId);
    if (!product) return;

    // the newww qunatitiy
    const newQunatity = Math.max(1, product.quantity + value);
    try {
      const { data } = await axios.put(
        `${BASE_URL}/carts/update-cart-item/${productId}`,
        { quantity: newQunatity },
        { withCredentials: true }
      );

      setCartItems((prev) =>
        prev.map((item) =>
          item.productId._id === productId ? data.data : item
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <CartContext.Provider
      value={{ cartItems, fetchCarts, setCartItems, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
