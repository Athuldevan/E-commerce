import { createContext, useContext, useEffect, useState } from "react";
import BASE_URL from "../api/BASE_URL";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // GET WISHLIST
  async function getWishlist() {
    try {
      if (!isLoggedIn) {
       toast.error("Please Login first to view wishlist");
      }
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
    toast.error("Please Login first to add to wishlist");
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
      toast.success("Added to wishlist");
      await getWishlist();
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
      
      if (data.data) {
        setWishlist(data.data);
      } else {
        await getWishlist();
      }
      toast.success("Removed from wishlist");
      setLoading(true);
      await getWishlist();
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
