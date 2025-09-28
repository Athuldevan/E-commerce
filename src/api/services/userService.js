import BASE_URL from "../BASE_URL";
import axios from "axios";

export async function fetchUsers() {
  const res = await axios.get(`${BASE_URL}/users`);
  const response = await axios.get(`${BASE_URL}/carts`, {
    withCredentials: true,
  });

  console.log(response);
  return res.data;
}

