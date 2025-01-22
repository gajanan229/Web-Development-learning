import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notes.js";
import { connectDB } from "../config/db.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/auth", notesRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});