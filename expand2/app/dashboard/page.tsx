'use client';
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";

// sample products (clean white style)
const sampleProducts = [
  {
    id: "p1",
    title: "EXPAND studio headphones",
    description: "Studio-grade closed-back headphones, neutral sound profile.",
    price: "$249",
    image: "https://images.unsplash.com/photo-1518443187083-9bab3dd4ae18?w=1200&q=80&auto=format&fit=crop"
  },
  {
    id: "p2",
    title: "EXPAND Wireless",
    description: "Wireless noise-cancelling headphones with long battery life.",
    price: "$199",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=1200&q=80&auto=format&fit=crop"
  },
  {
    id: "p3",
    title: "EXPAND Pro Monitor",
    description: "Open-back monitor headphones for mixing and mastering.",
    price: "$349",
    image: "https://images.unsplash.com/photo-1516704864336-1f7b65a2ae3b?w=1200&q=80&auto=format&fit=crop"
  }
];

export default function Dashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // load from localStorage (frontend demo)
    setLoading(true);
    const raw = localStorage.getItem("expand-products");
    if (raw) {
      setItems(JSON.parse(raw));
      setLoading(false);
      return;
    }
    // seeded samples
    localStorage.setItem("expand-products", JSON.stringify(sampleProducts));
    setItems(sampleProducts);
    setLoading(false);
  }, [refreshKey]);

  function startEdit(p: any) {
    setEditing(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSaved() {
    setEditing(null);
    setRefreshKey(k => k + 1);
  }

  async function deleteOne(id: string) {
    if (!confirm("Delete this product?")) return;
    const existing = JSON.parse(localStorage.getItem("expand-products") || "[]");
    const updated = existing.filter((x: any) => x.id !== id);
    localStorage.setItem("expand-products", JSON.stringify(updated));
    setRefreshKey(k => k + 1);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Your Products</h1>

      <div className="mb-6">
        <ProductForm defaultValues={editing || undefined} onSaved={handleSaved} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? <p>Loading...</p> :
          items.length === 0 ? <p className="text-slate-500">No products yet.</p> :
            items.map((p: any) => (
              <ProductCard key={p.id} product={p} onEdit={startEdit} onDelete={deleteOne} />
            ))
        }
      </div>
    </div>
  );
}
