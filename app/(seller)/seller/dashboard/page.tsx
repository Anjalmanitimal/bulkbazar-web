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
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Seller Dashboard</h1>

          <p className="text-gray-500">Manage your products</p>
        </div>

        <Link
          href="/seller/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>

      {/* Table */}
      <ProductsTable products={products} refresh={fetchProducts} />
    </div>
  );
}
