import React from 'react';

const UserView = ({ selectedUser, handleCloseUserView }) => {
  if (!selectedUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold">User Details</h3>
          <button
            onClick={handleCloseUserView}
            className="p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-gray-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          {/* User Avatar & Basic Info */}
          <div className="flex items-center space-x-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full ${selectedUser.avatarColor || 'bg-purple-600'} flex items-center justify-center text-white text-xl font-bold`}>
              {selectedUser.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h4 className="text-lg font-medium">{selectedUser.name || 'Unknown User'}</h4>
              <p className="text-sm text-gray-400">{selectedUser.role || 'No role specified'}</p>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">User ID</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-sm">{selectedUser.id || 'N/A'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                selectedUser.status === 'Active' ? 'bg-green-900 text-green-200' :
                selectedUser.status === 'Inactive' ? 'bg-gray-700 text-gray-300' :
                'bg-red-900 text-red-200'
              }`}>
                {selectedUser.status || 'Unknown'}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-sm">{selectedUser.email || 'N/A'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Last Login</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-sm">{selectedUser.lastLogin || 'N/A'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Joined</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-sm">{selectedUser.createdAt || 'N/A'}</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t border-gray-700 space-x-3">
          <button
            onClick={handleCloseUserView}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium"
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium"
          >
            Edit User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserView;