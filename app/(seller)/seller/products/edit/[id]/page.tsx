"use client";

import { useParams } from "next/navigation";
import ProductForm from "../../../_components/ProductForm";

export default function EditProductPage() {
  const params = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <ProductForm productId={params.id as string} />
    </div>
  );
}
