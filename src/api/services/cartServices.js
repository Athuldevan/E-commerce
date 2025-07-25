import axios from "axios";
import BASE_URL from "../BASE_URL";

// fetch user cart by user id
export async function fetchUsercartByUserID(userId) {
  const res = await axios.get(`${BASE_URL}/users/${userId}`);
  return res.data;
}

// update user cart in backend
export async function updateUserCart(userId, updatedCart) {
  const res = axios.get(`${BASE_URL}/users/${userId}`);
  const updatedUser = { ...(await res).data, cart: updatedCart };
  return axios.put(`${BASE_URL}/users/${userId}`, updatedUser);
}

 