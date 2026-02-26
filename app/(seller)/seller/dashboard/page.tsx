import Link from "next/link";

export default function SellerDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Seller Dashboard</h1>

      <div className="flex gap-6">
        <Link
          href="/seller/add-product"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Product
        </Link>
      </div>
    </div>
  );
}
