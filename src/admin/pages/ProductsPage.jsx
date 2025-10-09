import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import BASE_URL from "../../api/BASE_URL";
import axios from "axios";
import Loading from "../../utility/Loading";
function ProductsPage() {
  const {
    products,
    setCategory,
    limit,
    setPage,
    getAllProducts,
    loading,
    setLoading,
  } = useContext(ProductsContext);

  const totalValue = products.reduce((acc, curr) => acc + curr.price, 0);
  const active = products.filter((product) => product.isActive).length;

  //Delete product;
  async function handleDelete(productId) {
    try {
      await axios.delete(`${BASE_URL}/admin/deleteProduct/${productId}`, {
        withCredentials: true,
      });
      setLoading(true);
      await getAllProducts();
    } catch (err) {
      console.log(err.message);
    }
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <p className="text-gray-400">Manage your product inventory</p>
      </div>

      {/* Stats Cardsssss */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            Total Products
          </h3>
          <p className="text-3xl font-bold text-blue-400">{products.length}</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            Total Value
          </h3>
          <p className="text-3xl font-bold text-green-400">₹{totalValue}</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            Categories
          </h3>
          <p className="text-3xl font-bold text-purple-400"></p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Active</h3>
          <p className="text-3xl font-bold text-orange-400">{active || 0}</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option className="bg-gray-700" value="">
                All Categories
              </option>
              <option className="bg-gray-700" value="phone">
                Phones
              </option>
              <option className="bg-gray-700" value="laptop">
                Laptops
              </option>
              <option className="bg-gray-700" value="airpods">
                Airpods
              </option>
            </select>

            <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option className="bg-gray-700">Price Range</option>
              <option className="bg-gray-700">Under ₹50,000</option>
              <option className="bg-gray-700">₹50,000 - ₹1,00,000</option>
              <option className="bg-gray-700">Above ₹1,00,000</option>
            </select>

            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Apply Filters
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  PRODUCT
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  CATEGORY
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  PRICE
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-750 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-white">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-400 truncate max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product._id.slice(-8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.category || "Not addedd"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                    ₹{product.price?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-200">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-3">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product?._id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                      <button className="text-gray-400 hover:text-gray-300 transition-colors">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-gray-700 px-6 py-4 border-t border-gray-600">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing <span className="font-medium text-white">1</span> to
              <span className="font-medium text-white">
                {products.length}
              </span>{" "}
              of
              <span className="font-medium text-white">
                {products.length}
              </span>{" "}
              results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1 bg-gray-600 border border-gray-500 rounded text-sm text-white hover:bg-gray-500 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (products.length === limit) {
                    setPage((prev) => prev + 1);
                  }
                }}
                className="px-3 py-1 bg-gray-600 border border-gray-500 rounded text-sm text-white hover:bg-gray-500 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
