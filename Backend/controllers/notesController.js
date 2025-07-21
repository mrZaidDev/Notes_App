import notesModel from "../models/notesModel.js";
import mongoose from "mongoose";
// POSTING THE NOTE
export const postingNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  if (!title || !content || !userId) {
    return res.status(400).json({ message: "all fields are required" });
  }
  try {
    await notesModel.create({ title, content, user: userId });
    return res.status(201).json({ message: "note created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// GET ALL NOTES By specific user
export const gettingNotes = async (req, res) => {
  const userId = req.user.id;
  try {
    const allNotes = await notesModel.find({ user: userId });
    return res.status(200).json(allNotes);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
// DELETING THE NOTE
export const deletingNote = async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({ message: "note id in not valid" });
  }
  try {
    const foundNote = await notesModel.findById(noteId);
    if (!foundNote) {
      return res.status(400).json({ message: "note not found" });
    }
    if (userId != foundNote.user.toString()) {
      return res
        .status(403)
        .json({ message: "forbidden! don't interrupt in others notes" });
    }
    await notesModel.deleteOne({ _id: foundNote._id });
    return res.status(200).json({ message: "note deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
// EDITING THE NOTE
export const updatingNote = async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({ message: "note id in not valid" });
  }
  try {
    const foundNote = await notesModel.findById(noteId);
    if (!foundNote) {
      return res.status(404).json({ message: "note not found" });
    }
    if (userId != foundNote.user.toString()) {
      return res
        .status(403)
        .json({ message: "forbidden! don't interrupt in others notes" });
    }
    const { title, content } = req.body;
    if (!title && !content) {
      return res
        .status(400)
        .json({ message: "title or content is not provided" });
    }
    if (title) foundNote.title = title;
    if (content) foundNote.content = content;
    await foundNote.save();
    return res.status(200).json({ message: "note Updated" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
// Getting Single Note
export const gettingSingleNote = async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(404).json({ message: "Id is not valid" });
  }
  try {
    const findNote = await notesModel.findById(noteId);
    if (!findNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (userId != findNote.user.toString()) {
      return res
        .status(403)
        .json({ message: "forbidden! don't interrupt in others notes" });
    }
    return res.status(200).json(findNote);
  } catch (error) {}
};
