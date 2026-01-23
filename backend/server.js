import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("FinTrack Backend is running 🚀");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5050;


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}⚡`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


