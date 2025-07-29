import useProducts from "../../hooks/useProducts";
import ProductView from "../layout/ProductView";

function ProductsPage() {
  const {
    products,
    handleFilter,
    handleProductView,
    productViewMode,
    selectedProduct,
    handleCloseProductView,
  } = useProducts();
  console.log(products);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Sidebar (same as dashboard) */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>
        </header>
        {productViewMode && selectedProduct && (
          <ProductView
            selectedProduct={selectedProduct}
            onClose={handleCloseProductView}
          />
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Product Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex space-x-3 w-full md:w-auto">
              <select
                onChange={(e) => {
                  handleFilter(e.target.value);
                }}
                className="bg-gray-700 border border-gray-600 text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">Filter by Brand</option>
                <option value="Fossil">Fossil</option>
                <option value="Rolex">Rolex</option>
                <option value="Casio">Casio</option>
              </select>

              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Product
              </button>
            </div>
          </div>

          {/* Products Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Total Products</p>
                  <h3 className="text-2xl font-bold">{products.length}</h3>
                </div>
                <div className="p-3 bg-blue-600 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-green-400 text-sm mt-2">
                ↑ 12% from last month
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Out of Stock</p>
                  <h3 className="text-2xl font-bold">24</h3>
                </div>
                <div className="p-3 bg-red-600 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-red-400 text-sm mt-2">↑ 3% from last month</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Low Stock</p>
                  <h3 className="text-2xl font-bold">18</h3>
                </div>
                <div className="p-3 bg-yellow-600 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-green-400 text-sm mt-2">
                ↓ 2% from last month
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Top Selling</p>
                  <h3 className="text-2xl font-bold">Wireless Charger</h3>
                </div>
                <div className="p-3 bg-green-600 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-green-400 text-sm mt-2">
                421 sales this month
              </p>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Rating
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-70 0">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`flex-shrink-0 h-10 w-10 rounded-full ${product.image} flex items-center justify-center text-white`}
                          >
                            {product.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {product.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {product.brand}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {product?.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.color} ${product.textColor}`}
                        >
                          {product?.isActive}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {product?.rating}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => handleProductView(product.id)}
                            className="text-blue-400 hover:text-blue-300"
                            title="View Product "
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button
                            className="text-yellow-400 hover:text-yellow-300"
                            title="Edit"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            className="text-red-400 hover:text-red-300"
                            title="Delete"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-gray-750 px-6 py-3 flex items-center justify-between border-t border-gray-700">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-400">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">8</span> of{" "}
                    <span className="font-medium">24</span> products
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600">
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      aria-current="page"
                      className="z-10 bg-purple-600 border-purple-600 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      1
                    </button>
                    <button className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      2
                    </button>
                    <button className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      3
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-600 bg-gray-700 text-sm font-medium text-gray-400">
                      ...
                    </span>
                    <button className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      8
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600">
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductsPage;
