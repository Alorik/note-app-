// app/notes/page.tsx
"use client";

import NoteCard from "./components/NotesCard";
import { useState } from "react";

export default function NotesPage() {
  // temporary dummy notes
  const [notes, setNotes] = useState([
    { _id: "1", title: "First Note", content: "This is my first note." },
    { _id: "2", title: "Second Note", content: "Another important note." },
  ]);

  // handle delete
  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onDelete={handleDelete} />
      ))}
    </div>
  );
}
