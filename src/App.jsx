import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import NavBar from "./Navbar/NavBar";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Products from "./product/ProductsPage";
import HomePage from "./HomePage/HomePage";
import Cart from "./cart/Cart.jsx";
import AuthProvider from "./context/AuthContext";
import PaymentPage from "./paymentPage/PaymentPage.jsx";

import OrderPage from "./order/OrderPage.jsx";
import Wishlist from "./wishlist/Wishlist.jsx";
import ProductDetailsPage from "./productDetailPage/ProductDetailsPage.jsx";
import PageNotFound from "./Pagenotfound/PageNotFound.jsx"
import Profile from "./Profile/profile.jsx";
import AppRouter from "./Route/AppRouter.jsx";

function App() {
 
  return (
    <div>
      {/* <BrowserRouter>
        <AuthProvider>
       {   !hide && <NavBar />}
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
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
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
      /> */}
   <AppRouter/>
    </div>
  );
}

export default App;
