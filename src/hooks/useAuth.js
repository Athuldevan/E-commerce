import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "../api/BASE_URL";
import Swal from "sweetalert2";
import axios from "axios";

function useAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    isBlock: false,
    cart: [],
    orders: [],
    wishlist: [],
    created_at: new Date().toLocaleDateString(),
  });
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));


  // Function to check wheather user with email already exist
  async function isUserAlreadyExist(email) {
    try {
      const res = await axios.get(`${BASE_URL}/users`);
      const isExist = res.data.some((user) => user.email === email);

      if (isExist) {
        Swal.fire({
          title: "User with this email already exists",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
      return isExist;
    } catch (err) {
      console.log(err, "from userAlready exist fucntion ");
      return false;
    }
  }

  // HAndleSubmit funtction
  async function handleSubmit(e) {
    e.preventDefault();
    const userExist = await isUserAlreadyExist(email);
    if (userExist) {
      return;
    }
    const newUser = {
      ...formData,
      name,
      email,
      password,
    };

    axios.post(`${BASE_URL}/users`, newUser);
    Swal.fire({
      title: "Registered Sucessfully",
      icon: "success",
    });
    navigate("/login");
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.get(`${BASE_URL}/users?email=${email}`);
      const data = res.data;

      if (data.length === 0) {
        console.log("No user found");
        return;
      }

      const user = data[0];

      if (user.isBlock) throw new Error("Your account is suspended");

      if (user.password === password && user.email === email) {
        Swal.fire({
          title: "Successfully Logged In",
          icon: "success",
          draggable: true,
        });
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Admin checking
        if (user?.role === "admin") {
          console.log("admin ");
          navigate("/admin");
        } else {
          navigate("/products");
        }
      } else {
        Swal.fire({
          title: "Invalid Login Credentials. Try Again",
          icon: "error",
          draggable: true,
        });
      }
    } catch (err) {
      console.error("Login failed", err.message);
    }
    setEmail("");
    setPassword("");
  }

  // handle logout
  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  }
  return {
    userID: loggedInUser?.id || null,
    loggedInUser,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    formData,
    setFormData,
    handleLogin,
    handleSubmit,
    handleLogout,
  };
}

export default useAuth;
