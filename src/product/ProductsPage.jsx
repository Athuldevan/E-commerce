import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
// import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
// import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/solid";
import useWishlist from "../wishlist/useWishlist";
import useCart from "../cart/useCart";
import { useNavigate } from "react-router-dom";

//

export default function Products() {
  const [data, setData] = useState([]);
  const { handleWishList } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

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
  function handleAddToCart(product, e) {
    e.preventDefault();
    addToCart(product);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div
              className=" relative space-x-4 p-3  bg-neutral-50"
              key={product.id}
            >
              <button
                onClick={() => handleWishList(product)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                {/* Outline heart (visible by default) */}
                {/* <HeartOutline className="h-5 w-5 text-red-500 group-hover:hidden" /> */}
                {/* Solid heart (hidden by default, shows on hover) */}
                {/* {isExist && (
                  <HeartSolid className="h-5 w-5 text-red-500 hidden group-hover:block" />
                )} */}
                <HeartIcon className="h-6 w-6 text-gray-400" />
              </button>

              <img
                src={product?.images?.[0]}
                onClick={() =>
                  navigate(`/productDetails/${product.id}`, {
                    state: { product },
                  })
                }
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
