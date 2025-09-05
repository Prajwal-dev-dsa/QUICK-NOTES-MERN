import express from "express";
import dotenv from "dotenv";

import notesRoutes from "./routes/notes.route.js";
import { connectDB } from "../config/db.js";
import rateLimiter from "../middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(rateLimiter); //use before defining routes to apply rate limiting

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
