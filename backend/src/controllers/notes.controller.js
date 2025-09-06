import Note from "../../models/notes.model.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt:-1});
    if (!notes.length) {
      return res.status(404).json({ message: "No notes found" });
    }
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "No note found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    await note.save();
    res.status(200).json({ message: "Note created successfully", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: "No note found" });
    }
    res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "No note found" });
    }
    res.status(200).json({ message: "Note deleted successfully", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
