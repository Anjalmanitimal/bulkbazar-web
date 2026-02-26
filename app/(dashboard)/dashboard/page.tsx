"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import ProductCard from "./_components/ProductCard";

export default function DashboardPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data.data || res.data);
    } catch (err) {
      console.error("PRODUCT FETCH ERROR:", err);
    }
  };

  return (
    <div className="space-y-10">
      {/* HOT SALE TITLE */}
      <div>
        <h2 className="text-4xl font-bold">HOT SALE</h2>
      </div>

      {/* ===== FIRST SECTION (3 PRODUCTS + SALE BANNER) ===== */}
      <div className="grid grid-cols-4 gap-6">
        {/* First 3 Products */}
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}

        {/* SALE BANNER */}
        <div className="relative rounded-xl overflow-hidden shadow-md">
          <img
            src="/sale.png"
            alt="Sale"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <h3 className="text-white text-3xl font-bold tracking-widest"></h3>
          </div>
        </div>
      </div>

      {/* ===== SECOND SECTION (5 PRODUCTS) ===== */}
      <div>
        <div className="grid grid-cols-5 gap-6">
          {products.slice(3, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* ===== SCROLLABLE PRODUCT GRID BELOW ===== */}
      <div>
        <div className="grid grid-cols-5 gap-6 max-h-[500px] overflow-y-auto pr-2">
          {products.slice(8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
