import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Products() {
  const [data, setData] = useState([]);

  // FETHCING THE DATA AND LOADING
  useEffect(() => {
    async function fetchProduts() {
      try {
        const response = await axios.get(`http://localhost:3000/products`);
        setData(response.data);
      } catch (error) {
        console.error(`Error in fetchhinfg products  ${error}`);
      }
    }

    fetchProduts();
  }, []);

  // ADD TO CART
  async function handleAddToCart(product, e) {
    e.preventDefault();

    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!loggedInUser) {
        alert("Please login first");
        return;
      }

      // //  1. Get the latest user data from the server
      const response = await axios.get(
        `http://localhost:3000/users/${loggedInUser.id}`
      );
      const latestUserData = response.data;

      const isAlreadyInCart = latestUserData.cart.some(
        (item) => item.id === product.id
      );
      if (isAlreadyInCart) {
        alert(`
          this product is already in your cart `);
        return false;
      }

      //  2.  update cart -spreading all the items in the cart the adding t new product
      const updatedCart = [...(latestUserData.cart || []), product]; //ADDING NEW `PRODUCT `

      //  Put the updated cart back UPDATING THE CART ONLY
      const updatedUser = {
        ...latestUserData,
        cart: updatedCart,
      };

      // UPDATING THE USER
      await axios.put(
        `http://localhost:3000/users/${loggedInUser.id}`,
        updatedUser
      );

      // Update localStorage with latest data
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      console.log("Cart updated:", updatedCart);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div className="space-x-4 p-3  bg-neutral-50" key={product.id}>
              <img
                src={product?.images?.[0]}
                alt="Rolex watch image "
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8 h-64"
              />
              <div className="p-4 mt-3.5 ">
                <h3 className="font-semibold text-sm text-gray-900">
                  {product.name}
                </h3>
                <p className="font-light text-stone-700">
                  {product.description}
                </p>
                <p className="bg-green-600 text-stone-200 rounded w-8 h-6 text-center ">
                  {product.rating}
                </p>
                <p>${product.price}</p>
              </div>

              <button
                type="button"
                onClick={(e) => handleAddToCart(product, e)}
                className=" bg-indigo-500 rounded-2xl text-stone-100 p-2 border-0 hover:bg-indigo-400 mt-2"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
