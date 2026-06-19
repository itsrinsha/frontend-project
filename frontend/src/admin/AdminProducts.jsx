import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/api.js";
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaCloudUploadAlt } from "react-icons/fa";

const AdminProductSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PRODUCTS_PER_PAGE = 10;

  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch products
  const fetchProducts = async (page = 1, search = "") => {
    try {
      const res = await api.get("/products", {
        params: {
          page,
          limit: PRODUCTS_PER_PAGE,
          search
        }
      });

      setProducts(res.data.products);
      setTotalPages(res.data.pagination.totalPages);
      setCurrentPage(res.data.pagination.currentPage);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  useEffect(() => {
    fetchProducts(currentPage, searchTerm);
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts(1, searchTerm);
  };

  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // ✅ Add or Edit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || (!file && !form.image) || Number(form.price) <= 0) {
      alert("Please fill in all required fields. Price must be greater than 0.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name || form.title || "");
    formData.append("category", form.category || "Uncategorized");
    formData.append("price", Number(form.price) || 0);
    formData.append("stock", Number(form.stock) || 0);
    formData.append("description", form.description || "No description provided");

    if (file) {
      formData.append("image", file);
    } else {
      formData.append("image", form.image);
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (editId) {
        await api.put(`/products/${editId}`, formData, config);
        setEditId(null);
        alert("Product updated successfully!");
      } else {
        await api.post("/products", formData, config);
        alert("Product added successfully!");
      }

      setForm({ name: "", category: "", price: "", stock: "", image: "", description: "" });
      setFile(null);
      setPreview("");
      fetchProducts(currentPage);
    } catch (error) {
      console.error("Error saving product:", error);
      alert(error.response?.data?.message || "Failed to save product. Please try again.");
    }
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts(currentPage);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // ✅ Edit product
  const handleEdit = (product) => {
    setForm({
      ...product,
      name: product.name || product.title || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      category: product.category || "",
      image: product.image || "",
    });
    setPreview(product.image || "");
    setFile(null);
    setEditId(product.id || product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Cancel edit
  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ name: "", category: "", price: "", stock: "", image: "", description: "" });
    setFile(null);
    setPreview("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Product Management</h1>
          <p className="text-gray-600">Manage your product inventory and details</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <FaPlus className="mr-2" />
              {editId ? "Edit Product" : "Add New Product"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative min-h-[160px]">
                  {preview ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img src={preview} alt="Preview" className="max-h-32 object-contain rounded" />
                      <button
                        type="button"
                        onClick={() => { setFile(null); setPreview(""); setForm({ ...form, image: "" }) }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-[10px] text-gray-400 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <div className="mt-2 text-center">
                  <span className="text-xs text-gray-400 font-medium italic">OR</span>
                </div>
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Paste image URL here"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="btn-primary flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-md active:transform active:scale-95"
              >
                <FaSave className="mr-2" />
                {editId ? "Update Product" : "Add Product"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex items-center px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all font-semibold shadow-md"
                >
                  <FaTimes className="mr-2" />
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-800 px-6 py-4 flex flex-col md:row justify-between items-center gap-4">
            <h2 className="text-xl font-semibold text-white">Product Inventory</h2>
            <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                Search
              </button>
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Image</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Details</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Price & Stock</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-xl shadow-sm border border-gray-100"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/64x64?text=No+Image'; }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800">{p.name}</p>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{p.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">₹{p.price}</p>
                      <p className={`text-xs font-bold ${p.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100">
                          <FaEdit size={18} />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100">
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 py-6 border-t font-medium">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg scale-110' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductSection;