import express from "express";
import pool from "../../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Get all notes
router.get("/notes", authorize, async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await pool.query("SELECT * FROM notes WHERE user_id = $1", [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a new note
router.post("/notes", authorize, async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;
    try {
        const result = await pool.query(
        "INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
            [title, content, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a note
router.delete("/notes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM notes WHERE id = $1", [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

function authorize(req, res, next) {
    const token = req.header("jwt_token");

    if (!token) {
        return res.status(403).json({ msg: "Authorization denied" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload.user; // `user` is set in the payload during token generation
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
}

export default router;
