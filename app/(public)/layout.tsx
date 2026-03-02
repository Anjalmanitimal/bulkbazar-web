import Link from "next/link";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== MAIN NAVBAR ===== */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700"
          >
            BulkBazar
          </Link>

          {/* NAV LINKS */}
          <div className="flex items-center gap-8">
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Dashboard
            </Link>

            <Link
              href="/shop"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Shop
            </Link>

            <Link
              href="/bag"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Bag
            </Link>

            <Link
              href="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>

      {/* ===== PAGE CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-6 py-6">{children}</div>
    </div>
  );
}
