import { useEffect, useState } from "react";
import { fetchProducts } from "../api/services/productsService";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productViewMode, setProductViewMode] = useState(false);
  const [text, setText] = useState("");

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

  return {
    products,
    handleFilter,
    handleProductView,
    selectedProduct,
    productViewMode,
    handleCloseProductView,
    searchProduct,
    text, setText
  };
}

export default useProducts;
