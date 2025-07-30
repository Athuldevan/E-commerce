import { useState, useRef } from "react";
import {
  FiUser,
  FiLogOut,
  FiChevronDown,
  FiSettings,
  FiBell,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function Header() {
  const { loggedInUser, handleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <header className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
      <h1 className="text-2xl font-bold">Welcome {loggedInUser.name}</h1>

      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <div className="relative">
          <FiBell className="w-6 h-6 text-gray-400" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              {loggedInUser.name.charAt(0).toUpperCase()}
            </div>
            <FiChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-50">
              <div className="py-1">
                <div className="px-4 py-2 text-sm text-gray-200 border-b border-gray-700">
                  <div className="font-medium">{loggedInUser.name}</div>
                  <div className="text-xs text-gray-400">
                    {loggedInUser.email}
                  </div>
                </div>
                <Link to ='profile' className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">
                  <FiUser className="mr-2" /> My Profile
                </Link>
                <Link  className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">
                  <FiSettings className="mr-2" /> Settings
                </Link>
                <button  onClick = {handleLogout} className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 border-t border-gray-700">
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
