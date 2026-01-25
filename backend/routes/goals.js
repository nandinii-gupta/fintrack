import express from "express";
import Goal from "../models/Goal.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const goal = await Goal.create(req.body);
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
});

router.put("/:id/add", async (req, res) => {
  const { amount } = req.body;

  const goal = await Goal.findById(req.params.id);
  goal.savedAmount += Number(amount);
  await goal.save();

  res.json(goal);
});

export default router;

