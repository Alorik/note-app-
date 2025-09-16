"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <p className="bg-red-500 text-white p-2 mb-4 rounded">{error}</p>
        )}

        <form onSubmit={handleCredentialsLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 dark:bg-blue-500 text-white py-3 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <hr className="my-6 border-gray-300 dark:border-gray-600" />

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 bg-red-600 dark:bg-red-500 text-white py-3 w-full rounded hover:bg-red-700 dark:hover:bg-red-600 transition"
        >
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google Logo"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
