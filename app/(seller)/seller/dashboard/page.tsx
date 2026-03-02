"use client";

import { useEffect, useState } from "react";
import { getSellerProducts } from "@/lib/api/seller.product";
import ProductsTable from "../_components/ProductsTable";
import Link from "next/link";

export default function SellerDashboardPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getSellerProducts();
      setProducts(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Seller Dashboard</h1>

          <p className="text-gray-500 mt-1">
            Manage your products and grow your business
          </p>
        </div>

        <Link
          href="/seller/products/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow hover:shadow-lg transition font-medium"
        >
          + Add Product
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Total Products</p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {products.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Active Products</p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {products.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Account Status</p>

          <h2 className="text-xl font-bold text-blue-600 mt-2">Active</h2>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Your Products</h2>

          <Link
            href="/seller/products"
            className="text-blue-600 font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        <ProductsTable products={products} refresh={fetchProducts} />
      </div>
    </div>
  );
}
