import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "mysecretkey", { expiresIn: "15m" });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET || "myrefreshsecret", { expiresIn: "7d" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      message: "User registered successfully",
      token: accessToken,
      user: {
        id: user.id || user._id,
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email?.trim();
    password = password?.trim();
    console.log(`Login attempt for email: [${email}] with password length: ${password?.length}`);

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Login failed: User [${email}] not found`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Login failed: Password mismatch for user [${email}]`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      token: accessToken,
      user: {
        id: user.id || user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        cart: user.cart,
        wishlist: user.wishlist,
        orders: user.orders
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "Refresh Token not found" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "myrefreshsecret");
    const accessToken = generateAccessToken(decoded.id);
    res.json({ token: accessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid Refresh Token" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).json({ message: "Logged out successfully" });
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching user with ID:", id);
    let user = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      console.log("ID is valid ObjectId, trying findById...");
      user = await User.findById(id);
    }

    if (!user) {
      console.log("User not found by findById, trying findOne with legacy id field...");
      user = await User.findOne({ id: id });
    }

    if (!user) {
      console.log("User not found anywhere for ID:", id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user.email);
    res.json({
      id: user.id || user._id,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
      cart: user.cart,
      wishlist: user.wishlist,
      orders: user.orders
    });
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    let user = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    }
    if (!user) {
      user = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true });
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user.id || user._id,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
      cart: user.cart,
      wishlist: user.wishlist,
      orders: user.orders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users.map(user => ({
      id: user.id || user._id,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
      cart: user.cart,
      wishlist: user.wishlist,
      orders: user.orders
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let user = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      user = await User.findByIdAndDelete(req.params.id);
    }
    if (!user) {
      user = await User.findOneAndDelete({ id: req.params.id });
    }

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



