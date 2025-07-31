import { FiPlus, FiMinus } from "react-icons/fi";
import { useState } from "react";
import useProducts from "../../hooks/useProducts";
import axios from "axios";
import BASE_URL from "../../api/BASE_URL";
import Swal from "sweetalert2";
import { showToast } from "../../utility/Toast";

function EditProduct({ selectedProduct, onClose }) {
  console.log(selectedProduct);

  const [price, setPrice] = useState(selectedProduct.price);
  const [stock, setStock] = useState(selectedProduct.count);
  const { setAllProducts, setProducts, setRefresh } = useProducts();

  const handleSubmit = async function () {
    try {
      const updatedProduct = {
        ...selectedProduct,
        price: price,
        count: stock,
      };

      const response = await axios.put(
        `${BASE_URL}/products/${selectedProduct.id}`,
        updatedProduct
      );
      setRefresh((prev) => !prev);

      setAllProducts((products) =>
        products.map((product) =>
          product.id === selectedProduct.id ? response.data : product
        )
      );

      setProducts((products) =>
        products.map((product) =>
          product.id === selectedProduct.id ? response.data : product
        )
      );

      Swal.fire({
        title: "Edited product successfully",
        icon: "success",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleStockChange = (amount) => {
    setStock((prev) => Math.max(0, prev + amount));
    showToast("Stock updated successfully");
  };

  const handlePriceChange = (amount) => {
    setPrice((prev) => Math.max(0, prev + amount));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-lg overflow-hidden shadow-xl">
        {/* Modal Header */}
        <div className="p-5 bg-gray-850 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">
              <span className="text-blue-400">Editing:</span>{" "}
              {selectedProduct.name}
            </h3>
            <p className="text-sm text-gray-400 mt-1">{selectedProduct.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
          >
            close
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="p-5 border-b md:border-b-0 md:border-r border-gray-700 flex items-center justify-center bg-gray-825">
            <div className="relative group">
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-40 h-40 object-contain rounded-lg border-2 border-gray-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                  Change Image
                </button>
              </div>
            </div>
          </div>

          {/* Edit Controls */}
          <div className="p-5 flex-1">
            <div className="space-y-5">
              {/* Price Adjustment */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price (USD)
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => handlePriceChange(-1)}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 p-2 rounded-l-lg transition-colors"
                  >
                    {" "}
                    <FiMinus />
                  </button>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-gray-750 border-t border-b border-gray-700 py-3 pl-8 pr-4 text-white text-center focus:outline-none"
                      step="0.01"
                    />
                  </div>
                  <button
                    onClick={() => handlePriceChange(+1)}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 p-2 rounded-r-lg transition-colors"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Stock Adjustment */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Inventory
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => handleStockChange(-1)}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 p-2 rounded-l-lg transition-colors"
                  >
                    <FiMinus />
                  </button>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                    className="flex-1 bg-gray-750 border-t border-b border-gray-700 py-3 text-white text-center focus:outline-none"
                  />
                  <button
                    onClick={() => handleStockChange(1)}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 p-2 rounded-r-lg transition-colors"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Status Toggle */}
              <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      selectedProduct.isActive === "Active"
                        ? "bg-green-500 animate-pulse"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-200">Product Status</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 bg-gray-850 border-t border-gray-700 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-gray-300 hover:text-white rounded-lg transition-colors border border-gray-600 hover:border-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md flex items-center"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
