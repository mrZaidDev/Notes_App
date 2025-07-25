import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import connectDB from "./config/connectDB.js";
import notesRoute from "./routes/notesRoute.js";
import authMiddleware from "./middleware/authMiddleware.js";
import cors from "cors";
import path from 'path'

// Middlewares
const __dirname = path.resolve()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

// Routes
app.use("/api", userRoute);
app.use("/api", authMiddleware, notesRoute);

// Serve static files from the Vite build
app.use(express.static(path.join(__dirname, "public")));

// Fallback for React Router (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//Server + DB connection
const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  try {
    await connectDB();
    app.listen(PORT, console.log("Server Started ... "));
  } catch (error) {
    console.log("error occurred, " + error);
  }
};
startServer();
