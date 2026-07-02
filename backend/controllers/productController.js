import Product from "../models/Product.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category && category !== "all") {
      query.category = category;
    }
    

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query).skip(skip).limit(pageSize).sort({ createdAt: -1 });
    res.json({
      products: products.map(p => ({
        ...p.toObject(),
        id: p._id.toString(),
      })),
      pagination: {
        totalPages: Math.ceil(totalProducts / pageSize),
        currentPage: pageNumber,
        pageSize
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let product = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    }

    if (!product) {
      product = await Product.findOne({ id: id });
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      ...product.toObject(),
      id: product.id || product._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = req.file.path;
    }
    const product = await Product.create(data);
    res.status(201).json({
      ...product.toObject(),
      id: product._id.toString(),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (req.file) {
      data.image = req.file.path;
    }

    let product = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
      );
    }

    if (!product) {
      product = await Product.findOneAndUpdate(
        { id: id },
        { $set: data },
        { new: true, runValidators: true }
      );
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      ...product.toObject(),
      id: product.id || product._id.toString(),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findByIdAndDelete(id);
    }

    if (!product) {
      product = await Product.findOneAndDelete({ id: id });
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
