import { useEffect, useState } from "react";
import { fetchProducts } from "../api/services/productsService";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

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

  return { products, handleFilter };
}

export default useProducts;
