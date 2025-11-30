"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Rating() {
  const [rating, setRating] = useState<number>(5);
  const router = useRouter();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Rate Your Purchase</h1>

      <p className="text-gray-400">Thank you for buying! Please give us a rating.</p>

      <div className="mt-5 text-4xl flex gap-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
            onClick={() => setRating(n)}
            className={n <= rating ? "text-yellow-400" : "text-gray-300"}
          >
            ★
          </button>
        ))}
      </div>

      <div className="mt-6">
        <p className="mb-3">Selected rating: <strong>{rating}</strong></p>
        <button
          onClick={() => {
            // For demo: navigate home after submitting rating
            router.push("/");
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
}
