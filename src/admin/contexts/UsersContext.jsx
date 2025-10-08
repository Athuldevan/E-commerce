import { createContext, useEffect, useReducer } from "react";
import BASE_URL from "../../api/BASE_URL";
import axios from "axios";

export const usersContext = createContext();
const initialState = {
  users: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "users/getAllUsers":
      return { ...state, users:[ ...action.payload ]};
    default:
      return state;
  }
}

export default function UsersProvider({ children }) {
  const [{ users }, dispatch] = useReducer(reducer, initialState);
  async function getAllUsers() {
    try {
      const { data } = await axios.get(`${BASE_URL}/admin/users`, {
        withCredentials: true,
      });
  
      dispatch({ type: "users/getAllUsers", payload: data.data });
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getAllUsers();  
  }, []);

  return (
    <usersContext.Provider value={{ users, getAllUsers }}>
      {children}
    </usersContext.Provider>
  );
}
