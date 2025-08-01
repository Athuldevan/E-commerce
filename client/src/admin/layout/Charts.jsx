function Charts() {
  return (
    <>
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
          <div className="h-64 bg-gray-700 rounded flex items-center justify-center">
            <p className="text-gray-400">Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full mt-1"></div>
              <div>
                <p className="font-medium">New order received</p>
                <p className="text-sm text-gray-400">
                  Order #1234 from John Doe
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full mt-1"></div>
              <div>
                <p className="font-medium">New user registered</p>
                <p className="text-sm text-gray-400">
                  Jane Smith joined the platform
                </p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full mt-1"></div>
              <div>
                <p className="font-medium">Payment received</p>
                <p className="text-sm text-gray-400">$245.00 for order #1233</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full mt-1"></div>
              <div>
                <p className="font-medium">System update</p>
                <p className="text-sm text-gray-400">Version 2.1.0 deployed</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Charts;
