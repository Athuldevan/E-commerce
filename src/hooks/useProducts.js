import { useEffect, useState } from "react";
import { fetchProducts } from "../api/services/productsService";
import axios from "axios";
import BASE_URL from "../api/BASE_URL";
import Swal from "sweetalert2";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [productViewMode, setProductViewMode] = useState(false);
  const [text, setText] = useState("");
  const [productEditMode, setProductEditMode] = useState(false);
  const [addProductMode, setAddProductMode] = useState(false);

  

  // Fetching all Products
  useEffect(() => {
    (async function () {
      console.log(refresh);

      const product = await fetchProducts();
      setProducts(product);
 
      setAllProducts(product);
    })();
  }, [refresh]);

  // FILTER PRODUCT
  function handleFilter(brand) {
    if (brand === "all") {
      setProducts(allProducts);
      return;
    }

    const filteredProducts = allProducts?.filter(
      (product) => product?.brand === brand
    );

    setProducts(filteredProducts);
  }

  // product viewControlelr
  function handleProductView(productID) {
    console.log("allProduct", allProducts);
    const product = allProducts.find((product) => product.id === productID);
    console.log(product);
    setSelectedProduct(product);
    setProductViewMode(true);
  }

  function handleCloseProductView() {
    setProductViewMode(!productViewMode);
  }

  // handle search  products
  function searchProduct() {
    const filteredProduct = allProducts.filter((product) =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setProducts(filteredProduct);
  }

  // Edit View
  function handleEditProduct(productID) {
    setProductEditMode(true);
    const product = allProducts.find((product) => product.id === productID);
    setSelectedProduct(product);
     
  }

  function handleClose() {
    setProductEditMode(false);
  }

  // handle Delete Product
  async function handleDelete(productID) {
    try {
      await axios.delete(`${BASE_URL}/products/${productID}`); // Corrected "products"
      // Optionally update local state to remove the deleted product
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productID)
      );
      setAllProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productID)
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  // Function handle Add Product
  function handleAddProduct() {
    setAddProductMode(true);
  }

  async function handleAddNewProduct(newProduct) {
    try {
      console.log(newProduct);
      await axios.post(`${BASE_URL}/products`, newProduct);
      setProducts((prevPrdts) => [...prevPrdts, newProduct]);
      setAllProducts((prevPrdts) => [...prevPrdts, newProduct]);
      setAddProductMode(false);
      console.log(newProduct);
    } catch (err) {
      console.error("Error adding product:", err.messager);
    }
  }

  function handleCloseProdutEditMode() {
    setProductEditMode(false);
    
  }

  return {
    products,
    handleFilter,
    handleProductView,
    selectedProduct,
    productViewMode,
    addProductMode,
    handleCloseProductView,
    searchProduct,
    text,
    setText,
    productEditMode,
    handleEditProduct,
    setProducts,
    setAllProducts,
    refresh,
    setRefresh,
    handleCloseProdutEditMode,
    handleDelete,
    handleAddProduct,
    handleAddNewProduct,
    handleClose,
  };
}

export default useProducts;
