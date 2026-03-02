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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="pb-3">Product</th>

            <th>Description</th>

            <th className="text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products?.map((product: any) => (
            <tr
              key={product._id}
              className="border-b hover:bg-gray-50 transition"
            >
              {/* PRODUCT */}
              <td className="py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                    className="w-14 h-14 rounded-lg object-cover border"
                  />

                  <div>
                    <p className="font-semibold text-gray-800">
                      {product.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      ID: {product._id.slice(-6)}
                    </p>
                  </div>
                </div>
              </td>

              {/* DESCRIPTION */}
              <td className="text-gray-600 max-w-sm truncate">
                {product.description}
              </td>

              {/* ACTIONS */}
              <td className="text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/seller/products/edit/${product._id}`}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-4 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
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
  );
}
