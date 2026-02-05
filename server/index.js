import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import storiesRoutes from "./routes/stories.js";
import { pool } from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount stories router
app.use("/api/stories", storiesRoutes);

// Initialize table if not exists
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS stories (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        category TEXT,
        helped_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Stories table initialized");
  } catch (err) {
    console.error("Error creating table:", err);
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
