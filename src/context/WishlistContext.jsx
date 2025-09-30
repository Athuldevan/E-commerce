import { createContext, useContext, useEffect, useState } from "react";
import BASE_URL from "../api/BASE_URL";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // GET WISHLIST
  async function getWishlist() {
    if (!isLoggedIn) {
      alert("Please Login first");
    }
    try {
      const { data } = await axios.get(`${BASE_URL}/wishlist`, {
        withCredentials: true,
      });

      setWishlist(data.data || []);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  //Add To Wishlist
  async function handleAddToWishlist(productId) {
    if (!isLoggedIn) {
      alert("Please Login first");
      return;
    }
    try {
      wishlist.map(
        (product) =>
          product.productId._id === productId &&
          alert("Already in the wishlist ")
      );
      await axios.post(
        `${BASE_URL}/wishlist/add-to-wishlist/${productId}`,
        null,
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  //REMOVE FROM WISHLIST
  async function handleRemoveFromWishlist(productId) {
    try {
      // setWishlist((prev) =>
      //   prev.filter((item) => item.productId?._id !== productId)
      // );
      if (!isLoggedIn) alert(`Please Login frist `);
      const { data } = await axios.delete(
        `${BASE_URL}/wishlist/delete-wishlist-item/${productId}`,
        { withCredentials: true }
      );
      console.log(data.data);
      if (data.data) {
        setWishlist(data.data);
      } else {
        await getWishlist();
      }
    } catch (err) {
      console.log(err.message);
      await getWishlist();
    }
  }

  useEffect(() => {
    if (isLoggedIn) getWishlist();
    else setWishlist([]);
  }, [isLoggedIn]);

  return (
    <WishlistContext.Provider
      value={{
        getWishlist,
        wishlist,
        setWishlist,
        handleAddToWishlist,
        handleRemoveFromWishlist,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
