import express from "express";
import Goal from "../models/Goal.js";

const router = express.Router();

/* Create Goal */
router.post("/", async (req, res) => {
  try {
    const goal = await Goal.create(req.body);
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Get All Goals */
router.get("/", async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
});

/* Add money to goal */
router.put("/:id/add", async (req, res) => {
  const { amount } = req.body;

  const goal = await Goal.findById(req.params.id);
  goal.savedAmount += Number(amount);
  await goal.save();

  res.json(goal);
});

export default router;

