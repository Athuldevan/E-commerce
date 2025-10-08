import axios from "axios";
import BASE_URL from "../../api/BASE_URL";
import { useEffect, useState } from "react";

// COMPONENT

function OrderEdit() {
  const [status, setStatus] = useState(null);

  return (
    <>
      <label>Change the status of the order</label>
      <select onChange={() => setStatus(status)}>
        <option value="pending">Pending</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
      </select>
    </>
  );
}

export default OrderEdit;
