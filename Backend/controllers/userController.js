import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

// LOGGING IN USER
export const loggingInUser = async (req, res) => {
  const { email, password } = req.body;
  // checking whether all the fields are truthy
  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  try {
    // making sure the email already exists in DB
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    // making sure the password matches
    const isPasswordMatching = bcrypt.compareSync(
      password,
      existingUser.password
    );
    // if password doesn't match
    if (!isPasswordMatching) {
      return res.status(400).json({ message: "Wrong password" });
    }
    // if password matches
    const userId = {id:existingUser._id}
    const token = jwt.sign(userId, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "strict",
    });
    return res.status(200).json({message:'User logged in successfully'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
};

