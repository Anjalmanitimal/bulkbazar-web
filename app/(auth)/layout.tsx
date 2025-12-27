import { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="bg-blue-400 h-14 flex items-center justify-between px-6">
        <div className="bg-white px-4 py-1 rounded">
          <span className="font-semibold text-lg">BulkBazar</span>
        </div>

        <div className="text-white space-x-6 text-sm">
          <Link href="/signup">SignUp</Link>
          <Link href="/login">Login</Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex items-center justify-center min-h-[calc(100vh-56px)]">
        <div className="flex w-[1200px]">
          {/* Form */}
          <div className="w-[450px] bg-blue-300 p-10 rounded-xl flex flex-col justify-center">
            {children}
          </div>

          {/* Logo */}
          <div className="w-1/2 flex items-center justify-center">
            <img
              src="/bulkbazarlogo.png"
              alt="BulkBazar Logo"
              className="w-[420px]"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
