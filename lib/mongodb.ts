import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!; // from .env.local
console.log(MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI inside .env.local");
}

let isConnected = false; // to avoid multiple connections in dev

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

