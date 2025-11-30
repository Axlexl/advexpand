'use client';
import { useState } from "react";

export default function ProductForm({ defaultValues, onSaved }: { defaultValues?: any; onSaved: ()=>void; }) {
  const [title, setTitle] = useState(defaultValues?.title || "");
  const [desc, setDesc] = useState(defaultValues?.description || "");
  const [price, setPrice] = useState(defaultValues?.price || "");
  const [image, setImage] = useState(defaultValues?.image || "");
  const [loading, setLoading] = useState(false);

  async function submit(e: any) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    // For frontend-only mode we store to localStorage (demo)
    const existing = JSON.parse(localStorage.getItem("expand-products") || "[]");
    if (defaultValues) {
      // edit
      const updated = existing.map((p: any) => p.id === defaultValues.id ? { ...p, title, description: desc, price, image } : p);
      localStorage.setItem("expand-products", JSON.stringify(updated));
    } else {
      const id = Date.now().toString();
      existing.unshift({ id, title, description: desc, price, image });
      localStorage.setItem("expand-products", JSON.stringify(existing));
    }

    setLoading(false);
    onSaved();
    if (!defaultValues) { setTitle(""); setDesc(""); setPrice(""); setImage(""); }
  }

  return (
    <form onSubmit={submit} className="bg-slate-50 p-4 rounded-md border border-slate-100">
      <label className="block text-sm text-slate-700">Title</label>
      <input value={title} onChange={e=>setTitle(e.target.value)} required className="w-full mt-1 p-2 border border-slate-200 rounded" />

      <label className="block text-sm text-slate-700 mt-3">Description</label>
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} required className="w-full mt-1 p-2 border border-slate-200 rounded" />

      <label className="block text-sm text-slate-700 mt-3">Price</label>
      <input value={price} onChange={e=>setPrice(e.target.value)} required className="w-full mt-1 p-2 border border-slate-200 rounded" />

      <label className="block text-sm text-slate-700 mt-3">Image URL</label>
      <input value={image} onChange={e=>setImage(e.target.value)} placeholder="https://..." className="w-full mt-1 p-2 border border-slate-200 rounded" />

      <div className="flex justify-end mt-4">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-slate-900 text-white rounded">
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
