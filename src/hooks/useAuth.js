import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "../api/BASE_URL";
import Swal from "sweetalert2";
import axios from "axios";

function useAuth() {
  const [email, setEmail] = useState("js@gmail.com");
  const [password, setPassword] = useState("js@123");
  const [isLoggedin, setIsLoggedin] = useState(false);
  // const [name, setName] = useState("John Smith");
  // const [name, setName] = useState("");
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   role: "user",
  //   isBlock: false,
  //   cart: [],
  //   orders: [],
  //   wishlist: [],
  //   created_at: new Date().toLocaleDateString(),
  // });

  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  //  Handle Registration
  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    await axios.post(`${BASE_URL}/signIn`, newUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    Swal.fire({
      title: "Registered Successfully",
      icon: "success",
    });
    navigate("/login");
  }

  //  Handle Login function 
  async function handleLogin(e) {
    try {
      e.preventDefault();
      const data = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (data.status === 200) {
        navigate("/products");
        setIsLoggedin(!isLoggedin);
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  //  Logout
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
    // setName,
    // formData,
    // setFormData,
    handleLogin,
    handleSubmit,
    handleLogout,
    isLoggedin
  };
}

export default useAuth;
