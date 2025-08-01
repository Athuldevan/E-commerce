import Swal from "sweetalert2";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api/BASE_URL";
import useAuth from "./useAuth";
import { updateWishlistInBackend } from "../api/services/wishlistServices";
import { fetchWishlist } from "../api/services/wishlistServices";

function useWishlist() {
  const [wishlist, setWishList] = useState([]);
  const [isExist, setIsExist] = useState(false);
  const { userID } = useAuth();
  const navigate = useNavigate();

  //  on mount
  useEffect(() => {
    async function getWishlist() {
      if (!userID) return;

      try {
        const data = await fetchWishlist(userID);
        setWishList(data.wishlist || []);
        console.log("Fetched wishlist:", data.wishlist);
      } catch (err) {
        console.error("Something went wrong", err);
      }
    }

    getWishlist();
  }, []);

  function handleWishList(product) {
    if (!userID) {
      Swal.fire({
        title: "Please Login first!",
        icon: "warning",
        draggable: true,
      });
      navigate("/login");
    }

    let updatedWishlist;
    const isAlreadyInWishlist = wishlist.some((item) => item.id === product.id);
    setIsExist(!isExist);
    console.log(`wishlist`, wishlist);
    console.log(isAlreadyInWishlist);

    // if laready in wishist remove  the product
    if (isAlreadyInWishlist) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      setIsExist(!isExist);

      toast.error("Removed form the wishlist ", { autoClose: 1000 });
    } else {
      toast.success("Added to the wishlist", { autoClose: 1000 });
      // if not added to wishlist
      updatedWishlist = [...wishlist, product];
    }

    setWishList(updatedWishlist);
    updateWishlistInBackend(updatedWishlist, userID);
  }

  // REMOVE WISHlIST
  function removeItemFromWishlist(product) {
    const updatedWishlist = wishlist.filter((item) => product.id != item.id);
    setWishList(updatedWishlist);
    updateWishlistInBackend(updatedWishlist, userID);
    toast.error("Item removeed  from  wishlist!", { autoClose: 1000 });
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
