import axios from "axios";
import { Children, createContext, useState } from "react";

// creatingbthe contetxt
export const AuthContext = createContext();

// provider component
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  //   login logic functon
  async function login(email, password) {
    const response = await axios.get(
      `http://localhost:3000/users?email=${email}`
    );
    const foundUser = response.data[0];

    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser))
      return true;
    }
    alert("no such user exist ");
    return false;
  }

  //   logout login logic
  async function logout() {
    setUser(null);
    localStorage.removeItem("loggedInUser")
  }
  // returning the provider with value
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
