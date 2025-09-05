import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/notes.controller.js";

const router = express.Router();

// all api routes here
router.get("/", getAllNotes);
router.post("/", createNote);
router.put("/", updateNote);
router.delete("/", deleteNote);

export default router;
