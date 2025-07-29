import { useEffect, useState } from "react";
import { fetchProducts } from "../api/services/productsService";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productViewMode, setProductViewMode] = useState(false);

  // Fetching all Products
  useEffect(() => {
    (async function () {
      const product = await fetchProducts();
      setProducts(product);
      setAllProducts(product);
    })();
  }, []);

  // filter products
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
    console.log('allProduct', allProducts);
    const product = allProducts.find((product) => product.id === productID);
    console.log(product);
    setSelectedProduct(product);
    setProductViewMode(true);
  }

  function handleCloseProductView() {
    setProductViewMode(!productViewMode)
  }

  return {
    products,
    handleFilter,
    handleProductView,
    selectedProduct,
    productViewMode,
    handleCloseProductView
  };
}

export default useProducts;
