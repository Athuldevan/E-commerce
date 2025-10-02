import { useEffect, useState } from "react";
import { User, Mail, Calendar, Camera } from "lucide-react";
import getProfile from "../../api/services/profileService";

function Profile() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile([data.user]);
        console.log(data);
        setTotalOrders(data.totalOrders);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {profile.map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

            {/* Profile Content */}
            <div className="px-6 pb-8">
              {/* Profile Image */}
              <div className="flex justify-center -mt-16 mb-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-lg">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300">
                        <User className="w-16 h-16 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* User Info */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {user.name}
                </h1>
                <p className="text-gray-600">Customer</p>
              </div>

              {/* Details Cards */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Email Address
                    </p>
                    <p className="text-gray-800">{user.email}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-3">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Member Since
                    </p>
                    <p className="text-gray-800">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition">
                  Edit Profile
                </button>
                <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition">
                  View Orders
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
