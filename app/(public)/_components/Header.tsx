"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCartCount } from "@/lib/api/cart";

export default function Header() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(getCartCount());
  };

  useEffect(() => {
    updateCount();

    window.addEventListener("cartUpdated", updateCount);

    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

  return (
    <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* LOGO */}
      <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
        BulkBazar
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex gap-6 items-center">
        <Link href="/shop" className="hover:text-blue-600 font-medium">
          Shop
        </Link>

        <Link href="/bag" className="relative hover:text-blue-600 font-medium">
          Bag
          {count > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
