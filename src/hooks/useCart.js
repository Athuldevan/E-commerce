import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  fetchUsercartByUserID,
  updateUserCart,
} from "../api/services/cartServices.js";

// import { useNavigate } from "react-router-dom";
import BASE_URL from "../api/BASE_URL";
import useAuth from "./useAuth.js";

function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const { userID } = useAuth();


  async function fetchCart(userID) {
    try {
      const data = await fetchUsercartByUserID(userID);
      setCartItems(data.cart || []); //SETTING THE CARTiTEMS TO CART
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  // ADD TO  CART FUCNTIONALITY FUNCTION
  async function addToCart(product) {
    try {
      if (!userID) {
        Swal.fire({
          title: "Please Login first ",
          icon: "warning",
          draggable: true,
        });
        return;
        // navigate("/login");

      } else {
        Swal.fire({
          title: "Added to cart !",
          icon: "success",
          draggable: true,
        });
        console.log(userID);
      }

      const latestUserData = await fetchUsercartByUserID(userID);

      const isAlreadyInCart = latestUserData.cart.some(
        (item) => item.id === product.id
      );
      if (isAlreadyInCart) {
        Swal.fire({
          title: "This product is alredy in cart !",
          icon: "error",
          draggable: true,
        });
        return false;
      }

      //update cart -spreading all the items in the cart the adding t new product
      const updatedCart = [...(latestUserData.cart || []), product]; //ADDING NEW `PRODUCT `

      //  //Put the updated cart back UPDATING THE CART ONLY
      const updatedUser = {
        ...latestUserData,
        cart: updatedCart,
      };

      // UPDATING THE USER
      await axios.put(`${BASE_URL}/users/${userID}`, updatedUser);

      // Update localStorage with latest data
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      console.log("Cart updated:", updatedCart);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  }

  // Fetch cart items on mount
  useEffect(() => {
    if (userID) {
      fetchCart(userID);
    } else {
      Swal.fire({
        title: "PLEASE LOGIN FIRSt",
        icon: "success",
        draggable: true,
      });
    }
  }, []);

  // Update cart in backend (PUT request)
  async function updateCartInBackend(updatedCart) {
    try {
      await updateUserCart(userID, updatedCart);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  }

  // --ADDING THE QUANTITY
  function addCount(productID) {
    const updatedCart = cartItems.map((item) =>
      item.id === productID ? { ...item, count: (item.count || 1) + 1 } : item
    );
    setCartItems(updatedCart);
    updateCartInBackend(updatedCart);
  }

  //  --DECREASE THE QUANTITIY
  function decreaseCount(productID) {
    const updatedCart = cartItems.map((item) =>
      item.id === productID
        ? { ...item, count: Math.max(1, (item.count || 1) - 1) }
        : item
    );
    setCartItems(updatedCart);
    updateCartInBackend(updatedCart);
  }

  // --REMOVE THE ITEM
  function removeItemFromCart(productID, e) {
    try {
      e.preventDefault();
      e.stopPropagation(); // <-- Add this line just in case
      const updatedCart = cartItems.filter((item) => item.id !== productID);
      setCartItems(updatedCart);
      updateCartInBackend(updatedCart);
      console.log("CART UPDATED");
    } catch (error) {
      console.log(error + "FAILED TO UPDATA CART ");
    }
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.count || 1),
    0
  );

  return {
    addCount,
    decreaseCount,
    totalPrice,
    removeItemFromCart,
    cartItems,
    setCartItems,
    addToCart,
  };
}

export default useCart;
