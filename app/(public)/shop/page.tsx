"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategoriesAPI, getProductsByCategoryAPI } from "@/lib/api/category";

interface Product {
  _id: string;
  name: string;
  image: string;
  category: string;
  pricing: { moq: number; price: number }[];
}

export default function ShopPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategoriesAPI();
      setCategories(cats);
      if (cats.length > 0) setSelectedCategory(cats[0]);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    const loadProducts = async () => {
      setLoading(true);
      const prods = await getProductsByCategoryAPI(selectedCategory);
      setProducts(prods);
      setLoading(false);
    };

    loadProducts();
  }, [selectedCategory]);

  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold">Shop Products</h1>
        <p className="text-blue-100">
          Browse products by category and discover wholesale deals
        </p>
      </div>

      <div className="flex gap-6">
        {/* ===== CATEGORY SIDEBAR ===== */}
        <div className="w-64">
          <div className="bg-white rounded-2xl shadow-sm border p-4">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>

            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition
                  
                  ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow"
                      : "hover:bg-blue-50 text-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== PRODUCT AREA ===== */}
        <div className="flex-1 space-y-4">
          {/* CATEGORY TITLE */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedCategory}
            </h2>

            <p className="text-gray-500">{products.length} products found</p>
          </div>

          {/* PRODUCT GRID */}
          {loading ? (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              No products found
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {products.map((product) => (
                <Link key={product._id} href={`/shop/product/${product._id}`}>
                  <div className="bg-white rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden">
                    {/* IMAGE */}
                    <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                        className="h-full object-contain"
                        alt={product.name}
                      />
                    </div>

                    {/* INFO */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-gray-800 line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        MOQ: {product.pricing?.[0]?.moq} pieces
                      </p>

                      <p className="text-lg font-bold text-blue-600">
                        Rs. {product.pricing?.[0]?.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
