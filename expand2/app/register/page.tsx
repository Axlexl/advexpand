"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // simple client-side persistence (demo)
    const user = { username, email, password };
    localStorage.setItem("expand-user", JSON.stringify(user));
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl gap-8 px-4">
        {/* Left side */}
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-blue-600 mb-2">EXPAND</h1>
          <p className="text-xl text-gray-600">Connect with premium audio quality.</p>
        </div>

        {/* Right side - Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={submit} className="space-y-4">
            {error && <div className="bg-red-100 text-red-700 p-3 rounded text-sm">{error}</div>}
            
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 placeholder-gray-500 focus:outline-none"
            />

            <input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 placeholder-gray-500 focus:outline-none"
            />
            
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 placeholder-gray-500 focus:outline-none"
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 placeholder-gray-500 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-3 rounded hover:bg-green-600 transition"
            >
              Create Account
            </button>

            <hr className="my-4" />

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-bold hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
