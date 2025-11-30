"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Read from localStorage on mount
    const raw = localStorage.getItem("expand-user");
    console.log("Navbar mounted, raw user:", raw);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        console.log("Parsed user:", parsed);
        setUser(parsed);
      } catch (e) {
        console.error("Failed to parse user:", e);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("expand-user");
    setUser(null);
    router.push("/register");
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <nav className="flex items-center justify-between p-5 bg-black text-white">
        <h1 className="text-2xl font-bold">EXPAND</h1>
        <div className="flex gap-6 items-center">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between p-5 bg-black text-white">
      <h1 className="text-2xl font-bold">EXPAND</h1>

      <div className="flex gap-6 items-center">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/orders">Orders</Link>
        {user?.username === "adminexpand" && (
          <Link href="/admin" className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700">
            Admin
          </Link>
        )}
        {user ? (
          <>
            <span className="text-sm">{user.username || "User"}</span>
            <button onClick={logout} className="text-sm underline hover:no-underline">
              Logout
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
}
