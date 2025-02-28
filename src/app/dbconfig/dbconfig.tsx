import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/user");
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log("MongoDB connected successfully");
    });
    connection.on('error', (err) => {
      console.error("MongoDB connection error:", err);
    });
    connection.on('disconnected', () => {
      console.log("MongoDB disconnected");
    });
    
  } catch (error) {
    console.error("MongoDB connection error:", error);
    
  }
}