import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Get all stories
router.get("/", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM stories ORDER BY created_at DESC"
  );
  res.json(rows);
});

// Add story
router.post("/", async (req, res) => {
  const { content, category } = req.body;
  await pool.query(
    "INSERT INTO stories (content, category) VALUES ($1, $2)",
    [content, category]
  );
  res.sendStatus(201);
});

export default router;
