import Link from "next/link";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Navbar */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        {/* LOGO → Redirect to customer dashboard */}
        <Link
          href="/dashboard" // change if your dashboard route is different
          className="text-xl font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer"
        >
          BulkBazar
        </Link>

        {/* Right Side */}
        <div className="flex gap-4">
          <Link
            href="/shop"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Shop
          </Link>
        </div>
      </div>

      {/* Page Content */}
      <div className="p-6">{children}</div>
    </div>
  );
}
