import axios from "axios";
import BASE_URL from "../BASE_URL"

// function to fetch wishlist
export async function fetchWishlist(userId) {
  const res = await axios.get(`http://localhost:3000/users/${userId}`);
  return res.data;
}

export async function updateWishlistInBackend(updatedWishlist, userId) {
  const res = await axios.get(`http://localhost:3000/users/${userId}`);
  const updatedUser = { ...res.data, wishlist: updatedWishlist };
  return await axios.put(`${BASE_URL}/users/${userId}`, updatedUser)
}
