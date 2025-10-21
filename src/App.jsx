import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Viewproduct from "./pages/Viewproduct";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import Orders from "./pages/Orders";
import CheckoutPage from "./pages/Checkout";
import CartPage from "./pages/Cart";

import AdminHome from "./admin/AdminHome";
import AdminSidebar from "./admin/AdminSidebar";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminUser from "./admin/AdminUser";
import AdminLayout from "./admin/AdminLayout";

function AppContent() {
  const location = useLocation();

  // check if current route starts with /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/viewproduct/:id" element={<Viewproduct />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkoutpage" element={<CheckoutPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders />} />

        {/* ✅ Protected Admin Routes */}
        <Route
          path="/adminhome"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminHome />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminUser />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminProducts />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminOrders />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
