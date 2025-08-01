import BASE_URL from "../BASE_URL";
import axios from "axios";

export async function fetchUsers() {
  const res = await axios.get(`${BASE_URL}/users`);
  console.log(res.data)
  return res.data;
}

