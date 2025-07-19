import notesModel from "../models/notesModel.js";

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
    return res.status(500).json({message:'Internal server error'})
  }
};
// 