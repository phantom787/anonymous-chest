import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "../db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await pool.query(
    "SELECT * FROM admin WHERE username=$1",
    [username]
  );

  if (!admin.rows.length) return res.sendStatus(401);

  const valid = await bcrypt.compare(password, admin.rows[0].password);
  if (!valid) return res.sendStatus(401);

  const token = jwt.sign({ id: admin.rows[0].id }, process.env.JWT_SECRET);
  res.json({ token });
});

router.delete("/story/:id", async (req, res) => {
  await pool.query("DELETE FROM stories WHERE id=$1", [req.params.id]);
  res.sendStatus(200);
});

export default router;
