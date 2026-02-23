"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api/product";
import ProductCard from "./_components/ProductCard";

export default function DashboardPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();

      console.log("PRODUCTS:", data);

      setProducts(data);
    } catch (err) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!products || products.length === 0) return <p>No products available</p>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
