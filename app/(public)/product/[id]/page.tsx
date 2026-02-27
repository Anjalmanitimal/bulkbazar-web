"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { addToCart } from "@/lib/api/cart";

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  pricing: { moq: number; price: number }[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    fetchRecommended();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecommended = async () => {
    try {
      const res = await axios.get(`/api/products`);
      setRecommended(res.data.data.slice(0, 8));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !product) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* PRODUCT SECTION */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
          className="w-full h-[450px] object-cover rounded-xl shadow-md"
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <p className="text-gray-500 mb-4">Category: {product.category}</p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* PRICING TABLE */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Pricing</h3>

            <div className="border rounded-lg overflow-hidden">
              {product.pricing.map((tier, index) => (
                <div key={index} className="flex justify-between p-3 border-b">
                  <span>MOQ: {tier.moq}</span>
                  <span className="font-semibold text-blue-600">
                    Rs. {tier.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full font-semibold"
            onClick={() => {
              addToCart({
                _id: product._id,
                name: product.name,
                image: product.image,
                pricing: product.pricing,
              });

              alert("Added to Bag 🛒");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* RECOMMENDED */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommended.map((item) => (
            <Link
              key={item._id}
              href={`/product/${item._id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                className="w-full h-40 object-cover"
              />

              <div className="p-3">
                <h3 className="font-semibold line-clamp-1">{item.name}</h3>

                <p className="text-blue-600 font-bold">
                  Rs. {item.pricing[0]?.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
