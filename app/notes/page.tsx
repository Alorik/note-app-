// app/notes/page.tsx
"use client";

import NoteCard from "./components/NotesCard";
import { useEffect, useState } from "react";

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes");
        if (res.ok) {
          const data = res.json();
          setNotes(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

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
