import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();


try {
    await connectDB();

    const app = express();

    const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'https://frontend-project-one-lake.vercel.app'
];
    
    app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
    app.use(express.json())
    app.use(cookieParser()) //Reads cookies from request
    app.use('/uploads', express.static('uploads'));


    const PORT = process.env.PORT || 3000;

    app.get("/", (req, res) => {
        res.send("backend is running")
    });

    app.get("/api", (req, res) => {
        res.send("API is functional")
    });


    app.use('/api/products', productRoutes);
    app.use('/api/user', authRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/admin', adminRoutes);


    app.use((req, res, next) => {
        console.log(`404: ${req.method} ${req.originalUrl}`);
        res.status(404).send(`Cannot ${req.method} ${req.originalUrl}`);
    });

    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
        console.log("Registered routes: /api/products, /api/user, /api/orders, /api/admin");
    })
} catch (error) {
    console.error("Failed to start server due to DB connection error:", error);
    process.exit(1);
}