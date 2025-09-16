"use client";

import { useState } from "react";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    console.log("Note Created:", { title, content });
    alert(`Note created!\nTitle: ${title}\nContent: ${content}`);
  };


  return (
    <div>
      <h1>NOTES CREATE FORM</h1>
      <form onSubmit={handleSubmit}>
         <input 
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /> 

        {/* Content TextAREA */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) =>setContent(e.target.value)}
        ></textarea>
        <button type="submit">Create Note</button>
      </form>
      <p>Title: {title}</p>
      <p>Content: {content}</p>
    </div>
  );
}
