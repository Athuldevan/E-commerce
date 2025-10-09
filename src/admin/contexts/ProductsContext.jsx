import { createContext, useEffect, useState } from "react";
import BASE_URL from "../../api/BASE_URL";
import axios from "axios";

// Create context
export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  // const [totalPage,setTotalPage] = useState(/);
  const limit = 5;

  useEffect(() => {
    async function getAllProducts() {
      console.log(category);
      try {
        const query = category ? `&category=${category}` : "";
        const { data } = await axios.get(
          `${BASE_URL}/admin/products?page=${page}&limit=${limit}${query}`,
          {
            withCredentials: true,
          }
        );

        setProducts(data.data);
      } catch (err) {
        console.log("Error fetching products:", err.message);
      }
    }

    getAllProducts(); //
  }, [category, page]);

  return (
    <ProductsContext.Provider value={{ products, setCategory, setPage, limit }}>
      {children}
    </ProductsContext.Provider>
  );
}
