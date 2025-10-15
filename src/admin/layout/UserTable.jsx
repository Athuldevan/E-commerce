import axios from "axios";
import BASE_URL from "../../api/BASE_URL";
import { useContext } from "react";
import { usersContext } from "../contexts/UsersContext";
import { toast } from "react-toastify";

function UserTable({ user }) {
  const { getAllUsers } = useContext(usersContext);

  // Blocking the user functionality
  async function handleBlock(userId) {
    try {
      await axios.put(
        `${BASE_URL}/admin/users/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("User status updated successfully");
      await getAllUsers();
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <tr key={user._id} className="hover:bg-gray-750 transition duration-150">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-white">{user.name}</div>
              <div className="text-sm text-gray-400">
                ID: {user._id.slice(-8)}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-white">{user.email}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              user.role === "admin"
                ? "bg-purple-500/20 text-purple-300"
                : "bg-green-500/20 text-green-300"
            }`}
          >
            {user.role || "customer"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              user.isBlocked === false
                ? "bg-green-500/20 text-green-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {user.isBlocked ? "Blocked" : "Active"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
          {user.createdAt}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex space-x-2">
            <button
              onClick={() => handleBlock(user._id)}
              className="text-red-400 hover:text-red-300 transition duration-200"
            >
              {user?.isBlocked ? "Unblock" : "Block"}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default UserTable;
