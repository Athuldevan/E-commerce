import axios from "axios";
import BASE_URL from "../BASE_URL";

export async function fetchProducts() {
    const res = await axios.get(`${BASE_URL}/products`);
    console.log(res)
    return res.data;
}