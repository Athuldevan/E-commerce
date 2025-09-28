import { createContext, useContext, useState } from "react";
import BASE_URL from "../api/BASE_URL";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

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

  //Add to cart funtionality
  async function handleAddToCart(productId) {
    console.log(productId);
    try {
      if (!isLoggedIn) {
        alert("please login first.");
        navigate("/login");
        return;
      }
      const { data } = await axios.post(
        `${BASE_URL}/carts/add-to-cart/${productId}`,
        null,
        { withCredentials: true }
      );
      if (data.message === "This product is already in the cart") {
        alert("Product is already in your cart!", { icon: "⚠️" });
      } else if (data.status === "success") {
        alert("Product added to cart successfully!");
        setCartItems((prev) => [...prev, data.data]);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again!");
      console.error(err.message);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        fetchCarts,
        setCartItems,
        updateQuantity,
        handleAddToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
