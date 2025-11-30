"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Cart() {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("expand-user");
      if (!raw) {
        router.replace("/register");
        return;
      }
      setUser(JSON.parse(raw));

      // Load cart
      const cartRaw = localStorage.getItem("expand-cart");
      if (cartRaw) {
        setCart(JSON.parse(cartRaw));
      }
    } catch (e) {
      router.replace("/register");
    }
  }, [router]);

  const handleQtyChange = (id: string, qty: number) => {
    if (qty < 1) return;
    const updatedCart = cart.map(item =>
      String(item.id) === String(id) ? { ...item, qty } : item
    );
    setCart(updatedCart);
    localStorage.setItem("expand-cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (id: string) => {
    const updatedCart = cart.filter(item => String(item.id) !== String(id));
    setCart(updatedCart);
    localStorage.setItem("expand-cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Create order record
    const orders = JSON.parse(localStorage.getItem("expand-orders") || "[]");
    const order = {
      id: Date.now().toString(),
      username: user?.username,
      email: user?.email,
      items: cart,
      total: cart.reduce((sum: number, item: any) => sum + item.price * item.qty, 0),
      status: "Completed",
      date: new Date().toLocaleString(),
      timestamp: Date.now()
    };

    orders.push(order);
    localStorage.setItem("expand-orders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("expand-cart");
    setCart([]);
    setShowCheckout(false);

    alert("Order placed successfully! Order ID: " + order.id);
    router.push("/orders");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <Link href="/products">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow p-6 flex gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>

                    <div className="flex items-center gap-4 mt-4">
                      <label className="text-sm font-semibold">Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value))}
                        className="w-16 p-2 border border-gray-300 rounded"
                      />
                      <p className="font-bold">
                        Subtotal: ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 h-fit"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

            <div className="border-t border-b py-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span className="font-bold">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-4">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold mb-3"
            >
              Checkout
            </button>

            <Link href="/products" className="block">
              <button className="w-full px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Checkout Confirmation Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Order</h2>
            <p className="text-gray-600 mb-4">
              Total Amount: <span className="font-bold text-lg">${total.toFixed(2)}</span>
            </p>
            <p className="text-gray-600 mb-6">Proceed with checkout?</p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
