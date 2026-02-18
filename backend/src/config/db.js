import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://blahblahhblublu_db_user:XjdtHfCIo4PKuzCK@cluster0.ltazbzu.mongodb.net/shopping?retryWrites=true&w=majority"
    );
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
