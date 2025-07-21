import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  async function fetchCart(userId) {
    try {
      const res = await axios.get(`http://localhost:3000/users/${userId}`);
      setCartItems(res.data.cart || []); //SETTING THE CARTiTEMS TO CART
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  // Fetch cart items on mount
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUserId(loggedInUser.id);
      fetchCart(loggedInUser.id);
    }
  }, []);

  // Update cart in backend (PUT request)
  async function updateCartInBackend(updatedCart) {
    try {
      await axios.put(`http://localhost:3000/users/${userId}`, {
        cart: updatedCart,
      });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  }

  // --ADDING THE QUANTITY
  function addCount(productID) {
    const updatedCart = cartItems.map((item) =>
      item.id === productID ? { ...item, count: (item.count || 1) + 1 } : item
    );
    setCartItems(updatedCart);
    updateCartInBackend(updatedCart);
  }

  //  --DECREASE THE QUANTITIY
  function decreaseCount(productID) {
    const updatedCart = cartItems.map((item) =>
      item.id === productID
        ? { ...item, count: Math.max(1, (item.count || 1) - 1) }
        : item
    );
    setCartItems(updatedCart);
    updateCartInBackend(updatedCart);
  }

  // --REMOVE THE ITEM
  function removeItemFromCart(productID, e) {
    try {

      e.preventDefault();
      e.stopPropagation(); // <-- Add this line just in case
      const updatedCart = cartItems.filter((item) => item.id !== productID);
      setCartItems(updatedCart);
      updateCartInBackend(updatedCart);
      console.log('CART UPDATED');
    }catch(error) {
      console.log(error + 'FAILED TO UPDATA CART ')
    
  }
}

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.count || 1),
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-stone-50">
      <h2 className="text-3xl font-bold mb-6">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-lg shadow-md bg-white"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item?.images?.[0]}
                  alt={item?.description}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h4 className="text-xl font-semibold">{item.name}</h4>
                  <p className="text-gray-600">₹{item.price}</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <button
                      onClick={() => decreaseCount(item.id)}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="px-3">{item.count || 1}</span>
                    <button
                      onClick={() => addCount(item.id)}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  ₹{(item.price * (item.count || 1)).toFixed(2)}
                </p>
                <button
                type = "button"
                  className="text-red-500 hover:underline text-sm mt-1"
                  onClick={(e) => removeItemFromCart(item.id, e)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-end items-center border-t pt-4">
            <div className="text-right">
              <p className="text-lg font-semibold">
                Total: ₹{totalPrice.toFixed(2)}
              </p>
              <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
