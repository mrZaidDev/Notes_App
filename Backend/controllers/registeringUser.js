import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

// REGISTERING USER
export const registeringUser = async (req, res) => {
  const { username, email, password } = req.body;
  // checking whether all the fields are truthy
  if (!username || !email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  // validating the email
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!email.match(emailFormat)) {
    return res.status(400).json({ message: "please provide a valid email" });
  }
  // validating the password with length
  if (password.length <= 5) {
    return res
      .status(400)
      .json({ message: "password length should be at least 6 characters" });
  }
  // using try catch to catch the network errors
  try {
    // making sure the email doesn't already exist
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }
    // hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // Registering the user
    const registerUser = await userModel.create({
      username,
      email,
      password: hash,
    });
    res.status(201).json({ message: "User Registered" });
  } catch (error) {
    res.json({ message: `Internal server error` });
  }
};
