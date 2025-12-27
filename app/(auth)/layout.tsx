import { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Top Navbar */}
      <header className="bg-blue-400 h-14 flex items-center justify-between px-6">
        <div className="bg-white px-4 py-1 rounded">
          <span className="font-semibold text-lg">BulkBazar</span>
        </div>

        <div className="text-white space-x-4 text-sm">
          <Link href="/signup">SignUp</Link>
          <Link href="/login">Login</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-56px)]">
        <div className="flex w-[1100px]">
          {/* Left Form */}
          <div className="w-1/2 bg-blue-300 p-10">{children}</div>

          {/* Right Logo */}
          <div className="w-1/2 flex items-center justify-center">
            <img
              src="/bulkbazarlogo.png"
              alt="BulkBazar Logo"
              className="w-[350px]"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
