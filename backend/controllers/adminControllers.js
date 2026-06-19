import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";


export const getDashboardStats = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const productsCount = await Product.countDocuments();
        const ordersCount = await Order.countDocuments();

        const orders = await Order.find({ status: { $ne: "Cancelled" } });
        const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);


        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            usersCount,
            productsCount,
            ordersCount,
            totalRevenue,
            recentOrders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;
        const pageNumber = Number(page);
        const pageSize = Number(limit);
        const skip = (pageNumber - 1) * pageSize;

        let query = {};
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } }
                ]
            };
        }

        const totalUsers = await User.countDocuments(query);
        const users = await User.find(query).select("-password").skip(skip).limit(pageSize).sort({ createdAt: -1 });

        res.json({
            users,
            pagination: {
                totalPages: Math.ceil(totalUsers / pageSize),
                currentPage: pageNumber,
                totalUsers
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const toggleBlockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(400).json({ message: "Cannot block an admin" });
        }

        user.isBlocked = !user.isBlocked;
        await user.save();

        res.json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;
        const pageNumber = Number(page);
        const pageSize = Number(limit);
        const skip = (pageNumber - 1) * pageSize;

        let orderQuery = {};
        if (search) {
            // If search looks like a MongoDB ID, search by ID
            if (mongoose.Types.ObjectId.isValid(search)) {
                orderQuery = { _id: search };
            } else {
                // Otherwise, we might need to find users first to search by customer name
                const matchingUsers = await User.find({
                    name: { $regex: search, $options: "i" }
                }).select("_id id");

                const userIds = matchingUsers.map(u => u._id.toString());
                const legacyIds = matchingUsers.map(u => u.id).filter(Boolean);

                orderQuery = {
                    $or: [
                        { userId: { $in: [...userIds, ...legacyIds] } },
                        { id: { $regex: search, $options: "i" } }
                    ]
                };
            }
        }

        const totalOrders = await Order.countDocuments(orderQuery);
        const orders = await Order.find(orderQuery).sort({ createdAt: -1 }).skip(skip).limit(pageSize);

        const users = await User.find({}, "name email id _id");

        const ordersWithCustomers = orders.map(order => {
            const user = users.find(u => u._id.toString() === order.userId || u.id === order.userId);
            return {
                ...order.toObject(),
                id: order.id || order._id,
                customerName: user ? user.name : "Unknown Customer",
                customerEmail: user ? user.email : "N/A"
            };
        });

        res.json({
            orders: ordersWithCustomers,
            pagination: {
                totalPages: Math.ceil(totalOrders / pageSize),
                currentPage: pageNumber,
                totalOrders
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (!["Pending", "Shipped", "Delivered", "Cancelled"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }


        const userId = order.userId;
        const updateQuery = mongoose.Types.ObjectId.isValid(userId) ? { _id: userId } : { id: userId };

        await User.findOneAndUpdate(
            { ...updateQuery, "orders._id": order._id },
            { $set: { "orders.$.status": status } }
        );

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }


        const userId = order.userId;
        const updateQuery = mongoose.Types.ObjectId.isValid(userId) ? { _id: userId } : { id: userId };

        await User.findOneAndUpdate(
            updateQuery,
            { $pull: { orders: { _id: order._id } } }
        );

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
