import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

import { HeartIcon } from "@heroicons/react/24/solid";
import useWishlist from "../../hooks/useWishlist";
import useCart from "../../hooks/useCart";

import { useNavigate } from "react-router-dom";

export default function Products() {
  const [data, setData] = useState([]);
  const { handleWishList } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // FETHCING THE DATA AND LOADING
  useEffect(() => {
    async function fetchProduts() {
      try {
        console.log("fetching product ")
        const response = await axios.get(`http://localhost:3000/products`);
        setData(response.data);
      } catch (error) {
        console.error(`Error in fetchhinfg products  ${error.message}`);
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
    <div className="bg-stone-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Productss</h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((product) => (
            <div
              className="group relative bg-slate-200 text-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              key={product.name}
            >
              <button
                onClick={() => handleWishList(product)}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-200 z-10"
              >
                <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
              </button>

              <div className="aspect-square w-full overflow-hidden rounded-t-xl bg-gray-100">
                <img
                  src={product?.images?.[0] || product.image}
                  onClick={() =>
                    navigate(`/productDetails/${product.id}`, {
                      state: { product },
                    })
                  }
                  alt="Product image"
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    ${product.price}
                  </p>
                </div>

                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                    {product.rating} ★
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(product, e)}
                    className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
