"use client";

import Link from "next/link";


export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Note App</h1>

      <div className="flex flex-col gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          Login
        </Link>




      </div>
    </div>
  );
}
