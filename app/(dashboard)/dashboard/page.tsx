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
      {/* ================= HERO HEADER ================= */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">
          Welcome to BulkBazar Dashboard 👋
        </h1>
        <p className="text-blue-100 mt-2">
          Discover hot deals, trending products and best wholesale prices.
        </p>

        <div className="flex gap-6 mt-6">
          <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3">
            <p className="text-sm">Total Products</p>
            <p className="text-xl font-bold">{products.length}</p>
          </div>
        </div>
      </div>

      {/* ================= HOT SALE TITLE ================= */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">🔥 Hot Sale</h2>

        <button className="text-blue-600 font-semibold hover:text-blue-700">
          View All →
        </button>
      </div>

      {/* ================= FIRST SECTION ================= */}
      <div className="grid grid-cols-4 gap-6">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}

        {/* SALE BANNER */}
        <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group">
          <img
            src="/sale.png"
            alt="Sale"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <div>
              <p className="text-white text-sm">Special Offer</p>
              <h3 className="text-white text-xl font-bold">Up to 50% OFF</h3>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TRENDING PRODUCTS ================= */}
      <div>
        <div className="grid grid-cols-5 gap-6">
          {products.slice(3, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* ================= ALL PRODUCTS ================= */}
      <div>
        <div className="grid grid-cols-5 gap-6 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-200">
          {products.slice(8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
