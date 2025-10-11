import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/Productcard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    axios.get("http://localhost:5000/products").then(res => setProducts(res.data));
  }, []);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "all" || p.category === category)
  );

  const categories = ["all", ...new Set(products.map(p => p.category))];

  return (
    <div>
      <h2>Products</h2>

      {/* Search & Filter */}
      <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      {/* Product Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
