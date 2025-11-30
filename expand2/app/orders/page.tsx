"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Orders() {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [viewMode, setViewMode] = useState<"my" | "all">("my");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("expand-user");
      if (!raw) {
        router.replace("/register");
        return;
      }
      const userData = JSON.parse(raw);
      setUser(userData);

      // Check if user is admin (simple check - you can add role system)
      const isUserAdmin = userData.username === "adminexpand";
      setIsAdmin(isUserAdmin);

      // Load all orders
      const ordersRaw = localStorage.getItem("expand-orders");
      const allOrdersList = ordersRaw ? JSON.parse(ordersRaw) : [];
      setAllOrders(allOrdersList);

      // Filter user's orders
      const userOrders = allOrdersList.filter(
        (order: any) => order.username === userData.username
      );
      setOrders(userOrders);
    } catch (e) {
      router.replace("/register");
    }
  }, [router]);

  const displayOrders = viewMode === "my" ? orders : allOrders;

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Order History</h1>
        <p className="text-gray-600">Welcome, {user?.username}</p>
      </div>

      {/* View Mode Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setViewMode("my")}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            viewMode === "my"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
        >
          My Orders
        </button>
        {isAdmin && (
          <button
            onClick={() => setViewMode("all")}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              viewMode === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            All Orders (Admin)
          </button>
        )}
      </div>

      {/* Admin Link */}
      {isAdmin && (
        <Link href="/admin">
          <button className="mb-8 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold">
            Go to Admin Panel
          </button>
        </Link>
      )}

      {/* Orders List */}
      {displayOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-xl text-gray-600 mb-4">
            {viewMode === "my" ? "You have no orders yet" : "No orders found"}
          </p>
          {viewMode === "my" && (
            <Link href="/products">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold">
                Start Shopping
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {displayOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-bold">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-bold">{order.username}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-bold">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-full font-bold text-sm">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4">Items</h3>
                <div className="space-y-3">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded">
                      <div className="flex items-center gap-4 flex-1">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            ${item.price} x {item.qty}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back Link */}
      <div className="mt-8">
        <Link href="/products">
          <button className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
            ← Back to Products
          </button>
        </Link>
      </div>
    </div>
  );
}
