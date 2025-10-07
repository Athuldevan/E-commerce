function ViewOrder({ selectedOrder, closeModal, getStatusColor }) {
  console.log(selectedOrder);
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Order Details #{selectedOrder._id || selectedOrder.id}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Order Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Order Information
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-300">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {selectedOrder.status}
                    </span>
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Total Amount:</span>{" "}
                    <span className="text-white font-medium">
                      ${selectedOrder.totalPrice}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Products
              </h3>
              <div className="space-y-4">
                {selectedOrder.products?.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 bg-gray-750 rounded-lg p-4"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                      {product.productId.image ? (
                        <img
                          src={product.productId.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">
                        {product.name || "Product Name"}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Quantity: {product.quantity} × ${product.productId.price}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Subtotal: $
                        {(product.quantity * product.productId.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewOrder;
