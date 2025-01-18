import express from "express";
import pool from "../../config/db.js";

const router = express.Router();

// Get all notes
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM notes");
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a new note
router.post("/", async (req, res) => {
    const { title, content } = req.body;
    try {
        const result = await pool.query(
        "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
        [title, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a note
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM notes WHERE id = $1", [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;