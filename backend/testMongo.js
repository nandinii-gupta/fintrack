import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo connected OK ✅");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Mongo error ❌", err.message);
    process.exit(1);
  });
