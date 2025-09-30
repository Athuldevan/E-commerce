import { useContext, useRef, useState, useEffect } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/cartContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

function NavLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const { wishlist } = useContext(WishlistContext);
  const { cartItems } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogOut() {
    navigate("/register");
  }

  return (
    <nav className={`bg-slate-900 sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "shadow-xl bg-slate-900/95 backdrop-blur-sm" : "shadow-md"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-400 transition-all duration-300"
            >
              LUXEWATCH
            </Link>

            <div className="hidden md:flex ml-12 space-x-8">
              <Link
                to="/"
                className="text-slate-200 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-800/50"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-slate-200 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-800/50"
              >
                Products
              </Link>
              <Link
                to="/orders"
                className="text-slate-200 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-800/50"
              >
                My Orders
              </Link>
            </div>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-200 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            <button
              className="p-2 text-slate-200 hover:text-red-400 hover:bg-slate-800/50 rounded-lg transition-all duration-200 relative"
              onClick={() => navigate("/wishlist")}
            >
              <HeartIcon className="h-5 w-5" />
              {wishlist?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="p-2 text-slate-200 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 relative"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {cartItems?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-2 text-slate-200 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 flex items-center"
              >
                <UserIcon className="h-5 w-5" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-2xl py-2 z-50 border border-slate-700">
                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center px-4 py-3 text-sm text-slate-200 hover:bg-slate-700/50 hover:text-white transition-all duration-200"
                  >
                    <UserIcon className="h-4 w-4 mr-3" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogOut();
                      setUserDropdownOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-3 text-sm text-slate-200 hover:bg-slate-700/50 hover:text-white transition-all duration-200"
                  >
                    <span className="flex-1">{isLoggedIn ? "Log Out" : "Log In"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-200 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
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
          <div className="md:hidden bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700 mt-2 mb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/orders"
                className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                My Orders
              </Link>
              <Link
                to="/profile"
                className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  handleLogOut();
                  setIsOpen(false);
                }}
                className="flex items-center w-full text-left px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              >
                {isLoggedIn ? "Log Out" : "Log In"}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavLayout;