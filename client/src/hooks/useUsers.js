import { fetchUsers } from "../api/services/userService.js";
import { useEffect, useState } from "react";
import useAuth from "./useAuth.js";
import axios from "axios";
import BASE_URL from "../api/BASE_URL.js";
import { FcUnlock } from "react-icons/fc";

function useUsers() {
  const [totalUsers, setTotalUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [userViewMode, setUserMode] = useState(false);
  const [userEditMode, setUserEditMode] = useState(false);
  const [selectedUser, setSelcetedUser] = useState(null);
  const [text, setText] = useState("");

  const { userID } = useAuth();

  // fetch all the USERS ONLY
  useEffect(() => {
    async function loadUsers() {
      try {
        const allUsers = await fetchUsers();

        setUsers(allUsers.filter((user) => user.role === "user"));
        setTotalUsers(allUsers.filter((user) => user.role === "user"));
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

  // View User
  function handleViewUser(user) {
    setUserMode(true);
    setSelcetedUser(user);
  }

  // Clsoe user view
  function handleCloseUserView() {
    setUserMode(false);
    setSelcetedUser(null);
  }
  // show edit viewe
  async function handleEditUser(user) {
    setSelcetedUser(user);
    setUserEditMode(true);
  }

  // Block the user
  async function handleBlock(isBlocked, userID) {
    if (!userID) return null;

    try {
      const allUsers = await fetchUsers();
      const user = allUsers.find((user) => user.id === userID);
      const updatedUser = await axios.put(`${BASE_URL}/users/${userID}`, {
        ...user,
        isBlock: isBlocked,
      });
      setUsers((users) =>
        users.map((user) =>
          user.id === userID ? { ...user, isBlock: isBlocked } : user
        )
      );

      setTotalUsers((users) =>
        users.map((user) =>
          user.id === userID ? { ...user, isBlock: isBlocked } : user
        )
      );

      console.log(updatedUser.data);
      setUserEditMode(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  // handleSearch the user
  function handleSearch() {
    console.log("totalUser", totalUsers);
    const searchUser = totalUsers?.filter((user) =>
      user?.name.toLowerCase().includes(text.toLowerCase())
    );

    setUsers(searchUser);
  }

  // Filter User
  function handleFilterUser(status) {
    const trueVal = status === "true";
  
   
    console.log(+status, typeof status);
    if (status === "all") {
      setUsers(totalUsers);
      return;
    }
    const filteredUser = totalUsers.filter((user) => user.isBlock === trueVal);

    setUsers(filteredUser);
  }

  return {
    users,
    handleDelte,
    userViewMode,
    handleViewUser,
    selectedUser,
    handleCloseUserView,
    userEditMode,
    handleEditUser,
    handleBlock,
    text,
    setText,
    handleSearch,
    handleFilterUser,
  };
}

export default useUsers;
