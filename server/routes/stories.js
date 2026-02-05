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

// ❤️ This helped me
router.post("/:id/helped", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE stories
      SET helped_count = helped_count + 1
      WHERE id = $1
      RETURNING helped_count
      `,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json({ helpedCount: result.rows[0].helped_count });
  } catch (err) {
    console.error("Helped route error:", err);
    res.status(500).json({ error: "Failed to update support count" });
  }
});

export default router;
