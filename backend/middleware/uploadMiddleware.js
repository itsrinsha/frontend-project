import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'liora-ecommerce',
    allowed_formats: ['jpeg', 'jpg', 'png', 'webp', 'mp4', 'mov', 'avi', 'mkv'],
    resource_type: 'auto', // Required to support both images and videos
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // 100MB limit to allow for videos
});

export default upload;
