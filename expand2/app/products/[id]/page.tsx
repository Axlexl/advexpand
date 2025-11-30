"use client";
import { products as initialProducts } from "@/app/lib/product";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductDetails() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !params.id) return;

    // Load products from localStorage or use initial
    const storedProducts = localStorage.getItem("expand-products");
    let productsToUse = initialProducts;

    if (storedProducts) {
      try {
        const parsed = JSON.parse(storedProducts);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].image) {
          productsToUse = parsed;
        }
      } catch (e) {
        console.log("Failed to parse stored products, using defaults");
      }
    }

    console.log("Looking for product ID:", params.id);
    console.log("Available products:", productsToUse.map(p => p.id));

    // Find product - try multiple matching strategies
    let found = productsToUse.find((p: any) => String(p.id) === String(params.id));
    
    if (!found) {
      // Try numeric comparison
      found = productsToUse.find((p: any) => parseInt(String(p.id)) === parseInt(String(params.id)));
    }

    console.log("Found product:", found);

    if (found) {
      setProduct({
        ...found,
        image: found.image || "/images/pro1.jpg"
      });
    } else {
      setProduct(null);
    }
  }, [mounted, params.id]);

  if (!mounted) return null;

  if (!product) return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
      <button 
        onClick={() => router.back()}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );

  const handleAddToCart = () => {
    setLoading(true);
    // Get existing cart
    const cartRaw = localStorage.getItem("expand-cart");
    let cart = cartRaw ? JSON.parse(cartRaw) : [];

    // Find if product already in cart
    const existingItem = cart.find((item: any) => String(item.id) === String(product.id));
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
        image: product.image
      });
    }

    localStorage.setItem("expand-cart", JSON.stringify(cart));
    setLoading(false);
    alert("Added to cart!");
    router.push("/cart");
  };

  return (
    <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-16">

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl shadow-xl w-full max-h-[450px] object-cover"
        />
      )}

      <div>
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-gray-400 mt-4">{product.description}</p>

        <p className="text-2xl font-bold mt-6">${product.price}</p>

        <button 
          onClick={handleAddToCart}
          disabled={loading}
          className="mt-8 px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 disabled:opacity-50 border-2 border-black font-bold"
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
