import { useNavigate } from "react-router-dom";
import useCart from "./useCart";

export default function Cart() {
  // const [userId, setUserId] = useState(null);
  const { cartItems, addCount, decreaseCount, removeItemFromCart, totalPrice } =
    useCart();
  const navigate = useNavigate();

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
                  type="button"
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
              <button
                onClick={() =>
                  navigate("/payment", { state: { totalPrice, cartItems } })
                }
                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
