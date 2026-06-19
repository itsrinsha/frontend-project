import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import connectDB from "./config/db.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin123";

        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("Admin already exists. Updating password and ensuring admin role...");
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            existingAdmin.password = hashedPassword;
            existingAdmin.role = "admin";
            await existingAdmin.save();
            console.log(`Admin updated: ${adminEmail}`);
            console.log(`Password: ${adminPassword}`);
        } else {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            await User.create({
                name: "Admin User",
                email: adminEmail,
                password: hashedPassword,
                role: "admin",
            });
            console.log(`Admin created: ${adminEmail}`);
            console.log(`Password: ${adminPassword}`);
        }

        console.log("You can now login with these credentials.");
        process.exit();
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();
