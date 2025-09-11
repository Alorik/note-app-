"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (session) {
      fetch("/api/notes")
        .then((res) => res.json())
        .then((data) => setNotes(data));
    }
  }, [session]);

  const addNote = async () => {
    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });
    const newNote = await res.json();
    setNotes([newNote, ...notes]);
    setContent("");
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <button
          onClick={() => signIn("google")}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Notes</h1>
        <button
          onClick={() => signOut()}
          className="p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a note..."
          className="border p-2 flex-grow"
        />
        <button
          onClick={addNote}
          className="p-2 bg-green-500 text-white rounded"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {notes.map((note: any) => (
          <li key={note._id} className="border p-2 rounded">
            {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
