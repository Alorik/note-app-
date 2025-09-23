"use client";

import { useState } from "react";
import { FileText, Plus, Save, Eye, EyeOff } from "lucide-react";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title for your note");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });

      if (res.ok) {
        alert("Note created successfully!");
        setTitle("");
        setContent("");
      } else {
        let message = "Failed to create note";
        try {
          const error = await res.json();
          message = error.error || error.message || message;
        } catch {
          message = `${res.status} ${res.statusText}`;
        }
        alert(message);
      }
    } catch {
      alert("Failed to post the notes request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Create New Note
          </h1>
          <p className="text-gray-600">Capture your thoughts and ideas</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Form */}
          <div className="p-8">
            {/* Title Input */}
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Note Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter your note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                required
              />
            </div>

            {/* Content Textarea */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="content"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Note Content
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="inline-flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showPreview ? "Edit" : "Preview"}
                </button>
              </div>

              {showPreview ? (
                <div className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg bg-gray-50">
                  <div className="text-gray-800 whitespace-pre-wrap">
                    {content || (
                      <span className="text-gray-400 italic">
                        Your content preview will appear here...
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <textarea
                  id="content"
                  placeholder="Write your note content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isLoading || !title.trim()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Create Note
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Preview Section */}
          {(title.trim() || content.trim()) && (
            <div className="border-t border-gray-100 bg-gray-50 p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Eye size={20} />
                Live Preview
              </h3>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                {title.trim() && (
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                    {title}
                  </h2>
                )}
                {content.trim() && (
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {content}
                  </div>
                )}
                {!title.trim() && !content.trim() && (
                  <p className="text-gray-400 italic">
                    Start typing to see your note preview...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-6 text-center text-sm text-gray-500 space-x-6">
          <span>Characters: {content.length}</span>
          <span>
            Words: {content.trim() ? content.trim().split(/\s+/).length : 0}
          </span>
          <span>Lines: {content.split("\n").length}</span>
        </div>
      </div>
    </div>
  );
}
