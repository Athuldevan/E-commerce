import axios from "axios";
import BASE_URL from "../BASE_URL";

export default async function getProfile() {
  try {
    const {data} = await axios.get(`${BASE_URL}/users/profile`, {
      withCredentials: true,
    });
   
    return data.data

  } catch (err) {
    console.log(err.messgae);
  }
}
