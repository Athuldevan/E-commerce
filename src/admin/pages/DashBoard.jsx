import { useContext } from "react";
import { usersContext } from "../contexts/UsersContext";
import ChartLayout from "../layout/ChartLayout";
import { OrdersContext } from "../contexts/OrdersContext";

function DashBoard() {
  const { users, latestUser } = useContext(usersContext);
  const { latestOrder } = useContext(OrdersContext);
  const totalUsers = users?.length;
  console.log(latestOrder);
  const newOrder = latestOrder[0]?._id || "no latest order available";
  const latestPayment = latestOrder[0]?.totalPrice || 0.0;
  const newUser = latestUser[0]?.name || "No new user";
console.log(latestOrder);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Total Users</p>
                <h3 className="text-2xl font-bold">
                  {totalUsers || "Total users"}
                </h3>
              </div>
              <div className="p-3 bg-purple-600 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2">↑ 12% from last month</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Total Revenue</p>
                <h3 className="text-2xl font-bold"> %Total revenue%</h3>
              </div>
              <div className="p-3 bg-blue-600 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2">
              ↑ 8.5% from last month
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Active Products</p>
                <h3 className="text-2xl font-bold">342</h3>
              </div>
              <div className="p-3 bg-green-600 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
            <p className="text-red-400 text-sm mt-2">↓ 3% from last month</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Pending Orders</p>
                <h3 className="text-2xl font-bold">56</h3>
              </div>
              <div className="p-3 bg-yellow-600 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2">
              ↑ 2.4% from last month
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Revenue Overview</h2>
              <select className="bg-gray-700 text-gray-200 px-3 py-1 rounded text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <>
              <ChartLayout />
            </>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full mt-1"></div>
                <div>
                  <p className="font-medium">New order received</p>
                  <p className="text-sm text-gray-400">{newOrder}</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full mt-1"></div>
                <div>
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-gray-400">{newUser}</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full mt-1"></div>
                <div>
                  <p className="font-medium">Payment received</p>
                  <p className="text-sm text-gray-400">{latestPayment}</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold">Recent Orders</h2>
     
        
        {latestOrder.map((order) => (
          <>
            <p>{order.status}</p>
            <p>{order?.totalPrice}</p>

            <h2>Products</h2>
            {order.products.map(product => (
              <>
              <p>{product?._id}</p>
              </>
            ))}
            <p>{order?.totalPrice}</p>
          </>
        ))}
      </main>
    </div>
  );
}

export default DashBoard;
