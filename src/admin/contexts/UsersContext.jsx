import { createContext, useEffect, useReducer, useState } from "react";
import BASE_URL from "../../api/BASE_URL";
import axios from "axios";

export const usersContext = createContext();
const initialState = {
  users: [],
  isBlocked: false,
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
  const [isBlocked, setIsBlocked] = useState(undefined);
  async function getAllUsers(filterValue) {
    try {
      let query = "";
      if (filterValue != undefined) {
        query = `?isBlocked=${filterValue}`;
      }

      const { data } = await axios.get(`${BASE_URL}/admin/users${query}`, {
        withCredentials: true,
      });

      dispatch({ type: "users/getAllUsers", payload: data.data });
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getAllUsers(isBlocked);
  }, [isBlocked]);

  return (
    <usersContext.Provider
      value={{ users, getAllUsers, isBlocked, setIsBlocked }}
    >
      {children}
    </usersContext.Provider>
  );
}
