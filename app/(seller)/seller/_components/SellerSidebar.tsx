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
    <div className="w-64 bg-white border-r min-h-screen p-6">
      {/* LOGO */}
      <h1 className="text-2xl font-bold text-blue-600 mb-10">
        BulkBazar Seller
      </h1>

      {/* MENU */}
      <nav className="space-y-2">
        {menu.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-xl font-medium transition ${
                active
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
