import { fetchUsers } from "../api/services/userService.js";
import { useEffect, useState } from "react";
import useAuth from "./useAuth.js";
import axios from "axios";
import BASE_URL from "../api/BASE_URL.js";
import UserView from "../admin/layout/UserView.jsx";

function useUsers() {
  const [users, setUsers] = useState([]);
  const [userViewMode, setUserMode] = useState(false);
  const [selectedUser, setSelcetedUser] = useState(null);

  const { userID } = useAuth();
  console.log(userID);

  // fetch all the USERS ONLY
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

  // handleDelete User
  async function handleDelte(userId) {
    if (!userId) {
      console.log("No user is available with the user id");
      return;
    }
    try {
      await axios.delete(`${BASE_URL}/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.log("Error deleting user", error.message);
    }
  }

  function handleViewUser(user) {
    setUserMode(true);
    setSelcetedUser(user);
  }

  function handleCloseUserView() {
    console.log('close button is clicekd ');
    setUserMode(false);
    setSelcetedUser(null);
  }

  return {
    users,
    handleDelte,
    userViewMode,
    handleViewUser,
    selectedUser,
    handleCloseUserView,
  };
}

export default useUsers;
