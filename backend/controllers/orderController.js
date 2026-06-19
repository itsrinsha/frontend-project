

import Order from "../models/Order.js";
import User from "../models/User.js";
import mongoose from "mongoose";


export const createOrder = async (req, res) => {
    console.log("createOrder called with body:", JSON.stringify(req.body, null, 2));
    try {
        const order = await Order.create(req.body);
        console.log("Order created successfully:", order._id);

        // Update user's order list
        if (mongoose.Types.ObjectId.isValid(order.userId)) {
            await User.findByIdAndUpdate(order.userId, {
                $push: { orders: order.toObject() }
            });
        } else {
            await User.findOneAndUpdate({ id: order.userId }, {
                $push: { orders: order.toObject() }
            });
        }

        res.status(201).json({ ...order.toObject(), id: order.id || order._id });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(400).json({ error: error.message });
    }
};


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        const users = await User.find({}, "name email id _id");

        const normalizedOrders = orders.map(o => {
            const user = users.find(u => u._id.toString() === o.userId || u.id === o.userId);
            return {
                ...o.toObject(),
                id: o.id || o._id,
                customer: user ? user.name : "Unknown",
                userId: o.userId
            };
        });

        res.json(normalizedOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.json(orders.map(o => ({ ...o.toObject(), id: o.id || o._id })));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        let order = null;

        if (mongoose.Types.ObjectId.isValid(id)) {
            order = await Order.findByIdAndUpdate(
                id,
                { status: req.body.status },
                { new: true }
            );
        }

        if (!order) {
            order = await Order.findOneAndUpdate(
                { id: id },
                { status: req.body.status },
                { new: true }
            );
        }

        if (!order) return res.status(404).json({ message: "Order not found" });

        // Sync change to User document
        const userId = order.userId;
        const updateQuery = mongoose.Types.ObjectId.isValid(userId) ? { _id: userId } : { id: userId };

        await User.findOneAndUpdate(
            { ...updateQuery, "orders._id": order._id },
            { $set: { "orders.$.status": req.body.status } }
        ).catch(() => {
            // Fallback for legacy ID matches if needed
            return User.findOneAndUpdate(
                { ...updateQuery, "orders.id": order.id },
                { $set: { "orders.$.status": req.body.status } }
            );
        });

        res.json({ ...order.toObject(), id: order._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        let order = null;

        if (mongoose.Types.ObjectId.isValid(id)) {
            order = await Order.findByIdAndDelete(id);
        }

        if (!order) {
            order = await Order.findOneAndDelete({ id: id });
        }

        if (!order) return res.status(404).json({ message: "Order not found" });

        // Remove order from User document
        const userId = order.userId;
        const updateQuery = mongoose.Types.ObjectId.isValid(userId) ? { _id: userId } : { id: userId };

        await User.findOneAndUpdate(
            updateQuery,
            { $pull: { orders: { _id: order._id } } }
        ).catch(() => {
            return User.findOneAndUpdate(
                updateQuery,
                { $pull: { orders: { id: order.id } } }
            );
        });

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
