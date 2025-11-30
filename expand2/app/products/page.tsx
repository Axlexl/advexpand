"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { products as initialProducts } from "@/app/lib/product";
import Link from "next/link";

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("expand-user");
      if (!raw) {
        router.replace("/register");
        return;
      }

      // Load products from localStorage (admin might have updated them)
      const storedProducts = localStorage.getItem("expand-products");
      let productsToUse = initialProducts;
      
      if (storedProducts) {
        try {
          const parsed = JSON.parse(storedProducts);
          // Validate that products have images
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].image) {
            productsToUse = parsed;
          }
        } catch (e) {
          // If parsing fails, use initial products
          console.log("Failed to parse stored products, using defaults");
        }
      }

      // Ensure all products have valid images
      const validProducts = productsToUse.map(p => ({
        ...p,
        image: p.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
      }));

      setProducts(validProducts);
    } catch (e) {
      router.replace("/register");
    }
  }, [router]);

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
      {products.map((p) => (
        <Link key={p.id} href={`/products/${p.id}`}>
          <div className="border rounded-xl shadow-lg p-5 hover:scale-105 transition cursor-pointer">
            {p.image && (
              <img 
                src={p.image} 
                alt={p.name}
                className="rounded-xl h-60 w-full object-cover" 
              />
            )}
            <h2 className="mt-3 text-xl font-bold">{p.name}</h2>
            <p className="text-gray-400">${p.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}


