import Link from "next/link";

export default function Checkout() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <p className="text-gray-400">Order summary goes here...</p>

      <Link href="/rating">
        <button className="mt-8 px-8 py-3 bg-green-500 text-white rounded-lg">
          Complete Purchase
        </button>
      </Link>
    </div>
  );
}
