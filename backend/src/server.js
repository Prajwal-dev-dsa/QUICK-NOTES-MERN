import express from "express";
import dotenv from "dotenv";

import notesRoutes from "./routes/notes.route.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
