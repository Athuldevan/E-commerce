import { createContext, useState } from "react";
import BASE_URL from "../api/BASE_URL";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin@123");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();

  // Register new user
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newUser = { name, email, password };
      const res = await axios.post(`${BASE_URL}/signIn`, newUser, {
        withCredentials: true,
      });
      Swal.fire({
        title: "Registered Successfully",
        icon: "success",
      });

      navigate("/login");
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  }

  // Login user
  async function handleLogin(e) {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      const loggedInUser = res.data.data;
      setUser(loggedInUser);

      if (loggedInUser.role === "admin") {
        navigate("/admin");
        console.log(`navigating to admin`);
        return;
      } else {
        console.log(`navigating to products`);
        navigate("/products");
      }

      toast.success("Login Successful");
      setIsLoggedIn(true);
      return true;
    } catch (err) {
      console.log(err.message);
      Swal.fire({
        title: "Login Failed",
        text: err.response?.data?.message || "Invalid credentials",
        icon: "error",
      });
      return false;
    }
  }

  // Logout
  function logout() {
    setUser(null);
    setIsLoggedIn(false);
    toast.info("Logged out successfully");
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        isLoggedIn,
        handleSubmit,
        handleLogin,
        logout,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
