import { createContext, useState } from "react";
import BASE_URL from "../../api/BASE_URL";
import axios from "axios";

export const usersContext = createContext();

function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
 
  // Function to fetch all the users
  async function getAllUsers() {
    try {
      const { data } = await axios.get(`${BASE_URL}/users`, {
        withCredentials: true,
      });
      console.log(data.users);
   
   

      setUsers(data.users);
    } catch (err) {
      console.error(err.message);
    }
  }

  const totalUsers = users.reduce((acc) => acc + 1, 0);
  return (
    <usersContext.Provider
      value={{ getAllUsers, users, totalUsers }}
    >
      {children}
    </usersContext.Provider>
  );
}

export default UsersProvider;
