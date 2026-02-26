import { ReactNode } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <header className="bg-blue-600 text-white px-8 py-4 flex justify-between">
        <h1 className="font-bold text-xl">BulkBazar</h1>

        <nav className="space-x-6">
          <Link href="/dashboard">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/bag">Bag</Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-8">{children}</main>
    </div>
  );
}
