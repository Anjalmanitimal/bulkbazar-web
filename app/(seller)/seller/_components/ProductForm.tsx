"use client";

import { useState } from "react";
import axios from "@/lib/api/axios";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [pricing, setPricing] = useState([{ moq: "", price: "" }]);

  const handleAddPricing = () => {
    setPricing([...pricing, { moq: "", price: "" }]);
  };

  const handlePricingChange = (index: number, field: string, value: string) => {
    const updated = [...pricing];
    updated[index][field as "moq" | "price"] = value;
    setPricing(updated);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    formData.append("pricing", JSON.stringify(pricing));
    console.log("TOKEN:", localStorage.getItem("token"));

    try {
      await axios.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product Added Successfully ✅");
      setName("");
      setDescription("");
      setImage(null);
      setPricing([{ moq: "", price: "" }]);
    } catch (error) {
      console.error("ADD PRODUCT ERROR:", error);
      alert("Failed to add product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-md"
    >
      {/* NAME */}
      <div>
        <label className="block mb-1 font-medium">Product Name</label>
        <input
          type="text"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="input h-24"
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
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
        />
      </div>

      {/* PRICING TIERS */}
      <div>
        <label className="block mb-2 font-medium">Pricing Tiers</label>

        {pricing.map((tier, index) => (
          <div key={index} className="flex gap-4 mb-3">
            <input
              type="number"
              placeholder="MOQ"
              className="input"
              value={tier.moq}
              onChange={(e) =>
                handlePricingChange(index, "moq", e.target.value)
              }
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="input"
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
      <button type="submit" className="auth-button">
        Add Product
      </button>
    </form>
  );
}
