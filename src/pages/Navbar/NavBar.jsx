import { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(5);
  const [cartCount, setCartCount] = useState(3);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const { id = null } = loggedInUser;
  // const { wishlist = [], cart = [], id = null } = loggedInUser;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/register");
  }

  return (
    <nav className="bg-slate-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-slate-200">
              LUXEWATCH
            </Link>

            <div className="hidden md:flex ml-10 space-x-8">
              <Link
                to="/"
                className="text-slate-200 hover:text-slate-400 px-1 py-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-slate-200 hover:text-slate-400 px-1 py-2 text-sm font-medium"
              >
                Products
              </Link>
              <Link
                to="/orders"
                className="text-slate-200 hover:text-slate-400 px-1 py-2 text-sm font-medium"
              >
                My Orders
              </Link>
            </div>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-6">
            <button className="p-1 text-slate-200 hover:text-slate-400">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            <button
              className="p-1 text-slate-200 hover:text-red-500 relative"
              onClick={() => navigate("/wishlist")}
            >
              <HeartIcon className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-400 text-slate-200 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="p-1 text-slate-200 hover:text-slate-400 relative"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-400 text-slate-200 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-1 text-slate-100 hover:text-slate-400 flex items-center"
              >
                {<UserIcon className="h-5 w-5" />}
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 hover:text-slate-100"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogOut();
                      setUserDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-100 hover:bg-slate-800 hover:text-slate-100"
                  >
                    {id ? "LogOut" : "LogIn"}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1 text-gray-600 hover:text-indigo-600"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/orders"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                onClick={() => setIsOpen(false)}
              >
                My Orders
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                onClick={() => setIsOpen(false)}
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  handleLogOut();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              >
                {id ? "Logout" : "LogIn"}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
