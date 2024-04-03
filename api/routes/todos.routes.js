import express from "express";
const router = express.Router();

import mongoose from "mongoose";

// Création de schéma pour la db
const TodoSchema = new mongoose.Schema({
  task: String,
  checked: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);


// Gestion des routes
router.get("/", async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

router.post("/", async (req, res) => {
  const todo = await Todo.create(req.body);
  res.json(todo);
});

router.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

router.delete("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  res.json(todo);
});

export default router;