"use client";

import Link from "next/link";

interface PricingTier {
  moq: number;
  price: number;
}

interface Product {
  _id: string;
  name: string;
  image: string;
  pricing: PricingTier[];
}

export default function ProductCard({ product }: { product: Product }) {
  const lowestPricing = product.pricing?.[0];
  const imageUrl = `http://localhost:4000${product.image}`;

  return (
    <Link href={`product/${product._id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] cursor-pointer transition duration-300 p-4 flex flex-col">
        {/* IMAGE */}
        <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full object-contain"
            />
          ) : (
            <span className="text-gray-400 text-sm">No Image</span>
          )}
        </div>

        {/* DETAILS */}
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold text-gray-800 truncate">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500">
            MOQ: {lowestPricing?.moq} pieces
          </p>

          <p className="text-lg font-bold text-blue-600">
            Rs. {lowestPricing?.price}
          </p>
        </div>
      </div>
    </Link>
  );
}
