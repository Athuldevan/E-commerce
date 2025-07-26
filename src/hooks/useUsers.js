import { useEffect, useState } from "react";
import { fetchUsers } from "../api/services/userService.js";

function useUsers() {
  const [users, setUsers] = useState([]);

  // fetch all the USERS
  useEffect(() => {
    async function loadUsers() {
      try {
        const allUsers = await fetchUsers();

        setUsers(allUsers.filter((user) => user.role === "user"));
      } catch (err) {
        console.error(err);
      }
    }
    loadUsers();
  }, []);

  return {
    users,
  };
}

export default useUsers;
