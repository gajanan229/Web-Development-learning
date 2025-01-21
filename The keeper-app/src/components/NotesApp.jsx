import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Note from "./Note";
import CreateArea from "./CreateArea";

function NotesApp() {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt_token");
        if (!token) {
            // Redirect to login if no token exists
            navigate("/login");
            return;
        }

        // Verify the token with the backend
        fetch("http://localhost:5000/auth/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "jwt_token": token,
            },
        })
            .then((response) => response.json())
            .then((isVerified) => {
                if (!isVerified) {
                    // Redirect if token is invalid
                    navigate("/login");
                } else {
                    // Fetch notes if authenticated
                    fetchNotes(token);
                }
            })
            .catch((error) => {
                console.error("Error verifying token:", error);
                navigate("/login");
            });
    }, [navigate]);

    const fetchNotes = (token) => {
        fetch("http://localhost:5000/auth/notes", {
            headers: { "Content-Type": "application/json", "jwt_token": token },
        })
            .then((response) => response.json())
            .then((data) => setNotes(data))
            .catch((error) => console.error("Error fetching notes:", error));
    };

    function addNote(newNote) {
        const token = localStorage.getItem("jwt_token");
        fetch("http://localhost:5000/auth/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "jwt_token": token,
            },
            body: JSON.stringify(newNote),
        })
            .then((response) => response.json())
            .then((data) => setNotes((prevNotes) => [...prevNotes, data]))
            .catch((error) => console.error("Error adding note:", error));
    }

    function deleteNote(id) {
        const token = localStorage.getItem("jwt_token");
        fetch(`http://localhost:5000/auth/notes/${id}`, {
            method: "DELETE",
            headers: {
                "jwt_token": token,
            },
        })
            .then(() =>
                setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
            )
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