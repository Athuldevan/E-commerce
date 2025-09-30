import Loading from "../utility/Loading";

function OrderList({ order, loading }) {
  if (loading) return <Loading />;
  return (
    <>
      <div key={order._id} className="bg-white rounded-xl shadow-md p-6 mb-6">
        {/* Order Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              Order #{order._id.slice(-6)}
            </h3>
            <p className="text-sm text-gray-500">
              Status:{" "}
              <span className="font-medium text-green-600">{order.status}</span>
            </p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View Details
          </button>
        </div>

        {/* Products in the order */}
        <div className="space-y-4">
          {order.products.map((product, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
            >
              {/* Product Image */}
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                {product.productId?.image ? (
                  <img
                    src={product.productId.image}
                    alt={product.productId.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500 text-xs">Image</span>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {product.productId?.name || "Product Name"}
                </h4>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                  <span>Qty: {product.quantity || 1}</span>
                  <span>•</span>
                  <span>${(product.productId?.price || 0).toFixed(2)}</span>
                </div>
                {product.productId?.category && (
                  <div className="text-xs text-gray-400 mt-1">
                    {product.productId.category}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="font-medium text-gray-900">
                  $
                  {(
                    (product.productId?.price || 0) * (product.quantity || 1)
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OrderList;
