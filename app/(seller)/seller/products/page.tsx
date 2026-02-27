"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";

export default function SellerProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products/seller");
      setProducts(res.data.data);
    } catch (error) {
      console.error("FETCH PRODUCTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Products</h1>

      {products.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <p className="text-gray-500">No products yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="p-4">
                    <img
                      src={`http://localhost:4000${product.image}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="p-4 font-medium">{product.name}</td>

                  <td className="p-4 text-gray-500">{product.description}</td>

                  <td className="p-4 text-center space-x-2">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>

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
      )}
    </div>
  );
}
