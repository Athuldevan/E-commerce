import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function useWishlist() {
  const [wishlist, setWishList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isExist, setIsExist] = useState(false);

  const navigate = useNavigate()

  async function fetchWishlist(userId) {
    try {
      const res = await axios.get(`http://localhost:3000/users/${userId}`);
      setWishList(res?.data?.wishlist || []);
    } catch (err) {
      console.error(err);
    }
  }

  //  on mount
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(loggedInUser);
    if (loggedInUser) {
      setUserId(loggedInUser.id);
      fetchWishlist(loggedInUser.id);
      console.log(wishlist);
    }
  }, []);

  //   update cart in backend
  async function updateWishlistInBackend(updatedWishlist) {
    try {
      const res = await axios.get(`http://localhost:3000/users/${userId}`);
      const updatedUser = { ...res.data, wishlist: updatedWishlist };
      await axios.put(`http://localhost:3000/users/${userId}`, updatedUser);
    } catch (err) {
      console.log(err);
    }
  }
  function handleWishList(product) {
    if (!userId) {
      Swal.fire({
          title: "Please Login  first  !",
          icon: "warning",
          draggable: true,
        });
        navigate("/login")
    }
    let updatedWishlist;
    const isAlreadyInWishlist = wishlist.some((item) => item.id === product.id);
    console.log(`wishlist`, wishlist);
    console.log(isAlreadyInWishlist);

    // if laready in wishist remove else addd
    if (isAlreadyInWishlist) {
      setIsExist(!isExist);
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);

      toast.info("Already in the wishlist ", {autoClose : 1000});
    } else {
      // if not added to wishlist
      updatedWishlist = [...wishlist, product];
    }

    setWishList(updatedWishlist);
    updateWishlistInBackend(updatedWishlist);
  }

  // REMOVE WISHlIST
  function removeItemFromWishlist(product) {
    const updatedWishlist = wishlist.filter((item) => product.id != item.id);
    setWishList(updatedWishlist);
    updateWishlistInBackend(updatedWishlist);
    toast.error("Item removeed  from  wishlist!", {autoClose : 1000});
  }

  return {
    isExist,
    handleWishList,
    wishlist,
    removeItemFromWishlist,
    updateWishlistInBackend,
  };
}

export default useWishlist;
