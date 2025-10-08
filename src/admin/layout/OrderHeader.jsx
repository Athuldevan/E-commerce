function OrderHeader({ pendingOrders, totalOrders, totalRevenue }) {
  return (
    <>
      <main className="flex-1 overflow-y-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Orders Management
          </h1>
          <p className="text-gray-400">Manage and track all customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-white mt-1">{totalOrders}</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold text-white mt-1">
              ${totalRevenue}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Pending Orders</p>
            <p className="text-2xl font-bold text-white mt-1">
              {pendingOrders}
            </p>
          </div>
        </div>

      </main>
    </>
  );
}

export default OrderHeader;
