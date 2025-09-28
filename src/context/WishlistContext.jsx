import { createContext, useContext, useState } from "react";
import BASE_URL from "../api/BASE_URL";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  // if (!isLoggedIn) {
  //   alert("Please Login first");
  //   return;
  // }
  //fetch wishlist
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
  return (
    <WishlistContext.Provider value={{ getWishlist, wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
