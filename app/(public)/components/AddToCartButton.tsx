"use client";

import { addToCart } from "@/lib/api/cart";

export default function AddToCartButton({ product }: any) {
  const handleAdd = () => {
    addToCart(product);

    alert("Added to cart 🛒");
  };

  return (
    <button
      onClick={handleAdd}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
    >
      Add to Cart
    </button>
  );
}
