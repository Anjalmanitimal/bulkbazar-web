"use client";

import { deleteSellerProduct } from "@/lib/api/seller.product";
import Link from "next/link";

export default function ProductsTable({ products, refresh }: any) {
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    await deleteSellerProduct(id);

    refresh();
  };

  return (
    <div className="bg-white shadow rounded">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(products) &&
            products.map((product: any) => (
              <tr key={product._id} className="border-t">
                <td className="p-2">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>

                <td>{product.name}</td>

                <td>{product.description}</td>

                <td className="space-x-2">
                  <Link
                    href={`/seller/products/edit/${product._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
