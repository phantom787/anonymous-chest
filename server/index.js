import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import storyRoutes from "./routes/stories.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/stories", storyRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
