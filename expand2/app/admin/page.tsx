"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { products as initialProducts } from "@/app/lib/product";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    rating: "4.5",
    image: "",
    description: ""
  });

  useEffect(() => {
    // Check if admin is logged in
    const raw = localStorage.getItem("expand-user");
    if (!raw) {
      router.replace("/register");
      return;
    }
    const userData = JSON.parse(raw);
    // Simple admin check - you can add role-based system later
    setUser(userData);

    // Load products from localStorage or use initial
    const storedProducts = localStorage.getItem("expand-products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem("expand-products", JSON.stringify(initialProducts));
    }
  }, [router]);

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      name: "",
      price: "",
      rating: "4.5",
      image: "",
      description: ""
    });
    setShowForm(true);
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: String(product.price),
      rating: String(product.rating),
      image: product.image,
      description: product.description
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.image) {
      alert("Please fill in all fields");
      return;
    }

    let updatedProducts;
    if (editingId) {
      // Edit existing
      updatedProducts = products.map(p =>
        String(p.id) === String(editingId)
          ? {
              ...p,
              name: formData.name,
              price: parseFloat(formData.price),
              rating: parseFloat(formData.rating),
              image: formData.image,
              description: formData.description
            }
          : p
      );
    } else {
      // Add new
      const newId = Math.max(...products.map(p => parseInt(String(p.id))), 0) + 1;
      updatedProducts = [
        ...products,
        {
          id: String(newId),
          name: formData.name,
          price: parseFloat(formData.price),
          rating: parseFloat(formData.rating),
          image: formData.image,
          description: formData.description
        }
      ];
    }

    setProducts(updatedProducts);
    localStorage.setItem("expand-products", JSON.stringify(updatedProducts));
    setShowForm(false);
    alert(editingId ? "Product updated!" : "Product added!");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(p => String(p.id) !== String(id));
      setProducts(updatedProducts);
      localStorage.setItem("expand-products", JSON.stringify(updatedProducts));
      alert("Product deleted!");
    }
  };

  const handleRestore = () => {
    if (confirm("Are you sure you want to restore all products to default? This will undo all changes.")) {
      setProducts(initialProducts);
      localStorage.setItem("expand-products", JSON.stringify(initialProducts));
      alert("Products restored to default!");
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin - Product Management</h1>
        <p className="text-gray-600">Welcome, {user?.username || "Admin"}</p>
      </div>

      {/* Add Product Button */}
      <div className="mb-8 flex gap-4">
        <button
          onClick={handleAddNew}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold"
        >
          + Add New Product
        </button>
        <button
          onClick={handleRestore}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-bold"
        >
          ↻ Restore Default Products
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., EXPAND Sonic Pro"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Price ($)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="199"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="4.5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/images/pro1.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Product description..."
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Price</th>
              <th className="px-6 py-3 text-left font-semibold">Rating</th>
              <th className="px-6 py-3 text-left font-semibold">Image</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{product.name}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">⭐ {product.rating}</td>
                <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">{product.image}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No products yet. Add one to get started!</p>
        </div>
      )}
    </div>
  );
}
