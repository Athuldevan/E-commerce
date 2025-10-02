import React from "react";
import { Link } from "react-router-dom";
 const NoOrdersFound = ({ activeTab }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600 text-sm">
            Track and manage your purchases
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b border-gray-200 mb-8">
          <div className="flex space-x-1">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === "recent"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Recent Orders
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === "past"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Past Orders
            </button>
          </div>
        </div>

        {/* No Orders State */}
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <div className="max-w-md mx-auto">
            {/* Icon */}
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
            </div>

            {/* Text Content */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {activeTab === "recent" ? "Recent" : "Past"} Orders
            </h3>
            <p className="text-gray-500 mb-8">
              {activeTab === "recent" 
                ? "You haven't placed any orders recently. Start shopping to see your orders here!"
                : "You don't have any past orders. All your recent orders will appear here."
              }
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Start Shopping
              </Link>
              
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoOrdersFound;