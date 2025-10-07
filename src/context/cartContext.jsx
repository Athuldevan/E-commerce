import { createContext, useContext, useState } from "react";
import BASE_URL from "../api/BASE_URL";
import axios from "axios";
import { AuthContext } from "./AuthContext";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

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
        Swal.fire({
          title: "Please Login",
          text: "You need to be logged in to add items to the cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Login",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });

        return;
      }
      const { data } = await axios.post(
        `${BASE_URL}/carts/add-to-cart/${productId}`,
        null,
        { withCredentials: true }
      );
      if (data.message === "This product is already in the cart") {
        Swal.fire({
          title: "Info",
          text: "This product is already in the cart",
          icon: "info",
        });
      } else if (data.status === "success") {
        toast.success("Product added to cart");

        setCartItems((prev) => [...prev, data.data]);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again!");
      console.error(err.message);
    }
  }
  // REMOVE FROM CART
  async function handleRemoveFromCart(productId) {
    try {
      const data = await axios.delete(
        `${BASE_URL}/carts/delete-cart-item/${productId}`,
        {
          withCredentials: true,
        }
      );
      setCartItems(data.data.data);
      await fetchCarts();
      setLoading(true);
      toast.success("Item removed from cart");
    } catch (err) {
      console.log(err.message);
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
        handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
