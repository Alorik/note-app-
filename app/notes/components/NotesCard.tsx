"use client";

import Link from "next/link";

interface NoteCardProps {
  note: {
    _id: string;
    title: string;
    content: string;
  };
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <div className="border p-4 rounded shadow flex justify-between items-start">
      <div>
        <h2 className="font-bold text-lg">{note.title}</h2>
        <p className="text-gray-700">{note.content}</p>
      </div>

      <div className="space-x-2">
        <Link
          href={`/notes/edit/${note._id}`}
          className="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(note._id)}
          className="bg-red-600 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
