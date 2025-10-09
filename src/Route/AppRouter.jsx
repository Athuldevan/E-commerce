import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import NavBar from "../pages/Navbar/NavBar.jsx";
import Register from "../controller/auth/Register.jsx";

import Login from "../controller/auth/Login.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import Cart from "../pages/cart/Cart.jsx";
import PaymentPage from "../pages/paymentPage/PaymentPage.jsx";
import Products from "../pages/product/ProductsPage.jsx";

import OrderPage from "../pages/order/OrderPage.jsx";
import Wishlist from "../pages/wishlist/Wishlist.jsx";
import ProductDetailsPage from "../pages/product/ProductDetailsPage.jsx";
import PageNotFound from "../pages/error/PageNotFound.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminDashboard from "../admin/layout/AdminDashboard.jsx";
import DashBoard from "../admin/pages/Dashboard.jsx";
import UsersPage from "../admin/pages/UsersPage.jsx";
import OrdersPage from "../admin/pages/OrdersPage.jsx";
import ProductsPage from "../admin/pages/ProductsPage.jsx";
import AdminProfile from "../admin/pages/AdminProfile.jsx";
import AuthProvider from "../context/AuthContext.jsx";
import CartProvider from "../context/cartContext.jsx";
import WishlistProvider from "../context/WishlistContext.jsx";
import OrderProvider from "../context/orderContext.jsx";
import CheckoutProvider from "../context/CheckoutContext.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import OrdersProvider from "../admin/contexts/OrdersContext.jsx";
import UsersProvider from "../admin/contexts/UsersContext.jsx";
import ProductsProvider from "../admin/contexts/ProductsContext.jsx";

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <CheckoutProvider>
                <OrdersProvider>
                  <UsersProvider>
                    <ProductsProvider>
                      <AppRouter />
                    </ProductsProvider>
                  </UsersProvider>
                </OrdersProvider>
              </CheckoutProvider>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppRouter() {
  const location = useLocation();
  const hide =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");
  return (
    <div>
      {/* <AuthProvider>/ */}
      {!hide && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/productDetails/:id"
          element={<ProductDetailsPage />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/admin"
          element={
            <OrdersProvider>
              <UsersProvider>
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              </UsersProvider>
            </OrdersProvider>
          } // Admin route is a protected route
        >
          <Route path="users" element={<UsersPage />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="order" element={<OrdersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* </AuthProvider> */}

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
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
