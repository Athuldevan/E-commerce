import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import NavBar from "../pages/Navbar/NavBar.jsx";
import Register from "../controller/auth/Register.jsx";

import Login from "../controller/auth/Login.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import Cart from "../pages/cart/Cart.jsx";
import AuthProvider from "../context/AuthContext.jsx";
import PaymentPage from "../pages/paymentPage/PaymentPage.jsx";
import Products from "../pages/product/ProductsPage.jsx";

import OrderPage from "../pages/order/OrderPage.jsx";
import Wishlist from "../pages/wishlist/Wishlist.jsx";
import ProductDetailsPage from "../pages/product/ProductDetailsPage.jsx";
import PageNotFound from "../pages/error/PageNotFound.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import Admin from "../admin/admin.jsx";
export default function MainRoutes() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

function AppRouter() {
  const location = useLocation();
  const hide =
    location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/admin";
  return (
    <div>
      <AuthProvider>
        {!hide && <NavBar />}
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="productDetails/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
