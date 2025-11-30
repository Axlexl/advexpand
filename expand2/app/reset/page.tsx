"use client";
import { useEffect } from "react";

export default function Reset() {
  useEffect(() => {
    // Clear all corrupted data
    localStorage.removeItem("expand-products");
    localStorage.removeItem("expand-cart");
    localStorage.removeItem("expand-orders");
    alert("All data has been reset. The app will now work correctly. Redirecting to home...");
    window.location.href = "/";
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Resetting application data...</h1>
    </div>
  );
}
