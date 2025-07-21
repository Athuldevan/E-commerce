import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Navbar/NavBar";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Products from "./product/ProductsPage";
import HomePage from "./HomePage/HomePage";
import Cart from "./cart/Cart.jsx";
import  AuthProvider  from "./context/AuthContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
          
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
