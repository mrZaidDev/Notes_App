import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import connectDB from "./config/connectDB.js";

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", userRoute);

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
startServer()
