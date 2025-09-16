"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link href="/" className="text-xl font-bold">
        Notes App
      </Link>

      {session && (
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 bg-red-600 rounded-lg"
        >
          Logout
        </button>
      )}
    </header>
  );
}
