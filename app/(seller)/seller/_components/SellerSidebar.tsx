"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SellerSidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/seller/dashboard" },
    { name: "Products", href: "/seller/products" },
    { name: "Add Product", href: "/seller/products/add" },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen p-6">
      <h2 className="text-2xl font-bold mb-8 text-blue-600">Seller Panel</h2>

      <nav className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded-lg transition ${
              pathname === item.href
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
