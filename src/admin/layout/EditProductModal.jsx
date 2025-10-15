import { useState } from "react";
import BASE_URL from "../../api/BASE_URL";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProductModal({
  selectedProduct,
  setIsEditingMode,
  getAllProducts,
}) {
  console.log(selectedProduct);
  const [product, setProduct] = useState({
    name: selectedProduct?.name,
    price: selectedProduct?.price,
    description: selectedProduct.description,
    count: selectedProduct?.count,
    category: selectedProduct?.category,
    image: selectedProduct?.image,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setProduct((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit() {
    try {
      await axios.put(
        `${BASE_URL}/admin/editProduct/${selectedProduct._id}`,
        product,
        { withCredentials: true }
      );
      setIsEditingMode(false);
      toast.success("Product updated successfully");
      await getAllProducts();
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 w-full max-w-md">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Edit Product</h2>
            <button
              onClick={() => setIsEditingMode(false)}
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
        </div>

        <div className="p-6 space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Product Name
            </label>
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="name"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product name"
              value={product?.name}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              onChange={(e) => handleInputChange(e)}
              rows="3"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product description"
              value={product?.description}
            />
          </div>

          {/* Price*/}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                onChange={(e) => handleInputChange(e)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                value={product?.price}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stock
              </label>
              <input
                type="number"
                name="count"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                value={product.count}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={product.value}
              onChange={(e) => handleInputChange(e)}
              name="
              category"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="phone" selected>
                Phone
              </option>
              <option value="laptop">Laptop</option>
              <option value="airpods">Airpods</option>
              <option value="phone">iPhone</option>
            </select>
          </div>

          {/* Image  */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              onChange={(e) => handleInputChange(e)}
              name="
              image"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
              value={product?.image}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={product.isActive}
              onChange={(e) => handleInputChange(e)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active" selected>
                Active
              </option>
              <option value={true}>Inactive</option>
              <option value={false}>Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-700 flex justify-end gap-3">
          <button
            onClick={() => setIsEditingMode(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
