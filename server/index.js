import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pool } from "./db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize table
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS stories (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
})();

// POST /api/stories
app.post("/api/stories", async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: "Content is required" });

  try {
    const result = await pool.query(
      "INSERT INTO stories (content) VALUES ($1) RETURNING *",
      [content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit story" });
  }
});

// GET /api/stories
app.get("/api/stories", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stories ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stories" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
