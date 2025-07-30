import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PencilIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import BASE_URL from "../../api/BASE_URL";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { fetchUsers } from "../../api/services/userService";

function Profile() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [user, setUser] = useState(null);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [name, setName] = useState(loggedInUser?.name || "Alex Johnson");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { userID } = useAuth();

  async function loadUser() {
    const allUser = await fetchUsers();
    const user = allUser.find(
      (user) => user.role === "user" && user.id === userID
    );
    setUser(user);
    console.log("current User", user);
  }

  // useFect to cange paswors --loading useer
  useEffect(() => {
    (async function () {
      await loadUser();
    })();
  }, [isEditingPassword]);

  const userData = {
    email: user?.email,
    id: user?.id,
    created_at: user?.created_at,
    orders: user?.orders,
    wishlist: user?.wishlist,
    cart: user?.cart,
    name: user?.name,
    password: user?.password,
    role: user?.role,
    isBlock: user?.isBlock,
  };
  async function handleSubmit() {
    userData.password !== passwordData.currentPassword &&
      alert("current password is not matching ");
    if (
      passwordData.newPassword.length === 0 ||
      passwordData.confirmPassword.length === 0
    ) {
      alert("password is empty");
      return;
    }
    const updatedUser = await axios.put(
      `${BASE_URL}/users/${loggedInUser.id}`,
      { ...userData, password: passwordData.newPassword }
    );
    console.log(updatedUser);
    setIsEditingPassword(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {loggedInUser ? (
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="mt-3 text-gray-600 max-w-lg mx-auto">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-32 flex items-end justify-center">
                <div className="relative -mb-16">
                  <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center shadow-md">
                    <UserIcon className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="pt-20 pb-8 px-6 text-center">
                {isEditingName ? (
                  <div className="mb-6">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <div className="mt-4 flex justify-center space-x-3">
                      <button
                        onClick={() => {
                          setIsEditingName(false);
                          // Save to localStorage or API here
                        }}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingName(false)}
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-2">
                    <div className="flex justify-center items-center">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {name}
                      </h2>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="ml-3 text-indigo-600 hover:text-indigo-800 transition-colors"
                        aria-label="Edit name"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {userData.membership}
                    </span>
                  </div>
                )}

                <p className="text-gray-500 text-sm mt-4">
                  Member since {userData.joinDate}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-3xl font-bold text-indigo-600">
                      {userData.orders}
                    </p>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
                      Orders
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-3xl font-bold text-indigo-600">
                      {userData.wishlist}
                    </p>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
                      Wishlist
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900">
                  Account Details
                </h3>
              </div>
              <div className="px-6 py-5 space-y-6">
                {/* Email */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <EnvelopeIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Email Address
                    </h4>
                    <p className="text-base text-gray-900 mt-1">
                      {userData.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <PhoneIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Phone Number
                    </h4>
                    <p className="text-base text-gray-900 mt-1">
                      {userData.phone}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <MapPinIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Shipping Address
                    </h4>
                    <p className="text-base text-gray-900 mt-1">
                      {userData.address}
                    </p>
                  </div>
                </div>

                {/* Password */}
                <div className="pt-4 border-t border-gray-100">
                  {isEditingPassword ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="flex space-x-3 pt-2">
                        <button
                          onClick={() => {
                            handleSubmit();
                            // Add password change logic here
                          }}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                          Update Password
                        </button>
                        <button
                          onClick={() => setIsEditingPassword(false)}
                          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <LockClosedIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-gray-500">
                          Password
                        </h4>
                        <p className="text-base text-gray-900 mt-1">••••••••</p>
                      </div>
                      <button
                        onClick={() => setIsEditingPassword(true)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                      >
                        Change
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Orders Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900">
                  Recent Orders
                </h3>
              </div>
              <div className="px-6 py-5 space-y-5">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      #LUXE-2023-0456
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Delivered • Oct 12, 2023
                    </p>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">
                    Details
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      #LUXE-2023-0389
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Delivered • Sep 28, 2023
                    </p>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">
                    Details
                  </button>
                </div>
                <div className="pt-2 text-center">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">
                    View All Orders →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">
            Please login to view your profile
          </p>
        </div>
      )}
    </div>
  );
}

export default Profile;
