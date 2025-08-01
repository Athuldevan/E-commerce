import { useState } from "react";


function EditUserComponent({ selectedUser, handleBlock, handleCloseUserView }) {
  const [isBlock, setIsBlock] = useState(selectedUser.isBlock || false);

  const handleBlockAndClose = async () => {
    await handleBlock(isBlock, selectedUser.id);
    handleCloseUserView();
  };
                                      
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Manage User</h3>
          <button onClick={handleBlockAndClose} className="p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-gray-200">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold">
              J
            </div>
            <div>
              <h4 className="text-lg font-medium">{selectedUser.name}</h4>
              <p className="text-sm text-gray-400">{selectedUser.email}</p>
            </div>
          </div>

          {/* Block Toggle - Design Only */}
          <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
            <div>
              <h4 className="font-medium">Block User</h4>
              <p className="text-sm text-gray-400">
                This user will lose access
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
        
                checked = {isBlock}
                onChange={(e) => setIsBlock(e.target.checked)}
              />
              <div className="w-11 h-6 bg-red-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          {/* Block Reason - Design Only */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
              Reason for blocking
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm"
              defaultValue="Violation of community guidelines"
              readOnly
            />
          </div>

          {/* Action Buttons - Design Only */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button onClick={handleCloseUserView} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium">
              Cancel
            </button>
            <button onClick={handleBlockAndClose} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium">
             { isBlock === true  ? 'Unblock User' : 'Block User'}
            </button> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserComponent;
