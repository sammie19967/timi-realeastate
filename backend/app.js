import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the backend of your e-commerce app!");
});

// Port Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});