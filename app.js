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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

// Routes
app.use("/api", userRoute);
app.use("/api", authMiddleware, notesRoute);


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
