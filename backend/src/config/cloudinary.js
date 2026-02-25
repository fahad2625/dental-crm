import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
 CLOUDINARY_CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUDINARY_API_SECRET: process.env.API_KEY,
  CLOUDINARY_API_SECRET: process.env.API_SECRET,
});

export default cloudinary;
