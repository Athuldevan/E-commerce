function ProdcutPagination({products, setPage, limit, }) {
    return (
        <>
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
        </>
    )
}

export default ProdcutPagination
