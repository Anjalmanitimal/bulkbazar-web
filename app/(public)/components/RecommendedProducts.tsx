"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import Link from "next/link";

export default function RecommendedProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.data);
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/shop/product/${product._id}`}
            className="min-w-[200px]"
          >
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-3">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                className="w-full h-32 object-cover rounded-lg"
              />

              <h3 className="font-medium mt-2">{product.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
