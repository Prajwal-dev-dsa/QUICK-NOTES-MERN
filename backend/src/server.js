import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

import notesRoutes from "./routes/notes.route.js";
import { connectDB } from "../config/db.js";
import rateLimiter from "../middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());

app.use(rateLimiter); //use before defining routes to apply rate limiting

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  console.log(
    "Serving frontend from:",
    path.join(__dirname, "../../frontend/dist")
  );
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  app.get("*", (req, res) => {
    console.log("Serving index.html for:", req.url);
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
