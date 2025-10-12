export default function ProductFilter({
  setCategory,
  setIsOpen,
  sort,
  setSort,
}) {
  return (
    <>
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

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option className="bg-gray-700" value="">
                Price Range
              </option>
              <option className="bg-gray-700" value="higher">
                Higher
              </option>
              <option className="bg-gray-700" value="lower">
                Lesser
              </option>
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
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
