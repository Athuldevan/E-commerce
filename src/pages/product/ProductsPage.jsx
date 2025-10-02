import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../api/BASE_URL";
import { CartContext } from "../../context/cartContext";
import { WishlistContext } from "../../context/WishlistContext";
import Loading from "../../utility/Loading";
import ProductCard from "../../layouts/ProductCard";
import { FunnelIcon } from "@heroicons/react/24/outline";

export default function Products() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { handleAddToCart } = useContext(CartContext);
  const { handleAddToWishlist } = useContext(WishlistContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetching the data and loading
  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log(selectedCategory);
        const url = selectedCategory
          ? `${BASE_URL}/products?category=${selectedCategory}`
          : `${BASE_URL}/products`;
        const response = await axios.get(url, {
          withCredentials: true,
        });
        setData(response.data.products);
        setLoading(true);
      } catch (error) {
        console.error(`Error in fetching products: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [selectedCategory]);

  const getProductById = async function (id) {
    const { data } = await axios.get(`${BASE_URL}/products/${id}`, {
      withCredentials: true,
    });
    navigate(`/products/productDetails/${id}`, { state: data.data.product });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our premium selection of products crafted for excellence
            and style
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 px-6 py-4">
            <FunnelIcon className="h-5 w-5 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">
              Filter by:
            </span>
          </div>

          <div className="relative">
            {/* FILTERING SECTION BASED ON CATEGORY */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl shadow-sm px-6 py-3 pr-10 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:shadow-md min-w-[200px]"
            >
              <option value="">All categoties</option>
              <option value="watche">Watches</option>
              <option value="phone">phones</option>
              <option value="laptop">laptop</option>
              <option value="airpods">airpods</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          {data.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1m4 0h-4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  No Products Found
                </h3>
                <p className="text-slate-500">
                  Try selecting a different category
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-slate-600">
                  Showing
                  <span className="font-semibold text-slate-800">
                    {data.length}
                  </span>{" "}
                  products from {selectedCategory || "all products"}
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    handleAddToWishlist={handleAddToWishlist}
                    getProductById={getProductById}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Loading State for Category Change */}
        {loading && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-slate-700 font-medium">Loading products...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
