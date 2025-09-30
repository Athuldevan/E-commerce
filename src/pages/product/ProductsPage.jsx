import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import BASE_URL from "../../api/BASE_URL";
import { CartContext } from "../../context/cartContext";
import { WishlistContext } from "../../context/WishlistContext";
import Loading from "../../utility/Loading";

import ProductCard from "../../layouts/ProductCard";

export default function Products() {
  const [data, setData] = useState([]);
  const { handleAddToCart } = useContext(CartContext);
  const { handleAddToWishlist } = useContext(WishlistContext);
  const [loading, setloading] = useState(true);

  const navigate = useNavigate();

  // FETHCING THE DATA AND LOADING
  useEffect(() => {
    async function fetchProduts() {
      try {
        const response = await axios.get(`${BASE_URL}/products`, {
          withCredentials: true,
        });
        setData(response.data.products);
      } catch (error) {
        console.error(`Error in fetchhinfg products  ${error.message}`);
      } finally {
        setloading(false);
      }
    }
    fetchProduts();
  }, []);

  const getProductById = async function (id) {
    const { data } = await axios.get(`${BASE_URL}/products/${id}`, {
      withCredentials: true,
    });

    navigate(`/products/productDetails/${id}`, { state: data.data.product });
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-stone-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Productss</h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((product) => (
            <ProductCard
              product={product}
              handleAddToCart={handleAddToCart}
              handleAddToWishlist={handleAddToWishlist}
              getProductById={getProductById}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
