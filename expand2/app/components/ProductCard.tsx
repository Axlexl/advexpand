'use client';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image?: string;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete
}: {
  product: Product;
  onEdit?: (p: Product) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <article className="bg-white border border-slate-100 p-4 rounded-lg shadow-sm">
      {product.image && (
        <img src={product.image} alt={product.title} className="w-full h-44 object-cover rounded-md mb-3" />
      )}

      <h3 className="text-lg font-medium text-slate-900">{product.title}</h3>
      <p className="text-sm text-slate-600 mt-1 line-clamp-2">{product.description}</p>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-base font-semibold text-slate-900">{product.price}</div>
        <div className="flex gap-2">
          {onEdit && (
            <button onClick={() => onEdit(product)} className="px-3 py-1 text-sm border rounded border-slate-200">Edit</button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(product.id)} className="px-3 py-1 text-sm border rounded border-red-100 text-red-600">Delete</button>
          )}
        </div>
      </div>
    </article>
  );
}
