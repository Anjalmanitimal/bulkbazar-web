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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold">
        {isEditMode ? "Edit Product" : "Add New Product"}
      </h2>

      {/* NAME */}
      <div>
        <label className="block mb-1 font-medium">Product Name</label>
        <input
          type="text"
          className="input w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="input w-full h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* IMAGE */}
      <div>
        <label className="block mb-1 font-medium">Product Image</label>
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
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-3 w-40 h-40 object-cover rounded-lg border"
          />
        )}
      </div>
      {/* CATEGORY */}
      <div>
        <label className="block mb-1 font-medium">Category</label>

        <input
          type="text"
          className="input w-full"
          placeholder="Example: Electronics, Clothing, Toys"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      {/* PRICING */}
      <div>
        <label className="block mb-2 font-medium">Pricing Tiers</label>

        {pricing.map((tier, index) => (
          <div key={index} className="flex gap-4 mb-3">
            <input
              type="number"
              placeholder="MOQ"
              className="input w-full"
              value={tier.moq}
              onChange={(e) =>
                handlePricingChange(index, "moq", e.target.value)
              }
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="input w-full"
              value={tier.price}
              onChange={(e) =>
                handlePricingChange(index, "price", e.target.value)
              }
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddPricing}
          className="text-blue-600 font-medium"
        >
          + Add Another Tier
        </button>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition w-full"
      >
        {loading
          ? "Processing..."
          : isEditMode
            ? "Update Product"
            : "Add Product"}
      </button>
    </form>
  );
}
