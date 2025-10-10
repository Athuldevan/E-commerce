function ProductsStats({ products, totalValue, active }) {
  return (
    <>
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
    </>
  );
}

export default ProductsStats;
