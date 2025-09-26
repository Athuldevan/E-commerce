import axios from "axios";
import BASE_URL from "../BASE_URL";

export async function fetchProducts() {
  const res = axios.get(`${BASE_URL}/products`, {
    withCredentials: true, // if your auth uses cookies
  });
  console.log(res);
  return res.data;
}
