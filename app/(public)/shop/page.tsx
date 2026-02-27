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

  // ============================
  // LOAD CATEGORIES
  // ============================
  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategoriesAPI();

      setCategories(cats);

      if (cats.length > 0) {
        setSelectedCategory(cats[0]);
      }
    };

    loadCategories();
  }, []);

  // ============================
  // LOAD PRODUCTS
  // ============================
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
    <div className="flex gap-6">
      {/* ============================
          SIDEBAR
      ============================ */}
      <div className="w-64 bg-white shadow-md rounded-xl p-4 h-fit">
        <h2 className="text-xl font-bold mb-4">Categories</h2>

        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-4 py-2 rounded-lg transition
              ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ============================
          PRODUCTS
      ============================ */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">{selectedCategory}</h2>

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product._id} href={`/product/${product._id}`}>
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden cursor-pointer">
                  {/* IMAGE */}
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                    className="w-full h-48 object-cover"
                    alt={product.name}
                  />

                  {/* CONTENT */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm mb-2">
                      {product.category}
                    </p>

                    <p className="text-blue-600 font-bold text-lg">
                      Rs. {product.pricing[0]?.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
