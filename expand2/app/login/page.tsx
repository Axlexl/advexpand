"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const raw = localStorage.getItem("expand-user");
    if (!raw) {
      setError("No account found. Please register first.");
      return;
    }
    try {
      const stored = JSON.parse(raw);
      if (stored.email === email && stored.password === password) {
        localStorage.setItem("expand-user", JSON.stringify(stored));
        router.push("/");
      } else {
        setError("Invalid credentials.");
      }
    } catch (e) {
      setError("Invalid stored user data.");
    }
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
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 placeholder-gray-500 focus:outline-none"
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 placeholder-gray-500 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
            >
              Log In
            </button>

            <hr className="my-4" />

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 font-bold hover:underline">
                Create new account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
