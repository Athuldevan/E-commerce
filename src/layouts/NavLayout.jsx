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
  const { isLoggedIn, logout } = useContext(AuthContext);

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
    if (isLoggedIn) {
      logout();
    }
    navigate("/register");
    setUserDropdownOpen(false);
  }

  function handleLogin() {
    navigate("/register");
    setUserDropdownOpen(false);
  }

  return (
    <nav
      className={`bg-black/90 backdrop-blur-xl sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "shadow-2xl border-b border-white/10" : "border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:opacity-80 transition-opacity duration-300"
            >
              Applecart
            </Link>

            <div className="hidden md:flex ml-16 space-x-10">
              <Link
                to="/"
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-300"
              >
                Products
              </Link>
              <Link
                to="/orders"
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-300"
              >
                My Orders
              </Link>
            </div>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-300 hover:text-white transition-colors duration-300">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            <button
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
              onClick={() => navigate("/wishlist")}
            >
              <HeartIcon className="h-5 w-5 group-hover:text-red-500 transition-colors duration-300" />
              {wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              <ShoppingBagIcon className="h-5 w-5 group-hover:text-blue-500 transition-colors duration-300" />
              {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <UserIcon className="h-5 w-5" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-50 border border-white/10">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300"
                      >
                        <UserIcon className="h-4 w-4 mr-3" />
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogOut}
                        className="flex items-center w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300 border-t border-white/5 mt-1"
                      >
                        <span className="flex-1">Log Out</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="flex items-center w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300"
                    >
                      <span className="flex-1">Log In</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors duration-300"
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
          <div className="md:hidden bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 mt-3 mb-4">
            <div className="px-3 pt-3 pb-3 space-y-1">
              <Link
                to="/"
                className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/orders"
                className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                My Orders
              </Link>
              {isLoggedIn && (
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
              )}
              <button
                onClick={isLoggedIn ? handleLogOut : handleLogin}
                className="flex items-center w-full text-left px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 border-t border-white/5 mt-2"
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