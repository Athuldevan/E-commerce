import axios from "axios";
import BASE_URL from "../BASE_URL";

export async function fetchOrders(userId) {
  const res = await axios.get(`${BASE_URL}/users/${userId}`);
  return res.data
}


// export async function updatedOrders(userId, updatedOrders) {
//     const res = await axios.put(`${BASE_URL}/users/${userId}`, updatedOrders );
//     return res.data
// }