import React, { useState, useEffect } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";

function NotesApp() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/auth/notes")
            .then((response) => response.json())
            .then((data) => setNotes(data))
            .catch((error) => console.error("Error fetching notes:", error));
    }, []);

    function addNote(newNote) {
        fetch("http://localhost:5000/auth/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newNote),
        })
            .then((response) => response.json())
            .then((data) => setNotes((prevNotes) => [...prevNotes, data]))
            .catch((error) => console.error("Error adding note:", error));
    }

    function deleteNote(id) {
        fetch(`http://localhost:5000/auth/notes/${id}`, {
            method: "DELETE",
        })
            .then(() => setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)))
            .catch((error) => console.error("Error deleting note:", error));
    }

    return (
        <div>
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => (
            <Note
                key={index}
                id={index}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
            />
        ))}
        </div>
    );
}

export default NotesApp;