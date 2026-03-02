"use client";

import { useState, useEffect } from "react";
import axios from "@/lib/api/axios";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  productId?: string;
}

export default function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pricing, setPricing] = useState([{ moq: "", price: "" }]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  const isEditMode = !!productId;

  // ===============================
  // FETCH PRODUCT IF EDIT MODE
  // ===============================
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${productId}`);
        const product = res.data.data;

        setName(product.name);
        setDescription(product.description);
        setPricing(
          product.pricing.map((p: any) => ({
            moq: p.moq,
            price: p.price,
          })),
        );
        setCategory(product.category);

        setImagePreview(`${process.env.NEXT_PUBLIC_API_URL}${product.image}`);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    fetchProduct();
  }, [productId]);

  // ===============================
  // PRICING
  // ===============================
  const handleAddPricing = () => {
    setPricing([...pricing, { moq: "", price: "" }]);
  };

  const handlePricingChange = (
    index: number,
    field: "moq" | "price",
    value: string,
  ) => {
    const updated = [...pricing];
    updated[index][field] = value;
    setPricing(updated);
  };

  // ===============================
  // SUBMIT
  // ===============================
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("pricing", JSON.stringify(pricing));
    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (isEditMode) {
        await axios.put(`/api/products/${productId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Product Updated Successfully ✅");
      } else {
        await axios.post("/api/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Product Added Successfully ✅");
      }

      router.push("/seller/products");
    } catch (error) {
      console.error("PRODUCT ERROR:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white border shadow-sm rounded-2xl p-8 space-y-8"
      >
        {/* HEADER */}
        <div className="border-b pb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="text-gray-500 mt-1">
            Fill in the details below to {isEditMode ? "update" : "create"} your
            product
          </p>
        </div>

        {/* BASIC INFO */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* PRODUCT NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter product name"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              placeholder="Electronics, Clothing, Toys..."
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="Write a clear and detailed product description..."
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-3">
            Product Image
          </label>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition">
            <input
              type="file"
              required={!isEditMode}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImage(file);

                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="mb-4"
            />

            <p className="text-gray-500 text-sm">
              Upload a clear product image (JPG, PNG)
            </p>

            {imagePreview && (
              <div className="mt-6 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-xl shadow border"
                />
              </div>
            )}
          </div>
        </div>

        {/* PRICING SECTION */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Pricing Tiers
          </h3>

          <div className="space-y-4">
            {pricing.map((tier, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border"
              >
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Minimum Order Quantity (MOQ)
                  </label>
                  <input
                    type="number"
                    value={tier.moq}
                    onChange={(e) =>
                      handlePricingChange(index, "moq", e.target.value)
                    }
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter MOQ"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Price (Rs.)
                  </label>
                  <input
                    type="number"
                    value={tier.price}
                    onChange={(e) =>
                      handlePricingChange(index, "price", e.target.value)
                    }
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter price"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddPricing}
            className="mt-4 text-blue-600 font-medium hover:underline"
          >
            + Add Another Pricing Tier
          </button>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow hover:shadow-md"
          >
            {loading
              ? "Processing..."
              : isEditMode
                ? "Update Product"
                : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
