import { FiUser, FiMail, FiPhone, FiLock, FiEdit2, FiSave } from 'react-icons/fi';
import { useState } from 'react';

function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@admin.com",
    phone: "+1 (555) 123-4567",
    role: "Super Admin",
    lastLogin: "Today, 09:42 AM"
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Profile</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center px-4 py-2 rounded-lg ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isEditing ? (
            <>
              <FiSave className="mr-2" /> Save Changes
            </>
          ) : (
            <>
              <FiEdit2 className="mr-2" /> Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Avatar & Basic Info */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full bg-purple-600 flex items-center justify-center text-4xl font-bold">
                {adminData.name.charAt(0)}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full border border-gray-600 hover:bg-gray-600">
                  <FiEdit2 size={16} />
                </button>
              )}
            </div>
            
            <h2 className="text-xl font-bold mt-2">{adminData.name}</h2>
            <span className="text-purple-400 text-sm">{adminData.role}</span>
            
            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center text-gray-400">
                <FiMail className="mr-2" />
                <span>{adminData.email}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <FiPhone className="mr-2" />
                <span>{adminData.phone}</span>
              </div>
              <div className="pt-4 text-sm text-gray-500">
                Last login: {adminData.lastLogin}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Security Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FiLock className="mr-2 text-blue-400" />
              Security Settings
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Password</h4>
                  <p className="text-sm text-gray-400">Last changed 3 months ago</p>
                </div>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
                  Change Password
                </button>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-400">Add extra security to your account</p>
                </div>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>

          {/* Activity Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            
            <div className="space-y-3">
              {[
                { action: "Logged in", time: "10 minutes ago", device: "Chrome, Windows" },
                { action: "Updated product #1234", time: "2 hours ago" },
                { action: "Changed settings", time: "Yesterday" }
              ].map((item, index) => (
                <div key={index} className="flex items-start pb-3 border-b border-gray-700 last:border-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-400 mr-3"></div>
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-gray-400">
                      {item.time} {item.device && `• ${item.device}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;