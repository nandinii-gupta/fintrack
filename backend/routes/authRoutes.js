import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", (req, res, next) => {
  console.log("LOGIN HIT");
  next();
}, loginUser);


export default router;









