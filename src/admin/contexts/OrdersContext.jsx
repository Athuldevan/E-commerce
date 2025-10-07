import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import BASE_URL from "../../api/BASE_URL";

export const OrdersContext = createContext();

const initialState = {
  orders: [],
  totalRevenue: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "orders/getAllOrders":
      return { ...state, ...action.payload };
    case "order/getOrder":
      return { ...state, order: action.payload };

    default:
      return state;
  }
}
//Get a single order by id


function OrdersProvider({ children }) {
  const [{ orders, totalRevenue }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(function () {
    //fetch all orders
    async function getAllOrders() {
      try {
        const { data } = await axios.get(`${BASE_URL}/admin/orders`, {
          withCredentials: true,
        });
        dispatch({
          type: "orders/getAllOrders",
          payload: { orders: data.data, totalRevenue: data.totalRevenue },
        });

        setOrderedProducts(data.data.flatMap((order) => order.products));
      } catch (err) {
        console.log(err.message);
      }
    }
    getAllOrders();
 
  }, []);
  console.log(orders);
  return (
    <OrdersContext.Provider
      value={{ orders, totalRevenue, orderedProducts }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export default OrdersProvider;
