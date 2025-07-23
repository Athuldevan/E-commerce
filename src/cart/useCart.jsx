import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  async function fetchCart(userId) {
    try {
      const res = await axios.get(`http://localhost:3000/users/${userId}`);
      setCartItems(res.data.cart || []); //SETTING THE CARTiTEMS TO CART
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  // Fetch cart items on mount
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUserId(loggedInUser.id);
      fetchCart(loggedInUser.id);
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
      const res = await axios.get(`http://localhost:3000/users/${userId}`);
      const updatedUser = { ...res.data, cart: updatedCart };

      await axios.put(`http://localhost:3000/users/${userId}`, updatedUser);
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

  // ADD TO  CART FUCNTIONALITY FUNCTION
  async function addToCart(product) {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!loggedInUser) {
        Swal.fire({
          title: "Please Login first ",
          icon: "warning",
          draggable: true,
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: "Added to cart !",
          icon: "success",
          draggable: true,
        });
      }

      // //  1. Get the latest user data from the server
      const response = await axios.get(
        `http://localhost:3000/users/${loggedInUser.id}`
      );
      const latestUserData = response.data;

      const isAlreadyInCart = latestUserData.cart.some(
        (item) => item.id === product.id
      );
      if (isAlreadyInCart) {
        Swal.fire({
          title: "This product is alredy in cart !",
          icon: "failure",
          draggable: true,
        });
        return false;
      }

      // // 2.  update cart -spreading all the items in the cart the adding t new product
      const updatedCart = [...(latestUserData.cart || []), product]; //ADDING NEW `PRODUCT `

      //  //Put the updated cart back UPDATING THE CART ONLY
      const updatedUser = {
        ...latestUserData,
        cart: updatedCart,
      };

      // UPDATING THE USER
      await axios.put(
        `http://localhost:3000/users/${loggedInUser.id}`,
        updatedUser
      );

      // Update localStorage with latest data
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      console.log("Cart updated:", updatedCart);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  }

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
