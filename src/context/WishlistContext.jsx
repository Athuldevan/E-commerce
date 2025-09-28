import { createContext, useContext, useState } from "react";
import BASE_URL from "../api/BASE_URL";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // GET WISHLIST
  async function getWishlist() {
    try {
      const { data } = await axios.get(`${BASE_URL}/wishlist`, {
        withCredentials: true,
      });

      setWishlist(data.data);
      console.log(wishlist);
    } catch (err) {
      console.log(err.message);
    }
  }

  //Add To Wishlist
  async function handleAddToWishlist(productId) {
    console.log(productId);
    try {
      wishlist.map(
        (product) =>
          product.productId._id === productId && alert("Already in the wishlist ")
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
  return (
    <WishlistContext.Provider
      value={{ getWishlist, wishlist, setWishlist, handleAddToWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
