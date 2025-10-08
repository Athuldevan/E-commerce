import { usersContext } from "../contexts/UsersContext";
import { useContext } from "react";
import UserTable from "../layout/UserTable";

const UsersPage = () => {
  const { users, isBlocked, setIsBlocked } = useContext(usersContext);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
        <p className="text-gray-400">
          Manage your e-commerce users and their permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-white">Total Users</h3>
          <p className="text-2xl font-bold text-white mt-2">{users.length}</p>
          <p className="text-gray-400 text-sm mt-1">Registered accounts</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-white">Active Users</h3>
          <p className="text-2xl font-bold text-white mt-2">
            {users.filter((u) => u.isBlocked === false).length}
          </p>
          <p className="text-gray-400 text-sm mt-1">Currently active</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-white">Admins</h3>
          <p className="text-2xl font-bold text-white mt-2">
            {users.filter((u) => u.role === "admin").length}
          </p>
          <p className="text-gray-400 text-sm mt-1">Administrative users</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold text-white">New This Month</h3>
          <p className="text-2xl font-bold text-white mt-2">
            {users.filter((u) => u.isNew).length}
          </p>
          <p className="text-gray-400 text-sm mt-1">Recent signups</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">All Users</h2>
            <div className="flex space-x-3">
              {/* Filter status options */}
              <select
                className="bg-gray-700"
                onChange={(e) => setIsBlocked(e.target.value)}
              >
                <option value= {undefined}>Filter by Status</option>
                <option value={false}>Active</option>
                <option value={true}>Blocked</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition duration-200">
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-750 border-b border-gray-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((user) => (
                <UserTable user={user} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {users.length} of {users.length} users
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition duration-200">
                Previous
              </button>
              <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition duration-200">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
