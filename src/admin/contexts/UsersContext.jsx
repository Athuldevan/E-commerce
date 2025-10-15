import { createContext, useEffect, useReducer, useState } from "react";
import BASE_URL from "../../api/BASE_URL";
import axios from "axios";

export const usersContext = createContext();

const limit = 10;

const initialState = {
  users: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "users/getAllUsers":
      return { ...state, users: [...action.payload] };
    default:
      return state;
  }
}

export default function UsersProvider({ children }) {
  const [{ users }, dispatch] = useReducer(reducer, initialState);
  const [isBlocked, setIsBlocked] = useState(""); // match product-style empty string logic
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function getAllUsers() {
    try {
      setLoading(true);

      // Build query string exactly like in ProductsProvider
      const query = isBlocked ? `&isBlocked=${isBlocked}` : "";

      const { data } = await axios.get(
        `${BASE_URL}/admin/users?page=${page}&limit=${limit}${query}`,
        {
          withCredentials: true,
        }
      );

      dispatch({ type: "users/getAllUsers", payload: data.data });
    } catch (err) {
      console.log("Error fetching users:", err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async function () {
      await getAllUsers();
    })();
  }, [isBlocked, page]);

  const latestUser = users.length ? [...users].slice(-1)[0] : null;

  return (
    <usersContext.Provider
      value={{
        users,
        getAllUsers,
        isBlocked,
        setIsBlocked,
        latestUser,
        setPage,
        page,
        limit,
        loading,
        setLoading,
      }}
    >
      {children}
    </usersContext.Provider>
  );
}
