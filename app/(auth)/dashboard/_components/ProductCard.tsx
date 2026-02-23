"use client";

interface PricingTier {
  moq: number;
  price: number;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  pricing: PricingTier[];
}

export default function ProductCard({ product }: { product: Product }) {
  const lowestPricing = product.pricing?.[0];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img
        src={`http://localhost:4000/${product.image}`}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />

      <h2 className="text-lg font-bold mt-2">{product.name}</h2>

      <p className="text-sm text-gray-500">
        Minimum order: {lowestPricing?.moq} pieces
      </p>

      <p className="text-blue-600 font-semibold">Rs. {lowestPricing?.price}</p>
    </div>
  );
}
