import { useContext, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import BASE_URL from "../../api/BASE_URL";
import axios from "axios";
import Loading from "../../utility/Loading";
import AddProductModal from "../layout/AddProductModal";
import EditProductModal from "../layout/EditProductModal";
import ProductsStats from "../components/products/ProductsStats";
import ProductFilter from "../components/products/ProductFilter";
import ProdcutPagination from "../layout/ProdcutPagination";
import ProductTable from "../layout/ProductTable";

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

  const [isOpen, setIsOpen] = useState(false);
  const [isEditngMode, setIsEditingMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  //View a product
  async function handleViewProduct(id) {
    try {
      await axios.get(`${BASE_URL}/admin/viewProduct${id}`);
    } catch (err) {
      return resizeBy.status(400).json({
        status: "failed",
        message: err.message,
      });
    }
  }

  // Add to product;
  if (isOpen) return <AddProductModal isOpen={isOpen} setIsOpen={setIsOpen} />;

  // Edit product
  if (isEditngMode)
    return (
      <EditProductModal
        isEditngMode={isEditngMode}
        setIsEditingMode={setIsEditingMode}
        selectedProduct={selectedProduct}
        getAllProducts={getAllProducts}
      />
    );

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
      <ProductsStats
        products={products}
        totalValue={totalValue}
        active={active}
      />

      {/* Filter Section */}
      <ProductFilter setCategory={setCategory} setIsOpen={setIsOpen} />

      {/* Products Table */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        <ProductTable
          products={products}
          setIsEditingMode={setIsEditingMode}
          setSelectedProduct={setSelectedProduct}
          handleDelete={handleDelete}
        />

        {/* Table Footer */}
        <ProdcutPagination
          products={products}
          setPage={setPage}
          limit={limit}
        />
      </div>
    </div>
  );
}

export default ProductsPage;
