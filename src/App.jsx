import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Prodects";
import Viewproduct from "./pages/Viewproduct";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyNowModal from "./components/BuyNowModal";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <BrowserRouter>
      <Navbar
        cart={cart}
        wishlist={wishlist}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Routes>
        <Route
          path="/"
          element={<Home cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />}
        />
        <Route
          path="/products"
          element={<Products cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} searchQuery={searchQuery} />}
        />
        <Route
          path="/products/:id"
          element={<Viewproduct cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />}
        />
        <Route
          path="/viewproduct/:id"
          element={<Viewproduct cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />}
        />
        <Route
          path="/wishlist"
          element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} cart={cart} setCart={setCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/checkout/:id" element={<Checkout cart={cart} setCart={setCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


