import { useState } from "react";
import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import Wishlist from "../wishlist/Wishlist";
function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(5);
  const [cartCount, setCartCount] = useState(3);
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const { wishlist = [], cart = [], id = null } = loggedInUser;

  // Logout functionality 
  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/register")
  }
  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <SparklesIcon className="h-8 w-8 text-yellow-300 animate-pulse" />
            <a
              href="#"
              className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400"
            >
              LUXE<span className="text-white">WATCH</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg hover:bg-purple-700/50 hover:text-amber-200 transition-all font-medium flex items-center"
            >
              <span className="bg-amber-400 w-2 h-2 rounded-full mr-2"></span>
              Home
            </Link>
            <Link
              to="/products"
              className="px-4 py-2 rounded-lg hover:bg-indigo-700/50 hover:text-cyan-200 transition-all font-medium flex items-center"
            >
              <span className="bg-cyan-400 w-2 h-2 rounded-full mr-2"></span>
              Products
            </Link>
            {/* <a href="#" className="px-4 py-2 rounded-lg hover:bg-pink-700/50 hover:text-pink-200 transition-all font-medium flex items-center">
              <span className="bg-pink-400 w-2 h-2 rounded-full mr-2"></span>
              Collections
            </a> */}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-amber-200" />
            </button>

            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all relative">
              {!id ? (
                <UserIcon
                  className="h-5 w-5 text-cyan-200"
                  onClick={() => navigate("/login")}
                />
              ) : (
                <Link to="/register" onClick={handleLogOut}>
                  Logout
                </Link>
              )}
            </button>

            {/* Wishlist with heart icon */}
            {/* Wishlist Button */}
            <button
              onClick={() => navigate("/wishlist")}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all relative group"
            >
              <HeartIcon className="h-5 w-5 text-rose-400 group-hover:text-rose-300" />
              {id && wishlist?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-purple-900">
                  {wishlist?.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => navigate("/cart")}
              className="p-2 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all relative"
            >
              <ShoppingBagIcon className="h-5 w-5 text-white" />
              {id && cart?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-purple-900">
                  {cart?.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-rose-300" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-amber-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gradient-to-b from-purple-900/90 to-indigo-900/90 backdrop-blur-sm p-4 rounded-lg mt-2 space-y-3 animate-fadeIn">
            <Link
              to="/"
              className="block px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500/20 to-transparent hover:from-amber-600/30 transition-all flex items-center"
            >
              <SparklesIcon className="h-4 w-4 mr-2 text-amber-300" />
              Home
            </Link>
            <Link
              to="/products"
              className="block px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-transparent hover:from-cyan-600/30 transition-all flex items-center"
            >
              <SparklesIcon className="h-4 w-4 mr-2 text-cyan-300" />
              Products
            </Link>
            {/* <a href="#" className="block px-4 py-3 rounded-lg bg-gradient-to-r from-pink-500/20 to-transparent hover:from-pink-600/30 transition-all flex items-center">
              <SparklesIcon className="h-4 w-4 mr-2 text-pink-300" />
              Collections
            </a> */}

            <div className="flex space-x-3 pt-3">
              <button
                onClick={() => navigate("/login")}
                className="flex-1 flex items-center justify-center p-2 rounded-lg bg-cyan-600/50 hover:bg-cyan-500/60 transition-all"
              >
                <UserIcon className="h-5 w-5 mr-1" />
                <span>Login</span>
              </button>

              <button
                onClick={() => navigate("/wishlist")}
                className="flex-1 flex items-center justify-center p-2 rounded-lg bg-rose-600/50 hover:bg-rose-500/60 transition-all relative"
              >
                <HeartIcon className="h-5 w-5 mr-1" />
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-purple-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="flex-1 flex items-center justify-center p-2 rounded-lg bg-pink-600/50 hover:bg-pink-500/60 transition-all relative"
              >
                <ShoppingBagIcon className="h-5 w-5 mr-1" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-purple-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
