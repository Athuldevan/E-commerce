import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CreditCardIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
function Profile() {
  // Mock data - replace with real data from your backend
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Watch Street, New York, NY 10001",
    membership: "Premium Member",
    joinDate: "January 15, 2022",
    orders: 8,
    wishlist: 12,
  };

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(loggedInUser);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {loggedInUser ? (
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="mt-2 text-gray-600">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-indigo-600 h-24 flex items-end justify-center">
                <div className="relative -mb-12">
                  <div className="h-24 w-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                    <UserIcon className="h-12 w-12 text-gray-500" />
                  </div>
                </div>
              </div>
              <div className="pt-16 pb-6 px-6 text-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {loggedInUser?.name}
                </h2>
                <p className="text-indigo-600">{userData.membership}</p>
                <p className="text-gray-500 text-sm mt-1">
                  Member since {loggedInUser?.created_at}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-indigo-600">
                      {loggedInUser?.orders?.length}
                    </p>
                    <p className="text-xs text-gray-500">ORDERS</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-indigo-600">
                      {loggedInUser?.wishlist?.length}
                    </p>
                    <p className="text-xs text-gray-500">WISHLIST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - Account Details */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Account Information
                </h3>
              </div>
              <div className="px-6 py-4 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Full Name
                    </h4>
                    <p className="text-sm text-gray-900">{loggedInUser?.name}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <EnvelopeIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Email Address
                    </h4>
                    <p className="text-sm text-gray-900">{loggedInUser?.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <PhoneIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Phone Number
                    </h4>
                    <p className="text-sm text-gray-900">{userData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <MapPinIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Shipping Address
                    </h4>
                    <p className="text-sm text-gray-900">{userData.address}</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 text-right">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Right Column - Quick Actions */}
            <div className="space-y-6">
              {/* Payment Methods Card */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Payment Methods
                  </h3>
                </div>
                <div className="px-6 py-4">
                  <div className="flex items-center">
                    <CreditCardIcon className="h-6 w-6 text-gray-400" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        VISA ending in 4242
                      </p>
                      <p className="text-xs text-gray-500">Expires 08/2025</p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 text-right">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Manage Payments
                  </button>
                </div>
              </div>

              {/* Security Card */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Security
                  </h3>
                </div>
                <div className="px-6 py-4">
                  <div className="flex items-center">
                    <ShieldCheckIcon className="h-6 w-6 text-gray-400" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        Password
                      </p>
                      <p className="text-xs text-gray-500">
                        Last changed 3 months ago
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 text-right">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Change Password
                  </button>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recent Orders
                  </h3>
                </div>
                <div className="px-6 py-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Order #LUXE-2023-0456
                      </p>
                      <p className="text-xs text-gray-500">
                        Delivered on Oct 12, 2023
                      </p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Order #LUXE-2023-0389
                      </p>
                      <p className="text-xs text-gray-500">
                        Delivered on Sep 28, 2023
                      </p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View
                    </button>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 text-center">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    View All Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Login first</p>
      )}
    </div>
  );
}

export default Profile;
