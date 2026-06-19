import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";
import fs from "fs";

dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        const dbData = JSON.parse(fs.readFileSync("../frontend/db.json", "utf-8"));
        const products = dbData.products
            .filter(p => p.name && p.name.trim() !== "")
            .map(p => ({ ...p, title: p.name }));

        await Product.deleteMany();
        await Product.insertMany(products);

        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.error("Error with data import", error);
        process.exit(1);
    }
};

importData();
