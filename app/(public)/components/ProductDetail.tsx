"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import RecommendedProducts from "./RecommendedProducts";
import AddToCartButton from "./AddToCartButton";

export default function ProductDetail({ productId }: { productId: string }) {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/products/${productId}`);
      setProduct(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-6">
      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
          className="w-full h-96 object-cover rounded-xl shadow"
        />

        {/* INFO */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* CATEGORY */}
          <p className="mb-4">
            <span className="font-semibold">Category:</span> {product.category}
          </p>

          {/* PRICING */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Pricing:</h3>

            {product.pricing.map((p: any, i: number) => (
              <div
                key={i}
                className="flex justify-between border p-2 rounded mb-2"
              >
                <span>MOQ: {p.moq}</span>
                <span>Rs {p.price}</span>
              </div>
            ))}
          </div>

          {/* ADD TO CART BUTTON */}
          <button
            onClick={AddToCartButton}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* RECOMMENDED */}
      <RecommendedProducts />
    </div>
  );
}
