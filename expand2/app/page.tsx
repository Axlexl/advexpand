"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("expand-user");
      if (!raw) {
        router.replace("/register");
      }
    } catch (e) {
      router.replace("/register");
    }
  }, [router]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center p-10">
      <section>
          <h1 className="text-6xl font-extrabold">EXPAND HEADPHONES</h1>

          <p className="mt-6 text-gray-400 text-lg max-w-xl">
            Premium sound. Studio-grade clarity. Designed for creators, gamers,
            and music lovers who want the best.
          </p>

          <Link href="/products">
            <button className="mt-10 px-8 py-3 bg-white text-black rounded-lg font-semibold">
              Shop Now
            </button>
          </Link>
        </section>

        <section className="flex justify-center">
          <img
            src="/images/hero.jpg"
            className="rounded-xl shadow-lg max-h-[420px]"
          />
        </section>
      </div>
    );
  }

